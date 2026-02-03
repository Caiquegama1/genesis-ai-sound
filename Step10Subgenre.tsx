
import React from 'react';
import type { StepProps } from '../types';
import { SUBGENRE_SETS } from '../constants';
import StepWrapper from '../components/StepWrapper';
import OptionButton from '../components/OptionButton';

const Step10Subgenre: React.FC<StepProps> = ({ formData, updateForm, t }) => {
    const subgenres = SUBGENRE_SETS[formData.genre] || [];

    const handleSelect = (sub: string) => {
        updateForm({ subgenre: sub, otherSubgenre: '' });
    };
    
    const handleOtherSelect = () => {
        updateForm({ subgenre: 'Other' });
    };

    if (formData.genre === 'Other') {
        return (
            <StepWrapper title={t('step.subgenre')} stepKey={10}>
                <div className="max-w-md mx-auto">
                    <input
                        type="text"
                        value={formData.otherSubgenre}
                        onChange={(e) => updateForm({ subgenre: 'Other', otherSubgenre: e.target.value })}
                        placeholder={t('subgenre.other_placeholder')}
                        className="w-full p-3 bg-[#111111] border border-[#444444] rounded-lg focus:ring-2 focus:ring-[#E10600] focus:border-[#E10600]"
                    />
                </div>
            </StepWrapper>
        );
    }
    
    return (
        <StepWrapper title={t('step.subgenre')} stepKey={10}>
            {subgenres.length === 0 && formData.genre && (
                 <p className="text-center text-[#9A9A9A]">{t('subgenre.select')}</p>
            )}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {subgenres.map(sub => (
                    <OptionButton
                        key={sub}
                        label={sub}
                        isSelected={formData.subgenre === sub}
                        onClick={() => handleSelect(sub)}
                    />
                ))}
                <OptionButton
                    label={t('other')}
                    isSelected={formData.subgenre === 'Other'}
                    onClick={handleOtherSelect}
                />
            </div>
            {formData.subgenre === 'Other' && (
                <div className="mt-6">
                    <input
                        type="text"
                        value={formData.otherSubgenre}
                        onChange={(e) => updateForm({ otherSubgenre: e.target.value })}
                        placeholder={t('subgenre.other_placeholder')}
                        className="w-full p-3 bg-[#111111] border border-[#444444] rounded-lg focus:ring-2 focus:ring-[#E10600] focus:border-[#E10600]"
                    />
                </div>
            )}
        </StepWrapper>
    );
};

export default Step10Subgenre;
