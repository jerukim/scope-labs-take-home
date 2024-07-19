'use client'

import { useFormState } from 'react-dom'
import { addComment } from '@/lib/actions'
import { EMPTY_FORM_STATE } from '@/lib/form'
import { SubmitButton } from './SubmitButton'

export function CommentForm({ videoId }: { videoId: string }) {
  const [formState, dispatch] = useFormState(
    addComment.bind(null, { videoId, userId: 'john_smith' }),
    EMPTY_FORM_STATE
  )

  return (
    <form className="px-3 flex flex-col gap-2" action={dispatch}>
      <div className="flex gap-2">
        <textarea
          key={formState.timestamp}
          className="border rounded-lg border-gray-200 w-full p-2 text-sm"
          id="comment"
          name="comment"
          placeholder="Add a comment..."
          required
          minLength={1}
          maxLength={500}
        />

        <SubmitButton
          className="bg-blue-400 rounded-lg px-3 text-white"
          idleLable="Comment"
          pendingLable="Commenting..."
        />
      </div>

      {formState.status === 'error' && (
        <span className="text-red-500 text-sm text-center">
          {formState.message}.{formState?.fieldErrors['comment']?.[0]}
        </span>
      )}
    </form>
  )
}