"use client"
import { useState } from 'react'
import Button from './ukbtn'
import { Link } from 'lucide-react'
export default function CopyUrlButton({ url }: { url: string }) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy: ', err)
    }
  }
  return (
    <Button
      variant='primary'
      size='sm'
      onClick={copyToClipboard}
      className="ml-2 px-2 py-1 "
    >
      <Link className="w-4 h-4" />
      {copied && <span className='text-xs pl-0.5'>Copied!</span>}
    </Button>
  )
}
