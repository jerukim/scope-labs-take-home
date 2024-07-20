import { Suspense } from 'react'
import { VideoArticleSkeleton } from '@/components/VideoArticle'
import { VideoFeed } from '@/components/VideoFeed'
import { range } from '@/lib/utils'

export default async function Home() {
  return (
    <main
      className="grid grid-cols-1 auto-rows-fr md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-6"
      role="feed"
    >
      <Suspense
        fallback={range(9).map((n) => (
          <VideoArticleSkeleton key={n} />
        ))}
      >
        <VideoFeed />
      </Suspense>
    </main>
  )
}
