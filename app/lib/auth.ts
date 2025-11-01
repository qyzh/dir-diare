import type { NextAuthOptions } from 'next-auth'
import GithubProvider from 'next-auth/providers/github'
import { AUTHORIZED_USER } from './constants'

export const authOptions: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID ?? '',
      clientSecret: process.env.GITHUB_SECRET ?? '',
    }),
  ],
  callbacks: {
    async signIn({ user, profile }) {
      // @ts-ignore
      if (profile?.login === AUTHORIZED_USER) {
        return true
      } else {
        return '/unauthorized'
      }
    },
    async session({ session, token }) {
      // Add the GitHub login (username) to the session
      if (session?.user) {
        session.user.name = token.login as string
      }
      return session
    },
    async jwt({ token, profile }) {
      // Store the GitHub login in the token
      if (profile) {
        // @ts-ignore
        token.login = profile.login
      }
      return token
    },
  },
}
