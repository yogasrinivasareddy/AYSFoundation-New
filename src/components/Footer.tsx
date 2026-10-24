import React, { useState } from 'react';
import { Instagram, Facebook, Youtube, Mail, MapPin, Phone, Heart, CheckCircle2 } from 'lucide-react';
import { FoundationData } from '../data/foundationContent';

interface FooterProps {
  data: FoundationData;
  onNavigate: (page: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ data, onNavigate }) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setSubscribed(true);
      setTimeout(() => {
        setNewsletterEmail('');
      }, 3000);
    }
  };

  return (
    <footer className="bg-[#24211E] text-stone-300 border-t border-stone-800">
      {/* Top Satsang / Newsletter Ribbon */}
      <div className="border-b border-stone-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7">
              <span className="text-xs uppercase tracking-widest text-amber-400 font-medium">
                Patanjali Philosophy & Moon Day Satsang
              </span>
              <h3 className="font-serif text-2xl lg:text-3xl text-stone-100 mt-1">
                Receive Sacred Study Notes & Seva Updates
              </h3>
              <p className="text-stone-400 text-sm mt-2 max-w-xl">
                Occasional contemplative reflections on the Yoga Sutras, upcoming new moon / full moon practice schedules, and community outreach reports.
              </p>
            </div>
            <div className="lg:col-span-5">
              {subscribed ? (
                <div className="flex items-center gap-2 p-3 bg-stone-800/80 border border-stone-700 rounded-md text-amber-300 text-sm">
                  <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0" />
                  <span>Thank you. You are subscribed to our quiet contemplative circular.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="email"
                    required
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="flex-1 px-4 py-2.5 rounded-md bg-stone-900 border border-stone-700 text-stone-100 placeholder-stone-500 text-sm focus:outline-none focus:border-amber-500"
                  />
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-amber-800 hover:bg-amber-700 text-stone-100 text-sm font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    Subscribe
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Column 1: Foundation Wordmark & Philosophy */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="font-serif text-2xl text-stone-100 font-medium">
              {data.general.foundationName}
            </h4>
            <p className="text-stone-400 text-sm leading-relaxed">
              {data.general.subTagline}
            </p>
            <div className="pt-2 text-xs text-stone-400 space-y-1">
              <p className="font-medium text-stone-300">Parampara Lineage Tradition:</p>
              <p>{data.general.lineageTradition}</p>
            </div>
            {/* Social media connections */}
            <div className="pt-2 flex items-center gap-3">
              <a
                href={data.general.instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-stone-800 hover:bg-amber-900 text-stone-300 hover:text-white flex items-center justify-center transition-colors"
                aria-label="Instagram Page"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={data.general.facebookUrl}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-stone-800 hover:bg-amber-900 text-stone-300 hover:text-white flex items-center justify-center transition-colors"
                aria-label="Facebook Page"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={data.general.youtubeUrl}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-stone-800 hover:bg-amber-900 text-stone-300 hover:text-white flex items-center justify-center transition-colors"
                aria-label="YouTube Channel"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="lg:col-span-3 space-y-3">
            <h5 className="text-xs uppercase tracking-widest text-stone-400 font-semibold">
              Explore & Study
            </h5>
            <ul className="space-y-2 text-sm text-stone-300">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-amber-300 transition-colors cursor-pointer"
                >
                  Home & Overview
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-amber-300 transition-colors cursor-pointer"
                >
                  Lineage & About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('projects')}
                  className="hover:text-amber-300 transition-colors cursor-pointer"
                >
                  Seva Outreach Projects
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('resources')}
                  className="hover:text-amber-300 transition-colors cursor-pointer"
                >
                  Ashtanga Mantras & 8 Limbs
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('testimonials')}
                  className="hover:text-amber-300 transition-colors cursor-pointer"
                >
                  Practitioner Testimonials
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('donations')}
                  className="hover:text-amber-300 transition-colors cursor-pointer text-amber-400 font-medium"
                >
                  Support Our Seva (Donations)
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact & Visiting Info */}
          <div className="lg:col-span-5 space-y-3">
            <h5 className="text-xs uppercase tracking-widest text-stone-400 font-semibold">
              Contact & Sanctuary
            </h5>
            <div className="space-y-2.5 text-sm text-stone-300">
              <div className="space-y-2">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-stone-400 text-xs block font-medium">Mysore Shala:</span>
                    <a
                      href={data.general.mysoreMapsUrl || "https://www.google.com/maps/search/?api=1&query=Gokulam+3rd+Stage+Mysuru"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-amber-300 transition-colors"
                      title="Open Mysore Shala on Google Maps"
                    >
                      {data.general.location}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-stone-400 text-xs block font-medium">Bangalore Location:</span>
                    <a
                      href={data.general.bangaloreMapsUrl || "https://www.google.com/maps/search/?api=1&query=Indiranagar+Bengaluru+Karnataka"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-amber-300 transition-colors underline decoration-amber-600/60"
                      title="Open Bangalore Office on Google Maps"
                    >
                      {data.general.bangaloreAddress || "#18, 4th Cross, 10th Main Road, Indiranagar, Bengaluru, Karnataka 560038"}
                    </a>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-amber-500 shrink-0" />
                <a href={`mailto:${data.general.email}`} className="hover:text-amber-300 transition-colors">
                  {data.general.email}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-500 shrink-0" />
                <span>{data.general.phone} (Mysore Shala Office)</span>
              </div>
            </div>

            <div className="pt-3 border-t border-stone-800 text-xs text-stone-400 leading-relaxed">
              <p className="flex items-center gap-1.5 text-amber-400 font-medium mb-1">
                <Heart className="w-3.5 h-3.5 fill-amber-400" />
                <span>Non-Profit Charitable Trust Transparency</span>
              </p>
              <p>{data.general.taxExemptionNotice}</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-stone-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>
            &copy; {new Date().getFullYear()} {data.general.foundationName}. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <span>Preserving Traditional Gurukula Parampara</span>
            <span aria-hidden="true">·</span>
            <span>Om Shanti Shanti Shanti</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
