import './globals.css'
import { Montserrat } from 'next/font/google'
import NavBar from '@/components/NavBar'
import { generateGetUrl, getWebsiteData } from '@/util/util'

const montserrat = Montserrat({ subsets: ['latin'] })


export const metadata = {
  title: `${process.env.RESTAURANT_NAME}`,
  description: '',
  icons: {
    icon: generateGetUrl(`${process.env.WEBSITE_UUID}/logo`)
  }
}

export const revalidate = 10800;

export default async function RootLayout({ children }) {

  const DATA = await getWebsiteData();


  return (
    <html lang="en">
      <body className={montserrat.className}
        style={{
          "--primaryBgCol": DATA.colors.primaryBgCol,
          "--secondaryTextCol": DATA.colors.secondaryTextCol,
          "--secondaryBgCol": DATA.colors.secondaryBgCol,
          "--tertiaryBgCol": DATA.colors.tertiaryBgCol,
          "--tertiaryTextCol": DATA.colors.tertiaryTextCol,
          "--primaryTextCol": DATA.colors.primaryTextCol,
        }}>
        <NavBar DATA={DATA} />
        <main className='cont bg-primary' id="parallaxContainer">
          {children}
        </main>
      </body>
    </html >
  )
}
