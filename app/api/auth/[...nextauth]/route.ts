import NextAuth from 'next-auth'
import GithubProvider from 'next-auth/providers/github'

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID ?? '',
      clientSecret: process.env.GITHUB_SECRET ?? '',
    }),
  ],
  callbacks: {
    async signIn({ user, profile }) {
      // @ts-ignore
      if (profile?.login === 'uki') {
        return true
      } else {
        return '/unauthorized'
      }
    },
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
