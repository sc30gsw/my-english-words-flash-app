import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { WordViewer } from '~/components/ui/word-viewer'

const REGEX = {
  extractNumberId: /^\d+-\d+/,
  insertLineBreakBeforeSpeaker: /([0-9]+[AB]:)/g,
  removeTrailingMetadata: /","【[^】]+】"?$/g,
  extractSpeaker: /^([0-9]+[AB]):/,
} as const satisfies Record<string, RegExp>

export default async function ConversationCsvFilenamePage({
  params,
}: { params: Promise<Record<'filename', string>> }) {
  const { filename } = await params
  const filePath = path.join(
    process.cwd(),
    'public/csv/conversation',
    `${decodeURIComponent(filename)}.csv`,
  )

  const content = await readFile(filePath, 'utf-8')
  const cleanedContent = content
    .replace(/\r\n/g, '\n')
    .replace(/^\s*\d+,"【[^】]+】\s*/gm, '')

  const words = parseConversationCsv(cleanedContent)
  const formattedWords = words.map((word) => ({
    ...word,
    ja: word.ja
      .replace(REGEX.extractNumberId, '')
      .replace(REGEX.insertLineBreakBeforeSpeaker, '\n$1')
      .replace(REGEX.removeTrailingMetadata, '')
      .trim(),
    en: word.en
      .replace(REGEX.extractNumberId, '')
      .replace(REGEX.insertLineBreakBeforeSpeaker, '\n$1')
      .replace(REGEX.removeTrailingMetadata, '')
      .trim(),
  }))
  console.log('🚀 ~ formattedWords ~ formattedWords:', formattedWords)

  return <WordViewer words={formattedWords} />
}

function parseConversationCsv(content: string) {
  const sections = content
    .split('*******************************************************')
    .map((section) => section.trim())
    .filter(Boolean)

  const words: Record<'id' | 'speaker' | 'ja' | 'en', string>[] = []

  for (let i = 0; i < sections.length; i += 2) {
    const jaSection = sections[i] || ''
    const enSection = sections[i + 1] || ''

    const jaLines = jaSection.split('\n').filter(Boolean)
    const enLines = enSection.split('\n').filter(Boolean)

    const maxLines = Math.max(jaLines.length, enLines.length)

    for (let j = 0; j < maxLines; j++) {
      const jaLine = jaLines[j] || ''
      const enLine = enLines[j] || ''

      const speakerMatch = jaLine.match(REGEX.extractSpeaker)
      const speaker = speakerMatch ? speakerMatch[1] : ''

      words.push({
        id: crypto.randomUUID(),
        speaker,
        ja: jaLine.replace(REGEX.extractSpeaker, '').trim(),
        en: enLine.replace(REGEX.extractSpeaker, '').trim(),
      })
    }
  }

  return words
}
