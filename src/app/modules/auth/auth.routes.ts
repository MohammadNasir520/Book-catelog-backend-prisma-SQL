import express from 'express';
import { AuthController } from './auth.controller';

const router = express.Router();
router.post(
  '/signup',
  // auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  // validateRequest(UserValidation.create),
  AuthController.insertIntoDB
);
router.post(
  '/signin',

  AuthController.loginUser
);
export const AuthRoutes = router;
