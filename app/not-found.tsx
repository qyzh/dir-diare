import Breadcrumbs from "./components/breadcrumbs";
import { Navbar } from "./components/nav";
import UKTerminal from "./components/ukterminal";


export default function NotFound() {

    
    return (
        <section>
            <Breadcrumbs/>
            <Navbar/>
            <UKTerminal 
                title="404: Page Not Found" 
                content={`The page does not exist.`} 
            />
        </section>
    )
}
