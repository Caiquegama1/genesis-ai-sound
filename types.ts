export type LanguageCode = 'pt-BR' | 'en-US' | 'ja-JP' | 'fr-FR' | 'de-DE' | string;
export type PlatformName = 'Suno' | 'Udio' | 'Stable Audio' | 'Soundful' | 'Loudly' | 'Boomy' | 'Other';
export type Profile = 'Cantor' | 'Compositor' | 'Produtor';
export type Mode = 'Free' | 'Pro';
export type Genre = 'Pop' | 'Gospel' | 'HipHop' | 'Sertanejo' | 'Funk' | 'Pagode' | string;
export type Instrument = 'Violão' | 'Guitarra' | 'Bass' | 'Drum' | 'Keys' | 'Synth' | 'Pad' | 'Sopro' | 'Cordas' | 'Backing Vocals';
export type ProInstrumentFormat = 'STUDIO_CLEAN' | 'LIVE_TAKE' | 'VINTAGE_ANALOG' | 'LOFI_TEXTURE' | 'CINEMATIC_WIDE';
export type MixMasterPreset = 'CLEAN_MODERN' | 'LOUD_PUNCHY' | 'WARM_VINTAGE' | 'WIDE_CINEMATIC' | 'MINIMAL_ACOUSTIC';
export type StartMode = 'ZERO' | 'AUDIO_REF';

export interface SongStructurePart {
  id: number;
  section: 'Intro' | 'Verso' | 'Pré-Refrão' | 'Refrão' | 'Ponte';
  bars: 4 | 8 | 16;
}

export interface FormData {
  language: LanguageCode;
  otherLanguage: string;
  platform: PlatformName;
  otherPlatform: string;
  profile: Profile;
  mode: Mode;
  startMode: StartMode;
  audioRefFidelity: number;
  // FIX: Replaced keyRoot and keyMode with keyIndex to support the new arrow-based key selector.
  keyIndex: number;
  bpm: number;
  genre: Genre;
  otherGenre: string;
  subgenre: string;
  otherSubgenre: string;
  structure: SongStructurePart[];
  instruments: Instrument[];
  otherInstruments: string;
  mainInstruments: Instrument[];
  proInstrumentFormats: Record<Instrument, ProInstrumentFormat>;
  detailOnlyMainInstruments: boolean;
  mixMaster: MixMasterPreset;
  charLimit: number;
}

export interface StepProps {
  formData: FormData;
  updateForm: (data: Partial<FormData>) => void;
  t: (key: string, options?: any) => string;
}
