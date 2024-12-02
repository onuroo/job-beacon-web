'use client'

import PrelineScript from "./preline-script"

export default function ClientScripts() {
  return (
    <>
      <PrelineScript />
      <script async src="https://unpkg.com/@popperjs/core@2/dist/umd/popper.js"></script>
    </>
  )
}