
import React from 'react';
import type { StepProps } from '../types';
import StepWrapper from '../components/StepWrapper';
import OptionButton from '../components/OptionButton';

const Step6StartMode: React.FC<StepProps> = ({ formData, updateForm, t }) => {
    return (
        <StepWrapper title={t('step.start_mode')} stepKey={6}>
            <div className="flex justify-center gap-4 max-w-lg mx-auto">
                <div className="w-1/2">
                    <OptionButton
                        label={t('start_mode.zero')}
                        isSelected={formData.startMode === 'ZERO'}
                        onClick={() => updateForm({ startMode: 'ZERO' })}
                    />
                </div>
                <div className="w-1/2">
                     <OptionButton
                        label={t('start_mode.audio_ref')}
                        isSelected={formData.startMode === 'AUDIO_REF'}
                        onClick={() => updateForm({ startMode: 'AUDIO_REF' })}
                    />
                </div>
            </div>
        </StepWrapper>
    );
};

export default Step6StartMode;
