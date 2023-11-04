import { useQuery } from 'lib/sanity.loader'
import { homePageQuery, settingsQuery } from 'lib/sanity.queries'
import type { HomePagePayload, SettingsPayload } from 'types'

import { HomePage, HomePageProps } from './HomePage'

export default function HomePagePreview({
  page: initialData,
  settings: initialSettings,
}: HomePageProps) {
  const {
    data: page,
    loading: pageLoading,
    error: pageError,
  } = useQuery<HomePagePayload | null>(homePageQuery, {}, { initialData })
  const {
    data: settings,
    loading: settingsLoading,
    error: settingsError,
  } = useQuery<typeof initialSettings>(
    settingsQuery,
    {},
    { initialData: initialSettings },
  )

  const error = pageError || settingsError
  if (error) throw error

  const loading = pageLoading || settingsLoading
  if (loading && !page) {
    return <div className="text-center">Loading...</div>
  }

  if (!page) {
    return (
      <div className="text-center">
        Please start editing your Home document to see the preview!
      </div>
    )
  }

  return <HomePage page={page} settings={settings} preview />
}
