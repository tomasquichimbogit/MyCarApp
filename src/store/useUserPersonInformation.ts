import type { PersonRecord } from "../services/person.service";
import { create } from "zustand";

export interface IUserPersonInformationStore {
    userPersonInformation?: PersonRecord;
    setUserPersonInformation: (userPersonInformation: PersonRecord) => void;
}

export const useUserPersonInformationStore = create<IUserPersonInformationStore>((set) => ({
    userPersonInformation: undefined,
    setUserPersonInformation: (userPersonInformation) => set({ userPersonInformation }),
}));