
import React from 'react';
import type { StepProps } from '../types';
import { PLATFORM_CONFIG } from '../constants';
import StepWrapper from '../components/StepWrapper';
import OptionButton from '../components/OptionButton';

const Step3Platform: React.FC<StepProps> = ({ formData, updateForm, t }) => {
    const platforms = Object.values(PLATFORM_CONFIG);

    return (
        <StepWrapper title={t('step.platform')} stepKey={3}>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {platforms.map(platform => (
                    <OptionButton
                        key={platform.id}
                        label={platform.id === 'Other' ? t('other') : platform.name}
                        isSelected={formData.platform === platform.id}
                        onClick={() => updateForm({ platform: platform.id })}
                    />
                ))}
            </div>
             {formData.platform === 'Other' && (
                <div className="mt-6 max-w-md mx-auto">
                    <input
                        type="text"
                        value={formData.otherPlatform}
                        onChange={(e) => updateForm({ otherPlatform: e.target.value })}
                        placeholder="Please specify platform"
                        className="w-full p-3 bg-[#111111] border border-[#444444] rounded-lg focus:ring-2 focus:ring-[#E10600] focus:border-[#E10600]"
                    />
                </div>
            )}
        </StepWrapper>
    );
};

export default Step3Platform;
