
import React from 'react';
import type { StepProps } from '../types';
import StepWrapper from '../components/StepWrapper';
// FIX: Import MUSICAL_KEYS to display the selected key.
import { MUSICAL_KEYS } from '../constants';

const SummaryItem: React.FC<{ label: string; value: string | number | string[] }> = ({ label, value }) => (
    <div className="flex justify-between items-center py-2 border-b border-gray-700 last:border-b-0">
        <span className="text-gray-400">{label}</span>
        <span className="text-right font-semibold text-white pl-4">
            {Array.isArray(value) ? value.join(', ') : value}
        </span>
    </div>
);

const Step11Finalize: React.FC<StepProps> = ({ formData, updateForm }) => {
    return (
        // FIX: Add missing required 'stepKey' prop.
        <StepWrapper title="Preview & Finalize" stepKey={11}>
            <div className="space-y-8">
                <div>
                    <h3 className="font-semibold mb-3 text-lg text-gray-300">Your Choices</h3>
                    <div className="bg-gray-900/50 p-4 rounded-lg space-y-1 text-sm">
                        <SummaryItem label="Language" value={formData.language} />
                        <SummaryItem label="Platform" value={formData.platform} />
                        <SummaryItem label="Profile" value={formData.profile} />
                        {/* FIX: Replaced non-existent 'key' property with keyIndex and MUSICAL_KEYS array. */}
                        <SummaryItem label="Vibe" value={`${formData.genre}, ${MUSICAL_KEYS[formData.keyIndex]}`} />
                        <SummaryItem label="Tempo" value={`${formData.bpm} BPM`} />
                    </div>
                </div>
                
                <div>
                    <label htmlFor="charLimit" className="block text-lg font-semibold mb-2 text-gray-300">
                        Prompt Character Limit
                    </label>
                    <div className="flex items-center space-x-4">
                        <input
                            type="range"
                            id="charLimit"
                            value={formData.charLimit}
                            onChange={(e) => updateForm({ charLimit: parseInt(e.target.value, 10) })}
                            min="200"
                            max="4000"
                            step="100"
                            className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer"
                        />
                        <span className="font-mono p-2 bg-gray-900 rounded-md min-w-[70px] text-center">{formData.charLimit}</span>
                    </div>
                </div>
            </div>
        </StepWrapper>
    );
};

export default Step11Finalize;
