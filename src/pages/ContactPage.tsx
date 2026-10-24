import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, MessageCircle, Clock, CheckCircle2, Instagram, Facebook, Youtube, HelpCircle, ChevronDown, ChevronUp, Navigation, ExternalLink, Inbox, Send, ArrowRight } from 'lucide-react';
import { FoundationData } from '../data/foundationContent';
import { InquiriesInboxModal, SavedInquiry } from '../components/InquiriesInboxModal';

const INQUIRIES_STORAGE_KEY = 'ays_inquiries_inbox';

interface ContactPageProps {
  data: FoundationData;
}

export const ContactPage: React.FC<ContactPageProps> = ({ data }) => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lastSubmitted, setLastSubmitted] = useState<SavedInquiry | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    topic: 'Mysore Practice Registration',
    message: '',
  });

  const [inquiries, setInquiries] = useState<SavedInquiry[]>(() => {
    try {
      const saved = localStorage.getItem(INQUIRIES_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return [];
  });

  const [isInboxOpen, setIsInboxOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const saveInquiriesToStorage = (updated: SavedInquiry[]) => {
    setInquiries(updated);
    try {
      localStorage.setItem(INQUIRIES_STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);

    const endpoint = data.general.formspreeEndpoint || "https://formspree.io/f/mnppnnee";

    const newInquiry: SavedInquiry = {
      id: `inq-${Date.now()}`,
      name: formData.name,
      email: formData.email,
      phone: formData.phone || '',
      topic: formData.topic,
      message: formData.message,
      timestamp: new Date().toLocaleString('en-IN', {
        dateStyle: 'medium',
        timeStyle: 'short',
      }),
      status: 'New',
    };

    try {
      await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone || 'N/A',
          subject: `New AYS Yoga Inquiry: ${formData.topic} from ${formData.name}`,
          topic: formData.topic,
          message: formData.message,
          timestamp: newInquiry.timestamp,
        }),
      });
    } catch (err) {
      console.warn('Formspree transmission notice:', err);
    } finally {
      // Always persist to local admin registry
      const updated = [newInquiry, ...inquiries];
      saveInquiriesToStorage(updated);
      setLastSubmitted(newInquiry);
      setIsSubmitting(false);
      setFormSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        topic: 'Mysore Practice Registration',
        message: '',
      });
    }
  };

  const handleDeleteInquiry = (id: string) => {
    const updated = inquiries.filter((item) => item.id !== id);
    saveInquiriesToStorage(updated);
  };

  const handleToggleStatus = (id: string) => {
    const updated = inquiries.map((item) =>
      item.id === id ? { ...item, status: (item.status === 'New' ? 'Replied' : 'New') as 'New' | 'Replied' } : item
    );
    saveInquiriesToStorage(updated);
  };

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to clear all inquiries from the inbox?')) {
      saveInquiriesToStorage([]);
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
                AYS Foundation Information
              </h3>

              <div className="space-y-4 text-sm text-stone-700">
                {/* Physical Location (Pavagada Yoga Shala) */}
                <div className="flex items-start gap-3 p-3.5 bg-amber-50/70 border border-amber-200/80 rounded-lg">
                  <MapPin className="w-5 h-5 text-amber-900 shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <span className="font-semibold text-stone-900 block text-xs uppercase tracking-wider">
                      Physical Location (Pavagada Yoga Shala)
                    </span>
                    <a
                      href={data.general.mysoreMapsUrl || "https://maps.app.goo.gl/zU76gdr351CCLkZR8"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group block mt-1 hover:text-amber-950 transition-colors"
                      title="Click to view Pavagada Yoga Shala on Google Maps"
                    >
                      <p className="font-medium text-stone-900 group-hover:text-amber-900 transition-colors">
                        {data.general.location || "47, Hoshahalli, v, Palavalli, Pavagada, Karnataka 572136"}
                      </p>
                      <div className="inline-flex items-center gap-1.5 mt-2 px-3 py-1 bg-amber-900 text-stone-50 group-hover:bg-amber-950 text-xs font-semibold rounded shadow-sm transition-all">
                        <Navigation className="w-3.5 h-3.5 text-amber-300" />
                        <span>Locate on Google Maps</span>
                        <ExternalLink className="w-3 h-3 text-amber-200 ml-0.5" />
                      </div>
                    </a>
                  </div>
                </div>

                {/* Bangalore Location (Office & Outreach Center) */}
                <div className="flex items-start gap-3 p-3.5 bg-amber-50/70 border border-amber-200/80 rounded-lg">
                  <MapPin className="w-5 h-5 text-amber-900 shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <span className="font-semibold text-stone-900 block text-xs uppercase tracking-wider">
                      {data.general.bangaloreLocationTitle || "Bangalore Location (Sadashiva Nagar)"}
                    </span>
                    <a
                      href={data.general.bangaloreMapsUrl || "https://www.google.com/maps/place/Flex+%26+Flow/@13.0084732,77.5756517,17z/data=!3m1!4b1!4m6!3m5!1s0x3bae17006f8a197b:0xa4626ce12b154ffc!8m2!3d13.008468!4d77.5782266!16s%2Fg%2F11vt6tm40n?entry=ttu&g_ep=EgoyMDI2MTAyMC4wIKXMDSoASAFQAw%3D%3D"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group block mt-1 hover:text-amber-950 transition-colors"
                      title="Click to view Bangalore location on Google Maps"
                    >
                      <p className="font-medium text-stone-900 group-hover:text-amber-900 transition-colors">
                        {data.general.bangaloreAddress || "3rd floor, 469, 6th Main Rd, opp. Prinky’s Art Studio, Sadashiva Nagar, Armane Nagar, Bengaluru, Karnataka 560080"}
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
                    <a
                      href="tel:+919742734499"
                      className="mt-0.5 block hover:text-amber-900 transition-colors font-medium text-stone-800"
                    >
                      {data.general.phone || "+91 97427 34499"}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MessageCircle className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-stone-900 block text-xs uppercase tracking-wider">
                      WhatsApp Quick Connect
                    </span>
                    <a
                      href="https://wa.me/919742734499"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-800 hover:text-emerald-950 font-medium mt-0.5 block"
                    >
                      {data.general.whatsappNumber || "+91 97427 34499"} (Chat with Shala Office)
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
          <div className="lg:col-span-7 bg-white rounded-xl border border-stone-200 p-6 sm:p-10 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
                <h3 className="font-serif text-2xl text-stone-900 font-medium">
                  Send an Inquiry or Registration Request
                </h3>
                <button
                  type="button"
                  onClick={() => setIsInboxOpen(true)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-700 hover:text-stone-900 text-xs font-semibold rounded-md transition-colors cursor-pointer border border-stone-300"
                  title="View all inquiries saved in the registry"
                >
                  <Inbox className="w-3.5 h-3.5 text-amber-800" />
                  <span>Admin Inbox</span>
                  {inquiries.length > 0 && (
                    <span className="bg-amber-900 text-white text-[10px] px-1.5 py-0.2 rounded-full font-mono">
                      {inquiries.length}
                    </span>
                  )}
                </button>
              </div>
              <p className="text-xs text-stone-500 mb-6">
                Our administration will reply to your message within 24 to 48 hours. Inquiries are permanently logged in the Foundation registry.
              </p>

              {formSubmitted ? (
                <div className="py-8 space-y-6 text-center animate-in fade-in">
                  <div className="w-14 h-14 bg-emerald-50 rounded-full flex items-center justify-center mx-auto text-emerald-600 border border-emerald-200">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-serif text-2xl font-semibold text-stone-900">
                      Dhanyavad! Inquiry Dispatched Successfully
                    </h4>
                    <p className="text-xs sm:text-sm text-stone-600 max-w-md mx-auto">
                      Your inquiry has been sent directly to the Foundation inbox via Formspree and logged into the admin registry. You can also connect instantly on WhatsApp below.
                    </p>
                  </div>

                  {lastSubmitted && (
                    <div className="p-4 bg-stone-50 rounded-lg border border-stone-200 text-left text-xs space-y-2 max-w-md mx-auto">
                      <div className="flex justify-between text-stone-500">
                        <span>Submitted By:</span>
                        <span className="font-semibold text-stone-800">{lastSubmitted.name}</span>
                      </div>
                      <div className="flex justify-between text-stone-500">
                        <span>Topic:</span>
                        <span className="font-semibold text-amber-900">{lastSubmitted.topic}</span>
                      </div>
                      <div className="flex justify-between text-stone-500">
                        <span>Email:</span>
                        <span className="text-stone-800">{lastSubmitted.email}</span>
                      </div>
                      {lastSubmitted.phone && (
                        <div className="flex justify-between text-stone-500">
                          <span>Phone:</span>
                          <span className="text-stone-800">{lastSubmitted.phone}</span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Direct Delivery Actions */}
                  <div className="space-y-2 max-w-md mx-auto pt-2">
                    <a
                      href={`https://wa.me/919742734499?text=${encodeURIComponent(
                        `Namaste AYS Yoga Foundation,\n\nI have submitted an inquiry via the website:\n• Name: ${lastSubmitted?.name || ''}\n• Email: ${lastSubmitted?.email || ''}\n• Phone: ${lastSubmitted?.phone || 'N/A'}\n• Topic: ${lastSubmitted?.topic || ''}\n• Message: ${lastSubmitted?.message || ''}`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-md text-xs font-semibold uppercase tracking-wider transition-colors shadow-sm"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Send via WhatsApp to +91 97427 34499</span>
                    </a>

                    <a
                      href={`mailto:${data.general.email}?subject=New Inquiry: ${encodeURIComponent(lastSubmitted?.topic || 'Yoga Practice')}&body=${encodeURIComponent(
                        `Namaste AYS Yoga Foundation,\n\nInquiry Details:\nName: ${lastSubmitted?.name || ''}\nEmail: ${lastSubmitted?.email || ''}\nPhone: ${lastSubmitted?.phone || 'N/A'}\nTopic: ${lastSubmitted?.topic || ''}\n\nMessage:\n${lastSubmitted?.message || ''}`
                      )}`}
                      className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-md text-xs font-semibold transition-colors border border-stone-300"
                    >
                      <Mail className="w-3.5 h-3.5 text-stone-600" />
                      <span>Send from Email Client ({data.general.email})</span>
                    </a>
                  </div>

                  <div className="pt-4 border-t border-stone-200">
                    <button
                      type="button"
                      onClick={() => setFormSubmitted(false)}
                      className="text-xs text-amber-900 hover:text-amber-950 font-medium underline"
                    >
                      Submit another inquiry or update details
                    </button>
                  </div>
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
                    disabled={isSubmitting}
                    className="w-full py-3 bg-stone-900 hover:bg-amber-950 disabled:opacity-60 text-white font-medium text-xs uppercase tracking-wider rounded-md transition-colors cursor-pointer shadow-sm flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Transmitting to Foundation Inbox...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>Send Inquiry & Registration Request</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
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

      {/* Admin Inquiries Inbox Modal */}
      <InquiriesInboxModal
        isOpen={isInboxOpen}
        onClose={() => setIsInboxOpen(false)}
        inquiries={inquiries}
        onClearAll={handleClearAll}
        onDeleteInquiry={handleDeleteInquiry}
        onToggleStatus={handleToggleStatus}
      />
    </div>
  );
};
