import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, BookOpen, Sun, Moon, Play, Square, Award, Sparkles, ArrowRight } from 'lucide-react';
import { FoundationData } from '../data/foundationContent';
import { chantAudio } from '../utils/audioChant';

interface ResourcesPageProps {
  data: FoundationData;
  onNavigate: (page: string) => void;
}

export const ResourcesPage: React.FC<ResourcesPageProps> = ({ data, onNavigate }) => {
  const [activeMantraTab, setActiveMantraTab] = useState<'opening' | 'closing'>('opening');
  const [isPlayingChant, setIsPlayingChant] = useState(false);
  const [activeLimbIndex, setActiveLimbIndex] = useState(0);

  useEffect(() => {
    chantAudio.onStateChange((playing) => {
      setIsPlayingChant(playing);
    });
    return () => {
      chantAudio.stop();
    };
  }, []);

  const handlePlayChant = () => {
    if (isPlayingChant) {
      chantAudio.stop();
    } else {
      chantAudio.playMeditativeDrone(16);
    }
  };

  const currentMantra = activeMantraTab === 'opening'
    ? data.ashtangaResources.openingMantra
    : data.ashtangaResources.closingMantra;

  return (
    <div className="space-y-16 lg:space-y-24 py-8">
      {/* Header */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <span className="text-xs uppercase tracking-widest text-amber-800 font-semibold">
          Sādhanā & Sacred Study
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-stone-900 font-medium tracking-tight text-balance">
          {data.ashtangaResources.title}
        </h1>
        <p className="text-stone-600 text-base sm:text-lg max-w-2xl mx-auto font-light leading-relaxed">
          {data.ashtangaResources.introduction}
        </p>
        <div className="w-16 h-0.5 bg-amber-800 mx-auto mt-6" />
      </section>

      {/* Hero Visual Feature */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-xl overflow-hidden shadow-xl border border-stone-200 aspect-[16/9] lg:aspect-[21/9] bg-stone-200">
          <img
            src={data.ashtangaResources.image}
            alt="Ancient palm leaf manuscript and sacred prayer beads"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/30 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 text-stone-100 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs uppercase tracking-widest text-amber-300 font-medium">
                Vedic Oral Heritage & Scriptural Wisdom
              </span>
              <h3 className="font-serif text-2xl text-stone-100 font-medium mt-1">
                Preserving Sound Resonance (Nāda Yoga)
              </h3>
            </div>
            <button
              onClick={handlePlayChant}
              className="flex items-center gap-2 px-4 py-2.5 bg-amber-800 hover:bg-amber-700 text-stone-100 rounded-md text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer self-start sm:self-auto"
            >
              {isPlayingChant ? (
                <>
                  <Square className="w-4 h-4 fill-white" />
                  <span>Stop Sacred Resonance</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-4 h-4" />
                  <span>Play Singing Bowl & Tanpura</span>
                </>
              )}
            </button>
          </div>
        </div>
      </section>

      {/* Mantras Section with Audio Player and Sanskrit/IAST */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl border border-stone-200 shadow-sm overflow-hidden">
          {/* Mantra Selector Tabs */}
          <div className="flex border-b border-stone-200 bg-stone-50">
            <button
              onClick={() => setActiveMantraTab('opening')}
              className={`flex-1 py-4 text-center font-serif text-lg font-medium transition-colors cursor-pointer border-b-2 ${
                activeMantraTab === 'opening'
                  ? 'border-amber-900 text-amber-900 bg-white font-semibold'
                  : 'border-transparent text-stone-600 hover:text-stone-900'
              }`}
            >
              Opening Mantra (Invocations to Patanjali)
            </button>
            <button
              onClick={() => setActiveMantraTab('closing')}
              className={`flex-1 py-4 text-center font-serif text-lg font-medium transition-colors cursor-pointer border-b-2 ${
                activeMantraTab === 'closing'
                  ? 'border-amber-900 text-amber-900 bg-white font-semibold'
                  : 'border-transparent text-stone-600 hover:text-stone-900'
              }`}
            >
              Mangala Mantra (Closing Peace Chant)
            </button>
          </div>

          <div className="p-8 sm:p-12 space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-100">
              <div>
                <span className="text-xs uppercase tracking-widest text-amber-800 font-semibold">
                  Sanskrit Recitation
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-medium text-stone-900 mt-0.5">
                  {currentMantra.title}
                </h3>
              </div>

              <button
                onClick={handlePlayChant}
                className={`flex items-center gap-2 px-4 py-2 rounded-md text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer self-start sm:self-auto ${
                  isPlayingChant
                    ? 'bg-amber-900 text-white'
                    : 'bg-stone-100 text-stone-800 hover:bg-stone-200'
                }`}
              >
                {isPlayingChant ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                <span>{isPlayingChant ? 'Mute Chime Drone' : 'Play Meditative Drone'}</span>
              </button>
            </div>

            {/* Devanagari Sanskrit */}
            <div className="space-y-2">
              <span className="text-xs uppercase tracking-wider text-stone-500 font-medium">
                Devanāgarī Script
              </span>
              <div className="p-6 bg-[#FAF7F2] rounded-lg border border-amber-900/20 text-stone-900 font-serif text-xl sm:text-2xl leading-loose whitespace-pre-line text-center">
                {currentMantra.sanskrit}
              </div>
            </div>

            {/* IAST Roman Transliteration */}
            <div className="space-y-2">
              <span className="text-xs uppercase tracking-wider text-stone-500 font-medium">
                IAST Roman Transliteration (Pronunciation Guide)
              </span>
              <div className="p-6 bg-stone-50 rounded-lg border border-stone-200 text-stone-800 text-sm sm:text-base font-serif italic leading-relaxed whitespace-pre-line text-center">
                {currentMantra.transliteration}
              </div>
            </div>

            {/* English Translation */}
            <div className="space-y-2">
              <span className="text-xs uppercase tracking-wider text-stone-500 font-medium">
                Spiritual Translation & Meaning
              </span>
              <div className="p-6 bg-white rounded-lg border border-stone-200 text-stone-700 text-sm sm:text-base leading-relaxed whitespace-pre-line">
                {currentMantra.translation}
              </div>
            </div>

            <p className="text-xs text-stone-500 italic text-center">
              {currentMantra.audioNote}
            </p>
          </div>
        </div>
      </section>

      {/* The 8 Limbs of Patanjali Ashtanga Yoga */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-xs uppercase tracking-widest text-amber-800 font-semibold">
            Maharishi Patanjali's Yoga Sutras
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-stone-900 font-medium">
            The Eight Limbs of Ashtanga Yoga
          </h2>
          <p className="text-stone-600 text-sm">
            Ashtanga literally signifies eight limbs (ashta = eight, anga = limb). An organic, interconnected tree of consciousness rather than a linear ladder.
          </p>
        </div>

        {/* 8 Limbs Interactive Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          {data.ashtangaResources.eightLimbs.map((limb, idx) => (
            <button
              key={limb.limbNumber}
              onClick={() => setActiveLimbIndex(idx)}
              className={`p-3.5 rounded-lg border text-left transition-all cursor-pointer ${
                activeLimbIndex === idx
                  ? 'border-amber-900 bg-amber-900 text-white shadow-sm'
                  : 'border-stone-200 bg-white hover:border-amber-700/50 text-stone-800'
              }`}
            >
              <span className={`text-[11px] font-mono block ${activeLimbIndex === idx ? 'text-amber-200' : 'text-amber-800 font-semibold'}`}>
                Limb 0{limb.limbNumber}
              </span>
              <span className="font-serif text-base font-semibold block mt-0.5">
                {limb.sanskritName}
              </span>
              <span className={`text-xs truncate block ${activeLimbIndex === idx ? 'text-stone-200' : 'text-stone-500'}`}>
                {limb.englishName}
              </span>
            </button>
          ))}
        </div>

        {/* Selected Limb Deep-Dive Card */}
        {(() => {
          const limb = data.ashtangaResources.eightLimbs[activeLimbIndex];
          return (
            <div className="p-8 sm:p-10 bg-[#FAF7F2] rounded-xl border border-stone-300 shadow-sm space-y-4">
              <div className="flex items-center justify-between text-xs text-amber-900 font-medium uppercase tracking-wider">
                <span>Patanjali Yoga Sutra System</span>
                <span>Limb {limb.limbNumber} of 8</span>
              </div>
              <h3 className="font-serif text-3xl text-stone-900 font-medium">
                {limb.limbNumber}. {limb.sanskritName} — {limb.englishName}
              </h3>
              <p className="text-stone-700 text-base leading-relaxed">
                {limb.meaning}
              </p>
              <div className="pt-4 border-t border-stone-200/80">
                <span className="text-xs font-semibold uppercase tracking-wider text-stone-600 block mb-1">
                  Living the Practice (Everyday Application):
                </span>
                <p className="text-stone-800 text-sm leading-relaxed">
                  {limb.practicalApplication}
                </p>
              </div>
            </div>
          );
        })()}
      </section>

      {/* Moon Days & Vinyasa Chikitsa Principles */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Moon Days */}
          <div className="p-8 bg-white rounded-xl border border-stone-200 shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-amber-800 font-semibold">
              <Moon className="w-4 h-4 text-amber-800" />
              <span>Rest & Cosmic Tides</span>
            </div>
            <h3 className="font-serif text-2xl font-medium text-stone-900">
              Why We Observe Moon Days
            </h3>
            <p className="text-stone-600 text-sm leading-relaxed">
              In the Mysore tradition, asana practice is suspended on full moon (Purnima) and new moon (Amavasya) days. The human body is composed of over 70% water; just as the gravitational pull of the moon controls oceanic tides, it produces energetic peaks and valleys within us. Rest on these days prevents physical strain and promotes internal introspection.
            </p>
          </div>

          {/* Vinyasa Chikitsa */}
          <div className="p-8 bg-white rounded-xl border border-stone-200 shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-amber-800 font-semibold">
              <Sun className="w-4 h-4 text-amber-800" />
              <span>Yoga Chikitsa (Primary Series)</span>
            </div>
            <h3 className="font-serif text-2xl font-medium text-stone-900">
              The Healing Science of Vinyasa
            </h3>
            <p className="text-stone-600 text-sm leading-relaxed">
              The Primary Series of Ashtanga is called <em>Yoga Chikitsa</em>, which translates to &ldquo;yoga therapy&rdquo;. It realigns the skeletal structure, detoxifies the internal organs, and purifies the 72,000 nadis (energy channels) through internal heat (tapas), disciplined sweating, and synchronized deep breathing.
            </p>
          </div>
        </div>
      </section>

      {/* Recommended Sacred Readings */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <span className="text-xs uppercase tracking-widest text-amber-800 font-semibold">
            Svādhyāya (Self-Study)
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-stone-900 font-medium">
            Recommended Sacred Reading
          </h2>
          <p className="text-stone-600 text-sm">
            Authoritative texts foundational to the study of Ashtanga Yoga and Advaita Vedanta.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {data.ashtangaResources.recommendedReadings.map((book, idx) => (
            <div
              key={idx}
              className="p-6 bg-white rounded-xl border border-stone-200 shadow-sm space-y-2 hover:border-amber-800/40 transition-colors"
            >
              <BookOpen className="w-5 h-5 text-amber-800 mb-1" />
              <h4 className="font-serif text-lg font-semibold text-stone-900">
                {book.title}
              </h4>
              <p className="text-xs font-medium text-amber-900">
                {book.author}
              </p>
              <p className="text-stone-600 text-xs leading-relaxed pt-1">
                {book.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
