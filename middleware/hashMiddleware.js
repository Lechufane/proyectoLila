import bcrypt from "bcrypt";

export const hashMiddleware = (req, res, next) => {
  const { password } = req.body;
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  req.body.password = hash;
  next();
};
