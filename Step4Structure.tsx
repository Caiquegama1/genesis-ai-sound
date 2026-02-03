import React from 'react';
// FIX: Import SongStructurePart and Instrument types.
import type { StepProps, SongStructurePart, Instrument } from '../types';
// FIX: Use STRUCTURE_SECTIONS instead of SONG_STRUCTURES.
import { STRUCTURE_SECTIONS, INSTRUMENTS } from '../constants';
import StepWrapper from '../components/StepWrapper';
import MultiOptionButton from '../components/MultiOptionButton';

const Step4Structure: React.FC<StepProps> = ({ formData, updateForm }) => {
    
    // FIX: Updated handler to use the specific 'Instrument' type for type safety.
    const handleInstrumentToggle = (instrumentId: Instrument) => {
        const list = formData.instruments;
        const newList = list.includes(instrumentId)
            ? list.filter(i => i !== instrumentId)
            : [...list, instrumentId];
        updateForm({ instruments: newList });
    };

    // FIX: Added a specific handler for structure to work with the SongStructurePart[] type.
    const handleStructureToggle = (section: SongStructurePart['section']) => {
        const isSelected = formData.structure.some(p => p.section === section);
        if (isSelected) {
            // This simple component can only remove all instances of a section
            updateForm({ structure: formData.structure.filter(p => p.section !== section) });
        } else {
            // Add a default part for this section
            const newPart: SongStructurePart = { id: Date.now(), section, bars: 8 };
            updateForm({ structure: [...formData.structure, newPart] });
        }
    };

    return (
        // FIX: Add missing required 'stepKey' prop.
        <StepWrapper title="Arrangement" stepKey={4}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <h3 className="font-semibold mb-3 text-lg text-gray-300">Song Structure</h3>
                    <div className="space-y-2">
                        {STRUCTURE_SECTIONS.map(part => (
                            <MultiOptionButton
                                key={part}
                                label={part}
                                // FIX: Updated logic to check for section in array of objects.
                                isSelected={formData.structure.some(p => p.section === part)}
                                // FIX: Use the new handler for structure.
                                onClick={() => handleStructureToggle(part)}
                            />
                        ))}
                    </div>
                </div>
                <div>
                    <h3 className="font-semibold mb-3 text-lg text-gray-300">Instrumentation</h3>
                    <div className="space-y-2 max-h-64 overflow-y-auto pr-2">
                        {INSTRUMENTS.map(instrument => (
                            <MultiOptionButton
                                // FIX: Use instrument.id for the key.
                                key={instrument.id}
                                // FIX: Create label from instrument object properties.
                                label={`${instrument.id} ${instrument.emoji}`}
                                // FIX: Check for instrument.id in the instruments array.
                                isSelected={formData.instruments.includes(instrument.id)}
                                // FIX: Use the new handler and pass instrument.id.
                                onClick={() => handleInstrumentToggle(instrument.id)}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </StepWrapper>
    );
};

export default Step4Structure;
