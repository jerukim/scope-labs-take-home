'use client'

import * as Dialog from '@radix-ui/react-dialog'
import { Cross2Icon, UploadIcon } from '@radix-ui/react-icons'
import { SubmitButton } from './SubmitButton'
import { EMPTY_FORM_STATE, USER_ID } from '@/lib/constants'
import { useEffect, useState } from 'react'
import { useFormState } from 'react-dom'
import { uploadVideo } from '@/lib/actions'

export function UploadButton() {
  const [formState, dispatch] = useFormState(
    uploadVideo,
    EMPTY_FORM_STATE
  )
  const [open, setOpen] = useState(false)

  function toggleOpen() {
    setOpen((open) => !open)
  }

  useEffect(() => {
    if (formState.status === 'success') toggleOpen()
  }, [formState.status, formState.timestamp])

  return (
    <Dialog.Root open={open} onOpenChange={toggleOpen}>
      <Dialog.Trigger className="flex items-center gap-1">
        <UploadIcon />
        <span>Upload</span>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-[#000000A6] fixed inset-0" />
        <Dialog.Content className="fixed top-1/2 left-1/2 w-[90vw] max-w-[450px] -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-6 shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
          <Dialog.Title className="mb-5 text-lg font-medium">
            Upload Video
          </Dialog.Title>

          <form className="flex flex-col gap-4" action={dispatch}>
            <fieldset className="flex flex-col gap-1">
              <label htmlFor="user_id">User</label>
              <input
                className="h-10 w-full rounded-lg px-3 leading-none border border-gray-300"
                id="user_id"
                name="user_id"
                defaultValue={USER_ID}
                type="text"
                required
              />
              {formState.fieldErrors['user_id'] && (
                <span className="text-red-500 text-sm text-center">
                  {formState.fieldErrors['user_id']?.[0]}
                </span>
              )}
            </fieldset>
            <fieldset className="flex flex-col gap-1">
              <label htmlFor="title">Title</label>
              <input
                className="h-10 w-full rounded-lg px-3 leading-none border border-gray-300"
                id="title"
                name="title"
                placeholder="Intro to Calculus"
                type="text"
                required
              />
              {formState.fieldErrors['title'] && (
                <span className="text-red-500 text-sm text-center">
                  {formState.fieldErrors['title']?.[0]}
                </span>
              )}
            </fieldset>
            <fieldset className="flex flex-col gap-1">
              <label htmlFor="description">Description</label>
              <textarea
                className="w-full rounded-lg px-3 leading-snug border border-gray-300 p-2 h-32"
                id="description"
                name="description"
                placeholder="How to find integrals and more"
                required
              />
              {formState.fieldErrors['description'] && (
                <span className="text-red-500 text-sm text-center">
                  {formState.fieldErrors['description']?.[0]}
                </span>
              )}
            </fieldset>
            <fieldset className="flex flex-col gap-1">
              <label htmlFor="videoFile">Video File</label>
              <input
                className="h-10 w-full"
                id="videoFile"
                name="videoFile"
                type="file"
                accept="video/.mp4"
                required
              />
              {formState.fieldErrors['videoFile'] && (
                <span className="text-red-500 text-sm text-center">
                  {formState.fieldErrors['videoFile']?.[0]}
                </span>
              )}
            </fieldset>

            {formState.status === 'error' && (
              <span className="text-red-500 text-sm text-center">
                {formState.message}
              </span>
            )}

            <div className="flex justify-end">
              <SubmitButton
                className="bg-blue-400 text-white hover:bg-blue-500 focus:shadow-blue-700 h-9 rounded-lg px-4 font-medium leading-none focus:shadow-[0_0_0_2px] focus:outline-none"
                idleLable="Upload"
                pendingLable="Uploading..."
              />
            </div>
          </form>

          <Dialog.Close asChild>
            <button
              className="hover:bg-amber-400 focus:shadow-amber-700 absolute top-3 right-3 size-6 appearance-none flex items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
              aria-label="Close"
            >
              <Cross2Icon />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
