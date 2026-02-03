
import React from 'react';
import type { StepProps, Instrument, ProInstrumentFormat } from '../types';
import { PRO_INSTRUMENT_FORMATS } from '../constants';
import StepWrapper from '../components/StepWrapper';

const Step13ProInstrumentFormats: React.FC<StepProps> = ({ formData, updateForm, t }) => {
    
    // This step is conditionally rendered in App.tsx, but this is a fallback.
    if (formData.mode !== 'Pro') {
        return (
             <StepWrapper title={t('step.pro_formats')} stepKey={13}>
                <div className="text-center text-[#9A9A9A] p-8">
                    <p>{t('pro_formats.not_pro')}</p>
                </div>
            </StepWrapper>
        );
    }

    const handleFormatChange = (instrument: Instrument, format: ProInstrumentFormat) => {
        updateForm({
            proInstrumentFormats: {
                ...formData.proInstrumentFormats,
                [instrument]: format,
            }
        });
    };

    const toggleMainInstrument = (instrument: Instrument) => {
        const isMain = formData.mainInstruments.includes(instrument);
        let newMains = [...formData.mainInstruments];
        if (isMain) {
            newMains = newMains.filter(item => item !== instrument);
        } else if (newMains.length < 3) {
            newMains.push(instrument);
        }
        updateForm({ mainInstruments: newMains });
    };

    return (
        <StepWrapper title={t('pro_formats.title')} stepKey={13}>
            {formData.instruments.length === 0 ? (
                <p className="text-center text-[#9A9A9A] p-4">Select instruments in the previous step.</p>
            ) : (
                <div className="space-y-4 max-h-80 overflow-y-auto pr-2">
                    {formData.instruments.map(instrument => {
                        const isMain = formData.mainInstruments.includes(instrument);
                        return (
                            <div key={instrument} className="grid grid-cols-12 items-center gap-2">
                                <label htmlFor={`format-${instrument}`} className="col-span-4 font-semibold text-right">{instrument}</label>
                                <select
                                    id={`format-${instrument}`}
                                    value={formData.proInstrumentFormats[instrument] || 'STUDIO_CLEAN'}
                                    onChange={(e) => handleFormatChange(instrument, e.target.value as ProInstrumentFormat)}
                                    className="col-span-6 w-full p-2 bg-[#111111] border border-[#444444] rounded-lg focus:ring-2 focus:ring-[#E10600] focus:border-[#E10600]"
                                >
                                    {PRO_INSTRUMENT_FORMATS.map(format => (
                                        <option key={format} value={format}>{t(`format.${format}`)}</option>
                                    ))}
                                </select>
                                <button
                                    title={t('pro_formats.mark_main')}
                                    onClick={() => toggleMainInstrument(instrument)}
                                    className={`col-span-2 flex justify-center items-center text-2xl transition-colors ${
                                        isMain ? 'text-[#00C853]' : 'text-[#9A9A9A] hover:text-white'
                                    }`}
                                >
                                    ★
                                </button>
                            </div>
                        );
                    })}
                    <div className="pt-4 flex items-center justify-center">
                        <input
                            type="checkbox"
                            id="detail-toggle"
                            checked={formData.detailOnlyMainInstruments}
                            onChange={(e) => updateForm({ detailOnlyMainInstruments: e.target.checked })}
                            className="h-4 w-4 rounded border-[#444444] bg-[#111111] text-[#E10600] focus:ring-[#E10600] accent-[#E10600]"
                        />
                        <label htmlFor="detail-toggle" className="ml-2 block text-sm text-white">
                            {t('pro_formats.detail_toggle')}
                        </label>
                    </div>
                </div>
            )}
        </StepWrapper>
    );
};

export default Step13ProInstrumentFormats;
