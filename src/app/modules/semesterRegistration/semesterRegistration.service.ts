import {
  SemesterRegistration,
  SemesterRegistrationStatus,
} from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import prisma from '../../../shared/prisma';

const insertIntoDB = async (
  data: SemesterRegistration
): Promise<SemesterRegistration> => {
  const isAnySemesterRegUpcomingOrOngoing =
    await prisma.semesterRegistration.findFirst({
      where: {
        OR: [
          {
            status: SemesterRegistrationStatus.UPCOMING,
          },
          {
            status: SemesterRegistrationStatus.ONGOING,
          },
        ],
      },
    });

  if (isAnySemesterRegUpcomingOrOngoing) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      `there is already an ${isAnySemesterRegUpcomingOrOngoing.status} registration`
    );
  }

  const result = await prisma.semesterRegistration.create({
    data: data,
  });

  return result;
};

const updateOneInDB = async (
  id: string,
  payload: Partial<SemesterRegistration>
): Promise<SemesterRegistration> => {
  console.log(payload);
  const isExist = await prisma.semesterRegistration.findUnique({
    where: {
      id: id,
    },
  });
  if (!isExist) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      'semester registration is not fount'
    );
  }

  if (
    payload.status &&
    isExist.status === SemesterRegistrationStatus.UPCOMING &&
    payload.status !== SemesterRegistrationStatus.ONGOING
  ) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'can only move from upcoming to ongoing'
    );
  }
  if (
    payload.status &&
    isExist.status === SemesterRegistrationStatus.ONGOING &&
    payload.status !== SemesterRegistrationStatus.ENDED
  ) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'can only move from ONGOING to ENDED'
    );
  }
  const result = await prisma.semesterRegistration.update({
    where: {
      id: id,
    },
    data: payload,
    include: {
      academicSemester: true,
    },
  });

  return result;
};

export const SemesterRegistrationService = {
  insertIntoDB,
  updateOneInDB,
};
