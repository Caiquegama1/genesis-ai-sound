
import React from 'react';
import type { StepProps } from '../types';
// FIX: Corrected import name from MIX_MASTER_PREFERENCES to MIX_MASTER_PRESETS.
import { MIX_MASTER_PRESETS } from '../constants';
import StepWrapper from '../components/StepWrapper';
import OptionButton from '../components/OptionButton';

const Step10MixMaster: React.FC<StepProps> = ({ formData, updateForm }) => {
    return (
        // FIX: Add missing required 'stepKey' prop.
        <StepWrapper title="Mix & Master Style" stepKey={10}>
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
        </StepWrapper>
    );
};

export default Step10MixMaster;
