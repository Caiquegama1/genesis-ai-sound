
import React from 'react';
import type { StepProps } from '../types';
import { MIX_MASTER_PRESETS } from '../constants';
import StepWrapper from '../components/StepWrapper';
import OptionButton from '../components/OptionButton';

const Step12MixMaster: React.FC<StepProps> = ({ formData, updateForm, t }) => {
    return (
        <StepWrapper title={t('step.mix_master')} stepKey={12}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {MIX_MASTER_PRESETS.map(preset => {
                    const isDisabled = preset.proOnly && formData.mode !== 'Pro';
                    return (
                        <div key={preset.id} className={`${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}>
                             <OptionButton
                                label={t(`mix.${preset.id}`)}
                                isSelected={!isDisabled && formData.mixMaster === preset.id}
                                onClick={() => !isDisabled && updateForm({ mixMaster: preset.id })}
                            />
                        </div>
                    )
                })}
            </div>
        </StepWrapper>
    );
};

export default Step12MixMaster;
