import { postRouter } from "~/server/api/routers/post";
import { musicianRouter } from "./routers/musician"

import { userRouter } from "./routers/user";
import { createTRPCRouter } from "~/server/api/trpc";
import { instrumentRouter } from "./routers/instrument"

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  post: postRouter,
  musician: musicianRouter,
  user: userRouter,
  instrument: instrumentRouter

});

// export type definition of API
export type AppRouter = typeof appRouter;
