// import { env } from "@/env"
// import { createAuthClient } from "better-auth/react"
// export const authClient = createAuthClient({
//     /** The base URL of the server (optional if you're using the same domain) */
//     baseURL: env.NEXT_PUBLIC_BACKEND_API
// })


// import { env } from "@/env";
// import { createAuthClient } from "better-auth/react";

// export const authClient = createAuthClient({
//   baseURL: env.NEXT_PUBLIC_BACKEND_API,

//   fetchOptions: {
//     credentials: "include",
//   },
// });


import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: typeof window !== "undefined" ? window.location.origin : "",
  basePath: "/api/auth",
  fetchOptions: {
    credentials: "include",
  },
});

// import { createAuthClient } from "better-auth/react";

// export const authClient = createAuthClient({
//   baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000",
//   basePath: "/api/auth",
//   fetchOptions: {
//     credentials: "include",
//   },
// });