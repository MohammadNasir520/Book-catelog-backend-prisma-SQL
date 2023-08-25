import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { buildingController } from './building.controller';
import { BuildingValidation } from './building.validation';

const router = express.Router();

router.post(
  '/',
  validateRequest(BuildingValidation.create),
  buildingController.insertIntoDb
);
router.get('/', buildingController.getAllFromDb);

export const BuildingRoutes = router;
