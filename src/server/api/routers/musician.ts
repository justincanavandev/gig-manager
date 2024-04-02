import {
  createTRPCRouter,
  protectedProcedure,
  // publicProcedure,
} from "~/server/api/trpc";
import type { Instrument } from "@prisma/client";

import z from "zod";

export const musicianRouter = createTRPCRouter({
  // getAll: protectedProcedure.query(async ({ ctx }) => {
  //   try {
  //     return await ctx.db.musician.findMany();
  //   } catch (e) {
  //     throw e;
  //   }
  // }),
  create: protectedProcedure
    .input(
      z.object({
        name: z.string().min(1),
        instrument: z.string().min(1),
        phoneNumber: z.string().min(1),
        email: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { name, instrument, phoneNumber, email } = input;
      const allInstruments = await ctx.db.instrument.findMany();
      const dupInst = allInstruments.find(
        (inst: Instrument) => inst.name === instrument,
      );

      try {
        if (!dupInst) {
          return await ctx.db.musician.create({
            data: {
              name,
              email,
              phoneNumber,
              instruments: {
                create: [
                  {
                    name: instrument,
                  },
                ],
              },
            },
          });
        } else {
          console.log('dup')
          return await ctx.db.musician.create({
            data: {
              name,
              email,
              phoneNumber,
              instruments: {
                connect: {
                  id: dupInst.id,
                },
              },
            },
          });
        }
      } catch (e) {
        throw e;
      }
    }),
  // delete: protectedProcedure
  // .input(
  //   z.object({
  //     id: z.string()
  //   }),
  // )
  // .mutation(async ({ ctx, input }) => {
  //   try {
  //     return await ctx.db.musician.delete({
  //       where: {
  //         id: input.id
  //       }
  //     });
  //   } catch (e) {
  //     throw e;
  //   }
  // }),
});
