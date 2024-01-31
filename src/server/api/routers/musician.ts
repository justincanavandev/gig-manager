import {
  createTRPCRouter,
  protectedProcedure,
  // publicProcedure,
} from "~/server/api/trpc";

import z from "zod";

export const musicianRouter = createTRPCRouter({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    try {
      return await ctx.db.musician.findMany({});
    } catch (e) {
      throw e;
    }
  }),
  create: protectedProcedure
    .input(
      z.object({
        name: z.string().min(1),
        instrument: z.string().min(1),
        phoneNumber: z.string().min(1),
        email: z.string().email(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        return await ctx.db.musician.create({
          data: {
            name: input.name,
            instrument: input.instrument,
            phoneNumber: input.phoneNumber,
            email: input.email
          },
        });
      } catch (e) {
        throw e;
      }
    }),
    delete: protectedProcedure
    .input(
      z.object({
        id: z.string()
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        return await ctx.db.musician.delete({
          where: {
            id: input.id
          }
        });
      } catch (e) {
        throw e;
      }
    }),
});
