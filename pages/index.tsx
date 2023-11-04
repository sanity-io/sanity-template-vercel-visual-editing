import { HomePage } from 'components/pages/home/HomePage'
import HomePagePreview from 'components/pages/home/HomePagePreview'
import { query } from 'lib/sanity.loader'
import { homePageQuery, settingsQuery } from 'lib/sanity.queries'
import { GetStaticProps } from 'next'
import { HomePagePayload, SettingsPayload } from 'types'

import type { SharedPageProps } from './_app'

interface PageProps extends SharedPageProps {
  page: HomePagePayload
  settings: SettingsPayload
}

interface Query {
  [key: string]: string
}

export default function IndexPage(props: PageProps) {
  const { page, settings, draftMode } = props

  if (draftMode) {
    return <HomePagePreview page={page} settings={settings} />
  }

  return <HomePage page={page} settings={settings} />
}

const fallbackPage: HomePagePayload = {
  title: '',
  overview: [],
  showcaseProjects: [],
}

export const getStaticProps: GetStaticProps<PageProps, Query> = async (ctx) => {
  const { draftMode = false } = ctx

  const [settings, page] = await Promise.all([
    query<SettingsPayload | null>(settingsQuery),
    query<HomePagePayload | null>(homePageQuery),
  ])

  return {
    props: {
      page: page?.data ?? fallbackPage,
      settings: settings?.data ?? {},
      draftMode,
    } satisfies PageProps,
  }
}
