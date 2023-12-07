'use client'

import { NextStudio } from 'next-sanity/studio'
import config from 'sanity.config'

export default function Studio() {
  return (
    <NextStudio
      config={config}
      unstable_globalStyles
      // This prop is for demo purposes on the deployment hosted by Sanity, you can safely delete it
      unstable_noAuthBoundary={
        process.env.NEXT_PUBLIC_UNSTABLE_NOAUTHBOUNDARY === 'true'
      }
    />
  )
}
