import { useQuery } from 'lib/sanity.loader'
import { projectBySlugQuery } from 'lib/sanity.queries'
import type { ProjectPayload } from 'types'

import { ProjectPage, ProjectPageProps } from './ProjectPage'

export default function ProjectPreview({
  settings,
  project: initialProject,
  homePageTitle,
}: ProjectPageProps) {
  const {
    data: project,
    error,
    loading,
  } = useQuery<ProjectPayload | null>(
    projectBySlugQuery,
    {
      slug: initialProject.slug,
    },
    { initialData: initialProject },
  )

  if (error) throw error
  if (loading && !project) return <div className="text-center">Loading...</div>

  return (
    <ProjectPage
      project={project ?? initialProject}
      settings={settings}
      homePageTitle={homePageTitle}
      preview
    />
  )
}
