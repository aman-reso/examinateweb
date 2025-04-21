// /components/Scaffold.tsx
import { ReactNode } from "react"

interface ScaffoldProps {
    title: string
    body: ReactNode
    floatingActionButton?: ReactNode
    drawer?: ReactNode
}

const Scaffold = ({
                      title,
                      body,
                      floatingActionButton,
                      drawer,
                  }: ScaffoldProps) => {
    return (
        <div className="relative h-screen flex flex-col">
            {/* App Bar */}
            <div className="bg-blue-500 p-4 text-white shadow-md">
                <h1 className="text-xl font-bold">{title}</h1>
            </div>

            {/* Drawer (optional) */}
            {drawer && (
                <div className="absolute top-0 left-0 w-64 h-full bg-gray-800 text-white z-10">
                    {drawer}
                </div>
            )}

            {/* Main Body */}
            <div className={`flex-1 p-4 ${drawer ? "ml-64" : ""}`}>
                {body}
            </div>

            {/* Floating Action Button (optional) */}
            {floatingActionButton && (
                <div className="absolute bottom-8 right-8">{floatingActionButton}</div>
            )}
        </div>
    )
}

export default Scaffold
