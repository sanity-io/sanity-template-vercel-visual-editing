import {
  apiVersion,
  basePath,
  dataset,
  projectId,
  useCdn,
} from 'lib/sanity.api'
import {
  homePageQuery,
  homePageTitleQuery,
  pagePaths,
  pagesBySlugQuery,
  projectBySlugQuery,
  projectPaths,
  settingsQuery,
} from 'lib/sanity.queries'
import { createClient } from 'next-sanity'
import type {
  HomePagePayload,
  PagePayload,
  ProjectPayload,
  SettingsPayload,
} from 'types'

/**
 * Checks if it's safe to create a client instance, as `@sanity/client` will throw an error if `projectId` is false
 */
const sanityClient = (token?: string) => {
  return projectId
    ? createClient({
        projectId,
        dataset,
        apiVersion,
        useCdn,
        token,
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
    : null
}

export async function getHomePage({
  token,
}: {
  token?: string
}): Promise<HomePagePayload | undefined> {
  return await sanityClient(token)?.fetch(homePageQuery)
}

export async function getHomePageTitle({
  token,
}: {
  token?: string
}): Promise<string | undefined> {
  return await sanityClient(token)?.fetch(homePageTitleQuery)
}

export async function getPageBySlug({
  slug,
  token,
}: {
  slug: string
  token?: string
}): Promise<PagePayload | undefined> {
  return await sanityClient(token)?.fetch(pagesBySlugQuery, { slug })
}

export async function getProjectBySlug({
  slug,
  token,
}: {
  slug: string
  token?: string
}): Promise<ProjectPayload | undefined> {
  return await sanityClient(token)?.fetch(projectBySlugQuery, { slug })
}

export async function getSettings({
  token,
}: {
  token?: string
}): Promise<SettingsPayload | undefined> {
  return await sanityClient(token)?.fetch(settingsQuery)
}

export async function getProjectPaths(): Promise<string[]> {
  return await sanityClient()?.fetch(projectPaths)
}

export async function getPagePaths(): Promise<string[]> {
  return await sanityClient()?.fetch(pagePaths)
}
