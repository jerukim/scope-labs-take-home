import { getVideo, getComments } from '@/lib/api'
import { dateFormatter, range } from '@/lib/utils'

export async function Comments({ videoId }: { videoId: string }) {
  const [video, comments] = await Promise.all([
    getVideo(videoId),
    getComments(videoId),
  ])

  return (
    <section className="flex flex-col gap-y-2 px-3">
      <div className="flex gap-3 items-center">
        <h2 className="leading-none text-lg font-bold">Comments</h2>
        <span className="leading-none text-sm text-gray-500">
          {video.num_comments}
        </span>
      </div>

      <ul className="flex flex-col gap-y-3">
        {comments.map((comment) => (
          <li key={comment.id} className="flex flex-col gap-y-1">
            <div className="flex justify-between text-gray-500 text-sm">
              <span>@{comment.user_id}</span>
              <span>
                {dateFormatter.format(new Date(comment.created_at))}
              </span>
            </div>
            <p className="text-sm">{comment.content}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}

export async function CommentsSkeleton() {
  return (
    <section className="flex flex-col gap-y-2 px-3">
      <div className="flex gap-3 items-center">
        <h2 className="leading-none text-lg font-bold">Comments</h2>
        <div className="h-[14px] text-gray-500" />
      </div>

      <ul className="flex flex-col gap-y-3">
        {range(6).map((n) => (
          <li key={n} className="flex flex-col gap-y-1">
            <div className="flex justify-between">
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
