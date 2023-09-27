// As Vercel Visual Editing is only enabled for Vercel users that are part of the team that owns the project,
// we load the Sanity version on the special preview deployment instead.
// This gives a demo of what the general user experience is like, but note it has some key differences.
// The most important difference is Vercel's version is toggled on/off in the Vercel toolbar.
// Whereas the Sanity version is always on when our special env var is set.
// TL;DR you don't need this file, it's only here as graceful fallback on the live demo deployment.

import { enableVisualEditing } from '@sanity/overlays'
import { useEffect } from 'react'

export default function SanityVisualEditing() {
  useEffect(enableVisualEditing, [])
  return null
}
