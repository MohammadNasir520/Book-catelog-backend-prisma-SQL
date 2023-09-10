import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { SemesterRegistrationController } from './semesterRegistration.controller';
import { SemesterRegistrationValidation } from './semesterRegistration.validataion';

const router = express.Router();

router.post('/', SemesterRegistrationController.insertIntoDB);
router.patch(
  '/:id',
  validateRequest(SemesterRegistrationValidation.update),
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  SemesterRegistrationController.updateOneInDB
);

export const SemesterRegistrationRoutes = router;
