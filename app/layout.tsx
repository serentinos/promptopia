import Nav from "@/components/Nav";
import Provider from "@/components/Provider";
import "@/styles/globals.css"
import { Metadata } from 'next'
import { Session } from "next-auth";

export const metadata: Metadata = {
  title: 'Promptopia',
  description: 'Discover & Share the best AI promts'
}

interface Props {
  children: React.ReactNode;
  session: Session
}

const RootLayout = ({ children, session }: Props) => {
  return (
    <html lang='en'>
      <body>
        <Provider session={session}>
          <div className='main'>
            <div className='gradient' />
          </div>

          <main className='app'>
            <Nav />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  )
}

export default RootLayout