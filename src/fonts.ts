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
      weight: '500 600',
      style: 'normal',
    },
    {
      path: '../public/fonts/MonaspaceNeon-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-monaspace',
  display: 'swap',
}) 