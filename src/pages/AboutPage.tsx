import React from 'react';
import { ArrowRight, Compass, Heart, BookOpen, Shield, Award, Users } from 'lucide-react';
import { FoundationData } from '../data/foundationContent';

interface AboutPageProps {
  data: FoundationData;
  onNavigate: (page: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ data, onNavigate }) => {
  return (
    <div className="space-y-16 lg:space-y-24 py-8">
      {/* Editorial Header */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <span className="text-xs uppercase tracking-widest text-amber-800 font-semibold">
          Lineage · Tradition · Seva
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-stone-900 font-medium tracking-tight text-balance">
          {data.about.title}
        </h1>
        <p className="text-stone-600 text-base sm:text-lg max-w-2xl mx-auto font-light leading-relaxed">
          {data.about.subtitle}
        </p>
        <div className="w-16 h-0.5 bg-amber-800 mx-auto mt-6" />
      </section>

      {/* Hero Shala Feature Image */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-xl overflow-hidden shadow-xl border border-stone-200 aspect-[16/9] bg-stone-200">
          <img
            src={data.about.image}
            alt="Traditional Mysore Yoga Shala hall"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 text-stone-100 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs uppercase tracking-widest text-amber-300 font-medium">
                The Sacred Space · Gokulam, Mysuru
              </span>
              <h3 className="font-serif text-xl sm:text-2xl text-stone-100 font-medium mt-1">
                Where Tradition Meets Daily Devotion
              </h3>
            </div>
            <p className="text-xs text-stone-300 max-w-xs sm:text-right">
              Built with breathable lime plaster, traditional timber beams, and natural morning light.
            </p>
          </div>
        </div>
      </section>

      {/* Dual Pillars: Ashtanga Parampara & Advaita Vedanta */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
          {/* Pillar 1: Ashtanga Lineage */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-amber-800 font-semibold">
              <Award className="w-4 h-4 text-amber-800" />
              <span>Parampara (Direct Transmission)</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl text-stone-900 font-medium">
              {data.about.lineageTitle}
            </h2>
            <div className="w-12 h-0.5 bg-amber-800" />
            <p className="text-stone-700 text-sm sm:text-base leading-relaxed pt-2">
              {data.about.lineageStory}
            </p>
            <div className="pt-2 text-xs text-stone-600 bg-stone-100/80 p-3.5 rounded border border-stone-200 space-y-1">
              <p className="font-medium text-stone-900">Key Pillars of the Method:</p>
              <p>• Tristana: Synchronized union of Ujjayi breath, Bandhas, and Drishti</p>
              <p>• Vinyasa Krama: Systematic progression from Primary Series (Yoga Chikitsa)</p>
              <p>• Mysore Style: Individualized practice adjusted to each student's constitution</p>
            </div>
          </div>

          {/* Pillar 2: Vedanta Inward Crown */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-amber-800 font-semibold">
              <BookOpen className="w-4 h-4 text-amber-800" />
              <span>Jnana (Spiritual Wisdom)</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl text-stone-900 font-medium">
              {data.about.vedantaTitle}
            </h2>
            <div className="w-12 h-0.5 bg-amber-800" />
            <p className="text-stone-700 text-sm sm:text-base leading-relaxed pt-2">
              {data.about.vedantaExplanation}
            </p>
            <div className="pt-2 text-xs text-stone-600 bg-stone-100/80 p-3.5 rounded border border-stone-200 space-y-1">
              <p className="font-medium text-stone-900">Scriptural Study Foundations:</p>
              <p>• The Upanishads (Mundaka, Katha, Mandukya, Chandogya)</p>
              <p>• Maharishi Patanjali's Yoga Sutras (4 Padas)</p>
              <p>• Bhagavad Gita (Synthesis of Karma, Bhakti & Jnana)</p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Callout */}
      <section className="bg-[#F4EFE6] py-16 border-y border-stone-300">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="p-8 bg-white/90 rounded-lg border border-stone-200 space-y-3">
              <div className="flex items-center gap-2 text-amber-900 font-medium text-xs uppercase tracking-widest">
                <Compass className="w-4 h-4" />
                <span>Our Sacred Mission</span>
              </div>
              <h3 className="font-serif text-2xl text-stone-900 font-medium">
                Purity in Practice, Compassion in Action
              </h3>
              <p className="text-stone-700 text-sm leading-relaxed">
                {data.about.mission}
              </p>
            </div>

            <div className="p-8 bg-white/90 rounded-lg border border-stone-200 space-y-3">
              <div className="flex items-center gap-2 text-amber-900 font-medium text-xs uppercase tracking-widest">
                <Shield className="w-4 h-4" />
                <span>Our Enduring Vision</span>
              </div>
              <h3 className="font-serif text-2xl text-stone-900 font-medium">
                Conscious Living for Global Harmony
              </h3>
              <p className="text-stone-700 text-sm leading-relaxed">
                {data.about.vision}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-widest text-amber-800 font-semibold">
            Guiding Tenets
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-stone-900 font-medium mt-1">
            Our Core Values
          </h2>
          <p className="text-stone-600 text-sm mt-2">
            The ethical and spiritual bedrock that governs every class, seva camp, and administrative decision.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {data.about.coreValues.map((value, idx) => (
            <div
              key={idx}
              className="p-6 bg-white rounded-lg border border-stone-200 shadow-sm space-y-2 hover:border-amber-700/50 transition-colors"
            >
              <span className="text-xs font-mono text-amber-800 font-semibold">0{idx + 1}</span>
              <h4 className="font-serif text-lg font-semibold text-stone-900">
                {value.title}
              </h4>
              <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Teachers & Lineage Acharyas */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-widest text-amber-800 font-semibold">
            Faculty & Guidance
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-stone-900 font-medium mt-1">
            Teachers & Lineage Custodians
          </h2>
          <p className="text-stone-600 text-sm mt-2">
            Long-time practitioners dedicated to sincere instruction, Sanskrit chanting, and community seva.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {data.about.teachers.map((teacher, idx) => (
            <div
              key={idx}
              className="bg-white rounded-lg border border-stone-200 overflow-hidden shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="aspect-[4/3] bg-stone-200 overflow-hidden">
                  <img
                    src={teacher.avatar}
                    alt={teacher.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6 space-y-2">
                  <div className="flex items-center justify-between text-xs text-amber-800 font-medium">
                    <span>{teacher.yearsOfPractice}</span>
                    <span>Teacher & Guide</span>
                  </div>
                  <h3 className="font-serif text-xl font-semibold text-stone-900">
                    {teacher.name}
                  </h3>
                  <p className="text-xs font-medium text-amber-900">
                    {teacher.role}
                  </p>
                  <p className="text-stone-600 text-xs sm:text-sm leading-relaxed pt-2">
                    {teacher.bio}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Daily Mysore Practice Etiquette & Guidelines */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 bg-[#FAF6F0] border border-amber-900/20 rounded-xl space-y-4">
          <span className="text-xs uppercase tracking-widest text-amber-800 font-semibold">
            Shala Guidelines
          </span>
          <h3 className="font-serif text-2xl text-stone-900 font-medium">
            Visiting the Shala & Practicing in Mysore
          </h3>
          <p className="text-stone-700 text-sm leading-relaxed">
            Students are invited to register for monthly or seasonal immersions. Practice is held six mornings a week, beginning with the traditional Sanskrit opening chant at 5:30 AM. No practice on Full Moon (Purnima) or New Moon (Amavasya) days, honoring natural energetic tides.
          </p>
          <div className="pt-2 flex flex-wrap items-center gap-4">
            <button
              onClick={() => onNavigate('contact')}
              className="px-5 py-2.5 bg-stone-900 hover:bg-amber-950 text-stone-100 text-xs font-semibold uppercase tracking-wider rounded transition-colors cursor-pointer"
            >
              Inquire About Study Registrations
            </button>
            <button
              onClick={() => onNavigate('resources')}
              className="text-xs font-medium text-amber-900 hover:text-amber-950 flex items-center gap-1 cursor-pointer"
            >
              <span>Explore Ashtanga Mantras & Moon Days</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
