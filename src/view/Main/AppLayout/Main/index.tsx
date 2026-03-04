import type { ReactNode } from "react"




export const Main = ({ children }: { children: ReactNode }) => {
    return (
        <main className="flex-1 min-h-0 h-full flex justify-center">
            <div className="w-full md:w-1/2 p-2 bg-gray-100 rounded-lg overflow-y-auto">
                {children}
            </div>
        </main>
    )
}