import React, { useState } from 'react';
import { X, Save, RotateCcw, Copy, Check, Upload, Image as ImageIcon, Video, Globe, BookOpen } from 'lucide-react';
import { FoundationData } from '../data/foundationContent';

interface ContentEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: FoundationData;
  onSave: (newData: FoundationData) => void;
  onReset: () => void;
}

export const ContentEditorModal: React.FC<ContentEditorModalProps> = ({
  isOpen,
  onClose,
  data,
  onSave,
  onReset,
}) => {
  const [formData, setFormData] = useState<FoundationData>(JSON.parse(JSON.stringify(data)));
  const [activeTab, setActiveTab] = useState<'general' | 'home' | 'about' | 'projects' | 'resources' | 'social'>('general');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleTextChange = (path: string[], value: string) => {
    setFormData((prev) => {
      const copy = JSON.parse(JSON.stringify(prev));
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let current: any = copy;
      for (let i = 0; i < path.length - 1; i++) {
        current = current[path[i]];
      }
      current[path[path.length - 1]] = value;
      return copy;
    });
  };

  const handleSave = () => {
    onSave(formData);
    onClose();
  };

  const handleCopyConfig = () => {
    navigator.clipboard.writeText(JSON.stringify(formData, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in">
      <div className="bg-[#FBF9F5] w-full max-w-4xl max-h-[90vh] rounded-xl shadow-2xl flex flex-col border border-stone-300 overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 bg-stone-900 text-stone-100 flex items-center justify-between">
          <div>
            <h3 className="font-serif text-xl font-semibold flex items-center gap-2">
              <span>Foundation Content & Media Studio</span>
            </h3>
            <p className="text-xs text-stone-400 mt-0.5">
              Edit page copy, replace photos, add video links & social handles with instant preview
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-white rounded-md hover:bg-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-stone-200 bg-stone-100/80 px-6 gap-2 overflow-x-auto">
          {[
            { id: 'general', label: 'General & Contact', icon: Globe },
            { id: 'home', label: 'Home Page', icon: ImageIcon },
            { id: 'about', label: 'About & Lineage', icon: BookOpen },
            { id: 'projects', label: 'Seva Projects', icon: Upload },
            { id: 'resources', label: 'Resources & Mantras', icon: BookOpen },
            { id: 'social', label: 'Social & Video Links', icon: Video },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`flex items-center gap-2 py-3 px-3 text-xs font-medium border-b-2 whitespace-nowrap transition-colors ${
                  activeTab === tab.id
                    ? 'border-amber-900 text-amber-900 bg-white/60 font-semibold'
                    : 'border-transparent text-stone-600 hover:text-stone-950'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Form Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 text-sm text-stone-800">
          {activeTab === 'general' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1">
                  Foundation Name
                </label>
                <input
                  type="text"
                  value={formData.general.foundationName}
                  onChange={(e) => handleTextChange(['general', 'foundationName'], e.target.value)}
                  className="w-full px-3 py-2 border border-stone-300 rounded-md bg-white text-stone-900 focus:outline-none focus:border-amber-800"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1">
                  Tagline / Mission Motto
                </label>
                <input
                  type="text"
                  value={formData.general.tagline}
                  onChange={(e) => handleTextChange(['general', 'tagline'], e.target.value)}
                  className="w-full px-3 py-2 border border-stone-300 rounded-md bg-white text-stone-900 focus:outline-none focus:border-amber-800"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1">
                    Contact Email
                  </label>
                  <input
                    type="email"
                    value={formData.general.email}
                    onChange={(e) => handleTextChange(['general', 'email'], e.target.value)}
                    className="w-full px-3 py-2 border border-stone-300 rounded-md bg-white text-stone-900 focus:outline-none focus:border-amber-800"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1">
                    Office Phone
                  </label>
                  <input
                    type="text"
                    value={formData.general.phone}
                    onChange={(e) => handleTextChange(['general', 'phone'], e.target.value)}
                    className="w-full px-3 py-2 border border-stone-300 rounded-md bg-white text-stone-900 focus:outline-none focus:border-amber-800"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1">
                  Physical Location / Address (Pavagada Yoga Shala)
                </label>
                <input
                  type="text"
                  value={formData.general.location}
                  onChange={(e) => handleTextChange(['general', 'location'], e.target.value)}
                  className="w-full px-3 py-2 border border-stone-300 rounded-md bg-white text-stone-900 focus:outline-none focus:border-amber-800"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1">
                  Pavagada Google Maps URL
                </label>
                <input
                  type="text"
                  value={formData.general.mysoreMapsUrl || ''}
                  onChange={(e) => handleTextChange(['general', 'mysoreMapsUrl'], e.target.value)}
                  className="w-full px-3 py-2 border border-stone-300 rounded-md bg-white text-stone-900 focus:outline-none focus:border-amber-800"
                  placeholder="https://maps.app.goo.gl/..."
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1">
                  Bangalore Location Title
                </label>
                <input
                  type="text"
                  value={formData.general.bangaloreLocationTitle || ''}
                  onChange={(e) => handleTextChange(['general', 'bangaloreLocationTitle'], e.target.value)}
                  className="w-full px-3 py-2 border border-stone-300 rounded-md bg-white text-stone-900 focus:outline-none focus:border-amber-800"
                  placeholder="e.g. Bangalore Location (Foundation Administrative Office)"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1">
                  Bangalore Office Address
                </label>
                <input
                  type="text"
                  value={formData.general.bangaloreAddress || ''}
                  onChange={(e) => handleTextChange(['general', 'bangaloreAddress'], e.target.value)}
                  className="w-full px-3 py-2 border border-stone-300 rounded-md bg-white text-stone-900 focus:outline-none focus:border-amber-800"
                  placeholder="e.g. 3rd floor, 469, 6th Main Rd, Sadashiva Nagar, Bengaluru"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1">
                  Bangalore Google Maps URL
                </label>
                <input
                  type="text"
                  value={formData.general.bangaloreMapsUrl || ''}
                  onChange={(e) => handleTextChange(['general', 'bangaloreMapsUrl'], e.target.value)}
                  className="w-full px-3 py-2 border border-stone-300 rounded-md bg-white text-stone-900 focus:outline-none focus:border-amber-800"
                  placeholder="https://www.google.com/maps/search/?api=1&query=..."
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1">
                  Formspree Endpoint (Inquiry Form Dispatch)
                </label>
                <input
                  type="text"
                  value={formData.general.formspreeEndpoint || 'https://formspree.io/f/mnppnnee'}
                  onChange={(e) => handleTextChange(['general', 'formspreeEndpoint'], e.target.value)}
                  className="w-full px-3 py-2 border border-stone-300 rounded-md bg-white text-stone-900 focus:outline-none focus:border-amber-800"
                  placeholder="https://formspree.io/f/mnppnnee"
                />
              </div>
            </div>
          )}

          {activeTab === 'home' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1">
                  Home Hero Headline
                </label>
                <input
                  type="text"
                  value={formData.home.heroTitle}
                  onChange={(e) => handleTextChange(['home', 'heroTitle'], e.target.value)}
                  className="w-full px-3 py-2 border border-stone-300 rounded-md bg-white text-stone-900 focus:outline-none focus:border-amber-800"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1">
                  Hero Subtitle
                </label>
                <textarea
                  rows={2}
                  value={formData.home.heroSubtitle}
                  onChange={(e) => handleTextChange(['home', 'heroSubtitle'], e.target.value)}
                  className="w-full px-3 py-2 border border-stone-300 rounded-md bg-white text-stone-900 focus:outline-none focus:border-amber-800"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1">
                  Hero Image URL or Local Path
                </label>
                <input
                  type="text"
                  value={formData.home.heroImage}
                  onChange={(e) => handleTextChange(['home', 'heroImage'], e.target.value)}
                  className="w-full px-3 py-2 border border-stone-300 rounded-md bg-white text-stone-900 focus:outline-none focus:border-amber-800"
                  placeholder="https://... or /src/assets/images/..."
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1">
                  Foundation Overview (Paragraph 1)
                </label>
                <textarea
                  rows={3}
                  value={formData.home.overviewParagraph1}
                  onChange={(e) => handleTextChange(['home', 'overviewParagraph1'], e.target.value)}
                  className="w-full px-3 py-2 border border-stone-300 rounded-md bg-white text-stone-900 focus:outline-none focus:border-amber-800"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1">
                  Foundation Overview (Paragraph 2 - Seva focus)
                </label>
                <textarea
                  rows={3}
                  value={formData.home.overviewParagraph2}
                  onChange={(e) => handleTextChange(['home', 'overviewParagraph2'], e.target.value)}
                  className="w-full px-3 py-2 border border-stone-300 rounded-md bg-white text-stone-900 focus:outline-none focus:border-amber-800"
                />
              </div>
            </div>
          )}

          {activeTab === 'about' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1">
                  About Page Title
                </label>
                <input
                  type="text"
                  value={formData.about.title}
                  onChange={(e) => handleTextChange(['about', 'title'], e.target.value)}
                  className="w-full px-3 py-2 border border-stone-300 rounded-md bg-white text-stone-900 focus:outline-none focus:border-amber-800"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1">
                  About Shala Image URL
                </label>
                <input
                  type="text"
                  value={formData.about.image}
                  onChange={(e) => handleTextChange(['about', 'image'], e.target.value)}
                  className="w-full px-3 py-2 border border-stone-300 rounded-md bg-white text-stone-900 focus:outline-none focus:border-amber-800"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1">
                  Lineage Transmission Story (Parampara)
                </label>
                <textarea
                  rows={4}
                  value={formData.about.lineageStory}
                  onChange={(e) => handleTextChange(['about', 'lineageStory'], e.target.value)}
                  className="w-full px-3 py-2 border border-stone-300 rounded-md bg-white text-stone-900 focus:outline-none focus:border-amber-800"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1">
                  Vedanta Philosophy Explanation
                </label>
                <textarea
                  rows={3}
                  value={formData.about.vedantaExplanation}
                  onChange={(e) => handleTextChange(['about', 'vedantaExplanation'], e.target.value)}
                  className="w-full px-3 py-2 border border-stone-300 rounded-md bg-white text-stone-900 focus:outline-none focus:border-amber-800"
                />
              </div>
            </div>
          )}

          {activeTab === 'projects' && (
            <div className="space-y-6">
              <p className="text-xs text-stone-500">
                You can adjust titles, descriptions, and images for existing foundation initiatives.
              </p>
              {formData.projects.map((proj, idx) => (
                <div key={proj.id} className="p-4 border border-stone-200 rounded-lg bg-stone-50/70 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-serif font-semibold text-stone-900">Project #{idx + 1}</span>
                    <span className="text-xs text-stone-500">{proj.category}</span>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-stone-600 mb-0.5">Title</label>
                    <input
                      type="text"
                      value={proj.title}
                      onChange={(e) => {
                        const copy = [...formData.projects];
                        copy[idx].title = e.target.value;
                        setFormData({ ...formData, projects: copy });
                      }}
                      className="w-full px-3 py-1.5 border border-stone-300 rounded bg-white text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-stone-600 mb-0.5">Image URL</label>
                    <input
                      type="text"
                      value={proj.image}
                      onChange={(e) => {
                        const copy = [...formData.projects];
                        copy[idx].image = e.target.value;
                        setFormData({ ...formData, projects: copy });
                      }}
                      className="w-full px-3 py-1.5 border border-stone-300 rounded bg-white text-xs"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'resources' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1">
                  Resources Image URL
                </label>
                <input
                  type="text"
                  value={formData.ashtangaResources.image}
                  onChange={(e) => handleTextChange(['ashtangaResources', 'image'], e.target.value)}
                  className="w-full px-3 py-2 border border-stone-300 rounded-md bg-white text-stone-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1">
                  Opening Mantra Sanskrit Text
                </label>
                <textarea
                  rows={4}
                  value={formData.ashtangaResources.openingMantra.sanskrit}
                  onChange={(e) => handleTextChange(['ashtangaResources', 'openingMantra', 'sanskrit'], e.target.value)}
                  className="w-full px-3 py-2 border border-stone-300 rounded-md bg-white font-serif"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1">
                  Opening Mantra English Translation
                </label>
                <textarea
                  rows={3}
                  value={formData.ashtangaResources.openingMantra.translation}
                  onChange={(e) => handleTextChange(['ashtangaResources', 'openingMantra', 'translation'], e.target.value)}
                  className="w-full px-3 py-2 border border-stone-300 rounded-md bg-white"
                />
              </div>
            </div>
          )}

          {activeTab === 'social' && (
            <div className="space-y-4">
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-md text-amber-900 text-xs leading-relaxed">
                Add your real Instagram, Facebook, and YouTube links here. You can also paste YouTube video embed URLs (e.g. <code>https://www.youtube.com/embed/YOUR_VIDEO_ID</code>) to display directly in the player.
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1">
                  Instagram Profile URL
                </label>
                <input
                  type="text"
                  value={formData.general.instagramUrl}
                  onChange={(e) => handleTextChange(['general', 'instagramUrl'], e.target.value)}
                  className="w-full px-3 py-2 border border-stone-300 rounded-md bg-white"
                  placeholder="https://www.instagram.com/yourhandle"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1">
                  Facebook Page URL
                </label>
                <input
                  type="text"
                  value={formData.general.facebookUrl}
                  onChange={(e) => handleTextChange(['general', 'facebookUrl'], e.target.value)}
                  className="w-full px-3 py-2 border border-stone-300 rounded-md bg-white"
                  placeholder="https://www.facebook.com/yourpage"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1">
                  YouTube Channel URL
                </label>
                <input
                  type="text"
                  value={formData.general.youtubeUrl}
                  onChange={(e) => handleTextChange(['general', 'youtubeUrl'], e.target.value)}
                  className="w-full px-3 py-2 border border-stone-300 rounded-md bg-white"
                  placeholder="https://www.youtube.com/@yourchannel"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1">
                  Featured Shala Video Link (YouTube Embed)
                </label>
                <input
                  type="text"
                  value={formData.home.heroVideoUrl}
                  onChange={(e) => handleTextChange(['home', 'heroVideoUrl'], e.target.value)}
                  className="w-full px-3 py-2 border border-stone-300 rounded-md bg-white"
                  placeholder="https://www.youtube-nocookie.com/embed/..."
                />
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 bg-stone-100 border-t border-stone-200 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyConfig}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-stone-700 bg-white border border-stone-300 rounded-md hover:bg-stone-50 transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copied JSON Config!' : 'Copy Config JSON'}</span>
            </button>
            <button
              onClick={onReset}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-stone-600 hover:text-stone-900 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Defaults</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-stone-600 hover:text-stone-900 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-5 py-2 text-xs font-semibold text-white bg-amber-900 hover:bg-amber-950 rounded-md shadow transition-colors cursor-pointer"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save & Apply Changes</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
