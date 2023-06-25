import { Footer } from './components/Footer/Footer'
import { Header } from './components/Header/Header'
import './globals.css'
import { StoreProvider } from './store/storeProvider'

export const metadata = {
  title: 'Билетопоиск',
  description: 'Сервис продажи билетов в лучшие кинотеатры',
}

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <StoreProvider>
          <Header></Header>
          <main>
            {children}
          </main>
          <Footer></Footer>

          <div id="drop-down-portal"></div>
          <div id="modal-portal"></div>
        </StoreProvider>
      </body>
    </html>
  )
}
