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
        set(() => ({ onboardingIndexBrowse }));
    },
    updateOnboardingIndexMyShop: async (onboardingIndexMyShop: number) => {
        set(() => ({ onboardingIndexMyShop }));
    },
    updateOnboardingIndexConversations: async (onboardingIndexConversations: number) => {
        set(() => ({ onboardingIndexConversations }));
    },
}));
