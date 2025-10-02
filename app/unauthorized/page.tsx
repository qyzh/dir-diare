'use client'
import Link from 'next/link'

export default function UnauthorizedPage() {
  return (
    <div className="container mx-auto px-4 py-8 text-center">
      <h1 className="text-4xl font-bold mb-4">Unauthorized</h1>
      <p className="text-xl mb-8">You are not authorized to view this page.</p>
      <Link href="/" className="text-blue-500 hover:underline">
        Go back home
      </Link>
    </div>
  )
}
