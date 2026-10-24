import { ArrowRight, Compass, Heart, BookOpen, Shield, Award, Users, Sparkles, Flame } from 'lucide-react';
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
                The Sacred Space
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

      {/* Yoga Guru - Srinivasa Reddy */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="font-serif text-3xl sm:text-4xl text-stone-900 font-medium">
            Srinivasa Reddy — Yoga Guru
          </h2>
          <p className="text-stone-600 text-sm mt-2">
            Dedicated to traditional Ashtanga Yoga, Pranayama, Meditation, and conscious living.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-stone-200/90 shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 p-6 sm:p-8 lg:p-10 items-start">
            
            {/* Visual Gallery: Two Authentic Lineage & Sadhana Images */}
            <div className="lg:col-span-5 space-y-6">
              {/* Photo 1: Guru Pranam & Blessings */}
              <div className="rounded-xl overflow-hidden border border-amber-900/15 bg-stone-100 shadow-sm group">
                <div className="aspect-[4/3] overflow-hidden bg-stone-200">
                  <img
                    src="/assets/aistudio/lineage-respect.jpg_ac055bdc.jpeg"
                    alt="Srinivasa Reddy receiving blessings at the feet of Paramaguru Sharath R. Jois"
                    className="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-500"
                  />
                </div>
                <div className="p-4 bg-stone-50/90 border-t border-stone-200/80">
                  <div className="flex items-center gap-1.5 text-amber-900 text-xs font-semibold uppercase tracking-wider mb-0.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                    <span>Lineage Transmission & Reverence</span>
                  </div>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    Srinivasa Reddy offering reverent pranam and receiving blessings from Paramaguru Sharath R. Jois beneath the lineage portraits of Sri T. Krishnamacharya and Sri K. Pattabhi Jois.
                  </p>
                </div>
              </div>

              {/* Photo 2: Sharath Yoga Centre Mysore */}
              <div className="rounded-xl overflow-hidden border border-amber-900/15 bg-stone-100 shadow-sm group">
                <div className="aspect-[4/3] overflow-hidden bg-stone-200">
                  <img
                    src="/assets/aistudio/sharath-yoga-centre.jpg_3533f600.jpeg"
                    alt="Srinivasa Reddy seated in Padmasana at Sharath Yoga Centre Mysore"
                    className="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-500"
                  />
                </div>
                <div className="p-4 bg-stone-50/90 border-t border-stone-200/80">
                  <div className="flex items-center gap-1.5 text-amber-900 text-xs font-semibold uppercase tracking-wider mb-0.5">
                    <Award className="w-3.5 h-3.5 text-amber-700" />
                    <span>Practice at the Source · Mysore</span>
                  </div>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    Seated in Padmasana at Sharath Yoga Centre, Mysore — upholding the unbroken parampara of classical Ashtanga Yoga.
                  </p>
                </div>
              </div>
            </div>

            {/* Biographical Narrative & Teachings */}
            <div className="lg:col-span-7 space-y-6">
              {/* Badge & Title */}
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="px-3 py-1 bg-amber-100 text-amber-950 font-serif text-xs font-semibold rounded-full border border-amber-200">
                    Lead Faculty & Yoga Guru
                  </span>
                  <span className="px-3 py-1 bg-stone-100 text-stone-700 text-xs font-medium rounded-full border border-stone-200">
                    7 Years Dedicated Practice & Sadhana
                  </span>
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl text-stone-900 font-medium">
                  Srinivasa Reddy
                </h3>
                <p className="text-xs uppercase tracking-wider text-amber-800 font-medium mt-0.5">
                  Ashtanga Yoga · Pranayama · Meditation · Conscious Living
                </p>
              </div>

              {/* Core Descriptions */}
              <div className="space-y-4 text-stone-700 text-sm sm:text-base leading-relaxed">
                <p>
                  He has devoted seven years to dedicated Yoga practice and learning, with a particular focus on the traditional practices of Ashtanga Yoga, Pranayama, Meditation, and conscious living.
                </p>
                <p>
                  His journey has taken him across different parts of India, including the Himalayas, where he travelled to explore, learn, practice, and deepen his understanding of Yoga, meditation, nature, and the inner journey.
                </p>
                <div className="p-4 sm:p-5 bg-amber-50/60 rounded-xl border-l-4 border-amber-800 text-stone-800">
                  <p className="font-serif italic text-sm sm:text-[15px] leading-relaxed text-amber-950">
                    &ldquo;For Srinivasa, Yoga is not merely a practice of physical postures. It is a holistic way of life that develops discipline, clarity, health, awareness, compassion, balance, and self-realisation.&rdquo;
                  </p>
                </div>
              </div>

              {/* Yoga Journey & Spiritual Exploration */}
              <div className="p-5 sm:p-6 bg-[#FAF6F0] rounded-xl border border-amber-900/15 space-y-2.5">
                <div className="flex items-center gap-2 text-amber-900 font-semibold text-xs uppercase tracking-wider">
                  <Compass className="w-4 h-4 text-amber-800" />
                  <span>Yoga Journey & Spiritual Exploration</span>
                </div>
                <p className="text-stone-700 text-xs sm:text-sm leading-relaxed">
                  Srinivasa’s Yoga journey has been shaped by years of sincere practice, study, travel, and direct experience. Over seven years of practice across India and the Himalayan regions, his experience has strengthened his belief that true Yoga is an inward journey—a process of discovering the deeper potential within every human being.
                </p>
              </div>

              {/* Yoga Parampara */}
              <div className="p-5 sm:p-6 bg-white rounded-xl border border-stone-200/90 shadow-xs space-y-3.5">
                <h4 className="font-serif text-base sm:text-lg font-semibold text-stone-900 flex items-center gap-2">
                  <Flame className="w-4 h-4 text-amber-800 fill-amber-700/20" />
                  <span>Yoga Parampara:</span>
                </h4>
                <ul className="space-y-3 pt-1">
                  <li className="flex items-start gap-3 text-xs sm:text-sm text-stone-800">
                    <span
                      className="flex items-center justify-center w-6 h-6 rounded-full bg-amber-100 text-amber-900 border border-amber-300/80 shrink-0 mt-0.5 shadow-2xs"
                      title="Guru Parampara Jyoti"
                      aria-hidden="true"
                    >
                      <Flame className="w-3.5 h-3.5 text-amber-800 fill-amber-600/30" />
                    </span>
                    <div className="pt-0.5">
                      <span className="font-semibold text-stone-900">Tirumalai Krishnamacharya</span>
                      <span className="text-stone-600"> – Pranayama tradition</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3 text-xs sm:text-sm text-stone-800">
                    <span
                      className="flex items-center justify-center w-6 h-6 rounded-full bg-amber-100 text-amber-900 border border-amber-300/80 shrink-0 mt-0.5 shadow-2xs"
                      title="Guru Parampara Jyoti"
                      aria-hidden="true"
                    >
                      <Flame className="w-3.5 h-3.5 text-amber-800 fill-amber-600/30" />
                    </span>
                    <div className="pt-0.5">
                      <span className="font-semibold text-stone-900">K. Pattabhi Jois</span>
                      <span className="text-stone-600"> – Ashtanga Yoga tradition</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3 text-xs sm:text-sm text-stone-800">
                    <span
                      className="flex items-center justify-center w-6 h-6 rounded-full bg-amber-100 text-amber-900 border border-amber-300/80 shrink-0 mt-0.5 shadow-2xs"
                      title="Guru Parampara Jyoti"
                      aria-hidden="true"
                    >
                      <Flame className="w-3.5 h-3.5 text-amber-800 fill-amber-600/30" />
                    </span>
                    <div className="pt-0.5">
                      <span className="font-semibold text-stone-900">Sharath R. Jois</span>
                      <span className="text-stone-600"> – Ashtanga Yoga</span>
                    </div>
                  </li>
                </ul>
              </div>

              {/* Core Pillars Pills */}
              <div className="pt-1 flex flex-wrap gap-2">
                {[
                  'Traditional Ashtanga Yoga',
                  'Classical Pranayama',
                  'Meditation & Dhyana',
                  'Conscious Living',
                  'Himalayan Sadhana',
                  'Holistic Way of Life',
                ].map((pill) => (
                  <span
                    key={pill}
                    className="text-[11px] font-medium px-2.5 py-1 bg-stone-100 text-stone-700 rounded-md border border-stone-200"
                  >
                    {pill}
                  </span>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Daily Practice Etiquette & Guidelines */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 bg-[#FAF6F0] border border-amber-900/20 rounded-xl space-y-4">
          <span className="text-xs uppercase tracking-widest text-amber-800 font-semibold">
            AYS Foundation Guidelines
          </span>
          <h3 className="font-serif text-2xl text-stone-900 font-medium">
            Visiting the Shala & Practicing In Person
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
