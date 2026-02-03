
import React from 'react';
import type { StepProps } from '../types';
// FIX: Removed non-existent 'KEYS' import and added 'MUSICAL_KEYS'.
import { GENRES, MUSICAL_KEYS } from '../constants';
import StepWrapper from '../components/StepWrapper';

const Step3Vibe: React.FC<StepProps> = ({ formData, updateForm }) => {
    return (
        // FIX: Add missing required 'stepKey' prop.
        <StepWrapper title="Set the Vibe" stepKey={3}>
            <div className="space-y-6">
                <div>
                    <label htmlFor="genre" className="block text-lg font-semibold mb-2 text-gray-300">Genre</label>
                    <select
                        id="genre"
                        value={formData.genre}
                        onChange={(e) => updateForm({ genre: e.target.value })}
                        className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                        {GENRES.map(g => <option key={g} value={g}>{g}</option>)}
                    </select>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="md:col-span-2">
                        <label htmlFor="key" className="block text-lg font-semibold mb-2 text-gray-300">Key</label>
                         {/* FIX: Replaced text input for 'key' with a select dropdown for 'keyIndex' to align with the updated FormData type. */}
                         <select
                            id="key"
                            value={formData.keyIndex}
                            onChange={(e) => updateForm({ keyIndex: parseInt(e.target.value, 10) })}
                            className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                            {MUSICAL_KEYS.map((key, index) => (
                                <option key={key} value={index}>{key}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label htmlFor="bpm" className="block text-lg font-semibold mb-2 text-gray-300">BPM</label>
                        <input
                            type="number"
                            id="bpm"
                            value={formData.bpm}
                            onChange={(e) => updateForm({ bpm: parseInt(e.target.value, 10) || 60 })}
                            min="40"
                            max="220"
                            className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                </div>

                <div>
                    <input
                        type="range"
                        id="bpm-slider"
                        value={formData.bpm}
                        onChange={(e) => updateForm({ bpm: parseInt(e.target.value, 10) })}
                        min="40"
                        max="220"
                        className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="text-center mt-2 text-gray-400">{formData.bpm} BPM</div>
                </div>
            </div>
        </StepWrapper>
    );
};

export default Step3Vibe;
