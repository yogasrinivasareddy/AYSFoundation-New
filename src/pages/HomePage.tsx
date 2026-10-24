import React, { useState } from 'react';
import { ArrowRight, Play, Heart, BookOpen, Sparkles, ShieldCheck, Sun, Users, Leaf, Globe, Flame, ChevronLeft, ChevronRight } from 'lucide-react';
import { FoundationData } from '../data/foundationContent';

interface HomePageProps {
  data: FoundationData;
  onNavigate: (page: string) => void;
  onOpenVideo: (url: string, title: string) => void;
  onSelectProjectForDonation: (projectId: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  data,
  onNavigate,
  onOpenVideo,
  onSelectProjectForDonation,
}) => {
  const [activeTestimonialIdx, setActiveTestimonialIdx] = useState(0);
  const featuredProject = data.projects[0];
  const currentTestimonial = data.testimonials[activeTestimonialIdx] || data.testimonials[0];

  return (
    <div className="space-y-20 lg:space-y-28">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-8 pb-16 lg:py-20 border-b border-stone-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Column: Typography & Intent */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-amber-900 font-semibold">
                <Sun className="w-3.5 h-3.5 text-amber-700" />
                <span>Mysore Parampara</span>
                <span aria-hidden="true">·</span>
                <span>Advaita Vedanta</span>
                <span aria-hidden="true">·</span>
                <span>Seva</span>
              </div>

              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-stone-900 font-medium tracking-tight leading-[1.12] text-balance">
                {data.home.heroTitle}
              </h1>

              <p className="text-stone-700 text-base sm:text-lg leading-relaxed max-w-2xl font-light">
                {data.home.heroSubtitle}
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => onNavigate('about')}
                  className="flex items-center gap-2 px-6 py-3.5 bg-stone-900 hover:bg-amber-950 text-stone-50 font-medium text-sm rounded-md transition-all shadow-sm cursor-pointer whitespace-nowrap shrink-0"
                >
                  <span>Explore Lineage & Shala</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => onNavigate('donations')}
                  className="flex items-center gap-2 px-6 py-3.5 bg-amber-900 hover:bg-amber-950 text-white font-medium text-sm rounded-md transition-all shadow-sm cursor-pointer whitespace-nowrap shrink-0"
                >
                  <Heart className="w-4 h-4 text-amber-300 fill-amber-300" />
                  <span>Support Our Seva</span>
                </button>

                {data.home.heroVideoUrl && (
                  <button
                    onClick={() => onOpenVideo(data.home.heroVideoUrl, 'AYS Yoga Foundation - Morning Shala Practice & Seva')}
                    className="flex items-center gap-2 px-4 py-3 text-stone-700 hover:text-amber-950 font-medium text-sm transition-colors cursor-pointer whitespace-nowrap shrink-0"
                  >
                    <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-900">
                      <Play className="w-3.5 h-3.5 fill-amber-900 ml-0.5" />
                    </div>
                    <span>Watch Shala Video</span>
                  </button>
                )}
              </div>
            </div>

            {/* Right Column: Serene Visual Presentation */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-lg overflow-hidden shadow-xl border border-stone-300/80 aspect-[4/3] lg:aspect-[16/11] bg-stone-200">
                <img
                  src={data.home.heroImage || '/assets/aistudio/srinivas-main-namaste_28018e47.jpeg'}
                  alt="Srinivasa Reddy - Yoga Guru in prayer posture (Anjali Mudra)"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-[center_20%]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/75 via-stone-950/20 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-stone-100">
                  <p className="font-serif italic text-sm text-stone-200 leading-snug">
                    &ldquo;{data.home.quoteText}&rdquo;
                  </p>
                  <p className="text-xs uppercase tracking-wider text-amber-300 font-medium mt-1">
                    — {data.home.quoteAuthor}, {data.home.quoteSource}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AYS Yoga Foundation – Mission & Vision Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Title and Tagline */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <span className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-amber-800 font-semibold bg-amber-100/70 px-3.5 py-1 rounded-full border border-amber-200">
            <span>🌿</span>
            <span>AYS Yoga Foundation – Mission & Vision</span>
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-stone-900 font-medium tracking-tight">
            Preserving Ashtanga Yoga Tradition • Transforming Lives • Serving Humanity
          </h2>
          <div className="w-20 h-0.5 bg-amber-800 mx-auto mt-4" />
        </div>

        {/* Dual Cards: Our Mission & Our Vision */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          {/* Card 1: Our Mission */}
          <div className="lg:col-span-7 bg-[#FCFAF7] border border-amber-200/80 rounded-2xl p-8 sm:p-10 shadow-sm flex flex-col justify-between">
            <div className="space-y-5">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-amber-100 text-amber-900 flex items-center justify-center font-serif font-bold text-base">
                  ॐ
                </div>
                <div>
                  <span className="text-xs uppercase tracking-widest text-amber-800 font-semibold block">Core Purpose</span>
                  <h3 className="font-serif text-2xl sm:text-3xl text-stone-900 font-medium">Our Mission</h3>
                </div>
              </div>

              <p className="text-stone-800 text-base sm:text-lg leading-relaxed font-serif italic text-amber-950/90 border-l-2 border-amber-800 pl-4 py-1">
                To preserve, practise, and spread the authentic tradition of Ashtanga Yoga and share the transformative wisdom of yoga, pranayama, meditation, and conscious living with people from all walks of life.
              </p>

              <div className="space-y-3 text-stone-700 text-sm sm:text-base leading-relaxed">
                <p>
                  AYS Yoga Foundation is committed to making traditional yogic practices accessible to rural communities, schools, institutions, and society at large—supporting physical health, mental balance, emotional well-being, spiritual growth, and self-awareness.
                </p>
                <p>
                  Through dedicated sadhana, service, and the timeless wisdom of yoga, we aspire to help individuals discover their inner potential and live in harmony with themselves, society, and nature.
                </p>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-stone-200 flex flex-wrap items-center justify-between gap-4">
              <span className="text-xs text-stone-500 font-medium">Rooted in unbroken parampara & selfless seva</span>
              <button
                onClick={() => onNavigate('about')}
                className="text-xs uppercase tracking-widest font-semibold text-amber-900 hover:text-amber-950 flex items-center gap-1.5 cursor-pointer"
              >
                <span>Read About Our Guru & Lineage</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Card 2: Our Vision & Guiding Principle */}
          <div className="lg:col-span-5 bg-stone-900 text-stone-100 rounded-2xl p-8 sm:p-10 shadow-sm flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 -mr-12 -mt-12 w-48 h-48 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />
            
            <div className="space-y-6 relative z-10">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-amber-500/20 text-amber-300 flex items-center justify-center">
                  <Sun className="w-5 h-5 text-amber-300" />
                </div>
                <div>
                  <span className="text-xs uppercase tracking-widest text-amber-400 font-semibold block">Aspirational Horizon</span>
                  <h3 className="font-serif text-2xl sm:text-3xl text-stone-100 font-medium">Our Vision</h3>
                </div>
              </div>

              <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
                To create a healthier, more conscious, and compassionate society by spreading the traditional teachings of Ashtanga Yoga and nurturing a culture of daily sadhana, self-discipline, awareness, and service to humanity.
              </p>

              {/* Guiding Principle Panel */}
              <div className="pt-4 border-t border-stone-800">
                <span className="text-xs uppercase tracking-widest text-amber-400 font-semibold flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  Our Guiding Principle
                </span>
                <div className="mt-3 p-5 rounded-xl bg-stone-800/80 border border-stone-700/80 text-center space-y-1.5">
                  <p className="font-serif text-xl sm:text-2xl font-medium tracking-wide text-amber-300">
                    Serve • Heal • Awaken
                  </p>
                  <p className="text-xs sm:text-sm uppercase tracking-widest text-stone-300 font-light">
                    One Planet • One Earth • One Human Family
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-5 border-t border-stone-800/90 flex items-center justify-between">
              <span className="text-xs text-stone-400">Join our daily collective sadhana</span>
              <button
                onClick={() => onNavigate('contact')}
                className="text-xs uppercase tracking-widest font-semibold text-amber-300 hover:text-amber-200 flex items-center gap-1 cursor-pointer"
              >
                <span>Connect with Us</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* AYS Yoga Foundation – Our Six Key Initiatives 🌿 */}
        <div className="space-y-8 mb-16">
          <div className="max-w-3xl">
            <span className="text-xs uppercase tracking-widest text-amber-800 font-semibold">
              Key Pillars of Mission
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl text-stone-900 font-medium mt-1">
              AYS Yoga Foundation – Our Six Key Initiatives 🌿
            </h3>
            <p className="text-stone-600 text-sm sm:text-base mt-2">
              Preserving authentic lineage, awakening inner knowledge, and serving humanity through grassroots yogic action.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                num: "01",
                title: "Traditional Mysore Ashtanga Yoga",
                desc: "Preserving the traditional lineage through asana, breath, bandha, drishti, and disciplined practice.",
                icon: Flame,
                page: "about",
                cta: "Explore Lineage"
              },
              {
                num: "02",
                title: "Govu Seva",
                desc: "Feeding our sacred cows is not just an act of kindness, its service to life.",
                icon: Heart,
                page: "projects",
                cta: "Support Govu Seva"
              },
              {
                num: "03",
                title: "Rural School Yoga & Nutrition",
                desc: "Providing free yoga education and nutritious meals to children in rural schools.",
                icon: Users,
                page: "projects",
                cta: "Rural School Seva"
              },
              {
                num: "04",
                title: "Vedic Chanting & Manuscripts",
                desc: "Preserving sacred chants, Sanskrit knowledge, and ancient manuscripts for future generations.",
                icon: BookOpen,
                page: "resources",
                cta: "Sacred Texts & Chants"
              },
              {
                num: "05",
                title: "Tree Plantation",
                desc: "Supporting ecological restoration through the Yoga Vana project by planting native trees, conserving soil and water, and nurturing biodiversity.",
                icon: Leaf,
                page: "projects",
                cta: "Explore Yoga Vana"
              },
              {
                num: "06",
                title: "Global Sangha & Scholarships",
                desc: "Building a global yoga community and supporting learning opportunities for underprivileged students.",
                icon: Globe,
                page: "donations",
                cta: "Support Scholarships"
              }
            ].map((initiative) => {
              const Icon = initiative.icon;
              return (
                <div
                  key={initiative.num}
                  className="bg-[#FCFAF7] border border-stone-200/90 hover:border-amber-700/50 hover:shadow-md transition-all duration-200 rounded-xl p-6 sm:p-7 flex flex-col justify-between group"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold tracking-widest text-amber-800 bg-amber-100/80 px-2.5 py-0.5 rounded border border-amber-200/60">
                        Initiative {initiative.num}
                      </span>
                      <div className="w-9 h-9 rounded-full bg-amber-50 group-hover:bg-amber-100 flex items-center justify-center text-amber-900 border border-amber-200/50 transition-colors">
                        <Icon className="w-4 h-4" />
                      </div>
                    </div>

                    <div>
                      <h4 className="font-serif text-xl text-stone-900 font-semibold group-hover:text-amber-950 transition-colors">
                        {initiative.title}
                      </h4>
                      <p className="text-stone-600 text-sm leading-relaxed mt-2.5">
                        {initiative.desc}
                      </p>
                    </div>
                  </div>

                  <div className="pt-5 mt-6 border-t border-stone-200/70 flex items-center justify-between">
                    <button
                      onClick={() => onNavigate(initiative.page)}
                      className="text-xs font-medium text-amber-900 hover:text-amber-950 flex items-center gap-1.5 cursor-pointer transition-colors"
                    >
                      <span>{initiative.cta}</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </button>
                    <span className="text-[11px] font-mono text-stone-400">
                      AYS {initiative.num}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* In Simple Words Callout Box */}
        <div className="bg-gradient-to-br from-amber-50/60 via-[#FCFAF7] to-stone-100/70 border border-amber-200/80 rounded-2xl p-8 sm:p-12 text-center shadow-sm relative overflow-hidden">
          <div className="max-w-3xl mx-auto space-y-5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-semibold uppercase tracking-widest border border-amber-200">
              <Sparkles className="w-3.5 h-3.5 text-amber-700" />
              In Simple Words
            </span>

            <p className="text-stone-700 text-base sm:text-lg leading-relaxed">
              AYS Yoga Foundation exists to preserve and spread the traditional wisdom of Ashtanga Yoga, support inner transformation, promote holistic well-being, and inspire every human being to live consciously, healthily, and harmoniously.
            </p>

            <div className="pt-2">
              <blockquote className="font-serif italic text-xl sm:text-2xl text-stone-900 font-medium max-w-2xl mx-auto leading-snug">
                &ldquo;Yoga is not merely a physical practice; it is a lifelong journey of self-awareness, discipline, and transformation.&rdquo;
              </blockquote>
            </div>

            <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={() => onNavigate('about')}
                className="px-6 py-3 bg-stone-900 hover:bg-amber-950 text-stone-100 text-xs font-semibold uppercase tracking-wider rounded-md transition-colors cursor-pointer flex items-center gap-2 shadow-sm"
              >
                <span>Explore Shala & Parampara</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => onNavigate('donations')}
                className="px-6 py-3 bg-amber-900 hover:bg-amber-950 text-white text-xs font-semibold uppercase tracking-wider rounded-md transition-colors cursor-pointer flex items-center gap-2 shadow-sm"
              >
                <Heart className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
                <span>Support Seva Outreach</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Seva Project Spotlight */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FCFAF7] border border-stone-300 rounded-xl overflow-hidden shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            <div className="lg:col-span-6 relative aspect-[4/3] lg:aspect-auto">
              <img
                src={featuredProject.image}
                alt={featuredProject.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 bg-stone-900/90 text-stone-100 text-xs px-3 py-1 rounded backdrop-blur-sm font-medium">
                Featured Seva Initiative
              </div>
            </div>

            <div className="lg:col-span-6 p-8 lg:p-12 flex flex-col justify-between space-y-6">
              <div>
                <span className="text-xs uppercase tracking-widest text-amber-800 font-semibold">
                  {featuredProject.category} · {featuredProject.location}
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl text-stone-900 font-medium mt-1">
                  {featuredProject.title}
                </h3>
                <p className="text-stone-600 text-sm leading-relaxed mt-3">
                  {featuredProject.longDescription}
                </p>

                {/* Progress bar and metrics (omitted for Project 1 per request) */}
                {featuredProject.id !== "project-rural-school-yoga" && (
                  <div className="mt-6 pt-6 border-t border-stone-200 space-y-3">
                    <div className="flex items-center justify-between text-xs text-stone-600">
                      <span className="font-medium text-stone-900">
                        Raised: ${featuredProject.raisedAmount.toLocaleString()}
                      </span>
                      <span>Goal: ${featuredProject.goalAmount.toLocaleString()}</span>
                    </div>
                    <div className="w-full bg-stone-200 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-amber-800 h-full rounded-full transition-all duration-700"
                        style={{
                          width: `${Math.min(100, Math.round((featuredProject.raisedAmount / featuredProject.goalAmount) * 100))}%`
                        }}
                      />
                    </div>
                    <div className="text-xs text-stone-500 flex items-center justify-between">
                      <span>Beneficiaries: {featuredProject.beneficiariesCount}</span>
                      <span className="text-amber-900 font-medium">
                        {Math.round((featuredProject.raisedAmount / featuredProject.goalAmount) * 100)}% Funded
                      </span>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-4">
                <button
                  onClick={() => onSelectProjectForDonation(featuredProject.id)}
                  className="px-5 py-2.5 bg-amber-900 hover:bg-amber-950 text-white text-xs font-semibold uppercase tracking-wider rounded-md transition-colors cursor-pointer flex items-center gap-2"
                >
                  <Heart className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
                  <span>Support This Seva</span>
                </button>
                <button
                  onClick={() => onNavigate('projects')}
                  className="text-xs font-medium text-stone-700 hover:text-stone-950 flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ashtanga Resources Teaser Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 bg-stone-900 text-stone-100 rounded-xl relative overflow-hidden">
          <div className="max-w-2xl space-y-4 relative z-10">
            <span className="text-xs uppercase tracking-widest text-amber-400 font-semibold">
              Sacred Learning
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-medium text-stone-100">
              Ashtanga Mantras & The 8 Limbs of Patanjali
            </h2>
            <p className="text-stone-300 text-sm leading-relaxed">
              Explore the Sanskrit text, Roman transliteration, and spiritual translations of the Ashtanga Opening & Closing Mantras, accompanied by our acoustic singing bowl and chant audio.
            </p>
            <div className="pt-2">
              <button
                onClick={() => onNavigate('resources')}
                className="px-5 py-2.5 bg-amber-700 hover:bg-amber-600 text-white text-xs font-semibold uppercase tracking-wider rounded-md transition-colors cursor-pointer inline-flex items-center gap-2"
              >
                <BookOpen className="w-4 h-4" />
                <span>Open Ashtanga Resources</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Quote Carousel / Highlight */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <span className="text-xs uppercase tracking-widest text-amber-800 font-semibold">
          Voices of the Sangha
        </span>

        <div className="relative min-h-[120px] flex items-center justify-center px-8 sm:px-12">
          <blockquote className="font-serif text-2xl sm:text-3xl text-stone-800 italic leading-relaxed max-w-3xl mx-auto">
            &ldquo;{currentTestimonial.quote}&rdquo;
          </blockquote>

          {data.testimonials.length > 1 && (
            <>
              <button
                onClick={() => setActiveTestimonialIdx((prev) => (prev === 0 ? data.testimonials.length - 1 : prev - 1))}
                aria-label="Previous testimonial"
                className="absolute left-0 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full border border-stone-200 hover:border-amber-700 bg-white/80 hover:bg-amber-50 text-stone-600 hover:text-amber-900 flex items-center justify-center transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => setActiveTestimonialIdx((prev) => (prev === data.testimonials.length - 1 ? 0 : prev + 1))}
                aria-label="Next testimonial"
                className="absolute right-0 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full border border-stone-200 hover:border-amber-700 bg-white/80 hover:bg-amber-50 text-stone-600 hover:text-amber-900 flex items-center justify-center transition-colors cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </>
          )}
        </div>

        <div className="text-sm">
          <p className="font-semibold text-stone-900 text-base">{currentTestimonial.author}</p>
          <p className="text-xs text-stone-500 mt-0.5">{currentTestimonial.role} · {currentTestimonial.location}</p>
        </div>

        {/* Carousel indicator dots */}
        {data.testimonials.length > 1 && (
          <div className="flex items-center justify-center gap-1.5 pt-1">
            {data.testimonials.map((t, idx) => (
              <button
                key={t.id}
                onClick={() => setActiveTestimonialIdx(idx)}
                aria-label={`View reflection by ${t.author}`}
                className={`h-1.5 rounded-full transition-all cursor-pointer ${
                  activeTestimonialIdx === idx
                    ? 'w-6 bg-amber-800'
                    : 'w-2 bg-stone-300 hover:bg-stone-400'
                }`}
              />
            ))}
          </div>
        )}

        <div className="pt-2">
          <button
            onClick={() => onNavigate('testimonials')}
            className="text-xs font-semibold uppercase tracking-wider text-amber-900 hover:text-amber-950 inline-flex items-center gap-1 cursor-pointer"
          >
            <span>Read All Practitioner Testimonials</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </section>
    </div>
  );
};
