import { Card, Text } from '@sanity/ui'
import { resolveHref } from 'lib/sanity.links'
import { ComponentProps, Suspense } from 'react'
import { memo } from 'react'
import { useClient } from 'sanity'
import { UserViewComponent } from 'sanity/desk'
import { suspend } from 'suspend-react'

/**
 * This component is responsible for rendering a preview of a post inside the Studio.
 */

export type PreviewProps = ComponentProps<UserViewComponent>
interface IframeProps {
  apiVersion: string
  documentType?: string

  slug?: string
}

export function PreviewPane(
  props: PreviewProps & {
    apiVersion: string
  }
) {
  const { document, apiVersion } = props
  const { displayed } = document
  const documentType = displayed?._type
  let slug = (displayed?.slug as any)?.current

  const href = resolveHref(documentType, displayed?.slug as string)

  if (!href) {
    return (
      <Card tone="primary" margin={5} padding={6}>
        <Text align="center">
          Please add a slug to the post to see the preview!
        </Text>
      </Card>
    )
  }

  return (
    <Card
      scheme="light"
      style={{ width: '100%', height: '100%', position: 'relative' }}
    >
      <Suspense fallback={null}>
        <Iframe
          apiVersion={apiVersion}
          documentType={documentType}
          slug={slug}
        />
      </Suspense>
    </Card>
  )
}

const Iframe = memo(function Iframe(props: IframeProps) {
  const { apiVersion, documentType, slug } = props
  const client = useClient({ apiVersion })

  const url = new URL('/api/preview', location.origin)
  if (documentType) {
    url.searchParams.set('documentType', documentType)
  }
  if (slug) {
    url.searchParams.set('slug', slug)
  }

  return (
    <iframe
      style={{ width: '100%', height: '100%', position: 'relative', zIndex: 1 }}
      src={url.toString()}
    />
  )
})
