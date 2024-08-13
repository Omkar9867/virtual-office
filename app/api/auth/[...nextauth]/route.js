import nextAuth from "next-auth";
import Providers from "next-auth";
import connectToDatabase from "../../../../lib/mongodb";
import User from "../../../../models/User";
import { compare } from "bcryptjs";

export default NextAuth({
  providers: [
    Providers.Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        await connectToDatabase();

        const user = await User.findOne({ email: credentials.email });
        if (!user) {
          throw new Error("No user found with this email");
        }

        const isValid = await compare(credentials.password, user.password);
        if (!isValid) {
          throw new Error("Invalid password");
        }

        return user;
      },
    }),
  ],
  database: process.env.MONGODB_URI,
  session: {
    jwt: true,
  },
  callbacks: {
    //First callback for jwt with token and user
    async jwt(token, user) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    //Second callback for session with token and session
    async session(session, token) {
      session.user.id = token.id;
      return session;
    },
  },
});
