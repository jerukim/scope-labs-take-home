'use client'

import { useFormStatus } from 'react-dom'
import clsx from 'clsx'

export function SubmitButton({
  className,
  idleLable,
  pendingLable,
}: {
  className?: string
  idleLable: string
  pendingLable: string
}) {
  const formStatus = useFormStatus()

  return (
    <button
      className={clsx(
        className,
        formStatus.pending && 'animate-pulse'
      )}
      type="submit"
      disabled={formStatus.pending}
    >
      {formStatus.pending ? pendingLable : idleLable}
    </button>
  )
}
