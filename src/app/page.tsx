import Link from 'next/link'
import { Heading } from '~/components/intentui/ui/heading'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center gap-y-4 p-24">
      <Heading level={1}>Let's train flash English!</Heading>
      <p className="text-lg">Select a training method:</p>
      <div className="flex flex-col items-center justify-center space-y-4">
        <Link href="/csv/simple" className="text-blue-500 hover:underline">
          シンプル形式（幅広い難易度）
        </Link>

        <Link
          href="/csv/conversation"
          className="text-blue-500 hover:underline"
        >
          会話形式（中級）
        </Link>
      </div>
    </main>
  )
}
