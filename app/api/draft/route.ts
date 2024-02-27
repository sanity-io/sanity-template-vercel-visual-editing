import { validatePreviewUrl } from '@sanity/preview-url-secret'
import { readToken } from 'lib/sanity.api'
import { getClient } from 'lib/sanity.client'
import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'

const clientWithToken = getClient().withConfig({ token: readToken })

export async function GET(request: Request) {
  const { isValid, redirectTo = '/' } = await validatePreviewUrl(
    clientWithToken,
    request.url,
  )
  if (!isValid) {
    return new Response('Invalid secret', { status: 401 })
  }

  draftMode().enable()

  redirect(redirectTo)
}
