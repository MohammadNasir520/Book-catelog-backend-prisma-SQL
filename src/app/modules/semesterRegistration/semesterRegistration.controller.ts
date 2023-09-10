import { SemesterRegistration } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { SemesterRegistrationService } from './semesterRegistration.service';

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
  const result = await SemesterRegistrationService.insertIntoDB(req.body);
  sendResponse<SemesterRegistration>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'semester registration done',
    data: result,
  });
});
const updateOneInDB = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await SemesterRegistrationService.updateOneInDB(id, req.body);
  sendResponse<SemesterRegistration>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'semester updated successfully',
    data: result,
  });
});

export const SemesterRegistrationController = {
  insertIntoDB,
  updateOneInDB,
};
