import { createEnv } from "@t3-oss/env-nextjs";
import * as z from "zod";

export const env = createEnv({
  server: {
    BACKEND_API: z.string(),
    FRONTEND_API: z.string(),
    API_URL: z.string(),
    AUTH_URL: z.string(),
  },
  client: {
    NEXT_PUBLIC_BACKEND_API: z.string(),
  },
  runtimeEnv: {
    BACKEND_API: process.env.BACKEND_API,
    FRONTEND_API: process.env.FRONTEND_API,
    API_URL: process.env.API_URL,
    AUTH_URL: process.env.AUTH_URL,
    NEXT_PUBLIC_BACKEND_API: process.env.NEXT_PUBLIC_BACKEND_API,
  },
});
