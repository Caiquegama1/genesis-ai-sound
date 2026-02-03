
import React from 'react';
import type { StepProps } from '../types';
// FIX: Corrected import name from MIX_MASTER_PREFERENCES to MIX_MASTER_PRESETS.
import { MIX_MASTER_PRESETS } from '../constants';
import StepWrapper from '../components/StepWrapper';
import OptionButton from '../components/OptionButton';

const Step5Finalize: React.FC<StepProps> = ({ formData, updateForm }) => {
    return (
        // FIX: Add missing required 'stepKey' prop.
        <StepWrapper title="Final Touches" stepKey={5}>
            <div className="space-y-8">
                <div>
                    <h3 className="font-semibold mb-3 text-lg text-gray-300">Mix & Master Style</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* FIX: Iterate over MIX_MASTER_PRESETS and use pref.id for properties. */}
                        {MIX_MASTER_PRESETS.map(pref => (
                            <OptionButton
                                key={pref.id}
                                label={pref.id}
                                isSelected={formData.mixMaster === pref.id}
                                onClick={() => updateForm({ mixMaster: pref.id })}
                            />
                        ))}
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

export default Step5Finalize;
