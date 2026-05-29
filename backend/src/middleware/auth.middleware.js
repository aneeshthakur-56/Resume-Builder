import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";
const authUser = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) throw new ApiError(401, "Unauthorized - No token found");
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.user = decoded;
  next();
};

export { authUser };
