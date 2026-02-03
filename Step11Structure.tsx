
import React, { useState } from 'react';
import type { StepProps, SongStructurePart } from '../types';
import { STRUCTURE_SECTIONS, STRUCTURE_BARS } from '../constants';
import StepWrapper from '../components/StepWrapper';

const Step11Structure: React.FC<StepProps> = ({ formData, updateForm, t }) => {
    const [selectedBars, setSelectedBars] = useState<SongStructurePart['bars']>(8);

    const addPart = (section: SongStructurePart['section']) => {
        const newPart: SongStructurePart = {
            id: Date.now(),
            section,
            bars: selectedBars,
        };
        updateForm({ structure: [...formData.structure, newPart] });
    };
    
    const removePart = (id: number) => {
        updateForm({ structure: formData.structure.filter(p => p.id !== id) });
    };

    const movePart = (index: number, direction: 'left' | 'right') => {
        const newStructure = [...formData.structure];
        const targetIndex = direction === 'left' ? index - 1 : index + 1;
        if (targetIndex < 0 || targetIndex >= newStructure.length) return;
        [newStructure[index], newStructure[targetIndex]] = [newStructure[targetIndex], newStructure[index]];
        updateForm({ structure: newStructure });
    };

    const undo = () => {
        updateForm({ structure: formData.structure.slice(0, -1) });
    };
    
    const clear = () => {
        updateForm({ structure: [] });
    }

    return (
        <StepWrapper title={t('step.structure')} stepKey={11}>
            <div className="bg-black/50 p-4 rounded-lg border border-[#444444]">
                <h3 className="text-lg font-semibold text-center mb-4">{t('structure.build_title')}</h3>
                
                <div className="text-center mb-4">
                    <span className="mr-4 font-semibold">{t('structure.bars')}:</span>
                    {STRUCTURE_BARS.map(bars => (
                        <button 
                            key={bars}
                            onClick={() => setSelectedBars(bars)}
                            className={`px-4 py-1 mx-1 rounded-full text-sm font-bold transition-colors ${
                                selectedBars === bars ? 'bg-[#00C853] text-white' : 'bg-[#444444] hover:bg-[#555555]'
                            }`}
                        >{bars}</button>
                    ))}
                </div>

                <div className="grid grid-cols-3 md:grid-cols-5 gap-2 mb-4">
                    {STRUCTURE_SECTIONS.map(section => (
                        <button key={section} onClick={() => addPart(section)} className="p-2 bg-[#E10600] text-white hover:bg-[#ff1a1a] rounded-md transition-colors">{section}</button>
                    ))}
                </div>

                <div className="flex justify-center space-x-2 mb-4">
                     <button onClick={undo} disabled={formData.structure.length === 0} className="px-3 py-1 text-sm bg-[#444444] hover:bg-[#555555] rounded-md disabled:opacity-50 disabled:cursor-not-allowed">{t('structure.undo')}</button>
                     <button onClick={clear} disabled={formData.structure.length === 0} className="px-3 py-1 text-sm bg-[#444444] hover:bg-[#555555] rounded-md disabled:opacity-50 disabled:cursor-not-allowed">{t('structure.clear')}</button>
                </div>
            </div>

            <div className="mt-4 bg-[#111111] p-2 rounded-lg min-h-[100px] border border-[#444444]">
                {formData.structure.length === 0 ? (
                    <p className="text-center text-[#9A9A9A] p-4">{t('structure.min_blocks')}</p>
                ) : (
                    <div className="flex flex-wrap gap-2">
                        {formData.structure.map((part, index) => (
                            <div key={part.id} className="bg-[#00C853] text-white p-2 rounded-md flex items-center text-sm animate-fade-in">
                               <button onClick={() => movePart(index, 'left')} disabled={index === 0} className="px-1 disabled:opacity-30">‹</button>
                                <span>{part.section} ({part.bars})</span>
                               <button onClick={() => movePart(index, 'right')} disabled={index === formData.structure.length - 1} className="px-1 disabled:opacity-30">›</button>
                                <button onClick={() => removePart(part.id)} className="ml-2 text-white hover:text-black font-bold">×</button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </StepWrapper>
    );
};

export default Step11Structure;
