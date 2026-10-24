import React, { useState } from 'react';
import { Mail, Phone, MapPin, MessageCircle, Clock, CheckCircle2, Instagram, Facebook, Youtube, HelpCircle, ChevronDown, ChevronUp, Navigation, ExternalLink } from 'lucide-react';
import { FoundationData } from '../data/foundationContent';

interface ContactPageProps {
  data: FoundationData;
}

export const ContactPage: React.FC<ContactPageProps> = ({ data }) => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    topic: 'Mysore Practice Registration',
    message: '',
  });

  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setFormSubmitted(true);
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          phone: '',
          topic: 'Mysore Practice Registration',
          message: '',
        });
      }, 4000);
    }
  };

  const faqs = [
    {
      q: "Can beginners practice at the Shala?",
      a: "Yes. The traditional Mysore style of Ashtanga Yoga is inherently personalized. Complete beginners are taught one-on-one at their own pace, starting with Surya Namaskar and foundational standing postures."
    },
    {
      q: "What is the minimum duration for studying in Mysore?",
      a: "To truly absorb the method and establish a personal practice rhythm, we recommend a minimum stay of 1 month. Shorter 1-2 week study permissions are considered on a case-by-case basis."
    },
    {
      q: "Are accommodations provided at the Shala?",
      a: "The Shala is located in peaceful Gokulam 3rd Stage, Mysuru, which has numerous clean, serene guesthouses, homestays, and apartments within easy walking distance. We provide a vetted accommodation guide upon acceptance."
    },
    {
      q: "How can I volunteer for the rural school and seva programs?",
      a: "We welcome earnest volunteers! You can select 'Seva Volunteer Inquiry' in the contact form or submit your details directly on the Projects page. A minimum 2-week commitment is required for school visits."
    }
  ];

  return (
    <div className="space-y-16 lg:space-y-24 py-8">
      {/* Header */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <span className="text-xs uppercase tracking-widest text-amber-800 font-semibold">
          Sanctuary & Communications
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-stone-900 font-medium tracking-tight text-balance">
          Connect with the Foundation
        </h1>
        <p className="text-stone-600 text-base sm:text-lg max-w-2xl mx-auto font-light leading-relaxed">
          We welcome inquiries regarding Shala registrations, Vedic philosophy satsangs, and community seva initiatives.
        </p>
        <div className="w-16 h-0.5 bg-amber-800 mx-auto mt-6" />
      </section>

      {/* Main Contact Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Contact Cards & Hours */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-xl border border-stone-200 p-6 sm:p-8 shadow-sm space-y-6">
              <h3 className="font-serif text-2xl text-stone-900 font-medium">
                Shala Sanctuary Information
              </h3>

              <div className="space-y-4 text-sm text-stone-700">
                {/* Physical Location (Mysore Shala) */}
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-amber-800 shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <span className="font-semibold text-stone-900 block text-xs uppercase tracking-wider">
                      Physical Location (Mysore Shala)
                    </span>
                    <p className="mt-0.5">{data.general.location}</p>
                    {data.general.mysoreMapsUrl && (
                      <a
                        href={data.general.mysoreMapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 mt-1.5 text-xs font-medium text-amber-900 hover:text-amber-950 underline decoration-amber-400 hover:decoration-amber-800 transition-colors"
                      >
                        <Navigation className="w-3.5 h-3.5" />
                        <span>Locate Mysore Shala on Google Maps</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Bangalore Location (Office & Outreach Center) */}
                <div className="flex items-start gap-3 p-3.5 bg-amber-50/70 border border-amber-200/80 rounded-lg">
                  <MapPin className="w-5 h-5 text-amber-900 shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <span className="font-semibold text-stone-900 block text-xs uppercase tracking-wider">
                      {data.general.bangaloreLocationTitle || "Bangalore Location"}
                    </span>
                    <a
                      href={data.general.bangaloreMapsUrl || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(data.general.bangaloreAddress || 'Indiranagar Bengaluru Karnataka')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group block mt-1 hover:text-amber-950 transition-colors"
                      title="Click to view Bangalore location on Google Maps"
                    >
                      <p className="font-medium text-stone-900 group-hover:text-amber-900 transition-colors">
                        {data.general.bangaloreAddress || "#18, 4th Cross, 10th Main Road, Indiranagar, Bengaluru, Karnataka 560038, India"}
                      </p>
                      <div className="inline-flex items-center gap-1.5 mt-2 px-3 py-1 bg-amber-900 text-stone-50 group-hover:bg-amber-950 text-xs font-semibold rounded shadow-sm transition-all">
                        <Navigation className="w-3.5 h-3.5 text-amber-300" />
                        <span>Locate on Google Maps</span>
                        <ExternalLink className="w-3 h-3 text-amber-200 ml-0.5" />
                      </div>
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-amber-800 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-stone-900 block text-xs uppercase tracking-wider">
                      Direct Email
                    </span>
                    <a
                      href={`mailto:${data.general.email}`}
                      className="hover:text-amber-900 transition-colors mt-0.5 block"
                    >
                      {data.general.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-amber-800 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-stone-900 block text-xs uppercase tracking-wider">
                      Telephone
                    </span>
                    <p className="mt-0.5">{data.general.phone}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MessageCircle className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-stone-900 block text-xs uppercase tracking-wider">
                      WhatsApp Quick Connect
                    </span>
                    <a
                      href={`https://wa.me/${data.general.whatsappNumber.replace(/[^0-9]/g, '')}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-emerald-800 hover:text-emerald-950 font-medium mt-0.5 block"
                    >
                      {data.general.whatsappNumber} (Chat with Shala Office)
                    </a>
                  </div>
                </div>
              </div>

              {/* Shala Daily Schedule */}
              <div className="pt-6 border-t border-stone-100 space-y-3">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-stone-800">
                  <Clock className="w-4 h-4 text-amber-800" />
                  <span>Mysore Practice Schedule</span>
                </div>
                <div className="text-xs text-stone-600 space-y-1.5 bg-stone-50 p-3.5 rounded-lg border border-stone-200">
                  <div className="flex justify-between">
                    <span className="font-medium text-stone-800">Monday – Friday:</span>
                    <span>5:30 AM – 9:30 AM (Mysore Style)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-stone-800">Saturday:</span>
                    <span>6:00 AM (Led Primary Series)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-stone-800">Sunday:</span>
                    <span>Rest / Philosophy Satsang (4:30 PM)</span>
                  </div>
                  <div className="pt-1 text-[11px] text-amber-900 font-medium">
                    * Closed on Full Moon & New Moon Days.
                  </div>
                </div>
              </div>

              {/* Social Channels */}
              <div className="pt-4 border-t border-stone-100">
                <span className="text-xs uppercase tracking-wider font-semibold text-stone-700 block mb-3">
                  Connect on Social Channels
                </span>
                <div className="flex items-center gap-3">
                  <a
                    href={data.general.instagramUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded text-xs transition-colors"
                  >
                    <Instagram className="w-4 h-4 text-pink-700" />
                    <span>Instagram</span>
                  </a>
                  <a
                    href={data.general.facebookUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded text-xs transition-colors"
                  >
                    <Facebook className="w-4 h-4 text-blue-700" />
                    <span>Facebook</span>
                  </a>
                  <a
                    href={data.general.youtubeUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded text-xs transition-colors"
                  >
                    <Youtube className="w-4 h-4 text-red-700" />
                    <span>YouTube</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Inquiry Form */}
          <div className="lg:col-span-7 bg-white rounded-xl border border-stone-200 p-6 sm:p-10 shadow-sm">
            <h3 className="font-serif text-2xl text-stone-900 font-medium mb-1">
              Send an Inquiry or Registration Request
            </h3>
            <p className="text-xs text-stone-500 mb-6">
              Our administration will reply to your message within 24 to 48 hours.
            </p>

            {formSubmitted ? (
              <div className="text-center py-12 space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h4 className="font-serif text-2xl font-semibold text-stone-900">
                  Dhanyavad! Message Received
                </h4>
                <p className="text-sm text-stone-600 max-w-md mx-auto">
                  Thank you for reaching out to AYS Yoga Foundation. Our Shala administrator will review your inquiry and respond to your email.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-medium text-stone-700 mb-1">Full Name</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Ananya Rao"
                      className="w-full px-3.5 py-2.5 border border-stone-300 rounded-md text-sm focus:outline-none focus:border-amber-800"
                    />
                  </div>
                  <div>
                    <label className="block font-medium text-stone-700 mb-1">Email Address</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="you@domain.com"
                      className="w-full px-3.5 py-2.5 border border-stone-300 rounded-md text-sm focus:outline-none focus:border-amber-800"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-medium text-stone-700 mb-1">Phone / WhatsApp (Optional)</label>
                    <input
                      type="text"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 ... or international"
                      className="w-full px-3.5 py-2.5 border border-stone-300 rounded-md text-sm focus:outline-none focus:border-amber-800"
                    />
                  </div>
                  <div>
                    <label className="block font-medium text-stone-700 mb-1">Subject / Area of Inquiry</label>
                    <select
                      value={formData.topic}
                      onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                      className="w-full px-3.5 py-2.5 border border-stone-300 rounded-md text-sm bg-white focus:outline-none focus:border-amber-800"
                    >
                      <option>Mysore Practice Registration</option>
                      <option>Vedanta Study & Chanting Classes</option>
                      <option>Seva Volunteer Opportunities</option>
                      <option>Donation & CSR Partnership</option>
                      <option>General Inquiries</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-medium text-stone-700 mb-1">Your Message or Background</label>
                  <textarea
                    rows={5}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about your yoga background, proposed dates of practice, or specific questions..."
                    className="w-full px-3.5 py-2.5 border border-stone-300 rounded-md text-sm focus:outline-none focus:border-amber-800"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-stone-900 hover:bg-amber-950 text-white font-medium text-xs uppercase tracking-wider rounded-md transition-colors cursor-pointer"
                >
                  Send Inquiry to AYS Foundation
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions Accordion */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 space-y-1">
          <span className="text-xs uppercase tracking-widest text-amber-800 font-semibold">
            Visitor Guidance
          </span>
          <h3 className="font-serif text-3xl text-stone-900 font-medium">
            Frequently Asked Questions
          </h3>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-lg border border-stone-200 overflow-hidden shadow-sm"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between gap-4 font-serif text-lg font-medium text-stone-900 hover:text-amber-900 transition-colors"
                >
                  <span>{faq.q}</span>
                  {isOpen ? <ChevronUp className="w-5 h-5 text-amber-800 shrink-0" /> : <ChevronDown className="w-5 h-5 text-stone-400 shrink-0" />}
                </button>
                {isOpen && (
                  <div className="px-6 pb-5 pt-1 text-stone-600 text-sm leading-relaxed border-t border-stone-100">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
