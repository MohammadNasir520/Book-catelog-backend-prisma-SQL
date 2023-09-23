import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { OrderController } from './order.controller';

const router = express.Router();

router.post(
  '/create-order',
  auth(ENUM_USER_ROLE.CUSTOMER),
  OrderController.insertIntoDB
);
router.get(
  '/',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.CUSTOMER),
  OrderController.getAllFromDB
);

router.get('/:id', OrderController.getByIdFromDB);
router.patch('/:id', auth(ENUM_USER_ROLE.ADMIN), OrderController.updateIntoDB);
router.delete('/:id', auth(ENUM_USER_ROLE.ADMIN), OrderController.deleteFromDB);

export const OrderRoutes = router;
