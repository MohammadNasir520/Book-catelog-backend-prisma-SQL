import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import {
  buildingFilterableFields,
  buildingPaginationOptions,
} from './building.constants';
import { BuildingService } from './building.service';

const insertIntoDb = catchAsync(async (req: Request, res: Response) => {
  const result = await BuildingService.insertIntoDb(req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'building created successfully',
    data: result,
  });
});
const getAllFromDb = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, buildingFilterableFields);
  const options = pick(req.query, buildingPaginationOptions);
  const result = await BuildingService.getAllFromDb(filters, options);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'buildings retrieved successfully',
    meta: result.meta,
    data: result.data,
  });
});
export const buildingController = {
  insertIntoDb,
  getAllFromDb,
};
