import UKCallout from 'app/components/ukcallout'
import Footer from 'app/components/footer'
import { Badge } from 'app/components/ukbadge'
import UKButton from 'app/components/ukbtn'
import ThemeToggle from 'app/components/theme-toggle'
import UKDrawer from 'app/components/ukdrawer'
import UKTagUser from 'app/components/uktaguser'
import UKImage from 'app/components/ukimage'
import UkCLI from 'app/components/ukcli'
import { Code, Settings } from 'lucide-react'

export default function TestPage() {
    return (
        <div className="max-w-4xl mx-auto p-6 space-y-8">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold">Component Testing Page</h1>
                <ThemeToggle />
            </div>
            
            {/* Callout Section */}
            <section className="space-y-4">
                <h2 className="text-2xl font-semibold">UKCallout Component</h2>
                
                <UKCallout type="info">
                    This is an informational callout. Use it to provide helpful context or additional details that complement the main content.
                </UKCallout>
                
                <UKCallout type="warning">
                    This is a warning callout. Use it to alert users about potential issues or important considerations they should be aware of.
                </UKCallout>
                
                <UKCallout type="error">
                    This is an error callout. Use it to display error messages or critical issues that require immediate attention.
                </UKCallout>
                
                <UKCallout type="success">
                    This is a success callout. Use it to confirm successful actions or display positive feedback to users.
                </UKCallout>
                
                <UKCallout type="important">
                    This is an important callout. Use it to highlight crucial information that users must not miss.
                </UKCallout>
            </section>

            {/* Badge Section */}
            <section className="space-y-4">
                <h2 className="text-2xl font-semibold">Badge Component</h2>
                <div className="flex flex-wrap gap-2">
                    <Badge text="Default" variant="default" />
                    <Badge text="Primary" variant="primary" />
                    <Badge text="Secondary" variant="secondary" />
                    <Badge text="Outline" variant="outline" />
                    <Badge text="Developer" variant="dev" icon={<Code className="w-3 h-3" />} />
                    <Badge text="Running" variant="running" />
                    <Badge text="Gamer" variant="gamer" />
                    <Badge text="Muted" variant="muted" />
                    <Badge text="Disabled" variant="primary" disabled />
                </div>
            </section>

            {/* Button Section */}
            <section className="space-y-4">
                <h2 className="text-2xl font-semibold">UKButton Component</h2>
                <div className="space-y-3">
                    <div className="flex flex-wrap gap-2">
                        <UKButton variant="primary" size="sm">Small Primary</UKButton>
                        <UKButton variant="primary" size="md">Medium Primary</UKButton>
                        <UKButton variant="primary" size="lg">Large Primary</UKButton>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        <UKButton variant="secondary">Secondary</UKButton>
                        <UKButton variant="outline">Outline</UKButton>
                        <UKButton variant="error">Error</UKButton>
                        <UKButton variant="primary" disabled>Disabled</UKButton>
                    </div>
                </div>
            </section>

            {/* Drawer Section */}
            <section className="space-y-4">
                <h2 className="text-2xl font-semibold">UKDrawer Component</h2>
                <UKDrawer
                    trigger={
                        <UKButton variant="outline">
                            <Settings className="w-4 h-4 mr-2" />
                            Open Drawer
                        </UKButton>
                    }
                >
                    <div className="mt-6 space-y-4">
                        <h3 className="text-xl font-semibold text-neutral-100">Drawer Content</h3>
                        <p className="text-neutral-400">This is a drawer component that slides in from the right side of the screen.</p>
                        <UKButton variant="primary" size="sm">Action Button</UKButton>
                    </div>
                </UKDrawer>
            </section>

            {/* Tag User Section */}
            <section className="space-y-4">
                <h2 className="text-2xl font-semibold">UKTagUser Component</h2>
                <div className="flex gap-2">
                    <UKTagUser link="https://github.com/example" className="bg-blue-100 text-blue-800 hover:bg-blue-200">
                        github-user
                    </UKTagUser>
                    <UKTagUser link="https://twitter.com/example" className="bg-purple-100 text-purple-800 hover:bg-purple-200">
                        twitter-user
                    </UKTagUser>
                </div>
            </section>

            {/* CLI Section */}
            <section className="space-y-4">
                <h2 className="text-2xl font-semibold">UkCLI Component</h2>
                <div className="bg-neutral-900 text-neutral-100 p-4 rounded font-mono text-sm">
                    <UkCLI path="~/projects/myapp" command="npm run dev" />
                    <UkCLI path="~/projects/myapp" command="git status" />
                </div>
            </section>

            {/* Image Section */}
            <section className="space-y-4">
                <h2 className="text-2xl font-semibold">UKImage Component</h2>
                <div className="grid gap-4">
                    <UKImage 
                        src="/images/profil.jpg" 
                        alt="Profile example" 
                        size="medium"
                    />
                </div>
            </section>

            <Footer />
        </div>
    )
}
