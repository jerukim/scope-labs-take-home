'use client'

import * as Dialog from '@radix-ui/react-dialog'
import { Cross2Icon, UploadIcon } from '@radix-ui/react-icons'
import { SubmitButton } from './SubmitButton'
import { USER_ID } from '@/lib/constants'

export function UploadButton() {
  return (
    <Dialog.Root>
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

          <form className="flex flex-col gap-4">
            <fieldset className="flex flex-col gap-1">
              <label className="" htmlFor="user_id">
                User
              </label>
              <input
                className="focus:shadow-amber-800 h-10 w-full items-center justify-center rounded-lg px-3 leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
                id="user_id"
                name="user_id"
                defaultValue={USER_ID}
                type="text"
                required
              />
            </fieldset>
            <fieldset className="flex flex-col gap-1">
              <label className="" htmlFor="title">
                Title
              </label>
              <input
                className="focus:shadow-amber-800 h-10 w-full items-center justify-center rounded-lg px-3 leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
                id="title"
                name="title"
                placeholder="Intro to Calculus"
                type="text"
                required
              />
            </fieldset>
            <fieldset className="flex flex-col gap-1">
              <label className="" htmlFor="video_url">
                URL
              </label>
              <input
                className="focus:shadow-amber-800 h-10 w-full items-center justify-center rounded-lg px-3 leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
                id="video_url"
                name="video_url"
                placeholder="youtube.com"
                type="text"
                required
              />
            </fieldset>
            <fieldset className="flex flex-col gap-1">
              <label className="" htmlFor="description">
                Description
              </label>
              <textarea
                className="focus:shadow-amber-800 w-full items-center justify-center rounded-lg px-3 leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px] p-2 h-16"
                id="description"
                name="description"
                placeholder="How to find integral..."
                required
              />
            </fieldset>
            <div className="flex justify-end">
              <SubmitButton
                className="bg-blue-400 text-white hover:bg-blue-500 focus:shadow-blue-700 inline-flex h-9 items-center justify-center rounded-lg px-4 font-medium leading-none focus:shadow-[0_0_0_2px] focus:outline-none"
                idleLable="Upload"
                pendingLable="Uploading..."
              />
            </div>
          </form>

          <Dialog.Close asChild>
            <button
              className="hover:bg-amber-400 focus:shadow-amber-700 absolute top-3 right-3 inline-flex size-6 appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
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
