import type { ReactNode } from "react"




export const Main = ({ children }: { children: ReactNode }) => {
    return (
        <main className="flex-1 min-h-0 h-full flex justify-center bg-gray-100">
            <div className="w-full md:w-1/2 bg-white rounded-lg p-4">
                {children}
            </div>
        </main>
    )
}