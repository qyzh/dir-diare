import localFont from 'next/font/local'


export const monaspace = localFont({
  src: [
    {
      path: '../public/fonts/MonaspaceNeon-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/MonaspaceNeon-SemiBold.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../public/fonts/MonaspaceNeon-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../public/fonts/MonaspaceNeon-ExtraBold.woff2',
      weight: '800',
      style: 'normal',
    },
    {
      path: '../public/fonts/MonaspaceNeon-Italic.woff2',
      weight: '400',
      style: 'italic',
    },
    {
      path: '../public/fonts/MonaspaceNeon-SemiBoldItalic.woff2',
      weight: '600',
      style: 'italic',
    },
    {
      path: '../public/fonts/MonaspaceNeon-BoldItalic.woff2',
      weight: '700',
      style: 'italic',
    },
  ],
  variable: '--font-monaspace',
  display: 'swap',
}) 