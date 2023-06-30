import {
  apiVersion,
  basePath,
  dataset,
  projectId,
  useCdn,
} from 'lib/sanity.api'
import { createClient, type SanityClient } from 'next-sanity'

export function getClient(preview?: { token: string }): SanityClient {
  const client = createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn,
    perspective: 'published',
    studioUrl: basePath,
    logger: console,
    encodeSourceMap: process.env.NEXT_PUBLIC_VERCEL_ENV !== 'production',
    encodeSourceMapAtPath: (props) => {
      if (typeof props.path.at(-1) === 'number') {
        return false
      }
      if (
        props.path.at(-2) === 'marks' &&
        typeof props.path.at(-1) === 'number'
      ) {
        return false
      }
      if (props.path.at(0) === 'duration') {
        return false
      }
      switch (props.path.at(-1)) {
        case 'href':
        case 'listItem':
        case 'site':
          return false
      }
      return props.filterDefault(props)
    },
  })
  if (preview) {
    if (!preview.token) {
      throw new Error('You must provide a token to preview drafts')
    }
    return client.withConfig({
      token: preview.token,
      useCdn: false,
      ignoreBrowserTokenWarning: true,
      perspective: 'previewDrafts',
    })
  }
  return client
}
