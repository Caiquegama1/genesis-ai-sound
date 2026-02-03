
import React, { useState, useEffect } from 'react';
import type { FormData, StepProps } from '../types';
import StepWrapper from '../components/StepWrapper';
// FIX: Import MUSICAL_KEYS to be used with keyIndex.
import { MUSICAL_KEYS } from '../constants';

const generatePrompt = (data: FormData): string => {
    const finalGenre = data.genre === 'Other' ? data.otherGenre : data.genre;
    
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
        'CLEAN_MODERN': 'Mix/Master: Clean, modern, and ready for streaming.',
        'LOUD_PUNCHY': 'Mix/Master: Loud & Punchy, targeting -9 LUFS. A professional, competitive master.',
        'WARM_VINTAGE': 'Mix/Master: Warm, vintage feel, around -12 LUFS, with analog character. Streaming-ready master.',
        'WIDE_CINEMATIC': 'Mix/Master: Wide, cinematic, and dynamic. Streaming-ready master.',
        'MINIMAL_ACOUSTIC': 'Mix/Master: Minimal, acoustic, focusing on natural dynamics. Streaming-ready master.'
    }[data.mixMaster];
    
    const parts = [
        // FIX: Replaced non-existent 'key' property with keyIndex and MUSICAL_KEYS array.
        `[${finalGenre}] song in ${MUSICAL_KEYS[data.keyIndex]} at ${data.bpm} BPM.`,
        `Intention: ${profileIntentions[data.mode][data.profile]}`,
    ];

    if(structureText) parts.push(`Structure: ${structureText}.`);
    if(instrumentsText) parts.push(instrumentsText.trim());

    if (data.mode === 'Pro' && data.instruments.length > 0) {
        let formatsToDetail = data.instruments;
        if (data.detailOnlyMainInstruments && data.instruments.length > 3) {
            formatsToDetail = data.instruments.slice(0, 3);
        }
        const formatStrings = formatsToDetail.map(inst => {
            const format = data.proInstrumentFormats[inst] || 'STUDIO_CLEAN';
            return `${inst}=${format.replace('_', ' ')}`;
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

const Step12Final: React.FC<Pick<StepProps, 'formData' | 't'>> = ({ formData, t }) => {
    const [promptText, setPromptText] = useState('');
    const [copied, setCopied] = useState(false);

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

    return (
        <StepWrapper title={t('final.title')} stepKey={12}>
            <div className="relative">
                <pre className="bg-[#111111] p-4 rounded-lg text-white/90 whitespace-pre-wrap font-mono text-sm overflow-x-auto border border-[#444444] min-h-[200px]">
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
            <div className="text-right mt-2 font-mono text-xs text-[#9A9A9A]">
                {promptText.length} / {formData.charLimit} {t('final.chars')}
            </div>
        </StepWrapper>
    );
};

export default Step12Final;
