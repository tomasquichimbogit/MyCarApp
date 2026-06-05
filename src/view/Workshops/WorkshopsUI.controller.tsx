import { WorkshopsUIView } from "./WorkshopsUI.view"
import { useWorkshopsUIHook } from "./WorkshopsUI.hook"

export const WorkshopsUI = () => {
    const hook = useWorkshopsUIHook()
    return <WorkshopsUIView { ...hook } />
}
