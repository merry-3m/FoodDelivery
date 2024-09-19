import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

// ` import stripe
import Stripe from "stripe";

// ` stripe secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// # placing user order for front end

const placeOrder = async (req, res) => {
  // ` url
  const frontend_url = "http://localhost:5173";
  try {
    // ` create a new order in the database
    const newOrder = new orderModel({
      userId: req.body.userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
    });
    // ` save the new order to the database
    await newOrder.save();
    // ` clear users card  to prevent the same items from being purchased multiple times.
    await userModel.findByIdAndUpdate(req.body.userId, {
      cartData: {},
    });
    // ` Prepare the list of items for Stripe's checkout session.

    const line_items = req.body.items.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));

    // ` push delivery fee into the above items list
    line_items.push({
      price_data: {
        currency: "usd",
        product_data: {
          name: "Delivery Charges",
        },
        unit_amount: 200,
      },
      quantity: 1,
    });

    //    ` create checkout session with Stripe.
    const session = await stripe.checkout.sessions.create({
      line_items: line_items,
      mode: "payment", //:to indicate a one-time payment.
      success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
    });

    // ` response
    res.json({
      success: true,
      session_url: session.url, //:to Stripe's hosted payment page 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// * in real-application we use web pack to verify

// #temporary order verification function.

const verifyOrder = async (req, res) => {
  // ` fetch order from the database
  const { orderId, success } = req.body;
  try {
    //` check if the success is true
    if (success == "true") {
      // ` make the payment true
      await orderModel.findByIdAndUpdate(orderId, { payment: true });
      res.json({
        success: true,
        message: "Payment successful",
      });
    } else{
        // ` delete the payment
        await orderModel.findByIdAndDelete(orderId);
        res.json({
          success: false,
          message: "Payment failed",
        });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};


// # get orders for frontend by id
const userOrders = async(req,res)=>{
  // console.log(req.body);

  try {
    // ` get the orders by using user id
    const orders = await orderModel.find({userId:req.body.userId})
    res.json({
      success: true,
      data: orders
    })
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
    
  }

}

// # get all orders for admin panel

const listOrders = async (req,res)=>{
  try {
    // ` get all orders from the database  (find({}) means select all)  and return them as a response to the client. 
    const orders = await orderModel.find({})
    res.json({
      success: true,
      data: orders
    })
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
    
  }

}

// # updating the order status
const updateStatus = async (req,res)=>{
  try {
    // ` find order by order id
   await orderModel.findByIdAndUpdate(req.body.orderId,{
     status: req.body.status
   })
   res.json({
     success: true,
     message: "Order status updated successfully"
   })
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
    
  }

}

export { placeOrder, verifyOrder,userOrders, listOrders,updateStatus};
