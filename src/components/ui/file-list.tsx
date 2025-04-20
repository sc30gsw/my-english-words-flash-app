import { readdirSync } from 'node:fs'
import Link from 'next/link'
import {
  CONVERSATION_FILE_NAMES,
  SIMPLE_FILE_NAMES,
  SYNTAX_FILE_NAMES,
} from '~/constants'

const FILE_NAMES = {
  simple: SIMPLE_FILE_NAMES,
  syntax: SYNTAX_FILE_NAMES,
  conversation: CONVERSATION_FILE_NAMES,
} as const satisfies Record<
  'simple' | 'syntax' | 'conversation',
  readonly string[]
>

type FileListProps = {
  type?: 'simple' | 'syntax' | 'conversation'
}

export function FileList({ type = 'simple' }: FileListProps) {
  const targetDir = `public/csv/${type}`
  const fileNames = readdirSync(targetDir)

  const sortedFiles = FILE_NAMES[type].filter((fileName) =>
    fileNames.includes(fileName),
  )

  return (
    <ul className="flex flex-col items-center justify-center space-y-4">
      {sortedFiles.map((fileName) => (
        <li key={fileName}>
          <Link
            href={`/csv/${type}/${fileName.replace('.csv', '')}`}
            className="text-blue-500 hover:underline"
          >
            {fileName.replace('.csv', '')}
          </Link>
        </li>
      ))}
    </ul>
  )
}
