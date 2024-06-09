import { create } from "zustand";

interface OnboardingStore {
    onboardingIndex: number;
    update: (onboardingIndex: number) => void;
}

export const useOnboardingStore = create<OnboardingStore>((set) => ({
    onboardingIndex: 0,
    update: (onboardingIndex: number) => {
        // additional logic
        // if index === 6 oder so dann await setOnboardingCompleted()
        set(() => ({ onboardingIndex }));
    }
}));
