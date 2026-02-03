
import React, { useState, useCallback, useEffect, useMemo } from 'react';
import type { FormData, PlatformName } from './types';
import { INITIAL_FORM_DATA, PLATFORM_CONFIG } from './constants';
import { useTranslations } from './lib/i18n';
import StepIndicator from './components/StepIndicator';
import Navigation from './components/Navigation';

// Import all step components with their new names
import Step1Language from './steps/Step1Language';
import Step2Slogan from './steps/Step2Slogan';
import Step3Platform from './steps/Step3Platform';
import Step4Mode from './steps/Step4Mode';
import Step5Profile from './steps/Step5Profile';
import Step6StartMode from './steps/Step6StartMode';
import Step7Fidelity from './steps/Step7Fidelity';
import Step8KeyBpm from './steps/Step8KeyBpm';
import Step9Genre from './steps/Step9Genre';
import Step10Subgenre from './steps/Step10Subgenre';
import Step11Structure from './steps/Step11Structure';
import Step12Instruments from './steps/Step12Instruments';
import Step13ProInstrumentFormats from './steps/Step13ProInstrumentFormats';
import Step14MixMaster from './steps/Step14MixMaster';
import Step15Final from './steps/Step15Final';


type AppState = 'loading' | 'splash' | 'running';

const App: React.FC = () => {
    const [appState, setAppState] = useState<AppState>('loading');
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState<FormData>(INITIAL_FORM_DATA);

    const t = useTranslations(formData.language);

    useEffect(() => {
        const t1 = setTimeout(() => setAppState('splash'), 100);
        const t2 = setTimeout(() => setAppState('running'), 1400);
        return () => {
            clearTimeout(t1);
            clearTimeout(t2);
        };
    }, []);

    const handleUpdateForm = useCallback((data: Partial<FormData>) => {
        setFormData(prev => {
            const newState = { ...prev, ...data };

            if (data.platform) {
                const platformConfig = PLATFORM_CONFIG[data.platform as PlatformName] || PLATFORM_CONFIG['Other'];
                newState.charLimit = platformConfig.charLimit;
                if (!platformConfig.supportedModes.includes(newState.mode)) {
                    newState.mode = platformConfig.supportedModes[0];
                }
            }

            if (data.genre && data.genre !== prev.genre) {
                newState.subgenre = '';
                newState.otherSubgenre = '';
            }
            
            return newState;
        });
    }, []);
    
    // The starting step for "create new" is now step 6 (Start Mode).
    const CREATE_NEW_START_STEP = 6;

    const handleCreateNew = () => {
        setFormData(prev => ({
            ...INITIAL_FORM_DATA,
            language: prev.language,
            otherLanguage: prev.otherLanguage,
            platform: prev.platform,
            otherPlatform: prev.otherPlatform,
            profile: prev.profile,
            mode: prev.mode,
            charLimit: prev.charLimit,
        }));
        setCurrentStep(CREATE_NEW_START_STEP); 
    };

    const steps = useMemo(() => {
        const allSteps = [
            { id: 'language', component: <Step1Language formData={formData} updateForm={handleUpdateForm} t={t} /> },
            { id: 'slogan', component: <Step2Slogan t={t} /> },
            { id: 'platform', component: <Step3Platform formData={formData} updateForm={handleUpdateForm} t={t} /> },
            { id: 'mode', component: <Step4Mode formData={formData} updateForm={handleUpdateForm} t={t} /> },
            { id: 'profile', component: <Step5Profile formData={formData} updateForm={handleUpdateForm} t={t} /> },
            { id: 'start_mode', component: <Step6StartMode formData={formData} updateForm={handleUpdateForm} t={t} /> },
        ];

        if (formData.startMode === 'AUDIO_REF') {
             allSteps.push({ id: 'fidelity', component: <Step7Fidelity formData={formData} updateForm={handleUpdateForm} t={t} /> });
        }
        
        allSteps.push(
            { id: 'key_bpm', component: <Step8KeyBpm formData={formData} updateForm={handleUpdateForm} t={t} /> },
            { id: 'genre', component: <Step9Genre formData={formData} updateForm={handleUpdateForm} t={t} /> },
            { id: 'subgenre', component: <Step10Subgenre formData={formData} updateForm={handleUpdateForm} t={t} /> },
            { id: 'structure', component: <Step11Structure formData={formData} updateForm={handleUpdateForm} t={t} /> },
            { id: 'instruments', component: <Step12Instruments formData={formData} updateForm={handleUpdateForm} t={t} /> },
        );

        if (formData.mode === 'Pro') {
            allSteps.push({ id: 'pro_formats', component: <Step13ProInstrumentFormats formData={formData} updateForm={handleUpdateForm} t={t} /> });
        }

        allSteps.push(
             { id: 'mix_master', component: <Step14MixMaster formData={formData} updateForm={handleUpdateForm} t={t} /> },
             { id: 'final', component: <Step15Final formData={formData} t={t} handleCreateNew={handleCreateNew} /> }
        );

        // Add step number to each object
        return allSteps.map((step, index) => ({ ...step, number: index + 1 }));

    }, [formData, t, handleUpdateForm]);

    const totalSteps = steps.length;
    const currentStepConfig = steps[currentStep - 1];
    
    const isNextDisabled = () => {
        if (!currentStepConfig) return true;
        
        if (currentStepConfig.id === 'subgenre' && !formData.subgenre && formData.genre !== 'Other') return true;
        if (currentStepConfig.id === 'subgenre' && formData.genre === 'Other' && !formData.otherSubgenre) return true;
        if (currentStepConfig.id === 'structure' && formData.structure.length === 0) return true;
        
        return false;
    }

    const handleNext = () => {
        if (isNextDisabled()) return;
        setCurrentStep(prev => Math.min(prev + 1, totalSteps));
    };

    const handleBack = () => {
        setCurrentStep(prev => Math.max(prev - 1, 1));
    };

    const isSplashActive = appState === 'loading' || appState === 'splash';

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-black font-sans">
            <header 
                className={`text-center w-full transition-all duration-1000 ease-in-out ${
                    isSplashActive
                    ? 'absolute top-1/2 -translate-y-1/2'
                    : 'relative mb-8'
                }`}
            >
                <h1 className={`text-4xl md:text-5xl font-bold tracking-tight text-white transition-all duration-1000 ease-in-out ${
                    appState === 'splash' ? 'opacity-100 scale-105' : 
                    appState === 'running' ? 'opacity-100 scale-100' : 
                    'opacity-0 scale-100'
                }`}>
                    GENESIS AI SOUND
                </h1>
                <p className={`text-[#9A9A9A] mt-2 text-lg transition-opacity duration-700 ${isSplashActive ? 'opacity-0' : 'opacity-100 delay-500'}`}>
                    Craft the perfect prompt for your next AI music masterpiece.
                </p>
            </header>

            <div className={`w-full max-w-3xl transition-opacity duration-700 ${isSplashActive ? 'opacity-0' : 'opacity-100 delay-500'}`}>
                 <main className="w-full bg-[#0A0A0A] rounded-2xl shadow-2xl shadow-[#E10600]/10 border border-[#444444] overflow-hidden">
                    <div className="p-8">
                        <StepIndicator current={currentStep} total={totalSteps} />
                        <div className="mt-8 min-h-[350px]">
                            {currentStepConfig?.component}
                        </div>
                    </div>
                    <Navigation
                        currentStep={currentStep}
                        totalSteps={totalSteps}
                        onBack={handleBack}
                        onNext={handleNext}
                        t={t}
                        isNextDisabled={isNextDisabled()}
                    />
                </main>
                 <footer className="text-center mt-8 text-[#9A9A9A] text-sm">
                    <p>This tool helps build prompts and does not generate audio.</p>
                </footer>
            </div>
        </div>
    );
};

export default App;
