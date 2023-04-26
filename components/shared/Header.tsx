import { vercelStegaSplit } from '@vercel/stega'
import { CustomPortableText } from 'components/shared/CustomPortableText'

interface HeaderProps {
  centered?: boolean
  description?: any[]
  title?: string
}
export function Header(props: HeaderProps) {
  const { title, description, centered = false } = props
  if (!description && !title) {
    return null
  }
  const { cleaned: cleanedTitle, encoded: encodedTitle } = vercelStegaSplit(
    title || ''
  )
  return (
    <div className={`${centered ? 'text-center' : 'w-5/6 lg:w-3/5'}`}>
      {/* Title */}
      {cleanedTitle && (
        <div
          className="text-3xl font-extrabold tracking-tight md:text-5xl"
          data-vercel-edit-target
        >
          {cleanedTitle}
          {encodedTitle && (
            <span style={{ display: 'none' }}>{encodedTitle}</span>
          )}
        </div>
      )}
      {/* Description */}
      {description && (
        <div className="mt-4 font-serif text-xl text-gray-600 md:text-2xl">
          <CustomPortableText value={description} />
        </div>
      )}
    </div>
  )
}
