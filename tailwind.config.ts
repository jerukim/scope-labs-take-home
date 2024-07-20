import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'bluelw-50': 'rgb(90, 189, 222)',
        'bluelw-100': 'rgb(85, 161, 192)',
        'greenlw-50': 'rgb(84, 173, 146)',
        'greenlw-100': 'rgb(67, 133, 136)',
        'greenlw-200': 'rgb(57, 85, 102)',
      },
      backgroundImage: {
        'gradient-radial':
          'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
export default config
