// // auth.ts
// import NextAuth from "next-auth" // ✅ Correct for v5
// import { MongoDBAdapter } from "@auth/mongodb-adapter"
// import clientPromise from "./mongodb"

// export const { handlers, auth, signIn, signOut } = NextAuth({
//   adapter: MongoDBAdapter(clientPromise),
//   providers: [
//   ],
//   // Use JWT for session strategy if you want faster performance, 
//   // or "database" if you want to see active sessions in your DB.
//   session: {
//     strategy: "jwt",
//   },
// })