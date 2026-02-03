
import React, { useState } from 'react';
import type { StepProps } from '../types';
// FIX: Correctly imports MUSICAL_KEYS which is now exported from constants.
import { MUSICAL_KEYS } from '../constants';
import StepWrapper from '../components/StepWrapper';

const Step6KeyBpm: React.FC<StepProps> = ({ formData, updateForm, t }) => {
    const [animationDir, setAnimationDir] = useState<'left' | 'right' | null>(null);

    // FIX: Uses formData.keyIndex directly instead of trying to find the index of a non-existent 'key' property.
    const keyIndex = formData.keyIndex;

    const handlePrevKey = () => {
        setAnimationDir('left');
        const newIndex = (keyIndex - 1 + MUSICAL_KEYS.length) % MUSICAL_KEYS.length;
        // FIX: Updates the correct 'keyIndex' property in the form data.
        updateForm({ keyIndex: newIndex });
    };

    const handleNextKey = () => {
        setAnimationDir('right');
        const newIndex = (keyIndex + 1) % MUSICAL_KEYS.length;
        // FIX: Updates the correct 'keyIndex' property in the form data.
        updateForm({ keyIndex: newIndex });
    };

    return (
        <StepWrapper title={t('step.key_bpm')} stepKey={6}>
            <div className="space-y-8 max-w-lg mx-auto">
                <div>
                    <label className="block text-lg font-semibold mb-2 text-center text-white">Key</label>
                    <div className="flex items-center justify-between bg-[#111111] border border-[#444444] rounded-lg p-2">
                        <button 
                            onClick={handlePrevKey}
                            className="text-3xl font-bold text-[#E10600] hover:text-white transition-colors px-4 py-1 rounded"
                            aria-label="Previous key"
                        >
                            ‹
                        </button>
                        <div className="text-center font-semibold text-lg text-white min-w-[200px] overflow-hidden">
                             <span 
                                // FIX: Uses the key from MUSICAL_KEYS array based on keyIndex for the React key and display.
                                key={MUSICAL_KEYS[formData.keyIndex]} 
                                className={
                                    `inline-block ` +
                                    (animationDir === 'right' ? 'animate-slide-in-right' : 
                                    animationDir === 'left' ? 'animate-slide-in-left' : '')
                                }
                            >
                                {/* FIX: Displays the key from MUSICAL_KEYS array based on keyIndex. */}
                                {MUSICAL_KEYS[formData.keyIndex]}
                            </span>
                        </div>
                        <button 
                            onClick={handleNextKey}
                            className="text-3xl font-bold text-[#E10600] hover:text-white transition-colors px-4 py-1 rounded"
                            aria-label="Next key"
                        >
                            ›
                        </button>
                    </div>
                </div>
                 
                <div>
                    <label htmlFor="bpm" className="block text-lg font-semibold mb-2 text-center text-white">BPM</label>
                    <input
                        type="number"
                        id="bpm"
                        value={formData.bpm}
                        onChange={(e) => updateForm({ bpm: Math.max(40, Math.min(220, parseInt(e.target.value, 10) || 40)) })}
                        min="40"
                        max="220"
                        className="w-full p-3 text-center bg-[#111111] border border-[#444444] rounded-lg focus:ring-2 focus:ring-[#E10600] focus:border-[#E10600]"
                    />
                    <input
                        type="range"
                        id="bpm-slider"
                        value={formData.bpm}
                        onChange={(e) => updateForm({ bpm: parseInt(e.target.value, 10) })}
                        min="40"
                        max="220"
                        className="w-full h-2 bg-[#444444] rounded-lg appearance-none cursor-pointer accent-[#E10600] mt-4"
                    />
                    <div className="text-center mt-2 text-[#9A9A9A]">{formData.bpm} BPM</div>
                </div>
            </div>
        </StepWrapper>
    );
};

export default Step6KeyBpm;
