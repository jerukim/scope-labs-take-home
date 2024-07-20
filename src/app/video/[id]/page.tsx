import { CommentForm } from '@/components/CommentForm'
import { Comments, CommentsSkeleton } from '@/components/Comments'
import {
  VideoPlayer,
  VideoPlayerSkeleton,
} from '@/components/VideoPlayer'
import { Suspense } from 'react'

export default async function VideoPage({
  params,
}: {
  params: { id: string }
}) {
  return (
    <section className="w-full flex flex-col gap-5 pb-7">
      <Suspense fallback={<VideoPlayerSkeleton />}>
        <VideoPlayer videoId={params.id} />
      </Suspense>

      <section className="flex flex-col self-center w-full max-w-screen-xl gap-4 px-3">
        <CommentForm videoId={params.id} />

        <Suspense fallback={<CommentsSkeleton />}>
          <Comments videoId={params.id} />
        </Suspense>
      </section>
    </section>
  )
}
