import React, { useState } from 'react';
import { Star, MessageSquare, CheckCircle, Quote, Plus } from 'lucide-react';
import { FoundationData } from '../data/foundationContent';

interface TestimonialsPageProps {
  data: FoundationData;
}

export const TestimonialsPage: React.FC<TestimonialsPageProps> = ({ data }) => {
  const [activeCategory, setActiveCategory] = useState<'All' | 'Practitioner' | 'Seva Outreach' | 'Teacher Training'>('All');
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);

  const [newTestimonial, setNewTestimonial] = useState({
    author: '',
    email: '',
    phone: '',
    role: '',
    location: '',
    category: 'Practitioner' as const,
    quote: '',
  });

  // Render purely from vetted foundation data without auto-adding unreviewed submissions
  const filteredTestimonials = data.testimonials.filter((item) => {
    if (activeCategory === 'All') return true;
    return item.category === activeCategory;
  });

  const handleSubmitTestimonial = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTestimonial.author.trim() || !newTestimonial.quote.trim()) return;

    setIsSubmitting(true);
    const endpoint = data.general.testimonialsFormspreeEndpoint || 'https://formspree.io/f/xljjgyyd';

    try {
      await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: newTestimonial.author,
          email: newTestimonial.email || 'not-provided@example.com',
          phone: newTestimonial.phone || 'N/A',
          role: newTestimonial.role || 'Practitioner',
          location: newTestimonial.location || 'N/A',
          category: newTestimonial.category,
          experience: newTestimonial.quote,
          subject: `New AYS Sangha Experience Shared by: ${newTestimonial.author}`,
          timestamp: new Date().toLocaleString('en-IN', {
            dateStyle: 'medium',
            timeStyle: 'short',
          }),
        }),
      });
    } catch (err) {
      console.warn('Experience submission notification:', err);
    } finally {
      setIsSubmitting(false);
      setSubmissionSuccess(true);
      // NOTE: We intentionally do NOT append to data.testimonials locally.
      // Submissions are recorded in Formspree for the admin team to review and add manually.
      setTimeout(() => {
        setSubmissionSuccess(false);
        setShowSubmitModal(false);
        setNewTestimonial({
          author: '',
          email: '',
          phone: '',
          role: '',
          location: '',
          category: 'Practitioner',
          quote: '',
        });
      }, 3500);
    }
  };

  return (
    <div className="space-y-16 lg:space-y-24 py-8">
      {/* Header */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <span className="text-xs uppercase tracking-widest text-amber-800 font-semibold">
          Practitioner Voices & Community Impact
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-stone-900 font-medium tracking-tight text-balance">
          Reflections from the Sangha
        </h1>
        <p className="text-stone-600 text-base sm:text-lg max-w-2xl mx-auto font-light leading-relaxed">
          The true measure of a spiritual foundation is reflected in the lives it touches—from dedicated practitioners in the Mysore shala to village children learning morning Surya Namaskar.
        </p>
        <div className="w-16 h-0.5 bg-amber-800 mx-auto mt-6" />
      </section>

      {/* Filter and Add Button Strip */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-stone-200">
          <div className="flex items-center gap-1.5 p-1 bg-stone-200/70 rounded-lg">
            {(['All', 'Practitioner', 'Seva Outreach', 'Teacher Training'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-all cursor-pointer whitespace-nowrap ${
                  activeCategory === cat
                    ? 'bg-white text-stone-900 shadow-sm font-semibold'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                {cat === 'All' ? 'All Reflections' : cat}
              </button>
            ))}
          </div>

          <button
            onClick={() => setShowSubmitModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-stone-900 hover:bg-amber-950 text-white text-xs font-medium rounded-md transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Share Your Experience</span>
          </button>
        </div>
      </section>

      {/* Testimonials Masonry / Grid */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredTestimonials.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl border border-stone-200 p-8 shadow-sm hover:border-amber-700/40 transition-colors flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs text-stone-500">
                  <span className="font-medium text-amber-900">{item.category}</span>
                  <span>{item.year}</span>
                </div>
                <blockquote className="font-serif text-lg text-stone-800 italic leading-relaxed">
                  &ldquo;{item.quote}&rdquo;
                </blockquote>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-stone-100">
                {item.avatar ? (
                  <img
                    src={item.avatar}
                    alt={item.author}
                    referrerPolicy="no-referrer"
                    className={`w-12 h-12 rounded-full object-cover border border-stone-200 shadow-sm shrink-0 ${item.author === 'Max' || item.id === 'test-1' ? 'object-[63%_20%]' : item.author === 'Vinay Dev' || item.id === 'test-2' ? 'object-[center_28%]' : item.author.includes('Arun') || item.id === 'test-3' ? 'object-[center_30%]' : item.author.includes('Preeti') || item.id === 'test-4' ? 'object-[42%_22%]' : item.author.includes('Dhruv') || item.id === 'test-5' ? 'object-[51%_18%]' : 'object-center'}`}
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-900 flex items-center justify-center font-serif font-bold text-sm">
                    {item.author[0]}
                  </div>
                )}
                <div>
                  <h4 className="font-serif font-semibold text-stone-900 text-base">
                    {item.author}
                  </h4>
                  <p className="text-xs text-stone-500">
                    {item.role} · {item.location}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Submit Testimonial Modal */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-[#FAF7F2] w-full max-w-lg rounded-xl shadow-2xl border border-stone-300 p-6 sm:p-8 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-stone-200">
              <h3 className="font-serif text-2xl text-stone-900 font-medium">
                Share Your Experience
              </h3>
              <button
                onClick={() => setShowSubmitModal(false)}
                className="text-stone-400 hover:text-stone-900 text-sm font-semibold"
              >
                ✕
              </button>
            </div>

            {submissionSuccess ? (
              <div className="text-center py-8 space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <h4 className="font-serif text-xl font-semibold text-stone-900">
                  Dhanyavad for sharing your experience! 🙏
                </h4>
                <p className="text-xs text-stone-600 max-w-sm mx-auto leading-relaxed">
                  Your reflection has been recorded successfully and forwarded to the foundation's administrative team. Once reviewed, it will be published to the community reflections wall.
                </p>
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setSubmissionSuccess(false);
                      setShowSubmitModal(false);
                    }}
                    className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white rounded-md text-xs font-medium cursor-pointer"
                  >
                    Close
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmitTestimonial} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-medium text-stone-700 mb-1">Your Full Name <span className="text-rose-500">*</span></label>
                    <input
                      type="text"
                      required
                      value={newTestimonial.author}
                      onChange={(e) => setNewTestimonial({ ...newTestimonial, author: e.target.value })}
                      placeholder="e.g. Liam Walker"
                      className="w-full px-3 py-2 border border-stone-300 rounded-md text-sm bg-white focus:outline-none focus:border-amber-800"
                    />
                  </div>
                  <div>
                    <label className="block font-medium text-stone-700 mb-1">Email Address <span className="text-rose-500">*</span></label>
                    <input
                      type="email"
                      required
                      value={newTestimonial.email}
                      onChange={(e) => setNewTestimonial({ ...newTestimonial, email: e.target.value })}
                      placeholder="you@example.com"
                      className="w-full px-3 py-2 border border-stone-300 rounded-md text-sm bg-white focus:outline-none focus:border-amber-800"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block font-medium text-stone-700 mb-1">Role / Tag</label>
                    <input
                      type="text"
                      value={newTestimonial.role}
                      onChange={(e) => setNewTestimonial({ ...newTestimonial, role: e.target.value })}
                      placeholder="e.g. Ashtanga Student"
                      className="w-full px-3 py-2 border border-stone-300 rounded-md text-sm bg-white focus:outline-none focus:border-amber-800"
                    />
                  </div>
                  <div>
                    <label className="block font-medium text-stone-700 mb-1">Location</label>
                    <input
                      type="text"
                      value={newTestimonial.location}
                      onChange={(e) => setNewTestimonial({ ...newTestimonial, location: e.target.value })}
                      placeholder="e.g. Mysuru, India"
                      className="w-full px-3 py-2 border border-stone-300 rounded-md text-sm bg-white focus:outline-none focus:border-amber-800"
                    />
                  </div>
                  <div>
                    <label className="block font-medium text-stone-700 mb-1">Phone (Optional)</label>
                    <input
                      type="tel"
                      value={newTestimonial.phone}
                      onChange={(e) => setNewTestimonial({ ...newTestimonial, phone: e.target.value })}
                      placeholder="+91..."
                      className="w-full px-3 py-2 border border-stone-300 rounded-md text-sm bg-white focus:outline-none focus:border-amber-800"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-medium text-stone-700 mb-1">Category</label>
                  <select
                    value={newTestimonial.category}
                    onChange={(e) => setNewTestimonial({ ...newTestimonial, category: e.target.value as any })}
                    className="w-full px-3 py-2 border border-stone-300 rounded-md text-sm bg-white focus:outline-none focus:border-amber-800"
                  >
                    <option value="Practitioner">Practitioner</option>
                    <option value="Seva Outreach">Seva Outreach</option>
                    <option value="Teacher Training">Teacher Training</option>
                  </select>
                </div>

                <div>
                  <label className="block font-medium text-stone-700 mb-1">Your Reflection / Experience <span className="text-rose-500">*</span></label>
                  <textarea
                    rows={4}
                    required
                    value={newTestimonial.quote}
                    onChange={(e) => setNewTestimonial({ ...newTestimonial, quote: e.target.value })}
                    placeholder="Describe how your practice, chanting study, or seva with the foundation influenced your life..."
                    className="w-full px-3 py-2 border border-stone-300 rounded-md text-sm bg-white focus:outline-none focus:border-amber-800"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowSubmitModal(false)}
                    className="px-4 py-2 border border-stone-300 text-stone-700 rounded-md text-xs font-medium hover:bg-stone-100 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-5 py-2.5 bg-amber-900 hover:bg-amber-950 disabled:opacity-50 text-white rounded-md text-xs font-semibold uppercase tracking-wider cursor-pointer"
                  >
                    {isSubmitting ? 'Recording Reflection...' : 'Submit Reflection'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
