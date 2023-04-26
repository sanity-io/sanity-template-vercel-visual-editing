export const useCdn = process.env.NEXT_PUBLIC_VERCEL_ENV === 'production'

/**
 * As this file is reused in several other files, try to keep it lean and small.
 * Importing other npm packages here could lead to needlessly increasing the client bundle size, or end up in a server-only function that don't need it.
 */

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET

// see https://www.sanity.io/docs/api-versioning for how versioning works
export const apiVersion =
  // @TODO update the api version to the one with source maps
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2022-11-15'

// The route that hosts the Studio, used for the embedded Studio routing as well as Visual Editing
export const basePath = '/studio'
