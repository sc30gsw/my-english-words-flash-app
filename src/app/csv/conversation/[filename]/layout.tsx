import Link from 'next/link'
import type { ReactNode } from 'react'

export default async function ConversationCsvFilenameLayout({
  params,
  children,
}: { children: ReactNode; params: Promise<Record<'filename', string>> }) {
  const { filename } = await params

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-4xl font-bold ">
        Welcome to {decodeURIComponent(filename)}
      </h1>
      <main>{children}</main>
      <Link href="/csv/conversation" className="text-blue-500 hover:underline">
        Back to file list
      </Link>
    </div>
  )
}
