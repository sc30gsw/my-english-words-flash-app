'use client'

import { useTheme } from 'next-themes'
import { useState } from 'react'
import type { Selection } from 'react-aria-components'
import { Choicebox } from '~/components/intentui/ui/choicebox'

const THEME_DESCRIPTION = {
  light: '明るい色合いのテーマ。昼間や明るい環境に最適。',
  dark: '暗い色合いのテーマ。目に優しく、夜間利用にぴったり。',
  system: 'デバイス設定に合わせて自動で切り替わるテーマ。',
} as const satisfies Record<string, string>

export function ThemeToggle() {
  const { theme, themes, setTheme } = useTheme()

  const [selectedKeys, setSelectedKeys] = useState<Selection>(
    () => new Set([theme ?? 'light']),
  )

  const handleSelectionChange = (keys: Selection) => {
    setSelectedKeys(keys)

    const selected = Array.from(keys)[0]

    if (typeof selected === 'string') {
      setTheme(selected)
    }
  }

  return (
    <Choicebox
      aria-label="Select Theme"
      selectionMode="single"
      selectedKeys={selectedKeys}
      onSelectionChange={handleSelectionChange}
      columns={3}
      items={themes.map((theme) => ({ key: theme, name: theme }))}
    >
      {(item) => (
        <Choicebox.Item
          {...item}
          key={item.key}
          title={item.name}
          description={
            THEME_DESCRIPTION[
              (item.name ?? 'system') as keyof typeof THEME_DESCRIPTION
            ]
          }
        />
      )}
    </Choicebox>
  )
}
