import type { IWorkshop } from "./interfaces"

export interface IUseWorkshopsUIHook {
    workshops: IWorkshop[]
}

export const useWorkshopsUIHook = (): IUseWorkshopsUIHook => {
    return {
        workshops: [],
    }
}
