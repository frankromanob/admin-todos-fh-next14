import prisma from "@/lib/prisma"
import { PrismaAdapter } from "@auth/prisma-adapter"
import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"

export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [Google, GitHub],
    session: { strategy: 'jwt' },
    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
            return true
        },

        async jwt({ token, user, account, profile }) {

            const dbUser = await prisma.user.findUnique({ where: { email: token.email ?? '' } })
            token.roles = dbUser.roles ?? ['None']
            token.id = dbUser.id ?? ['No ID']
            //console.log('El token: ' + JSON.stringify(token))
            return token
        },

        async session(session, token, user) {
            if (session && session.user) {

                session.user.image = token.image ?? 'noimage'
                session.roles = token.roles
                session.picture = token.picture
                session.id = token.id
                //console.log('La sesion : ' + JSON.stringify(session))

                //session.user.roles=token.roles
            }
            return session
        },


    }
})