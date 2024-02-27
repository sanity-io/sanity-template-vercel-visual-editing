import { apiVersion, basePath, dataset, projectId } from 'lib/sanity.api'
import { createClient } from 'next-sanity'

export function getClient(preview?: { token: string }) {
  const client = createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: false,
    perspective: 'published',
    stega: {
      enabled:
        process.env.NEXT_PUBLIC_VERCEL_ENV === 'preview' ||
        typeof preview?.token === 'string',
      studioUrl: basePath,
      logger: console,
      filter: (props) => {
        if (typeof props.sourcePath.at(-1) === 'number') {
          return false
        }
        if (props.sourcePath.at(0) === 'duration') {
          return false
        }
        switch (props.sourcePath.at(-1)) {
          case 'site':
            return false
        }
        return props.filterDefault(props)
      },
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
