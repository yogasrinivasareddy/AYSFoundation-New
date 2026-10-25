import React from 'react';
import { Instagram, Facebook, Youtube, Mail, MapPin, Phone, Heart } from 'lucide-react';
import { FoundationData } from '../data/foundationContent';

interface FooterProps {
  data: FoundationData;
  onNavigate: (page: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ data, onNavigate }) => {
  return (
    <footer className="bg-[#24211E] text-stone-300 border-t border-stone-800">
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
                    <span className="text-stone-400 text-xs block font-medium">Pavagada Yoga Shala:</span>
                    <a
                      href={data.general.mysoreMapsUrl || "https://www.google.com/maps/place/AYS+YOGA+Foundation/@14.1998058,77.3033227,18.5z/data=!4m6!3m5!1s0x3bb11b847fa87669:0x610da421437ee744!8m2!3d14.1997846!4d77.3038581!16s%2Fg%2F11z3lm782z?entry=ttu&g_ep=EgoyMDI2MTAyMC4wIKXMDSoASAFQAw%3D%3D"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-amber-300 transition-colors"
                      title="Open Pavagada Yoga Shala on Google Maps"
                    >
                      {data.general.location || "#47, Hosahalli (village), Palavalli (post), Pavagada (taluk), Tumkur (district), Karnataka, India - 572136"}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-stone-400 text-xs block font-medium">Bangalore Location:</span>
                    <a
                      href={data.general.bangaloreMapsUrl || "https://www.google.com/maps/place/Flex+%26+Flow/@13.0084732,77.5756517,17z/data=!3m1!4b1!4m6!3m5!1s0x3bae17006f8a197b:0xa4626ce12b154ffc!8m2!3d13.008468!4d77.5782266!16s%2Fg%2F11vt6tm40n?entry=ttu&g_ep=EgoyMDI2MTAyMC4wIKXMDSoASAFQAw%3D%3D"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-amber-300 transition-colors underline decoration-amber-600/60"
                      title="Open Bangalore Office on Google Maps"
                    >
                      {data.general.bangaloreAddress || "3rd floor, 469, 6th Main Rd, opp. Prinky’s Art Studio, Sadashiva Nagar, Armane Nagar, Bengaluru, Karnataka 560080"}
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
                <a href="tel:+919742734499" className="hover:text-amber-300 transition-colors">
                  {data.general.phone || "+91 97427 34499"} (Foundation Office)
                </a>
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
