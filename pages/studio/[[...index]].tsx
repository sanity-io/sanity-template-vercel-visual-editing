import Head from 'next/head'
import { NextStudio } from 'next-sanity/studio'
import { metadata } from 'next-sanity/studio/metadata'
import config from 'sanity.config'

export default function StudioPage() {
  return (
    <>
      <Head>
        {Object.entries(metadata).map(([key, value]) => (
          <meta key={key} name={key} content={value} />
        ))}
      </Head>
      <NextStudio
        config={config}
        unstable_globalStyles
        // This prop is for demo purposes on the deployment hosted by Sanity, you can safely delete it
        unstable_noAuthBoundary={
          process.env.NEXT_PUBLIC_UNSTABLE_NOAUTHBOUNDARY === 'true'
        }
      />
    </>
  )
}
