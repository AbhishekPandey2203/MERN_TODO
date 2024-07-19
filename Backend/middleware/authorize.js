import jwt from "jsonwebtoken";

const authorize = async (req, res, next) => {
  const token = req.cookies.access_token;

  // console.log(token);

  if (!token) {
    return res.status(401).json({ msg: "Not Authorized" });
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET);
    req.user =user;
    next();
  } catch (error) {
    // console.log(error.message);
    res.status(500).json({ errors: "Internal Server Error" });
  }
};

export default authorize;
