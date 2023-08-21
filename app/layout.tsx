import "@/styles/globals.css"
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Promptopia',
  description: 'Discover & Share the best AI promts'
}

interface Props {
  children: React.ReactNode;
}

const RootLayout = ({ children }: Props) => {
  return (
    <html lang='en'>
      <body>
        <div className='main'>
          <div className='gradient' />
        </div>

        <main className='app'>
          {children}
        </main>
      </body>
    </html>
  )
}

export default RootLayout