
import React from 'react';
import StepWrapper from '../components/StepWrapper';

interface SloganProps {
    t: (key: string) => string;
}

const Step2Slogan: React.FC<SloganProps> = ({ t }) => {
    return (
        <StepWrapper title="Genesis" stepKey={2}>
            <div className="text-center p-8 space-y-4 flex flex-col items-center justify-center min-h-[250px] animate-fade-in">
                <p className="text-3xl font-serif italic text-white/90">
                    {t('slogan.text')}
                </p>
                <p className="text-lg text-[#9A9A9A] font-mono tracking-widest pt-2">
                    {t('slogan.ref')}
                </p>
            </div>
        </StepWrapper>
    );
};

export default Step2Slogan;