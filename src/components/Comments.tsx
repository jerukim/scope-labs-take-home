import { getVideo, getComments } from '@/lib/api'
import { dateFormatter, range } from '@/lib/utils'
import { Byline } from './Byline'

export async function Comments({ videoId }: { videoId: string }) {
  const [video, comments] = await Promise.all([
    getVideo(videoId),
    getComments(videoId),
  ])

  return (
    <section className="flex flex-col gap-y-4">
      <h2 className="leading-none text-lg font-bold">
        {video.num_comments} Comments
      </h2>

      <ul className="flex flex-col gap-y-5">
        {comments.map((comment) => (
          <li key={comment.id} className="flex flex-col gap-y-1">
            <Byline
              items={[
                comment.user_id,
                dateFormatter.format(new Date(comment.created_at)),
              ]}
            />
            <p className="text-sm">{comment.content}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}

export async function CommentsSkeleton() {
  return (
    <section className="flex flex-col gap-y-4">
      <h2 className="leading-none text-lg font-bold">Comments</h2>

      <ul className="flex flex-col gap-y-5">
        {range(6).map((n) => (
          <li key={n} className="flex flex-col gap-y-1">
            <div className="flex gap-2">
              <span className="bg-gray-200 animate-pulse h-5 w-24" />
              <span className="bg-gray-200 animate-pulse h-5 w-20" />
            </div>
            <p className="bg-gray-200 animate-pulse w-full h-10" />
          </li>
        ))}
      </ul>
    </section>
  )
}
