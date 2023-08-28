import prisma from '../../../shared/prisma';

const insertIntoDB = async (data: any) => {
  const { preRequisiteCourses, ...coursesDAta } = data;

  const newCourse = await prisma.$transaction(async transactionClient => {
    const result = await transactionClient.course.create({
      data: coursesDAta,
    });

    if (preRequisiteCourses && preRequisiteCourses.length > 0) {
      for (let index = 0; index < preRequisiteCourses.length; index++) {
        const createPreRequisite =
          await transactionClient.courseToPrerequisite.create({
            data: {
              courseId: result.id,
              preRequisiteID: preRequisiteCourses[index].courseId,
            },
          });

        console.log('c', createPreRequisite);
      }
    }
    return result;
  });
  return newCourse;
};

// const getAllFromDB = async (
//   filters: ICourseFilterRequest,
//   options: IPaginationOptions
// ): Promise<IGenericResponse<Course[]>> => {
//   const { page, limit, skip } = paginationHelpers.calculatePagination(options);
//   const { searchTerm, ...filterData } = filters;
//   console.log(filterData);

//   const andConditions = [];

//   if (searchTerm) {
//     andConditions.push({
//       OR: CourseSearchAbleFields.map(field => ({
//         [field]: {
//           contains: searchTerm,
//           mode: 'insensitive',
//         },
//       })),
//     });
//   }

//   if (Object.keys(filterData).length > 0) {
//     andConditions.push({
//       AND: Object.keys(filterData).map(key => ({
//         [key]: {
//           equals: (filterData as any)[key],
//         },
//       })),
//     });
//   }

//   const whereConditions: Prisma.CourseWhereInput =
//     andConditions.length > 0 ? { AND: andConditions } : {};

//   const result = await prisma.Course.findMany({
//     where: whereConditions,
//     skip,
//     take: limit,
//     orderBy:
//       options.sortBy && options.sortOrder
//         ? {
//             [options.sortBy]: options.sortOrder,
//           }
//         : {
//             createdAt: 'desc',
//           },
//   });
//   const total = await prisma.Course.count();
//   return {
//     meta: {
//       total,
//       page,
//       limit,
//     },
//     data: result,
//   };
// };

// const getDataById = async (id: string): Promise<Course | null> => {
//   const result = await prisma.Course.findUnique({
//     where: {
//       id: id,
//     },
//   });
//   return result;
// };

// const updateOneInDB = async (
//   id: string,
//   payload: Partial<Course>
// ): Promise<Course> => {
//   const result = await prisma.Course.update({
//     where: {
//       id,
//     },
//     data: payload,
//   });
//   return result;
// };

// const deleteByIdFromDB = async (id: string): Promise<Course> => {
//   const result = await prisma.Course.delete({
//     where: {
//       id,
//     },
//   });
//   return result;
// };

export const CourseService = {
  insertIntoDB,
  // getAllFromDB,
  // getDataById,
  // updateOneInDB,
  // deleteByIdFromDB,
};
