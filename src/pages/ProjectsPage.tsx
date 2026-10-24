import React, { useState } from 'react';
import { Heart, MapPin, Users, CheckCircle, ArrowRight, Sparkles, Filter, ChevronDown, ChevronUp } from 'lucide-react';
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
  const [activeFilter, setActiveFilter] = useState<'All' | 'Education' | 'GoSeva' | 'Annadanam' | 'Environment' | 'Corporate & Gov'>('All');
  const [expandedProjectId, setExpandedProjectId] = useState<string | null>(null);
  const [volunteerSubmitted, setVolunteerSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [volunteerForm, setVolunteerForm] = useState({
    name: '',
    email: '',
    phone: '',
    skill: 'Yoga Instruction',
    projectInterest: 'Rural School Yoga',
    message: '',
  });

  const filteredProjects = data.projects.filter((p) => {
    if (activeFilter === 'All') return true;
    if (activeFilter === 'Education') return p.category.includes('Education') || p.category.includes('Child') || p.category.includes('Community');
    if (activeFilter === 'GoSeva') return p.category.includes('GoSeva') || p.category.includes('Goshala') || p.category.includes('Animal') || p.title.includes('Goshala');
    if (activeFilter === 'Annadanam') return p.category.includes('Annadanam') || p.title.includes('Annadanam') || p.category.includes('Food');
    if (activeFilter === 'Environment') return p.category.includes('Environment') || p.category.includes('Ashram') || p.title.includes('Shala') || p.title.includes('Vana') || p.category.includes('Forest');
    if (activeFilter === 'Corporate & Gov') return p.category.includes('Corporate') || p.category.includes('Public') || p.title.includes('Corporate') || p.title.includes('Government');
    return true;
  });

  const handleVolunteerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!volunteerForm.name || !volunteerForm.email) return;

    setIsSubmitting(true);
    const endpoint = data.general.volunteerFormspreeEndpoint || "https://formspree.io/f/maeenrea";

    try {
      await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          name: volunteerForm.name,
          email: volunteerForm.email,
          phone: volunteerForm.phone || 'N/A',
          skill: volunteerForm.skill,
          projectInterest: volunteerForm.projectInterest,
          message: volunteerForm.message || 'No additional message provided',
          subject: `New AYS Volunteer Seva Application: ${volunteerForm.name} (${volunteerForm.skill})`,
          timestamp: new Date().toLocaleString('en-IN', {
            dateStyle: 'medium',
            timeStyle: 'short',
          }),
        }),
      });
    } catch (err) {
      console.warn('Volunteer form submission transmission notice:', err);
    } finally {
      setIsSubmitting(false);
      setVolunteerSubmitted(true);
      setVolunteerForm({
        name: '',
        email: '',
        phone: '',
        skill: 'Yoga Instruction',
        projectInterest: 'Rural School Yoga',
        message: '',
      });
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
          Our Seva Initiatives & Samarpan Bhavana
        </h1>
        <div className="text-stone-600 text-base sm:text-lg max-w-3xl mx-auto font-light leading-relaxed space-y-2.5">
          <p>
            In the true spirit of Yoga, Seva — selfless service — transforms personal practice into service to humanity.
          </p>
          <p className="text-sm sm:text-base text-stone-600">
            Samarpan Bhavan is dedicated to nurturing child health, preserving ancient Sanskrit heritage, supporting rural elders, and promoting Yoga, Ayurveda, and conscious living. Together, we strive to spread compassion, preserve our roots, and transform lives through meaningful service.
          </p>
        </div>
        <div className="w-16 h-0.5 bg-amber-800 mx-auto mt-6" />
      </section>

      {/* Interactive Category Filter Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-stone-200">
          <div className="flex items-center gap-1.5 p-1 bg-stone-200/70 rounded-lg">
            {(['All', 'Education', 'GoSeva', 'Annadanam', 'Environment', 'Corporate & Gov'] as const).map((cat) => (
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
                    {project.collageImages && project.collageImages.length >= 2 ? (
                      <div className="grid grid-cols-2 h-full w-full gap-0.5 bg-stone-900/10">
                        <img
                          src={project.collageImages[0]}
                          alt={`${project.title} - community seva meal`}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover object-top"
                        />
                        <img
                          src={project.collageImages[1]}
                          alt={`${project.title} - sattvic prasad thalis`}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover object-center"
                        />
                      </div>
                    ) : (
                      <img
                        src={project.image}
                        alt={project.title}
                        referrerPolicy="no-referrer"
                        className={`w-full h-full object-cover ${
                          project.id === 'project-goshala-seva'
                            ? 'object-[center_35%]'
                            : project.id === 'project-annadanam-seva'
                            ? 'object-[center_57%]'
                            : project.id === 'project-heritage-shala'
                            ? 'object-[center_50%]'
                            : project.id === 'project-yoga-vana'
                            ? 'object-[center_38%]'
                            : 'object-center'
                        }`}
                      />
                    )}
                    <div className="absolute top-3 left-3 bg-stone-900/80 backdrop-blur-sm text-stone-100 text-xs px-2.5 py-1 rounded font-medium z-20">
                      {project.category}
                    </div>
                    <div className="absolute top-3 right-3 bg-amber-900/90 backdrop-blur-sm text-white text-xs px-2.5 py-1 rounded font-medium z-20">
                      {project.status}
                    </div>
                  </div>

                  <div className="p-6 sm:p-8 space-y-4">
                    <div className="flex items-center gap-2 text-xs text-stone-500">
                      <MapPin className="w-3.5 h-3.5 text-amber-700" />
                      <span>{project.location}</span>
                      {project.beneficiariesCount ? (
                        <>
                          <span aria-hidden="true">·</span>
                          <Users className="w-3.5 h-3.5 text-amber-700" />
                          <span>{project.beneficiariesCount}</span>
                        </>
                      ) : null}
                    </div>

                    <h3 className="font-serif text-2xl font-semibold text-stone-900">
                      {project.title}
                    </h3>

                    <p className="text-stone-600 text-sm leading-relaxed">
                      {project.longDescription}
                    </p>

                    {project.id === "project-rural-school-yoga" && (
                      <div className="pt-1">
                        <button
                          type="button"
                          onClick={() => setExpandedProjectId(expandedProjectId === project.id ? null : project.id)}
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-900 hover:text-amber-950 cursor-pointer py-1"
                        >
                          <span>{expandedProjectId === project.id ? 'Hide 5 Key Initiatives' : 'View 5 Key Initiatives & Vision'}</span>
                          {expandedProjectId === project.id ? (
                            <ChevronUp className="w-3.5 h-3.5" />
                          ) : (
                            <ChevronDown className="w-3.5 h-3.5" />
                          )}
                        </button>

                        {expandedProjectId === project.id && (
                          <div className="mt-2.5 p-4 bg-amber-50/70 border border-amber-200/80 rounded-lg space-y-3 text-xs text-stone-700 animate-fadeIn">
                            <div>
                              <p className="font-semibold text-amber-900 mb-2 uppercase tracking-wider text-[11px]">
                                Our 5 Key Initiatives
                              </p>
                              <ol className="space-y-2 list-none pl-0">
                                <li className="flex items-start gap-2">
                                  <span className="font-mono font-bold text-amber-900 shrink-0">1.</span>
                                  <div>
                                    <strong className="text-stone-900">Rural School Yoga Programmes:</strong> Introducing students to simple yogic practices that support physical well-being, concentration, discipline and self-awareness.
                                  </div>
                                </li>
                                <li className="flex items-start gap-2">
                                  <span className="font-mono font-bold text-amber-900 shrink-0">2.</span>
                                  <div>
                                    <strong className="text-stone-900">College Yoga & Youth Awareness:</strong> Empowering young people with practical tools for managing stress, improving focus and cultivating a balanced lifestyle.
                                  </div>
                                </li>
                                <li className="flex items-start gap-2">
                                  <span className="font-mono font-bold text-amber-900 shrink-0">3.</span>
                                  <div>
                                    <strong className="text-stone-900">Community Wellness Programmes:</strong> Organising Yoga, Pranayama and Meditation sessions for rural communities to encourage healthier living, inner well-being and collective awareness.
                                  </div>
                                </li>
                                <li className="flex items-start gap-2">
                                  <span className="font-mono font-bold text-amber-900 shrink-0">4.</span>
                                  <div>
                                    <strong className="text-stone-900">Pranayama & Meditation:</strong> Guiding participants in conscious breathing and meditation practices to cultivate calmness, improve attention and develop emotional resilience.
                                  </div>
                                </li>
                                <li className="flex items-start gap-2">
                                  <span className="font-mono font-bold text-amber-900 shrink-0">5.</span>
                                  <div>
                                    <strong className="text-stone-900">Healthy Living & Self-Awareness:</strong> Sharing awareness about mindful living, daily routines, conscious food habits and the integration of Yoga into everyday life.
                                  </div>
                                </li>
                              </ol>
                            </div>

                            <div className="pt-2 border-t border-amber-200/70 space-y-1 text-[11px] text-stone-600">
                              <p><strong className="text-stone-900">Our Approach:</strong> Combining traditional yogic wisdom with practical guidance suited to the needs of students, youth, teachers and community members.</p>
                              <p><strong className="text-stone-900">Our Vision:</strong> To create healthier, more conscious and compassionate communities through the transformative practice of Yoga.</p>
                              <p><strong className="text-stone-900">Our Mission:</strong> To make Yoga, Pranayama and Meditation accessible to rural and urban communities, encouraging every individual to live with health, balance, awareness and harmony.</p>
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {project.id === "project-goshala-seva" && (
                      <div className="pt-1">
                        <button
                          type="button"
                          onClick={() => setExpandedProjectId(expandedProjectId === project.id ? null : project.id)}
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-900 hover:text-amber-950 cursor-pointer py-1"
                        >
                          <span>{expandedProjectId === project.id ? 'Hide Seva Initiatives' : 'View Seva Initiatives & Purpose'}</span>
                          {expandedProjectId === project.id ? (
                            <ChevronUp className="w-3.5 h-3.5" />
                          ) : (
                            <ChevronDown className="w-3.5 h-3.5" />
                          )}
                        </button>

                        {expandedProjectId === project.id && (
                          <div className="mt-2.5 p-4 bg-amber-50/70 border border-amber-200/80 rounded-lg space-y-3 text-xs text-stone-700 animate-fadeIn">
                            <div>
                              <p className="font-semibold text-amber-900 mb-2 uppercase tracking-wider text-[11px]">
                                Our Seva Initiatives
                              </p>
                              <ul className="space-y-1.5 pl-0 list-none">
                                <li className="flex items-start gap-2">
                                  <span className="text-amber-900 font-bold shrink-0">•</span>
                                  <div><strong className="text-stone-900">Goshala Support:</strong> Supporting the care and welfare of cows.</div>
                                </li>
                                <li className="flex items-start gap-2">
                                  <span className="text-amber-900 font-bold shrink-0">•</span>
                                  <div><strong className="text-stone-900">Animal Nourishment:</strong> Encouraging responsible feeding and access to appropriate nutrition.</div>
                                </li>
                                <li className="flex items-start gap-2">
                                  <span className="text-amber-900 font-bold shrink-0">•</span>
                                  <div><strong className="text-stone-900">Community Participation:</strong> Inspiring volunteers and well-wishers to participate in compassionate service.</div>
                                </li>
                                <li className="flex items-start gap-2">
                                  <span className="text-amber-900 font-bold shrink-0">•</span>
                                  <div><strong className="text-stone-900">Awareness & Kindness:</strong> Promoting respect for animals and all forms of life.</div>
                                </li>
                              </ul>
                            </div>

                            <div className="pt-2 border-t border-amber-200/70 space-y-1 text-[11px] text-stone-600">
                              <p><strong className="text-stone-900">Our Purpose:</strong> To encourage compassion, responsible animal care, and community participation through meaningful acts of seva.</p>
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {project.id === "project-annadanam-seva" && (
                      <div className="pt-1">
                        <button
                          type="button"
                          onClick={() => setExpandedProjectId(expandedProjectId === project.id ? null : project.id)}
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-900 hover:text-amber-950 cursor-pointer py-1"
                        >
                          <span>{expandedProjectId === project.id ? 'Hide Seva Activities' : 'View Seva Activities & Scope'}</span>
                          {expandedProjectId === project.id ? (
                            <ChevronUp className="w-3.5 h-3.5" />
                          ) : (
                            <ChevronDown className="w-3.5 h-3.5" />
                          )}
                        </button>

                        {expandedProjectId === project.id && (
                          <div className="mt-2.5 p-4 bg-amber-50/70 border border-amber-200/80 rounded-lg space-y-3 text-xs text-stone-700 animate-fadeIn">
                            <div>
                              <p className="font-semibold text-amber-900 mb-2 uppercase tracking-wider text-[11px]">
                                Our Seva Activities
                              </p>
                              <ul className="space-y-1.5 pl-0 list-none">
                                <li className="flex items-start gap-2">
                                  <span className="text-amber-900 font-bold shrink-0">•</span>
                                  <div><strong className="text-stone-900">Yoga Programme Annadanam:</strong> Providing nutritious meals and refreshments during Yoga, Pranayama, and Meditation programmes.</div>
                                </li>
                                <li className="flex items-start gap-2">
                                  <span className="text-amber-900 font-bold shrink-0">•</span>
                                  <div><strong className="text-stone-900">Ekadashi Food Seva:</strong> Organising charitable food distribution in the spirit of compassion and devotion.</div>
                                </li>
                                <li className="flex items-start gap-2">
                                  <span className="text-amber-900 font-bold shrink-0">•</span>
                                  <div><strong className="text-stone-900">Rural Community Annadanam:</strong> Extending food support to underserved communities and people in need.</div>
                                </li>
                                <li className="flex items-start gap-2">
                                  <span className="text-amber-900 font-bold shrink-0">•</span>
                                  <div><strong className="text-stone-900">Sattvic Food Awareness:</strong> Promoting mindful eating and balanced, nourishing vegetarian food.</div>
                                </li>
                                <li className="flex items-start gap-2">
                                  <span className="text-amber-900 font-bold shrink-0">•</span>
                                  <div><strong className="text-stone-900">Community Participation:</strong> Encouraging donors and volunteers to join hands in selfless service.</div>
                                </li>
                              </ul>
                            </div>

                            <div className="pt-2 border-t border-amber-200/70 space-y-1 text-[11px] text-stone-600">
                              <p><strong className="text-stone-900">Support Our Mission:</strong> Every contribution helps provide fresh ingredients, meal preparation, serving materials, and food distribution for rural seekers.</p>
                              <p><strong className="text-stone-900">Join Us in Seva:</strong> Let every Yoga programme become an opportunity to serve, and every Ekadashi a reminder of compassion, generosity, and gratitude.</p>
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {project.id === "project-heritage-shala" && (
                      <div className="pt-1">
                        <button
                          type="button"
                          onClick={() => setExpandedProjectId(expandedProjectId === project.id ? null : project.id)}
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-900 hover:text-amber-950 cursor-pointer py-1"
                        >
                          <span>{expandedProjectId === project.id ? 'Hide Shala Vision' : 'View Heritage Vision & Pillars'}</span>
                          {expandedProjectId === project.id ? (
                            <ChevronUp className="w-3.5 h-3.5" />
                          ) : (
                            <ChevronDown className="w-3.5 h-3.5" />
                          )}
                        </button>

                        {expandedProjectId === project.id && (
                          <div className="mt-2.5 p-4 bg-amber-50/70 border border-amber-200/80 rounded-lg space-y-3 text-xs text-stone-700 animate-fadeIn">
                            <div>
                              <p className="font-semibold text-amber-900 mb-2 uppercase tracking-wider text-[11px]">
                                Our Heritage & Ecological Pillars
                              </p>
                              <ul className="space-y-1.5 pl-0 list-none">
                                <li className="flex items-start gap-2">
                                  <span className="text-amber-900 font-bold shrink-0">•</span>
                                  <div><strong className="text-stone-900">Preserving Heritage:</strong> Upholding traditional architectural heritage through sustainable, nature-friendly practices, local materials, and local artisan craftsmanship.</div>
                                </li>
                                <li className="flex items-start gap-2">
                                  <span className="text-amber-900 font-bold shrink-0">•</span>
                                  <div><strong className="text-stone-900">Living in Harmony:</strong> Encouraging breathable natural materials, ecological restoration, and community herbal nurseries to honor traditional knowledge and biodiversity.</div>
                                </li>
                                <li className="flex items-start gap-2">
                                  <span className="text-amber-900 font-bold shrink-0">•</span>
                                  <div><strong className="text-stone-900">Transforming Lives:</strong> Cultivating positive energy, emotional balance, inner peace, and self-awareness through Yoga, Pranayama, Meditation, and Ayurveda awareness.</div>
                                </li>
                                <li className="flex items-start gap-2">
                                  <span className="text-amber-900 font-bold shrink-0">•</span>
                                  <div><strong className="text-stone-900">Sustainable Future:</strong> Building a community culture where people live in conscious harmony with themselves, their communities, and the Earth.</div>
                                </li>
                              </ul>
                            </div>

                            <div className="pt-2 border-t border-amber-200/70 space-y-1 text-[11px] text-stone-600">
                              <p><strong className="text-stone-900">Our Guiding Vision:</strong> Every initiative is an opportunity to spread positivity, awaken human potential, preserve our cultural roots, and create a sustainable future for generations to come.</p>
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {project.id === "project-gov-corporate-wellness" && (
                      <div className="pt-1">
                        <button
                          type="button"
                          onClick={() => setExpandedProjectId(expandedProjectId === project.id ? null : project.id)}
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-900 hover:text-amber-950 cursor-pointer py-1"
                        >
                          <span>{expandedProjectId === project.id ? 'Hide Programme Details' : 'View Key Programmes, Experience & CSR'}</span>
                          {expandedProjectId === project.id ? (
                            <ChevronUp className="w-3.5 h-3.5" />
                          ) : (
                            <ChevronDown className="w-3.5 h-3.5" />
                          )}
                        </button>

                        {expandedProjectId === project.id && (
                          <div className="mt-2.5 p-4 bg-amber-50/70 border border-amber-200/80 rounded-lg space-y-3.5 text-xs text-stone-700 animate-fadeIn">
                            <div>
                              <p className="font-semibold text-amber-900 mb-2 uppercase tracking-wider text-[11px]">
                                Our Key Programmes
                              </p>
                              <ul className="space-y-1.5 pl-0 list-none">
                                <li className="flex items-start gap-2">
                                  <span className="text-amber-900 font-bold shrink-0">1.</span>
                                  <div><strong className="text-stone-900">Workplace Wellness & Stress Management:</strong> Guided Pranayama and meditation for employees, stress relief, emotional balance, focus, and healthy daily routines.</div>
                                </li>
                                <li className="flex items-start gap-2">
                                  <span className="text-amber-900 font-bold shrink-0">2.</span>
                                  <div><strong className="text-stone-900">Government Institution Partnerships:</strong> Yoga and meditation programmes for civil staff, public sector undertakings, and community outreach.</div>
                                </li>
                                <li className="flex items-start gap-2">
                                  <span className="text-amber-900 font-bold shrink-0">3.</span>
                                  <div><strong className="text-stone-900">School & Educational Programmes:</strong> Concentration, discipline, and age-appropriate mindful practices for students and educators.</div>
                                </li>
                                <li className="flex items-start gap-2">
                                  <span className="text-amber-900 font-bold shrink-0">4.</span>
                                  <div><strong className="text-stone-900">Residential Yoga & Meditation:</strong> Structured multi-day immersive programmes cultivating consistent wellness routines.</div>
                                </li>
                              </ul>
                            </div>

                            <div className="pt-2 border-t border-amber-200/70 space-y-1">
                              <p className="font-semibold text-amber-900 uppercase tracking-wider text-[11px]">
                                Selected Institutional Experience
                              </p>
                              <div className="space-y-1 text-[11px] text-stone-600">
                                <p>• <strong className="text-stone-900">KSPDCL, Pavagada:</strong> 6-day Pranayama & Meditation Programme at Pavagada Solar Park (25 participants).</p>
                                <p>• <strong className="text-stone-900">POWERGRID, Pavagada:</strong> Employee wellness engagement through breath and meditation.</p>
                                <p>• <strong className="text-stone-900">Schools & Colleges:</strong> Practical sessions across Karnataka.</p>
                              </div>
                            </div>

                            <div className="pt-2 border-t border-amber-200/70 space-y-1 text-[11px] text-stone-600">
                              <p><strong className="text-stone-900">Partnership & CSR Support:</strong> We welcome collaboration with government bodies, PSUs, corporate organisations, and CSR partners to organise free or subsidised programmes.</p>
                              <p><strong className="text-stone-900">Our Vision:</strong> Healthy Individuals • Conscious Communities • A Balanced Society.</p>
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {project.id === "project-yoga-vana" && (
                      <div className="pt-1">
                        <button
                          type="button"
                          onClick={() => setExpandedProjectId(expandedProjectId === project.id ? null : project.id)}
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-900 hover:text-amber-950 cursor-pointer py-1"
                        >
                          <span>{expandedProjectId === project.id ? 'Hide Forest Model Details' : 'View Vision, Objectives & 50-Acre Model'}</span>
                          {expandedProjectId === project.id ? (
                            <ChevronUp className="w-3.5 h-3.5" />
                          ) : (
                            <ChevronDown className="w-3.5 h-3.5" />
                          )}
                        </button>

                        {expandedProjectId === project.id && (
                          <div className="mt-2.5 p-4 bg-amber-50/70 border border-amber-200/80 rounded-lg space-y-3.5 text-xs text-stone-700 animate-fadeIn">
                            <div>
                              <p className="font-semibold text-amber-900 mb-1.5 uppercase tracking-wider text-[11px]">
                                Our Vision for Yoga Vana
                              </p>
                              <p className="text-[11px] leading-relaxed text-stone-700">
                                Yoga Vana is a proposed 50-acre green forest and conscious-living initiative envisioned by AYS Yoga Foundation in Pavagada Taluk, Tumakuru District, Karnataka. The project aims to develop a green forest model bringing together tree planting, ecological restoration, yoga, meditation, environmental awareness, and community participation.
                              </p>
                            </div>

                            <div className="pt-2 border-t border-amber-200/70">
                              <p className="font-semibold text-amber-900 mb-2 uppercase tracking-wider text-[11px]">
                                Project Objectives
                              </p>
                              <ul className="space-y-1.5 pl-0 list-none">
                                <li className="flex items-start gap-2">
                                  <span className="text-amber-900 font-bold shrink-0">•</span>
                                  <div><strong className="text-stone-900">Green Forest Development:</strong> Establishing a diverse, locally appropriate forest landscape using native tree species.</div>
                                </li>
                                <li className="flex items-start gap-2">
                                  <span className="text-amber-900 font-bold shrink-0">•</span>
                                  <div><strong className="text-stone-900">Ecological Restoration:</strong> Supporting soil health, biodiversity, water retention, and regional microclimate balance.</div>
                                </li>
                                <li className="flex items-start gap-2">
                                  <span className="text-amber-900 font-bold shrink-0">•</span>
                                  <div><strong className="text-stone-900">Yoga & Nature Sadhana:</strong> Cultivating serene spaces for nature-based yoga, pranayama, silent meditation, and self-awareness.</div>
                                </li>
                                <li className="flex items-start gap-2">
                                  <span className="text-amber-900 font-bold shrink-0">•</span>
                                  <div><strong className="text-stone-900">Community Seva & Farmers:</strong> Encouraging volunteers, students, farmers, and local villagers to participate in collective environmental stewardship.</div>
                                </li>
                                <li className="flex items-start gap-2">
                                  <span className="text-amber-900 font-bold shrink-0">•</span>
                                  <div><strong className="text-stone-900">Sustainable Living:</strong> Promoting water harvesting, soil protection, responsible land use, and nature-friendly practices.</div>
                                </li>
                                <li className="flex items-start gap-2">
                                  <span className="text-amber-900 font-bold shrink-0">•</span>
                                  <div><strong className="text-stone-900">Long-Term Tree Care:</strong> Structured watering, protection, and ongoing maintenance to ensure saplings grow into mature canopy.</div>
                                </li>
                              </ul>
                            </div>

                            <div className="pt-2 border-t border-amber-200/70 space-y-1">
                              <p className="font-semibold text-amber-900 uppercase tracking-wider text-[11px]">
                                Proposed Project Model (Pavagada Taluk)
                              </p>
                              <div className="space-y-1 text-[11px] text-stone-600">
                                <p>• <strong className="text-stone-900">Location & Area:</strong> Pavagada Taluk, Tumakuru District, Karnataka — 50-Acre model plot.</p>
                                <p>• <strong className="text-stone-900">Implementation:</strong> Phased ecological planning, native drought-resilient species, rainwater trenches, and ongoing volunteer care.</p>
                                <p>• <strong className="text-stone-900">6-Stage Approach:</strong> 1. Land & soil suitability assessment → 2. Native species selection → 3. Phased planting & water plan → 4. Community mobilization → 5. Growth monitoring & survival maintenance → 6. Environmental awareness & nature yoga retreats.</p>
                              </div>
                            </div>

                            <div className="pt-2 border-t border-amber-200/70 space-y-1 text-[11px] text-stone-600">
                              <p><strong className="text-stone-900">Support Yoga Vana & CSR:</strong> Building a forest requires dedicated care over years. Contributions support native saplings, organic soil enrichment, drip/water management, fencing, and community workshops.</p>
                              <p><strong className="text-stone-900">Motto:</strong> Plant • Protect • Preserve — Creating living harmony between human consciousness and nature.</p>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
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
                Serve with truth, compassion, and awareness. Your time and skills can transform your life while touching hundreds of others.
              </p>
              <div className="space-y-2.5 text-xs text-stone-700 pt-2">
                <p className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span>On-ground seva in Mysuru, Tumkuru, and surrounding villages</span>
                </p>
                <p className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span>Cooking Seva during programmes</span>
                </p>
                <p className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span>Program management and support</span>
                </p>
                <p className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span>Technology support volunteering</span>
                </p>
              </div>
            </div>

            <div className="lg:col-span-6 bg-white p-6 sm:p-8 rounded-lg border border-stone-200 shadow-sm">
              {volunteerSubmitted ? (
                <div className="text-center py-8 space-y-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                    <CheckCircle className="w-6 h-6" />
                  </div>
                  <div className="space-y-1.5">
                    <h4 className="font-serif text-xl font-semibold text-stone-900">
                      Dhanyavad! Thank you for your offering.
                    </h4>
                    <p className="text-xs text-stone-600 max-w-sm mx-auto leading-relaxed">
                      Your volunteer expression has been submitted directly to our Seva coordinator. We will review your background and reach out shortly.
                    </p>
                  </div>
                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => setVolunteerSubmitted(false)}
                      className="text-xs font-semibold uppercase tracking-wider text-amber-900 hover:text-amber-950 cursor-pointer underline underline-offset-4"
                    >
                      Submit Another Volunteer Expression
                    </button>
                  </div>
                </div>
              ) : (
                <form
                  action={data.general.volunteerFormspreeEndpoint || "https://formspree.io/f/maeenrea"}
                  method="POST"
                  onSubmit={handleVolunteerSubmit}
                  className="space-y-4 text-xs"
                >
                  <input type="hidden" name="_subject" value={`New AYS Volunteer Seva Application: ${volunteerForm.name || 'Seeker'}`} />

                  <div>
                    <label className="block font-medium text-stone-700 mb-1">Your Full Name <span className="text-rose-500">*</span></label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={volunteerForm.name}
                      onChange={(e) => setVolunteerForm({ ...volunteerForm, name: e.target.value })}
                      placeholder="e.g. Maya Sharma"
                      className="w-full px-3 py-2 border border-stone-300 rounded-md focus:outline-none focus:border-amber-800 text-sm"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-medium text-stone-700 mb-1">Email Address <span className="text-rose-500">*</span></label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={volunteerForm.email}
                        onChange={(e) => setVolunteerForm({ ...volunteerForm, email: e.target.value })}
                        placeholder="you@example.com"
                        className="w-full px-3 py-2 border border-stone-300 rounded-md focus:outline-none focus:border-amber-800 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block font-medium text-stone-700 mb-1">Phone / WhatsApp</label>
                      <input
                        type="tel"
                        name="phone"
                        value={volunteerForm.phone}
                        onChange={(e) => setVolunteerForm({ ...volunteerForm, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                        className="w-full px-3 py-2 border border-stone-300 rounded-md focus:outline-none focus:border-amber-800 text-sm"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-medium text-stone-700 mb-1">Skill Area</label>
                      <select
                        name="skill"
                        value={volunteerForm.skill}
                        onChange={(e) => setVolunteerForm({ ...volunteerForm, skill: e.target.value })}
                        className="w-full px-3 py-2 border border-stone-300 rounded-md bg-white focus:outline-none focus:border-amber-800"
                      >
                        <option>On-Ground Seva</option>
                        <option>Cooking Seva / Annadanam</option>
                        <option>Program Management & Support</option>
                        <option>Technology Support Volunteering</option>
                        <option>Yoga Instruction</option>
                        <option>Govu Seva / Animal Care</option>
                        <option>Organic Farming / Agro-Forestry</option>
                      </select>
                    </div>
                    <div>
                      <label className="block font-medium text-stone-700 mb-1">Project Interest</label>
                      <select
                        name="projectInterest"
                        value={volunteerForm.projectInterest}
                        onChange={(e) => setVolunteerForm({ ...volunteerForm, projectInterest: e.target.value })}
                        className="w-full px-3 py-2 border border-stone-300 rounded-md bg-white focus:outline-none focus:border-amber-800"
                      >
                        <option>Rural School Yoga Programmes</option>
                        <option>Govu Seva & Animal Care</option>
                        <option>Annadanam Seva Project</option>
                        <option>Eco-Friendly Traditional Shala</option>
                        <option>Government & Corporate Wellness</option>
                        <option>Yoga Vana 50-Acre Forest Model</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block font-medium text-stone-700 mb-1">A Brief Note on Your Intent</label>
                    <textarea
                      name="message"
                      rows={3}
                      value={volunteerForm.message}
                      onChange={(e) => setVolunteerForm({ ...volunteerForm, message: e.target.value })}
                      placeholder="How would you like to contribute your skills and time?"
                      className="w-full px-3 py-2 border border-stone-300 rounded-md focus:outline-none focus:border-amber-800 text-sm"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-2.5 bg-stone-900 hover:bg-amber-950 disabled:bg-stone-500 text-white font-medium rounded-md transition-colors cursor-pointer text-xs uppercase tracking-wider flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Submitting Offering...</span>
                      </>
                    ) : (
                      <span>Submit Volunteer Expression</span>
                    )}
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
