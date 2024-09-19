// ` import jwt

import jwt from "jsonwebtoken";
// : this auth will decode the jwt by using (jwt.verify) and it will make the (user id) available to the router
const authMiddleware = async (req, res, next) => {
  // ` get the token
  const { token } = req.headers;
  // ` check the token
  // console.log(token);
  
  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "You are not authenticated" });
  }
  // ` if the token is valid, we can trust the user
  try {
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);
    // ` attach the user id to the request body
    req.body.userId = token_decode.id;
    next();

  } catch (error) {
    console.error(error);
    return res
      .status(403)
      .json({ success: false, message: "Token is not valid" });
  }
};

export default authMiddleware;
