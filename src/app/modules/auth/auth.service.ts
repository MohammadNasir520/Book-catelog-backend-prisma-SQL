import { User } from '@prisma/client';
import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import prisma from '../../../shared/prisma';
import { ILoginUser, ILoginUserResponse } from './auth.interface';

const insertIntoDB = async (data: User): Promise<Partial<User>> => {
  const result = await prisma.user.create({
    data,
  });

  return result;
};

const loginUser = async (payload: ILoginUser): Promise<ILoginUserResponse> => {
  console.log('payload ', payload);
  const { email, password } = payload;

  const isUserExist = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }

  const isPasswordMatched = isUserExist.password === password;

  if (!isPasswordMatched) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Invalid Password');
  }

  //create access token & refresh token

  const { id: userId, role } = isUserExist;
  const accessToken = jwtHelpers.createToken(
    { userId, role },
    config.jwt.secret as Secret,

    '365d'
  );

  const refreshToken = jwtHelpers.createToken(
    { userId, role },
    config.jwt.refresh_secret as Secret,

    '365d'
  );

  return {
    accessToken,
    refreshToken,
  };
};

export const AuthService = {
  insertIntoDB,
  loginUser,
};
