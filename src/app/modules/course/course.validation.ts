import { z } from 'zod';

const create = z.object({
  body: z.object({
    title: z.string({ required_error: 'title is required' }),
    code: z.string({ required_error: 'code is required' }),
    credits: z.number({ required_error: 'credits is required' }),
  }),
});
const update = z.object({
  body: z.object({
    title: z.string().optional(),
    code: z.string().optional(),
    year: z.number().optional(),
    startMonth: z.string().optional(),
    endMonth: z.string().optional(),
  }),
});

const assignOrRemoveFaculties = z.object({
  body: z.object({
    faculties: z.array(z.string(), {
      required_error: 'faculties required',
    }),
  }),
});

export const CourseValidation = {
  create,
  update,
  assignOrRemoveFaculties,
};
