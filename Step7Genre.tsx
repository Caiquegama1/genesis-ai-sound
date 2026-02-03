
import React from 'react';
import type { StepProps } from '../types';
import { GENRES } from '../constants';
import StepWrapper from '../components/StepWrapper';
import OptionButton from '../components/OptionButton';

const Step7Genre: React.FC<StepProps> = ({ formData, updateForm, t }) => {
    return (
        <StepWrapper title={t('step.genre')} stepKey={7}>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {GENRES.map(genre => (
                    <OptionButton
                        key={genre}
                        label={genre === 'Other' ? t('other') : genre}
                        isSelected={formData.genre === genre}
                        onClick={() => updateForm({ genre })}
                    />
                ))}
            </div>
            {formData.genre === 'Other' && (
                <div className="mt-6">
                    <input
                        type="text"
                        value={formData.otherGenre}
                        onChange={(e) => updateForm({ otherGenre: e.target.value })}
                        placeholder="Please specify genre"
                        className="w-full p-3 bg-[#111111] border border-[#444444] rounded-lg focus:ring-2 focus:ring-[#E10600] focus:border-[#E10600]"
                    />
                </div>
            )}
        </StepWrapper>
    );
};

export default Step7Genre;