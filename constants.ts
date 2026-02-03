
import type { FormData, Instrument, ProInstrumentFormat, SongStructurePart, PlatformName, Mode, LanguageCode, Genre } from './types';

export const LANGUAGES = [
    { code: 'pt-BR', name: 'Português' },
    { code: 'en-US', name: 'English' },
    { code: 'ja-JP', name: '日本語' },
    { code: 'fr-FR', name: 'Français' },
    { code: 'de-DE', name: 'Deutsch' },
    { code: 'Other', name: 'Other' },
];

interface PlatformConfig {
    id: PlatformName;
    name: string;
    promptLanguage: LanguageCode;
    charLimit: number;
    supportedModes: Mode[];
}

export const PLATFORM_CONFIG: Record<PlatformName, PlatformConfig> = {
    'Suno': { id: 'Suno', name: 'Suno', promptLanguage: 'en-US', charLimit: 4000, supportedModes: ['Free', 'Pro'] },
    'Udio': { id: 'Udio', name: 'Udio', promptLanguage: 'en-US', charLimit: 4000, supportedModes: ['Pro'] },
    'Stable Audio': { id: 'Stable Audio', name: 'Stable Audio', promptLanguage: 'en-US', charLimit: 4000, supportedModes: ['Pro'] },
    'Soundful': { id: 'Soundful', name: 'Soundful', promptLanguage: 'en-US', charLimit: 2000, supportedModes: ['Free', 'Pro'] },
    'Loudly': { id: 'Loudly', name: 'Loudly', promptLanguage: 'en-US', charLimit: 1000, supportedModes: ['Free'] },
    'Boomy': { id: 'Boomy', name: 'Boomy', promptLanguage: 'en-US', charLimit: 500, supportedModes: ['Free'] },
    'Other': { id: 'Other', name: 'Other', promptLanguage: 'en-US', charLimit: 1000, supportedModes: ['Free'] },
};

export const PROFILES: FormData['profile'][] = ['Cantor', 'Compositor', 'Produtor'];
export const MODES: FormData['mode'][] = ['Free', 'Pro'];
export const GENRES: FormData['genre'][] = ['Pop', 'Gospel', 'HipHop', 'Sertanejo', 'Funk', 'Pagode', 'Other'];

export const ROOT_NOTES: string[] = [ 'C', 'C# / Db', 'D', 'D# / Eb', 'E', 'F', 'F# / Gb', 'G', 'G# / Ab', 'A', 'A# / Bb', 'B' ];
export const KEY_MODES: ('Major' | 'Minor')[] = ['Major', 'Minor'];

// FIX: Added MUSICAL_KEYS array to support the new arrow-based key selector.
export const MUSICAL_KEYS: string[] = [
    'C major',
    'C minor',
    'C# (Db) major',
    'C# (Db) minor',
    'D major',
    'D minor',
    'D# (Eb) major',
    'D# (Eb) minor',
    'E major',
    'E minor',
    'F major',
    'F minor',
    'F# (Gb) major',
    'F# (Gb) minor',
    'G major',
    'G minor',
    'G# (Ab) major',
    'G# (Ab) minor',
    'A major',
    'A minor',
    'A# (Bb) major',
    'A# (Bb) minor',
    'B major',
    'B minor'
];

export const SUBGENRE_SETS: Record<string, string[]> = {
    'Pop': ['Pop Modern', 'Pop Acoustic', 'Pop Dance', 'Pop Ballad', 'Pop Cinematic'],
    'Gospel': ['Worship', 'Gospel Contemporary', 'Gospel Acoustic', 'Gospel Choir', 'Gospel Soul'],
    'HipHop': ['Boom Bap', 'Trap', 'Lo-fi HipHop', 'Melodic Rap', 'Drill'],
    'Sertanejo': ['Sertanejo Universitário', 'Sertanejo Raiz', 'Sertanejo Romântico', 'Sertanejo Vanera', 'Sertanejo Pop'],
    'Funk': ['Funk Carioca', 'Funk Melody', 'Funk Rave', 'Funk Conscious', 'Funk Pop'],
    'Pagode': ['Pagode Romântico', 'Pagode Acústico', 'Pagode 90s', 'Pagode Groove', 'Pagode Moderno'],
};

export const STRUCTURE_SECTIONS: SongStructurePart['section'][] = ['Intro', 'Verso', 'Pré-Refrão', 'Refrão', 'Ponte'];
export const STRUCTURE_BARS: SongStructurePart['bars'][] = [4, 8, 16];

export const INSTRUMENTS: { id: Instrument, emoji: string }[] = [
  { id: 'Violão', emoji: '🎸' },
  { id: 'Guitarra', emoji: '🎸⚡' },
  { id: 'Bass', emoji: '🎸🔊' },
  { id: 'Drum', emoji: '🥁' },
  { id: 'Keys', emoji: '🎹' },
  { id: 'Synth', emoji: '🎛️' },
  { id: 'Pad', emoji: '🌫️' },
  { id: 'Sopro', emoji: '🎺' },
  { id: 'Cordas', emoji: '🎻' },
  { id: 'Backing Vocals', emoji: '🎤🎶' },
];

export const PRO_INSTRUMENT_FORMATS: ProInstrumentFormat[] = ['STUDIO_CLEAN', 'LIVE_TAKE', 'VINTAGE_ANALOG', 'LOFI_TEXTURE', 'CINEMATIC_WIDE'];

export const MIX_MASTER_PRESETS: { id: FormData['mixMaster'], proOnly: boolean }[] = [
  { id: 'CLEAN_MODERN', proOnly: false },
  { id: 'LOUD_PUNCHY', proOnly: true },
  { id: 'WARM_VINTAGE', proOnly: false },
  { id: 'WIDE_CINEMATIC', proOnly: false },
  { id: 'MINIMAL_ACOUSTIC', proOnly: false },
];

export const INITIAL_FORM_DATA: FormData = {
    language: 'pt-BR',
    otherLanguage: '',
    platform: 'Suno',
    otherPlatform: '',
    profile: 'Compositor',
    mode: 'Free',
    startMode: 'ZERO',
    audioRefFidelity: 100,
    // FIX: Updated initial form data to use keyIndex instead of keyRoot and keyMode.
    keyIndex: 0,
    bpm: 120,
    genre: 'Pop',
    otherGenre: '',
    subgenre: '',
    otherSubgenre: '',
    structure: [],
    instruments: [],
    otherInstruments: '',
    mainInstruments: [],
    proInstrumentFormats: {} as Record<Instrument, ProInstrumentFormat>,
    detailOnlyMainInstruments: true,
    mixMaster: 'CLEAN_MODERN',
    charLimit: PLATFORM_CONFIG['Suno'].charLimit,
};
