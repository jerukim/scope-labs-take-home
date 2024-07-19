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
    <main className="w-full flex flex-col gap-5 pb-7">
      <Suspense fallback={<VideoPlayerSkeleton />}>
        <VideoPlayer videoId={params.id} />
      </Suspense>

      <CommentForm videoId={params.id} />

      <Suspense fallback={<CommentsSkeleton />}>
        <Comments videoId={params.id} />
      </Suspense>
    </main>
  )
}
