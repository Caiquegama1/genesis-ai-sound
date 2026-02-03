
import React from 'react';
import type { StepProps } from '../types';
import { PROFILES } from '../constants';
import StepWrapper from '../components/StepWrapper';
import OptionButton from '../components/OptionButton';

const Step2Profile: React.FC<StepProps> = ({ formData, updateForm }) => {
    return (
        // FIX: Add missing required 'stepKey' prop.
        <StepWrapper title="Your Music Profile" stepKey={2}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {PROFILES.map(profile => (
                    <OptionButton
                        key={profile}
                        label={profile}
                        isSelected={formData.profile === profile}
                        onClick={() => updateForm({ profile })}
                    />
                ))}
            </div>
        </StepWrapper>
    );
};

export default Step2Profile;
