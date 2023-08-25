import express from 'express';
import { buildingController } from './building.controller';

const router = express.Router();

router.post('/', buildingController.insertIntoDb);
router.get('/', buildingController.getAllFromDb);

export const BuildingRoutes = router;
