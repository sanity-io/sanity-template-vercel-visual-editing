import { useQuery } from 'lib/sanity.loader'
import { pagesBySlugQuery } from 'lib/sanity.queries'
import type { PagePayload } from 'types'

import { Page, PageProps } from './Page'

export default function PagePreview({
  page: initialPage,
  settings,
  homePageTitle,
}: PageProps) {
  const {
    data: page,
    error,
    loading,
  } = useQuery<PagePayload | null>(
    pagesBySlugQuery,
    {
      slug: initialPage.slug,
    },
    { initialData: initialPage },
  )

  if (error) throw error
  if (loading && !page) return <div className="text-center">Loading...</div>

  return (
    <Page
      page={page ?? initialPage}
      settings={settings}
      homePageTitle={homePageTitle}
      preview
    />
  )
}
