
import React from 'react';
// FIX: Import PlatformName for type casting.
import type { StepProps, PlatformName } from '../types';
// FIX: Import PLATFORM_CONFIG because PLATFORMS is not an exported member.
import { LANGUAGES, PLATFORM_CONFIG } from '../constants';
import StepWrapper from '../components/StepWrapper';
import OptionButton from '../components/OptionButton';

const Step1Setup: React.FC<StepProps> = ({ formData, updateForm }) => {
    return (
        // FIX: Add missing required 'stepKey' prop.
        <StepWrapper title="Basic Setup" stepKey={1}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <h3 className="font-semibold mb-3 text-lg text-gray-300">Language</h3>
                    <div className="space-y-2">
                        {LANGUAGES.map(lang => (
                            <OptionButton
                                // FIX: Use lang.code for the key as lang is an object.
                                key={lang.code}
                                // FIX: Use lang.name for the label as it expects a string.
                                label={lang.name}
                                // FIX: Compare formData.language with lang.code as both are strings.
                                isSelected={formData.language === lang.code}
                                // FIX: Update form with lang.code which is a string.
                                onClick={() => updateForm({ language: lang.code })}
                            />
                        ))}
                    </div>
                </div>
                <div>
                    <h3 className="font-semibold mb-3 text-lg text-gray-300">Target Platform</h3>
                    <div className="space-y-2">
                        {/* FIX: Iterate over the keys of PLATFORM_CONFIG to get platform names. */}
                        {(Object.keys(PLATFORM_CONFIG) as PlatformName[]).map(platform => (
                            <OptionButton
                                key={platform}
                                label={platform}
                                isSelected={formData.platform === platform}
                                onClick={() => updateForm({ platform: platform })}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </StepWrapper>
    );
};

export default Step1Setup;
