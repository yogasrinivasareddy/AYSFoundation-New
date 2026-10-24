import React, { useState } from 'react';
import { Heart, MapPin, Users, CheckCircle, ArrowRight, Sparkles, Filter } from 'lucide-react';
import { FoundationData } from '../data/foundationContent';

interface ProjectsPageProps {
  data: FoundationData;
  onNavigate: (page: string) => void;
  onSelectProjectForDonation: (projectId: string) => void;
}

export const ProjectsPage: React.FC<ProjectsPageProps> = ({
  data,
  onNavigate,
  onSelectProjectForDonation,
}) => {
  const [activeFilter, setActiveFilter] = useState<'All' | 'Education' | 'Heritage' | 'Healthcare' | 'Environment'>('All');
  const [volunteerSubmitted, setVolunteerSubmitted] = useState(false);
  const [volunteerForm, setVolunteerForm] = useState({
    name: '',
    email: '',
    skill: 'Yoga Instruction',
    projectInterest: 'Rural School Yoga',
    message: '',
  });

  const filteredProjects = data.projects.filter((p) => {
    if (activeFilter === 'All') return true;
    if (activeFilter === 'Education') return p.category.includes('Education') || p.category.includes('Child');
    if (activeFilter === 'Heritage') return p.category.includes('Heritage') || p.category.includes('Cultural');
    if (activeFilter === 'Healthcare') return p.category.includes('Healthcare') || p.category.includes('Elders');
    if (activeFilter === 'Environment') return p.category.includes('Environment') || p.category.includes('Ashram');
    return true;
  });

  const handleVolunteerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (volunteerForm.name && volunteerForm.email) {
      setVolunteerSubmitted(true);
      setTimeout(() => {
        setVolunteerForm({
          name: '',
          email: '',
          skill: 'Yoga Instruction',
          projectInterest: 'Rural School Yoga',
          message: '',
        });
      }, 3500);
    }
  };

  return (
    <div className="space-y-16 lg:space-y-24 py-8">
      {/* Header */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <span className="text-xs uppercase tracking-widest text-amber-800 font-semibold">
          Karma Yoga in Action
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-stone-900 font-medium tracking-tight text-balance">
          Our Seva Initiatives & Humanitarian Projects
        </h1>
        <p className="text-stone-600 text-base sm:text-lg max-w-2xl mx-auto font-light leading-relaxed">
          In the tradition of authentic yoga, physical practice finds its highest fulfillment in selfless service (Seva). Explore our ongoing grassroots efforts to nurture child health, protect ancient Sanskrit manuscripts, and support rural elders.
        </p>
        <div className="w-16 h-0.5 bg-amber-800 mx-auto mt-6" />
      </section>

      {/* Interactive Category Filter Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-stone-200">
          <div className="flex items-center gap-1.5 p-1 bg-stone-200/70 rounded-lg">
            {(['All', 'Education', 'Heritage', 'Healthcare', 'Environment'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-all cursor-pointer whitespace-nowrap ${
                  activeFilter === cat
                    ? 'bg-white text-stone-900 shadow-sm font-semibold'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                {cat === 'All' ? 'All Initiatives' : cat}
              </button>
            ))}
          </div>

          <div className="text-xs text-stone-500">
            Showing <span className="font-semibold text-stone-800">{filteredProjects.length}</span> of {data.projects.length} foundation initiatives
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {filteredProjects.map((project) => {
            const percent = Math.min(100, Math.round((project.raisedAmount / project.goalAmount) * 100));
            return (
              <div
                key={project.id}
                className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-[16/10] bg-stone-200 overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 left-3 bg-stone-900/80 backdrop-blur-sm text-stone-100 text-xs px-2.5 py-1 rounded font-medium">
                      {project.category}
                    </div>
                    <div className="absolute top-3 right-3 bg-amber-900/90 backdrop-blur-sm text-white text-xs px-2.5 py-1 rounded font-medium">
                      {project.status}
                    </div>
                  </div>

                  <div className="p-6 sm:p-8 space-y-4">
                    <div className="flex items-center gap-2 text-xs text-stone-500">
                      <MapPin className="w-3.5 h-3.5 text-amber-700" />
                      <span>{project.location}</span>
                      <span aria-hidden="true">·</span>
                      <Users className="w-3.5 h-3.5 text-amber-700" />
                      <span>{project.beneficiariesCount}</span>
                    </div>

                    <h3 className="font-serif text-2xl font-semibold text-stone-900">
                      {project.title}
                    </h3>

                    <p className="text-stone-600 text-sm leading-relaxed">
                      {project.longDescription}
                    </p>

                    {/* Progress Bar */}
                    <div className="pt-4 border-t border-stone-100 space-y-2">
                      <div className="flex justify-between text-xs text-stone-600 font-medium">
                        <span>Raised: ${project.raisedAmount.toLocaleString()}</span>
                        <span>Goal: ${project.goalAmount.toLocaleString()}</span>
                      </div>
                      <div className="w-full bg-stone-100 h-2 rounded-full overflow-hidden">
                        <div
                          className="bg-amber-800 h-full rounded-full transition-all duration-700"
                          style={{ width: `${percent}%` }}
                        />
                      </div>
                      <div className="flex justify-between text-xs text-stone-500 pt-0.5">
                        <span>{percent}% Funded</span>
                        <span>Remaining: ${Math.max(0, project.goalAmount - project.raisedAmount).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="px-6 sm:px-8 pb-6 sm:pb-8 pt-2 flex items-center justify-between border-t border-stone-100 gap-4">
                  <button
                    onClick={() => onSelectProjectForDonation(project.id)}
                    className="flex-1 py-2.5 px-4 bg-amber-900 hover:bg-amber-950 text-white text-xs font-semibold uppercase tracking-wider rounded-md transition-colors flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
                  >
                    <Heart className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
                    <span>Support This Seva</span>
                  </button>
                  <button
                    onClick={() => onNavigate('donations')}
                    className="text-xs text-stone-600 hover:text-stone-900 font-medium whitespace-nowrap cursor-pointer"
                  >
                    Details
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Volunteer & Seva Participation Section */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FAF7F2] border border-stone-300 rounded-xl p-8 sm:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 space-y-4">
              <span className="text-xs uppercase tracking-widest text-amber-800 font-semibold">
                Offer Your Time & Skills
              </span>
              <h3 className="font-serif text-3xl text-stone-900 font-medium">
                Participate in Seva as a Volunteer
              </h3>
              <p className="text-stone-600 text-sm leading-relaxed">
                Whether you are a certified yoga teacher, Sanskrit scholar, photographer, organic gardener, or medical professional, your hands-on presence can touch hundreds of lives.
              </p>
              <div className="space-y-2 text-xs text-stone-600 pt-2">
                <p className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-700" />
                  <span>On-ground volunteer programs in Mysore & surrounding villages</span>
                </p>
                <p className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-700" />
                  <span>Remote manuscript translation and archive digitization assistance</span>
                </p>
                <p className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-700" />
                  <span>Certificate of Seva Service issued by AYS Charitable Trust</span>
                </p>
              </div>
            </div>

            <div className="lg:col-span-6 bg-white p-6 sm:p-8 rounded-lg border border-stone-200 shadow-sm">
              {volunteerSubmitted ? (
                <div className="text-center py-8 space-y-3">
                  <CheckCircle className="w-10 h-10 text-emerald-600 mx-auto" />
                  <h4 className="font-serif text-xl font-semibold text-stone-900">
                    Dhanyavad! Thank you for your offering.
                  </h4>
                  <p className="text-xs text-stone-600 max-w-sm mx-auto">
                    Our Seva coordinator will review your background and reach out via email shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleVolunteerSubmit} className="space-y-4 text-xs">
                  <div>
                    <label className="block font-medium text-stone-700 mb-1">Your Full Name</label>
                    <input
                      type="text"
                      required
                      value={volunteerForm.name}
                      onChange={(e) => setVolunteerForm({ ...volunteerForm, name: e.target.value })}
                      placeholder="e.g. Maya Sharma"
                      className="w-full px-3 py-2 border border-stone-300 rounded-md focus:outline-none focus:border-amber-800 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block font-medium text-stone-700 mb-1">Email Address</label>
                    <input
                      type="email"
                      required
                      value={volunteerForm.email}
                      onChange={(e) => setVolunteerForm({ ...volunteerForm, email: e.target.value })}
                      placeholder="you@example.com"
                      className="w-full px-3 py-2 border border-stone-300 rounded-md focus:outline-none focus:border-amber-800 text-sm"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-medium text-stone-700 mb-1">Skill Area</label>
                      <select
                        value={volunteerForm.skill}
                        onChange={(e) => setVolunteerForm({ ...volunteerForm, skill: e.target.value })}
                        className="w-full px-3 py-2 border border-stone-300 rounded-md bg-white focus:outline-none focus:border-amber-800"
                      >
                        <option>Yoga Instruction</option>
                        <option>Sanskrit / Chanting</option>
                        <option>Healthcare / Ayur</option>
                        <option>Photography / Video</option>
                        <option>Organic Farming</option>
                      </select>
                    </div>
                    <div>
                      <label className="block font-medium text-stone-700 mb-1">Project Interest</label>
                      <select
                        value={volunteerForm.projectInterest}
                        onChange={(e) => setVolunteerForm({ ...volunteerForm, projectInterest: e.target.value })}
                        className="w-full px-3 py-2 border border-stone-300 rounded-md bg-white focus:outline-none focus:border-amber-800"
                      >
                        <option>Rural School Yoga</option>
                        <option>Vedic Manuscripts</option>
                        <option>Elder Health Camps</option>
                        <option>Eco-Shala Sanctuary</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block font-medium text-stone-700 mb-1">A Brief Note on Your Intent</label>
                    <textarea
                      rows={3}
                      value={volunteerForm.message}
                      onChange={(e) => setVolunteerForm({ ...volunteerForm, message: e.target.value })}
                      placeholder="How would you like to contribute?"
                      className="w-full px-3 py-2 border border-stone-300 rounded-md focus:outline-none focus:border-amber-800 text-sm"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 bg-stone-900 hover:bg-amber-950 text-white font-medium rounded-md transition-colors cursor-pointer text-xs uppercase tracking-wider"
                  >
                    Submit Volunteer Expression
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
