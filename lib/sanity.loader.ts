import { createClient } from '@sanity/client/stega'
import { createQueryStore } from '@sanity/react-loader'
import {
  apiVersion,
  basePath,
  dataset,
  projectId,
  useCdn,
} from 'lib/sanity.api'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn,
  perspective: 'published',
  resultSourceMap: 'withKeyArraySelector',
  stega: {
    enabled: process.env.NEXT_PUBLIC_VERCEL_ENV !== 'production',
    studioUrl: basePath,
    logger: console,
    filter: (props) => {
      if (typeof props.sourcePath.at(-1) === 'number') {
        return false
      }
      if (
        props.sourcePath.at(-2) === 'marks' &&
        typeof props.sourcePath.at(-1) === 'number'
      ) {
        return false
      }
      if (props.sourcePath.at(0) === 'duration') {
        return false
      }
      switch (props.sourcePath.at(-1)) {
        case 'href':
        case 'listItem':
        case 'site':
          return false
      }
      return props.filterDefault(props)
    },
  },
})

export const { useQuery, query, useLiveMode } = createQueryStore({
  client,
  studioUrl: '/studio',
})
