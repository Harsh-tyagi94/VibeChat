import { UpstashRedisAdapter } from "@next-auth/upstash-redis-adapter";
import { NextAuthOptions } from "next-auth";
import { db } from "./db";
// import { fetchRedis } from '@/helpers/redis'
import GoogleProvider from "next-auth/providers/google"

function getGoogleCredentials() {
    const clientId = process.env.GOOGLE_CLIENT_ID;
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET;

    if (!clientId || clientId.length === 0) {
        throw new Error("Missing Google client ID");
    }
    if (!clientSecret || clientSecret.length === 0) {
        throw new Error("Missing Google client secret");
    }

    return { clientId, clientSecret };
}

export const authOptions: NextAuthOptions = {
    adapter: UpstashRedisAdapter(db),
    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: "/login"
    },
    providers: [
        GoogleProvider({
            clientId: getGoogleCredentials().clientId,
            clientSecret: getGoogleCredentials().clientSecret,
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async jwt({ token, user }) {
            const dbUserResult = (await db.get(`user:${token.id}`)) as | string | null
            console.log("DEBUG: dbUserResult =", dbUserResult)
            if (!dbUserResult) {
                if (user) {
                    token.id = user!.id
                }
                return token;
            }

            const dbUser = dbUserResult as unknown as User             


            token.id = dbUser.id;
            token.name = dbUser.name;
            token.email = dbUser.email;
            token.picture = dbUser.image;
            return token;
            
        },
        async session({ session, token }) {
            if (token) {
              session.user.id = token.id
              session.user.name = token.name
              session.user.email = token.email
              session.user.image = token.picture
            }
      
            return session
        },
        redirect() {
            return "/dashboard"
        }
    },
    
}