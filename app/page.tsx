import Footer from './components/footer'
import Breadcrumbs from 'app/components/breadcrumbs'
import FrontDesk from './components/frontdesk'

export default function Page() {
  return (
    <main className="flex-auto min-w-0 mt-6 flex flex-col md:px-0">
      <section>
        <main className="flex flex-col">
          <Breadcrumbs />
          <FrontDesk />
        </main>
      </section>
      <Footer />
    </main>
  )
}
