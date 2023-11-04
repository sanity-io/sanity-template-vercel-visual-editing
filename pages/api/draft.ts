import type { NextApiRequest, NextApiResponse } from 'next'

export default async function preview(
  _req: NextApiRequest,
  res: NextApiResponse<string | void>,
) {
  // Enable Draft Mode by setting the cookies
  res.setDraftMode({ enable: true })
  res.writeHead(307, { Location: '/' })
  res.end()
}
