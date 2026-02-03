
import React from 'react';
import type { StepProps } from '../types';
import { LANGUAGES } from '../constants';
import StepWrapper from '../components/StepWrapper';
import OptionButton from '../components/OptionButton';

const Step1Language: React.FC<StepProps> = ({ formData, updateForm, t }) => {
    const handleSelect = (code: string) => {
        updateForm({ language: code });
    };

    return (
        <StepWrapper title={t('step.language')} stepKey={1}>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {LANGUAGES.map(lang => (
                    <OptionButton
                        key={lang.code}
                        label={lang.code === 'Other' ? t('other') : lang.name}
                        isSelected={formData.language === lang.code}
                        onClick={() => handleSelect(lang.code)}
                    />
                ))}
            </div>
            {formData.language === 'Other' && (
                <div className="mt-6">
                    <input
                        type="text"
                        value={formData.otherLanguage}
                        onChange={(e) => updateForm({ otherLanguage: e.target.value })}
                        placeholder="Please specify language"
                        className="w-full p-3 bg-[#111111] border border-[#444444] rounded-lg focus:ring-2 focus:ring-[#E10600] focus:border-[#E10600]"
                    />
                </div>
            )}
        </StepWrapper>
    );
};

export default Step1Language;