import NextAuth from "next-auth";
import { FirestoreAdapter } from "@auth/firebase-adapter";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { cert } from "firebase-admin/app";
import { NextAuthOptions } from "next-auth";
import { auth } from "@/app/firebase";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import EmailProvider from "next-auth/providers/email";
import admin from "firebase-admin";
import { adminAuth } from "@/firebase-admin";
import { ROUTES } from "@/routes";

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: ROUTES.signin,
    verifyRequest: ROUTES.verifyRequest,
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
        tls: {
          rejectUnauthorized: false,
        },
      },
      from: process.env.EMAIL_FROM,
      // maxAge: 24 * 60 * 60, // How long email links are valid for (default 24h)
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {},
      async authorize(credentials): Promise<any> {
        // await adminAuth
        //   .getUserByEmail((credentials as any).email)
        //   .then((data) => {
        //     (credentials as any).id = data.uid;
        //   });
        // .catch((error) => console.log(error))
        // .catch((error) => {
        //   console.log(error);
        // });

        return await signInWithEmailAndPassword(
          auth,
          (credentials as any).email || "",
          (credentials as any).password || ""
        )
          .then((userCredential) => {
            if (userCredential.user) {
              (userCredential.user as any).id = userCredential.user.uid;
              return userCredential.user;
            }
            return null;
          })
          .catch((error) => console.log(error))
          .catch((error) => {
            console.log(error);
          });

        // return credentials;
      },
    }),
  ],
  callbacks: {
    session: async ({ session, token }) => {
      if (session?.user) {
        if (token.sub) {
          session.user.id = token.sub;
          const firebaseToken = await adminAuth.createCustomToken(token.sub);
          session.firebaseToken = firebaseToken;
          if (session?.user?.image?.includes("google")) {
            adminAuth.updateUser(token.sub, { email: session.user.email });
            adminAuth.updateUser(token.sub, { emailVerified: true });
          }
        }
      }
      return session;
    },
    jwt: async ({ user, token }) => {
      if (user) {
        token.sub = user.id;
        token.email = user.email;
      }
      return token;
    },
  },
  session: {
    strategy: "jwt",
  },
  adapter: FirestoreAdapter({
    credential: cert({
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    }),
  }),
};

// export default NextAuth(authOptions);

export const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
