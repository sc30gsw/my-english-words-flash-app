import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { WordViewer } from '~/components/ui/word-viewer'

const REGEX = {
  extractEnglish: /(\d+-\d+)/,
  isNumberId: /^\d+-\d+$/,
  isSectionId: /^\d+-[A-Z]$/,
} as const satisfies Record<string, RegExp>

export default async function SimpleCsvFilenamePage({
  params,
}: { params: Promise<Record<'filename', string>> }) {
  const { filename } = await params
  const filePath = path.join(
    process.cwd(),
    'public/csv/simple',
    `${decodeURIComponent(filename)}.csv`,
  )

  const content = await readFile(filePath, 'utf-8')
  const words = parseSimpleCsv(content)

  return <WordViewer words={words} />
}

function parseSimpleCsv(content: string) {
  const cleanedLines = content
    .replace(/\r\n/g, '') // 改行消す
    .split(',') // カンマで分割
    .flatMap((item) => {
      const match = item.match(REGEX.extractEnglish)
      if (match) {
        const [_, num] = match
        const text = item.replace(num, '').trim()

        return [text, num]
      }
      return [item.trim()]
    })
    .filter((item) => item !== '')

  const words: Record<'id' | 'ja' | 'en', string>[] = []

  for (let i = 0; i < cleanedLines.length; i++) {
    const ja = cleanedLines[i]

    if (REGEX.isNumberId.test(ja) || REGEX.isSectionId.test(ja)) {
      continue
    }

    const en = cleanedLines[i + 1]

    if (en && !REGEX.isNumberId.test(en) && !REGEX.isSectionId.test(en)) {
      words.push({ id: crypto.randomUUID(), ja, en })
      i++ // 英語も消費するのでiを1増やす
    }
  }

  return words
}
