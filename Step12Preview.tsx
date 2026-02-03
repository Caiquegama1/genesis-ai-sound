
import React, { useState, useEffect } from 'react';
import type { FormData } from '../types';
import StepWrapper from '../components/StepWrapper';
// FIX: Import MUSICAL_KEYS to be used with keyIndex.
import { MUSICAL_KEYS } from '../constants';

interface PreviewProps {
    formData: FormData;
}

const generatePrompt = (data: FormData): string => {
    const langInfo = data.language === 'ja-JP' 
        ? `Primary language for any vocals or text is Japanese (日本語).`
        : `Primary language for any vocals or text is ${data.language}.`;

    const parts = [
        `Primary goal: Create a music track for a ${data.profile} intended for ${data.platform}.`,
        langInfo,
        // FIX: Replaced non-existent 'key' property with keyIndex and MUSICAL_KEYS array.
        `Core style: A ${data.genre} song in the key of ${MUSICAL_KEYS[data.keyIndex]} at ${data.bpm} BPM.`,
    ];

    if (data.structure.length > 0) {
        // FIX: Correctly format the structure array of objects into a string.
        const structureText = data.structure.map(p => `${p.section} (${p.bars} bars)`).join(', ');
        parts.push(`Song Structure: ${structureText}.`);
    }

    if (data.instruments.length > 0) {
        parts.push(`Key Instruments: ${data.instruments.join(', ')}.`);
    }

    parts.push(`Mix/Master style should be ${data.mixMaster}.`);
    parts.push(`Important: Avoid using names of real artists or bands for stylistic inspiration. Focus on descriptive terms.`);

    let fullPrompt = parts.join(' ');
    
    if (fullPrompt.length > data.charLimit) {
        // A simple truncation strategy
        fullPrompt = fullPrompt.substring(0, data.charLimit).trim();
        // Ensure it doesn't end mid-word
        fullPrompt = fullPrompt.substring(0, Math.min(fullPrompt.length, fullPrompt.lastIndexOf(" ")));
        fullPrompt += '...';
    }

    return fullPrompt;
};


const Step12Preview: React.FC<PreviewProps> = ({ formData }) => {
    const [promptText, setPromptText] = useState('');
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        setPromptText(generatePrompt(formData));
    }, [formData]);

    const handleCopy = () => {
        navigator.clipboard.writeText(promptText);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        // FIX: Add missing required 'stepKey' prop.
        <StepWrapper title="Your Final Prompt" stepKey={12}>
            <div className="relative">
                <pre className="bg-gray-900 p-4 rounded-lg text-gray-300 whitespace-pre-wrap font-mono text-sm overflow-x-auto border border-gray-700 min-h-[150px]">
                    <code>
                        {promptText}
                    </code>
                </pre>
                <button
                    onClick={handleCopy}
                    className="absolute top-2 right-2 px-3 py-1 text-sm bg-gray-700 hover:bg-gray-600 rounded-md transition-colors"
                    aria-label="Copy prompt to clipboard"
                >
                    {copied ? 'Copied!' : 'Copy'}
                </button>
            </div>
            <div className="text-right mt-2 font-mono text-xs text-gray-400">
                {promptText.length} / {formData.charLimit} characters
            </div>
        </StepWrapper>
    );
};

export default Step12Preview;
