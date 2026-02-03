
import React from 'react';
import type { StepProps } from '../types';
import { MODES, PLATFORM_CONFIG } from '../constants';
import StepWrapper from '../components/StepWrapper';
import OptionButton from '../components/OptionButton';

const Step4Mode: React.FC<StepProps> = ({ formData, updateForm, t }) => {
    const platformConfig = PLATFORM_CONFIG[formData.platform] || PLATFORM_CONFIG['Other'];
    const supportedModes = platformConfig.supportedModes;

    return (
        <StepWrapper title={t('step.mode')} stepKey={4}>
             <div className="flex justify-center gap-4 max-w-md mx-auto">
                {MODES.map(mode => {
                    if (!supportedModes.includes(mode)) return null;
                    return (
                        <div className="w-1/2" key={mode}>
                            <OptionButton
                                label={t(`mode.${mode.toLowerCase()}`)}
                                isSelected={formData.mode === mode}
                                onClick={() => updateForm({ mode })}
                            />
                        </div>
                    )
                })}
            </div>
            {supportedModes.length === 1 && (
                <p className="text-center text-[#9A9A9A] mt-4">
                    {formData.platform} only supports {supportedModes[0]} mode.
                </p>
            )}
        </StepWrapper>
    );
};

export default Step4Mode;
