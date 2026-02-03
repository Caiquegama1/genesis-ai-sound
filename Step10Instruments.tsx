
import React, { useState } from 'react';
import type { StepProps, Instrument } from '../types';
import { INSTRUMENTS } from '../constants';
import StepWrapper from '../components/StepWrapper';
import MultiOptionButton from '../components/MultiOptionButton';

const Step10Instruments: React.FC<StepProps> = ({ formData, updateForm, t }) => {
    const [showOther, setShowOther] = useState(!!formData.otherInstruments);

    const handleToggle = (instrument: Instrument) => {
        const newInstruments = formData.instruments.includes(instrument)
            ? formData.instruments.filter(i => i !== instrument)
            : [...formData.instruments, instrument];
        updateForm({ instruments: newInstruments });
    };

    const handleToggleOther = () => {
        if (showOther) {
            updateForm({ otherInstruments: '' });
        }
        setShowOther(!showOther);
    };

    return (
        <StepWrapper title={t('step.instruments')} stepKey={10}>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {INSTRUMENTS.map(({ id, emoji }) => (
                    <MultiOptionButton
                        key={id}
                        label={`${id} ${emoji}`}
                        isSelected={formData.instruments.includes(id)}
                        onClick={() => handleToggle(id)}
                    />
                ))}
                 <MultiOptionButton
                    label={t('other')}
                    isSelected={showOther}
                    onClick={handleToggleOther}
                />
            </div>
            {showOther && (
                <div className="mt-6">
                    <textarea
                        value={formData.otherInstruments}
                        onChange={(e) => updateForm({ otherInstruments: e.target.value })}
                        placeholder={t('instruments.other_placeholder')}
                        className="w-full p-3 bg-[#111111] border border-[#444444] rounded-lg focus:ring-2 focus:ring-[#E10600] focus:border-[#E10600] h-24"
                    />
                </div>
            )}
        </StepWrapper>
    );
};

export default Step10Instruments;
