## Getting Started

### Prerequisites
1. [homebrew](https://docs.brew.sh/Installation)
2. [pnpm](https://pnpm.io/) `npm install -g pnpm` or `brew install pnpm`
3. [ffmpeg](https://ffmpeg.org/)
4. `.env.local` file with the following environment variables:
    - AWS_ACCESS_KEY_ID
    - AWS_SECRET_ACCESS_KEY
    - AWS_BUCKET_NAME
    - AWS_BUCKET_REGION

*ffmpeg is used to generate a thumbnail from the uploaded video file


### Build and Run Project
Assuming you have homebrew and pnpm installed, you can simply run:
`make up && make start`

This will install ffmpeg and node modules, create an optimized production build and run the production build on [http://localhost:3000](http://localhost:3000).

Alternatively you can do each step manually:
1. `brew install ffmpeg` (this step may take a while depending on the last time `brew upgrade` was run)
2. `pnpm install`
3. `pnpm build`
4. `pnpm start`



## Project Overview
This assignment was completed using Reacts latest features: React Server Componets (RSC) and Server Actions (SA). You will find RSC's are nested inside of Suspense boundries to provide a loading skeleton and pending states. This can be tested out by either throttling network with Chrome Dev Tools Network tab or importing the `sleep` utility function in `src/lib/utils.ts` into the API controllers.

With RSC's and SA's, we no longer have to manage state on the client side that can be handled by the server.

### Main Features
1. Header `src/components/Header`
    1. Placed in root layout to prevent rerenders when navigating between pages
    2. Contains file upload button that opens up a form dialog
        1. Uses SA's to keep secrets, AWS SDK and validation dependencies on the server
        2. Generates a video thumbnail with ffmpeg and uploads S3 in parallel with video
2. [Home Page](http://localhost:3000)
    1. This is where the VideoFeed for the static user `jeru_kim2` is shown.
    2. The VideoFeed contains VideoArticle's that link to the video's page.
3. [Video Page](http://localhost:3000/video/JDDYqulUxEuvdVJ6nFeo)
    1. The video page fetches the video and comments in parallel with loading skeletons to improve user experience and load speeds.
    2. The VideoPlayer uses HTML5's video element to enable fullscreen mode and playback speed controls.
        1. Fullscreen API could be utilized here to provide a OS level fullscreen experience instead of being bound to the browser window.
    3. The CommentForm utilizes SA's to
        1. Provide pending state with `useFormStatus` in `SubmitButton`
        2. Keeping validation dependencies on the server to reduce client bundle size
        3. Keep client data up to date with Next's revalidation tags. (`src/lib/(actions,api,constants).ts`)
    5. Comments are fetched and rendered on server



## Screenshots
![home page video feed demo](./screenshots/home.gif?raw=true "Home")
![upload demo](./screenshots/upload.gif?raw=true "Upload")
![video player and comment demo](./screenshots/comment.gif?raw=true "Video and Comment")