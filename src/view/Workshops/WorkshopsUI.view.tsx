import type { IUseWorkshopsUIHook } from "./WorkshopsUI.hook"

export const WorkshopsUIView = ({ workshops }: IUseWorkshopsUIHook) => {
    return (
        <div>
            <div>
                Talleres
            </div>
            {workshops.map((workshop) => (
                <div key={workshop.id}>
                    <h1>{workshop.name}</h1>
                    <h1>{workshop.address}</h1>
                    <h1>{workshop.phone}</h1>
                </div>
            ))}
        </div>
    )
}
