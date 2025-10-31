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
  },
}
