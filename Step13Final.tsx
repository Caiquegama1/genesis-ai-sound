
import React, { useState, useEffect } from 'react';
import type { FormData, StepProps } from '../types';
// FIX: Import MUSICAL_KEYS to be used with keyIndex.
import { PLATFORM_CONFIG, MUSICAL_KEYS } from '../constants';
import StepWrapper from '../components/StepWrapper';

const generatePrompt = (data: FormData): string => {
    const finalGenre = data.genre === 'Other' ? data.otherGenre : data.genre;
    const finalSubgenre = data.subgenre === 'Other' ? data.otherSubgenre : data.subgenre;
    
    const profileIntentions = {
        'Free': {
            'Cantor': 'Simplified intention: A clear lead vocal performance.',
            'Compositor': 'Simplified intention: A song with a strong emotional feel.',
            'Produtor': 'Simplified intention: A full and balanced arrangement.',
        },
        'Pro': {
            'Cantor': 'Focus on a lead vocal performance with a relatively sparse arrangement to highlight the voice.',
            'Compositor': 'Emphasize emotional depth, harmonic complexity, and a strong narrative feel.',
            'Produtor': 'Create a full, technically detailed arrangement with distinct layers and production quality in mind.',
        }
    };
    
    const structureText = data.structure.length > 0 
        ? data.structure.map(p => `[${p.section} ${p.bars} bars]`).join(', ')
        : '';

    let instrumentsText = data.instruments.length > 0 ? `Instruments: ${data.instruments.join(', ')}.` : '';
    if (data.otherInstruments) {
        instrumentsText += `${instrumentsText ? ' ' : ''}Also include: ${data.otherInstruments}.`;
    }

    const mixMasterText = {
        'CLEAN_MODERN': 'Mix/Master: Clean, modern, and streaming-ready.',
        'LOUD_PUNCHY': 'Mix/Master: Loud & Punchy, targeting -9 LUFS. A professional, competitive, streaming-ready master.',
        'WARM_VINTAGE': 'Mix/Master: Warm, vintage feel, around -12 LUFS, with analog character. Streaming-ready master.',
        'WIDE_CINEMATIC': 'Mix/Master: Wide, cinematic, and dynamic. Streaming-ready master.',
        'MINIMAL_ACOUSTIC': 'Mix/Master: Minimal, acoustic, focusing on natural dynamics. Streaming-ready master.'
    }[data.mixMaster];
    
    const parts = [
        // FIX: Replaced non-existent 'key' property with keyIndex and MUSICAL_KEYS array.
        `[${finalGenre} - ${finalSubgenre}] song in ${MUSICAL_KEYS[data.keyIndex]} at ${data.bpm} BPM.`,
        `Intention: ${profileIntentions[data.mode][data.profile]}`,
    ];

    if(structureText) parts.push(`Structure: ${structureText}.`);
    if(instrumentsText) parts.push(instrumentsText.trim());

    if (data.mode === 'Pro' && data.instruments.length > 0) {
        let instrumentsToDetail = data.instruments;
        if (data.detailOnlyMainInstruments) {
            instrumentsToDetail = data.mainInstruments.length > 0 ? data.mainInstruments : data.instruments.slice(0, 3);
        }
        
        const formatStrings = instrumentsToDetail.map(inst => {
            const format = data.proInstrumentFormats[inst] || 'STUDIO_CLEAN';
            return `${inst}=${format.replace(/_/g, ' ')}`;
        });

        if (formatStrings.length > 0) {
            parts.push(`Instrument formats: ${formatStrings.join('; ')}.`);
        }
    }

    parts.push(mixMasterText);

    let fullPrompt = parts.join('\n');
    
    if (fullPrompt.length > data.charLimit) {
        fullPrompt = fullPrompt.substring(0, data.charLimit).trim() + '...';
    }

    return fullPrompt;
};

const Step13Final: React.FC<Pick<StepProps, 'formData' | 't'> & { handleCreateNew: () => void; }> = ({ formData, t, handleCreateNew }) => {
    const [promptText, setPromptText] = useState('');
    const [copied, setCopied] = useState(false);
    const [isResetting, setIsResetting] = useState(false);

    useEffect(() => {
        setPromptText(generatePrompt(formData));
    }, [formData]);

    const handleCopy = () => {
        if (!navigator.clipboard) return;
        navigator.clipboard.writeText(promptText).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };

    const handleCreateNewClick = () => {
        setIsResetting(true);
        setTimeout(() => {
            handleCreateNew();
        }, 300);
    };

    return (
        <StepWrapper title={t('final.title')} stepKey={13}>
            <div className="relative">
                <pre className="bg-[#111111] p-4 rounded-lg text-white/90 whitespace-pre-wrap font-mono text-sm overflow-x-auto border border-[#444444] min-h-[250px]">
                    <code>
                        {promptText}
                    </code>
                </pre>
                <button
                    onClick={handleCopy}
                    className="absolute top-2 right-2 px-3 py-1 text-sm bg-[#444444] text-white hover:bg-[#555555] rounded-md transition-colors"
                    aria-label="Copy prompt to clipboard"
                >
                    {copied ? t('final.copied') : t('final.copy')}
                </button>
            </div>
             <div className="mt-4 flex justify-between items-center">
                <div className="font-mono text-xs text-[#9A9A9A]">
                    {promptText.length} / {formData.charLimit} {t('final.chars')}
                </div>
                <button
                    onClick={handleCreateNewClick}
                    className={`px-5 py-2 font-semibold text-white rounded-md shadow-sm transition-colors ${
                        isResetting
                            ? 'bg-[#00C853]'
                            : 'bg-[#E10600] hover:bg-[#ff1a1a]'
                    }`}
                >
                    {t('final.create_new')}
                </button>
            </div>
        </StepWrapper>
    );
};

export default Step13Final;
