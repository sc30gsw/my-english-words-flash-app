'use client'

import { parseAsIndex, useQueryState } from 'nuqs'
import { useToggle } from 'react-use'
import { Button } from '~/components/intentui/ui/button'
import { ProgressBar } from '~/components/intentui/ui/progress-bar'
import { cn } from '~/utils/classes'

export function WordViewer({
  words,
}: { words: Record<'id' | 'ja' | 'en', string>[] }) {
  const [index, setIndex] = useQueryState(
    'index',
    parseAsIndex.withDefault(0).withOptions({
      shallow: false,
      history: 'push',
    }),
  )

  const [showEnglish, toggle] = useToggle(false)

  const current = words[index]
  const progress = Math.round(((index + 1) / words.length) * 100)

  if (!current) {
    return (
      <div className="flex flex-col items-center justify-center space-y-4 mt-10">
        <ProgressBar
          label={`${index + 1} / ${words.length}`}
          value={progress}
        />
        <p className="text-2xl font-bold">🎉 完了しました！</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center space-y-6 mt-10 px-4">
      <ProgressBar label={`${index + 1} / ${words.length}`} value={progress} />

      {/* 日本語表示 */}
      <div className="flex flex-col justify-center items-center gap-y-2">
        <p className="text-2xl font-bold whitespace-pre-line">{current.ja}</p>

        {showEnglish ? (
          <>
            <p className="text-xl text-red-500 font-bold group-hover/en:cursor-pointer whitespace-pre-line">
              {current.en}
            </p>
            <button
              type="button"
              className="flex flex-col items-center gap-y-2 group/en"
              onClick={() => toggle(false)}
            >
              <div className="px-4 py-2 bg-transparent border border-green-500 text-green-500 rounded transition group-hover/en:cursor-pointer group-hover/en:opacity-80 w-36">
                非表示にする
              </div>
            </button>
          </>
        ) : (
          <Button
            onPress={() => toggle(true)}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition cursor-pointer w-36"
          >
            英語を表示
          </Button>
        )}
      </div>

      {/* 次へボタン */}
      <Button
        onPress={() => {
          toggle(false)
          setIndex(index + 1)
        }}
        className={cn(index === words.length + 1 && 'hidden')}
      >
        次へ
      </Button>
      {/* 戻るボタン */}
      <Button
        intent="secondary"
        onPress={() => {
          toggle(false)
          setIndex(index - 1)
        }}
        className={cn(index === 0 && 'hidden')}
      >
        戻る
      </Button>
    </div>
  )
}
