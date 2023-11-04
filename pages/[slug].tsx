import { Page } from 'components/pages/page/Page'
import PagePreview from 'components/pages/page/PagePreview'
import { resolveHref } from 'lib/sanity.links'
import { client, query } from 'lib/sanity.loader'
import {
  homePageTitleQuery,
  pagePaths,
  pagesBySlugQuery,
  settingsQuery,
} from 'lib/sanity.queries'
import type { GetStaticProps } from 'next'
import { PagePayload, SettingsPayload } from 'types'

import type { SharedPageProps } from './_app'

interface PageProps extends SharedPageProps {
  page?: PagePayload
  settings?: SettingsPayload
  homePageTitle?: string
}

interface Query {
  [key: string]: string
}

export default function ProjectSlugRoute(props: PageProps) {
  const { homePageTitle, settings, page, draftMode } = props

  if (draftMode) {
    return (
      <PagePreview
        page={page}
        settings={settings}
        homePageTitle={homePageTitle}
      />
    )
  }

  return <Page homePageTitle={homePageTitle} page={page} settings={settings} />
}

export const getStaticProps: GetStaticProps<PageProps, Query> = async (ctx) => {
  const { draftMode = false, params = {} } = ctx

  const [settings, page, homePageTitle] = await Promise.all([
    query<SettingsPayload | null>(settingsQuery),
    query<PagePayload | null>(pagesBySlugQuery, {
      slug: params.slug,
    }),
    query<string | null>(homePageTitleQuery),
  ])

  if (!page) {
    return {
      notFound: true,
      revalidate: 1, // nonexistant slug might be created later
    }
  }

  return {
    props: {
      page: page.data,
      settings: settings?.data ?? {},
      homePageTitle: homePageTitle?.data ?? undefined,
      draftMode,
    } satisfies PageProps,
    revalidate: 10,
  }
}

export const getStaticPaths = async () => {
  const paths = await client.fetch<string[]>(pagePaths)

  return {
    paths: paths?.map((slug) => resolveHref('page', slug)) || [],
    fallback: true, // check if slug created since last build
  }
}
