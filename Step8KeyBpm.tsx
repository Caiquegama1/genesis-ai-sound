
import React, { useState } from 'react';
import type { StepProps } from '../types';
import { MUSICAL_KEYS } from '../constants';
import StepWrapper from '../components/StepWrapper';

const Step8KeyBpm: React.FC<StepProps> = ({ formData, updateForm, t }) => {
    const [animationDir, setAnimationDir] = useState<'left' | 'right' | null>(null);

    const handlePrevKey = () => {
        setAnimationDir('left');
        const newIndex = (formData.keyIndex - 1 + MUSICAL_KEYS.length) % MUSICAL_KEYS.length;
        updateForm({ keyIndex: newIndex });
    };

    const handleNextKey = () => {
        setAnimationDir('right');
        const newIndex = (formData.keyIndex + 1) % MUSICAL_KEYS.length;
        updateForm({ keyIndex: newIndex });
    };

    const currentKey = MUSICAL_KEYS[formData.keyIndex] || MUSICAL_KEYS[0];
    let displayKeyText = currentKey;
    const match = currentKey.match(/([A-G][#b]?)\s\((.*?)\)\s(major|minor)/);
    if(match) {
        displayKeyText = `${match[1]} ${match[3]} (${match[2]} ${match[3]})`;
    }

    return (
        <StepWrapper title={t('step.key_bpm')} stepKey={8}>
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
                        <div className="text-center font-semibold text-lg text-white min-w-[250px] overflow-hidden">
                             <span 
                                key={displayKeyText} 
                                className={
                                    `inline-block ` + 
                                    (animationDir === 'right' ? 'animate-slide-in-right' : 
                                    animationDir === 'left' ? 'animate-slide-in-left' : '')
                                }
                            >
                                {displayKeyText}
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

export default Step8KeyBpm;
