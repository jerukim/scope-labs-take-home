import { Suspense } from 'react'
import { VideoArticleSkeleton } from '@/components/VideoArticle'
import { VideoFeed } from '@/components/VideoFeed'
import { range } from '@/lib/utils'

export default async function Home() {
  return (
    <section
      className="grid grid-cols-[repeat(auto-fill,minmax(310px,1fr))] auto-rows-fr gap-x-4 gap-y-6"
      role="feed"
    >
      <Suspense
        fallback={range(9).map((n) => (
          <VideoArticleSkeleton key={n} />
        ))}
      >
        <VideoFeed />
      </Suspense>
    </section>
  )
}
