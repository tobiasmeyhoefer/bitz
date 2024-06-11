import { setOnboardingState } from "@/lib/useraction";
import { create } from "zustand";

interface OnboardingStore {
    onboardingIndexBrowse: number;
    onboardingIndexMyShop: number;
    onboardingIndexConversations: number;
    updateOnboardingIndexBrowse: (onboardingIndex: number) => void;
    updateOnboardingIndexMyShop: (onboardingIndex: number) => void;
    updateOnboardingIndexConversations: (onboardingIndex: number) => void;
}

export const useOnboardingStore = create<OnboardingStore>((set) => ({
    onboardingIndexBrowse: 0,
    onboardingIndexMyShop: 0,
    onboardingIndexConversations: 0,
    updateOnboardingIndexBrowse: async (onboardingIndexBrowse: number) => {
        // console.log(onboardingIndex)
        // if(onboardingIndexBrowse === 7) {
        //     await setOnboardingState(true)
        // }
        set(() => ({ onboardingIndexBrowse }));
    },
    updateOnboardingIndexMyShop: async (onboardingIndexMyShop: number) => {
        // console.log(onboardingIndex)
        // if(onboardingIndex === 3) {
        //     await setOnboardingState(true)
        // }
        set(() => ({ onboardingIndexMyShop }));
    },
    updateOnboardingIndexConversations: async (onboardingIndexConversations: number) => {
        // console.log(onboardingIndex)
        // if(onboardingIndex === 3) {
        //     await setOnboardingState(true)
        // }
        set(() => ({ onboardingIndexConversations }));
    },
}));
