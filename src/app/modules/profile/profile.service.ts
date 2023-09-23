import { User } from '@prisma/client';
import { JwtPayload } from 'jsonwebtoken';
import prisma from '../../../shared/prisma';

const getByIdFromDB = async (
  user: JwtPayload
): Promise<Partial<User | null>> => {
  const result = await prisma.user.findUnique({
    where: {
      id: user.userId,
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      contactNo: true,
      address: true,
      profileImg: true,
    },
  });
  return result;
};

export const ProfileService = {
  getByIdFromDB,
};
