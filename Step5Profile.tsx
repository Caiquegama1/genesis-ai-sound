
import React from 'react';
import type { StepProps } from '../types';
import { PROFILES } from '../constants';
import StepWrapper from '../components/StepWrapper';
import OptionButton from '../components/OptionButton';

const Step5Profile: React.FC<StepProps> = ({ formData, updateForm, t }) => {
    return (
        <StepWrapper title={t('step.profile')} stepKey={5}>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {PROFILES.map(profile => (
                    <OptionButton
                        key={profile}
                        label={t(`profile.${profile.toLowerCase()}`)}
                        isSelected={formData.profile === profile}
                        onClick={() => updateForm({ profile })}
                    />
                ))}
            </div>
        </StepWrapper>
    );
};

export default Step5Profile;
