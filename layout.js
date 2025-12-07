export const metadata = {
  title: 'TheQuiltHub',
  description: 'Your quilting community directory',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
