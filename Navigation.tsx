
import React from 'react';

interface NavigationProps {
    currentStep: number;
    totalSteps: number;
    onBack: () => void;
    onNext: () => void;
    t: (key: string) => string;
    isNextDisabled?: boolean;
}

const Navigation: React.FC<NavigationProps> = ({ currentStep, totalSteps, onBack, onNext, t, isNextDisabled = false }) => {
    const isFirstStep = currentStep === 1;
    const isLastStep = currentStep === totalSteps;

    return (
        <div className="flex justify-between p-4 bg-black/50 border-t border-[#444444]">
            <button
                onClick={onBack}
                disabled={isFirstStep}
                className="px-6 py-2 font-semibold text-white bg-[#444444] rounded-md shadow-sm hover:bg-[#555555] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
                {t('nav.back')}
            </button>
            <button
                onClick={onNext}
                disabled={isLastStep || isNextDisabled}
                className="px-6 py-2 font-semibold text-white bg-[#E10600] rounded-md shadow-sm hover:bg-[#ff1a1a] disabled:bg-[#444444] disabled:opacity-70 disabled:cursor-not-allowed transition-colors"
            >
                {currentStep === 2 ? t('continue') : t('nav.next')}
            </button>
        </div>
    );
};

export default Navigation;