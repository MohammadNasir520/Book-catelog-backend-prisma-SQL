import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { userValidation } from '../user/user.validation';
import { AuthController } from './auth.controller';

const router = express.Router();
router.post(
  '/signup',
  validateRequest(userValidation.UserSignUpZodSchema),
  AuthController.insertIntoDB
);
router.post(
  '/signin',
  validateRequest(userValidation.UserSignInZodSchema),
  AuthController.loginUser
);
export const AuthRoutes = router;
