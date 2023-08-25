import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
// import { CourseFilterableFields } from './course.constant';
import { CourseService } from './course.service';

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
  const result = await CourseService.insertIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'course created successfully',
    data: result,
  });
});
// const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
//   const filters = pick(req.query, [
//     'searchTerm',
//     'code',
//     'startMonth',
//     'endMonth',
//     'title',
//   ]);
//   const options = pick(req.query, CourseFilterableFields);
//   console.log('filters', filters);
//   console.log('options', options);
//   const result = await CourseService.getAllFromDB(filters, options);
//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'academic semester retrieved successfully',
//     meta: result.meta,
//     data: result.data,
//   });
// });
// const getDataById = catchAsync(async (req: Request, res: Response) => {
//   const result = await CourseService.getDataById(req.params.id);
//   sendResponse<Course>(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'academic semester retrieved successfully',
//     data: result,
//   });
// });

// const updateOneInDB = catchAsync(async (req: Request, res: Response) => {
//   const { id } = req.params;
//   const result = await CourseService.updateOneInDB(id, req.body);
//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Academic Semster updated successfully',
//     data: result,
//   });
// });

// const deleteByIdFromDB = catchAsync(async (req: Request, res: Response) => {
//   const { id } = req.params;
//   const result = await CourseService.deleteByIdFromDB(id);
//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Academic Semster delete successfully',
//     data: result,
//   });
// });

export const CourseController = {
  insertIntoDB,
  // getAllFromDB,
  // getDataById,
  // updateOneInDB,
  // deleteByIdFromDB,
};
