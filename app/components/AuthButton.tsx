'use client'

import { useSession, signIn, signOut } from 'next-auth/react'
import UKButton from './ukbtn'

export default function AuthButton() {
  const { data: session, status } = useSession()

  if (status === 'loading') {
    return <UKButton disabled>Loading...</UKButton>
  }

  if (session) {
    return (
      <div className="flex items-center gap-4">
        <p>Signed in as {session.user?.name}</p>
        <UKButton onClick={() => signOut()}>Sign Out</UKButton>
      </div>
    )
  }

  return <UKButton onClick={() => signIn('github')}>Sign in with GitHub</UKButton>
}
