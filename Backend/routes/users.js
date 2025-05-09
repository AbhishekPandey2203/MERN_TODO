import express, { Router } from "express";
import {
  register,
  login,
  logout,
  getMe,
  updateDetails,
  updatePassword,
  deleteUser,
} from "../controllers/usersController.js";

import authorize from "../middleware/authorize.js";
import {
  loginRules,
  registerRules,
  updateDetailsRules,
  updatePasswordRules,
} from "../middleware/validator.js";
import { validateResult } from "../middleware/validationResults.js";
const router = express.Router();

//register function will be define in the controller
//validateresult function define in the middleware

router.post("/register", registerRules, validateResult, register);

router.post("/login", loginRules, validateResult, login);

router.get("/logout", logout);

router.get("/me", authorize, getMe);

router.put(
  "/updatedetails",
  authorize,
  updateDetailsRules,
  validateResult,
  updateDetails
);

router.put(
  "/updatepassword",
  authorize,
  updatePasswordRules,
  validateResult,
  updatePassword
);

router.delete("/delete", authorize, deleteUser);

export default router;
