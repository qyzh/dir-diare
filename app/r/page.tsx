import Breadcrumbs from 'app/components/breadcrumbs';
import Footer from 'app/components/footer';
import { Navbar } from 'app/components/nav';
import UKDesc from 'app/components/ukDesc';
import UKRunning from 'app/components/ukrunning';

const title = 'running';
const description = 'Running is my way to stay fit and healthy. I run for fun and to challenge myself. Running Is Our Therapy';
export const metadata = {
    title: `${title}`,
    description: `${description}`,
}

export default async function Notes() {
  return (
  <section>
    <Breadcrumbs/>
    <Navbar/>
    <UKDesc title='r' description={description} />

    <UKRunning 
    date="2024.08.11"
    place="Kota Bandung, ID"
    title="Qris run 2024" 
    className="hover:border-blue-600" 
    distance={7.27} time="56:48" pace={8.05} />

    <UKRunning 
    date="2024.07.21"
    place="Kota Bandung, ID"
    title="Pocari Sweat Run 2024" 
    className="hover:border-sky-600" 
    distance={21.28} time="3:07:46" pace={8.49} />

    <UKRunning 
    date="2024.03.20"
    place="Kota Bandung, ID"
    title="Duraking fun run 2024" 
    className="hover:border-white" 
    distance={10.15} time="1:33:46" pace={9.14} />

    <UKRunning 
    date="2023.11.19"
    place="Magelang, ID"
    title="Borobudur Marathon 2023" 
    className="hover:border-orange-600" 
    distance={10.30} time="1:27:09" pace={8.47} />

    <Footer/>
  </section>
  );
}