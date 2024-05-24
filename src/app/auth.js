import prisma from "@/lib/prisma"
import { PrismaAdapter } from "@auth/prisma-adapter"
import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials";
import { signInEmailPassword } from "@/auth/actions/auth-actions"

// interface Credenciales {
//     email: string;
//     password: string;
// }
// interface User {
//     name: string;
//     image: string;
//     email: string;
//     id: string;
// }

// interface UserSession {
//     user: User;
//     image: string;
//     roles: string[];
//     picture: string;
//     id: string
// }

// interface UserToken {
//     image: string;
//     roles: string[];
//     picture: string;
//     id: string
// }



export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [
        Google,
        GitHub,
        Credentials({
            credentials: {
                email: { label: "Email", type: "email", placeholder: "correo" },
                password: { label: "Password", type: "password", placeholder: "****" },
            },
            authorize: async (credentials) => {
                const user = await signInEmailPassword(credentials.email, credentials.password)

                if (user) {
                    console.log({ user })
                    return user
                }
                return null
            },
        }),
    ],
    session: { strategy: 'jwt' },
    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
            return true
        },

        async jwt({ token, user, account, profile }) {

            const dbUser = await prisma.user.findUnique({ where: { email: token.email ?? '' } })
            if (dbUser) {
                token.roles = dbUser.roles ?? ['None']
                token.id = dbUser.id ?? ['No ID']
                //console.log('El token: ' + JSON.stringify(token))
                return token
            }
            return null
        },

        session: async (session, token, user) => {
            if (session && session.user) {

                session.user.image = token.image ?? 'noimage'
                session.roles = token.roles ?? ['']
                session.picture = token.picture ?? ''
                session.id = token.id
                //console.log('La sesion : ' + JSON.stringify(session))

                //session.user.roles=token.roles
            }
            return session
        },


    }
})