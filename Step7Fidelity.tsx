
import React from 'react';
import type { StepProps } from '../types';
import StepWrapper from '../components/StepWrapper';
import OptionButton from '../components/OptionButton';

const FIDELITY_LEVELS = [100, 75, 50, 25, 5];

const Step7Fidelity: React.FC<StepProps> = ({ formData, updateForm, t }) => {
    return (
        <StepWrapper title={t('fidelity.title')} stepKey={7}>
            <div className="grid grid-cols-3 md:grid-cols-5 gap-4 max-w-lg mx-auto">
                {FIDELITY_LEVELS.map(level => (
                    <OptionButton
                        key={level}
                        label={`${level}%`}
                        isSelected={formData.audioRefFidelity === level}
                        onClick={() => updateForm({ audioRefFidelity: level })}
                    />
                ))}
            </div>
             <p className="text-center text-[#9A9A9A] mt-4 text-sm">
                Higher % = closer to reference melody/harmony/feel.
             </p>
        </StepWrapper>
    );
};

export default Step7Fidelity;
