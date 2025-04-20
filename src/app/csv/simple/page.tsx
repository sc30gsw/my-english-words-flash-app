import Link from 'next/link'
import { Heading } from '~/components/intentui/ui/heading'
import { FileList } from '~/components/ui/file-list'

export default function SimpleCsvPage() {
  return (
    <main className="flex flex-col items-center gap-y-4 p-24">
      <Heading level={1}>Choose a material you want to learn!</Heading>
      <FileList />

      <Link href={'/'} className="text-blue-500 hover:underline font-bold">
        Back to Home
      </Link>
    </main>
  )
}
