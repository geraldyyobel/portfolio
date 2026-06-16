import React, { useState } from 'react';
import { motion } from 'motion/react';
import { usePortfolio } from '../context/PortfolioContext';
import { 
  X, 
  User, 
  Bookmark, 
  Briefcase, 
  GraduationCap, 
  Award, 
  Save, 
  Trash2, 
  Plus, 
  RefreshCw, 
  Check, 
  FileText,
  Sparkles,
  Link2,
  Lock,
  ShieldAlert
} from 'lucide-react';
import { Project, Experience, Education, Certification, SectionVisibility } from '../types';

export default function CmsPanel() {
  const {
    personalInfo,
    projects,
    experiences,
    educations,
    certifications,
    sectionVisibility,
    isCmsActive,
    setIsCmsActive,
    updatePersonalInfo,
    updateProjects,
    updateExperiences,
    updateEducations,
    updateCertifications,
    updateSectionVisibility,
    resetAllData,
    isAuthenticated,
    setAuthenticated
  } = usePortfolio();

  const [activeTab, setActiveTab] = useState<'profile' | 'projects' | 'experience' | 'education' | 'certifications' | 'settings'>('profile');
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Login credentials state
  const [loginUsername, setLoginUsername] = useState('admin');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Profile fields state
  const [profileForm, setProfileForm] = useState({ ...personalInfo, skillsString: personalInfo.skills.join(', ') });

  // Projects list state
  const [projectsList, setProjectsList] = useState<Project[]>(projects);

  // Experiences list state
  const [experiencesList, setExperiencesList] = useState<Experience[]>(experiences);

  // Educations list state
  const [educationsList, setEducationsList] = useState<Education[]>(educations);

  // Certifications list state
  const [certificationsList, setCertificationsList] = useState<Certification[]>(certifications);

  // Reload states when panel is opened or toggled
  React.useEffect(() => {
    if (isCmsActive) {
      setProfileForm({ ...personalInfo, skillsString: personalInfo.skills.join(', ') });
      setProjectsList(projects);
      setExperiencesList(experiences);
      setEducationsList(educations);
      setCertificationsList(certifications);
    }
  }, [isCmsActive, personalInfo, projects, experiences, educations, certifications]);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginUsername === 'admin' && loginPassword === 'yobelganteng') {
      setAuthenticated(true);
      setLoginError('');
      setLoginPassword('');
    } else {
      setLoginError('Incorrect Passkey key. Try "#yobelganteng" or standard administrator key');
    }
  };

  if (!isCmsActive) return null;

  // Render Login Gate overlay inside Cms Panel if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen w-full bg-[#0a0a0c] text-white flex flex-col justify-center items-center p-6 relative font-sans overflow-hidden">
        {/* Subtle decorative radial light */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[600px] bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293708_1px,transparent_1px),linear-gradient(to_bottom,#1f293708_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none opacity-40" />

        {/* Home option */}
        <button 
          onClick={() => setIsCmsActive(false)}
          className="absolute top-6 right-6 px-4 py-2 bg-white/5 border border-white/10 hover:bg-white/10 rounded-lg text-xs font-mono font-bold tracking-wider hover:text-white transition-all cursor-pointer text-slate-400 flex items-center gap-2"
        >
          <X className="size-3.5" />
          <span>Exit Studio</span>
        </button>

        {/* Centered Login Card */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="w-full max-w-sm bg-[#121215] border border-white/10 p-8 rounded-xl shadow-2xl relative z-10 space-y-8"
        >
          <div className="text-center space-y-3">
            <div className="size-12 bg-indigo-600/15 text-indigo-400 border border-indigo-500/35 rounded-full flex items-center justify-center mx-auto shadow-sm">
              <Lock className="size-5 text-indigo-400" />
            </div>
            <div>
              <h2 className="text-lg font-black tracking-tight uppercase text-white font-display font-bold">
                CMS Authentication Gate
              </h2>
              <p className="text-[10px] text-indigo-400 font-mono tracking-widest uppercase mt-1">
                SECURE CREATOR ENVIRONMENT
              </p>
            </div>
          </div>

          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 leading-none">
                User Privilege
              </label>
              <input 
                type="text" 
                value={loginUsername}
                onChange={(e) => setLoginUsername(e.target.value)}
                required
                className="w-full bg-[#1A1A1E] border border-white/10 rounded px-3.5 py-3 text-sm text-white focus:outline-none focus:border-indigo-500 font-sans transition-colors"
                placeholder="e.g. admin"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 leading-none">
                Security Passkey
              </label>
              <input 
                type="password" 
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                required
                className="w-full bg-[#1A1A1E] border border-white/10 rounded px-3.5 py-3 text-sm text-white focus:outline-none focus:border-indigo-500 font-mono transition-colors"
                placeholder="Password (e.g., #yobelganteng)"
                autoFocus
              />
            </div>

            {loginError && (
              <motion.div 
                initial={{ opacity: 0, y: -2 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 bg-red-500/10 text-red-300 border border-red-500/20 text-xs rounded flex gap-2 items-center"
              >
                <ShieldAlert className="size-4 shrink-0 text-red-400" />
                <span className="font-light text-[11px] font-sans leading-snug">{loginError}</span>
              </motion.div>
            )}

            <button 
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-mono text-xs uppercase tracking-widest py-3.5 px-4 rounded font-bold transition-colors duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-indigo-600/15"
            >
              <span>Authorize Access-key</span>
            </button>
          </form>

          <p className="text-[9px] text-slate-500 text-center font-mono tracking-wider">
            IP BOUNDED SECURE CREATOR UTILITIES
          </p>
        </motion.div>
      </div>
    );
  }

  const triggerSaveNotification = () => {
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2000);
  };

  const saveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    const parsedSkills = profileForm.skillsString
      .split(',')
      .map(s => s.trim())
      .filter(s => s.length > 0);

    const updated = {
      ...profileForm,
      skills: parsedSkills
    };
    // Delete skillsString helper key before saving
    const { skillsString, ...rest } = updated;
    updatePersonalInfo(rest);
    triggerSaveNotification();
  };

  const saveProjects = () => {
    updateProjects(projectsList);
    triggerSaveNotification();
  };

  const saveExperience = () => {
    updateExperiences(experiencesList);
    triggerSaveNotification();
  };

  const saveEducation = () => {
    updateEducations(educationsList);
    triggerSaveNotification();
  };

  const saveCertifications = () => {
    updateCertifications(certificationsList);
    triggerSaveNotification();
  };

  // Add Item Helpers
  const addProject = () => {
    const newProj: Project = {
      id: `proj_${Date.now()}`,
      title: 'New Case Study / Project Title',
      period: `${new Date().getFullYear()}`,
      role: 'Lead Architect / Full-Stack Engineer',
      category: 'Product / SaaS Solutions',
      description: 'Enter a concise executive summary detailing the client architecture, development strategy, and key tech stack components.',
      tags: ['React', 'TypeScript', 'Node.js'],
      githubUrl: '',
      liveUrl: ''
    };
    setProjectsList([newProj, ...projectsList]);
  };

  const addExperience = () => {
    const newExp: Experience = {
      id: `exp_${Date.now()}`,
      role: 'Senior Software Engineer',
      company: 'Enterprise Company',
      companyLogoUrl: 'EC',
      period: `Jan ${new Date().getFullYear()} - Present`,
      location: 'Jakarta, Indonesia',
      bullets: [
        'Orchestrated database load solutions speeding service queries by 30%.',
        'Spearheaded key responsive components under custom style criteria.'
      ]
    };
    setExperiencesList([newExp, ...experiencesList]);
  };

  const addEducation = () => {
    const newEdu: Education = {
      id: `edu_${Date.now()}`,
      degree: 'B.S. in Computer Science',
      institution: 'State University',
      period: '2020 - 2024',
      location: 'Jakarta, Indonesia',
      bullets: [
        'Completed major core projects on performance databases with high honors.'
      ]
    };
    setEducationsList([newEdu, ...educationsList]);
  };

  const addCertification = () => {
    const newCert: Certification = {
      id: `cert_${Date.now()}`,
      title: 'Professional Technical Certification',
      issuer: 'Strategic Provider Inc.',
      year: `${new Date().getFullYear()}`,
      credentialUrl: ''
    };
    setCertificationsList([newCert, ...certificationsList]);
  };

  // Remove Item Helpers
  const deleteProject = (id: string) => {
    setProjectsList(projectsList.filter(p => p.id !== id));
  };

  const deleteExperience = (id: string) => {
    setExperiencesList(experiencesList.filter(e => e.id !== id));
  };

  const deleteEducation = (id: string) => {
    setEducationsList(educationsList.filter(e => e.id !== id));
  };

  const deleteCert = (id: string) => {
    setCertificationsList(certificationsList.filter(c => c.id !== id));
  };

  return (
    <div className="w-full h-full bg-[#121214] border-r border-white/10 text-white flex flex-col overflow-hidden font-sans">
      {/* Header toolbar */}
      <div className="px-6 py-5 border-b border-white/10 flex items-center justify-between bg-black/30">
        <div className="flex items-center gap-2.5">
          <div className="size-6 bg-indigo-600 rounded flex items-center justify-center text-[10px] font-bold shadow-md shadow-indigo-600/25 select-none">
            CMS
          </div>
          <div>
            <h2 className="text-xs font-black tracking-wider text-white uppercase font-display select-none">
              Yobel Studio Panel
            </h2>
            <p className="text-[10px] text-slate-400 font-mono tracking-wider">
              EDITING PORTFOLIO DATA
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Save success toast */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={saveSuccess ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 text-[9px] px-2 py-0.5 rounded font-black uppercase tracking-wider flex items-center gap-1 shrink-0"
          >
            <Check className="size-2.5" />
            Saved
          </motion.div>

          <button 
            onClick={() => setIsCmsActive(false)}
            className="px-2.5 py-1.5 bg-white/5 border border-white/10 hover:bg-white/10 rounded-md text-[9px] font-mono font-bold uppercase tracking-wider transition-all cursor-pointer text-slate-300 hover:text-white shrink-0 flex items-center gap-1.5"
            title="Exit Studio CMS"
            id="cms-close-btn"
          >
            <X className="size-3" />
            <span>Exit</span>
          </button>
        </div>
      </div>

      {/* Master Navigation Tabs */}
      <div className="flex border-b border-white/10 bg-black/10 overflow-x-auto no-scrollbar shrink-0">
        {[
          { id: 'profile', label: 'Profile', icon: <User className="size-3.5" /> },
          { id: 'projects', label: 'Projects', icon: <FileText className="size-3.5" /> },
          { id: 'experience', label: 'Experience', icon: <Briefcase className="size-3.5" /> },
          { id: 'education', label: 'Education', icon: <GraduationCap className="size-3.5" /> },
          { id: 'certifications', label: 'Certifications', icon: <Award className="size-3.5" /> },
          { id: 'settings', label: 'Settings', icon: <RefreshCw className="size-3.5" /> },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-5 py-3 text-xs font-semibold uppercase tracking-wider border-b-2 flex items-center gap-2 whitespace-nowrap transition-all duration-200 cursor-pointer ${
              activeTab === tab.id 
                ? 'border-indigo-500 text-white bg-white/5' 
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Scrollable Editing Workspace */}
      <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6">
        
        {/* PROFILE / SIDEBAR & INTRO */}
        {activeTab === 'profile' && (
          <form onSubmit={saveProfile} className="space-y-5">
            <div className="flex items-center justify-between border-b border-white/5 pb-3 mb-4">
              <div>
                <h3 className="text-xs font-black uppercase text-slate-200 tracking-widest leading-none">
                  Personal Identification
                </h3>
                <p className="text-[10px] text-slate-500 font-sans mt-1">Configure profile and layout status</p>
              </div>
              <button
                type="button"
                onClick={() => {
                  updateSectionVisibility({
                    ...sectionVisibility,
                    intro: !sectionVisibility.intro
                  });
                }}
                className={`px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider transition-all cursor-pointer border ${
                  sectionVisibility.intro !== false
                    ? 'bg-emerald-500/25 text-emerald-405 border-emerald-550/20'
                    : 'bg-rose-500/25 text-rose-405 border-rose-550/20'
                }`}
              >
                {sectionVisibility.intro !== false ? '● ACTIVE' : '○ HIDDEN'}
              </button>
            </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 mb-1.5 uppercase tracking-wide">
                    Full Name
                  </label>
                  <input 
                    type="text" 
                    value={profileForm.name} 
                    onChange={e => setProfileForm({ ...profileForm, name: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 focus:border-indigo-500 rounded px-3 py-2 text-xs font-medium focus:outline-none"
                    placeholder="Emeralda Patrisnandari"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 mb-1.5 uppercase tracking-wide">
                    Pronouns
                  </label>
                  <input 
                    type="text" 
                    value={profileForm.pronouns} 
                    onChange={e => setProfileForm({ ...profileForm, pronouns: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 focus:border-indigo-500 rounded px-3 py-2 text-xs font-medium focus:outline-none"
                    placeholder="she/her"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 mb-1.5 uppercase tracking-wide">
                    Role Title
                  </label>
                  <input 
                    type="text" 
                    value={profileForm.role} 
                    onChange={e => setProfileForm({ ...profileForm, role: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 focus:border-indigo-500 rounded px-3 py-2 text-xs font-medium focus:outline-none"
                    placeholder="Full-Stack Software Engineer"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 mb-1.5 uppercase tracking-wide">
                    Location Label
                  </label>
                  <input 
                    type="text" 
                    value={profileForm.location} 
                    onChange={e => setProfileForm({ ...profileForm, location: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 focus:border-indigo-500 rounded px-3 py-2 text-xs font-medium focus:outline-none"
                    placeholder="Jakarta, Indonesia"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-400 mb-1.5 uppercase tracking-wide">
                  Avatar Picture URL
                </label>
                <input 
                  type="text" 
                  value={profileForm.avatar || ''} 
                  onChange={e => setProfileForm({ ...profileForm, avatar: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 focus:border-indigo-500 rounded px-3 py-2 text-xs font-mono text-slate-300 focus:outline-none"
                  placeholder="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgpAzIgZokOICtF4nBYVfVQNgHoZsqzix6Kb5s2bk7tADle30hJHwv0txlJh9LCy5mjovHGzhP15GdeWHwVoKS4OCPCQ5XDlIjFdtQ9GPtNtOKv2zyz3gIiMOos5CwmfKqvPc-jaeR_NII3w1ScuHtKdkqGhZs_7_SfZjsiyRn7Fl8oEbxzK4IZaGNkQZw/s1280/guweh%20ganteng%20batss.jpeg"
                />
                <span className="text-[9px] text-slate-500 mt-1 block">
                  Profile photo can be customized with direct image URLs or relative asset paths.
                </span>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-400 mb-1.5 uppercase tracking-wide">
                  Availability Status Description
                </label>
                <input 
                  type="text" 
                  value={profileForm.availability} 
                  onChange={e => setProfileForm({ ...profileForm, availability: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 focus:border-indigo-500 rounded px-3 py-2 text-xs font-medium focus:outline-none"
                  placeholder="Available for client projects & consulting"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 mb-1.5 uppercase tracking-wide">
                    Email
                  </label>
                  <input 
                    type="email" 
                    value={profileForm.email} 
                    onChange={e => setProfileForm({ ...profileForm, email: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 focus:border-indigo-500 rounded px-3 py-2 text-xs font-medium focus:outline-none"
                    placeholder="geraldyyobel77@gmail.com"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 mb-1.5 uppercase tracking-wide">
                    Phone
                  </label>
                  <input 
                    type="text" 
                    value={profileForm.phone} 
                    onChange={e => setProfileForm({ ...profileForm, phone: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 focus:border-indigo-500 rounded px-3 py-2 text-xs font-medium focus:outline-none"
                    placeholder="+62 812-3456-7890"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 mb-1.5 uppercase tracking-wide">
                    Personal Portfolio Domain URL
                  </label>
                  <input 
                    type="text" 
                    value={profileForm.website} 
                    onChange={e => setProfileForm({ ...profileForm, website: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 focus:border-indigo-500 rounded px-3 py-2 text-xs font-medium focus:outline-none"
                    placeholder="https://geraldyyobel.dev"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 mb-1.5 uppercase tracking-wide">
                    Booking Scheduler URL (Calendly, etc.)
                  </label>
                  <input 
                    type="text" 
                    value={profileForm.bookingUrl} 
                    onChange={e => setProfileForm({ ...profileForm, bookingUrl: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 focus:border-indigo-500 rounded px-3 py-2 text-xs font-medium focus:outline-none"
                    placeholder="https://calendly.com/geraldyyobel"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-400 mb-1.5 uppercase tracking-wide">
                  Technical Core Skills (Comma-separated)
                </label>
                <textarea 
                  value={profileForm.skillsString} 
                  onChange={e => setProfileForm({ ...profileForm, skillsString: e.target.value })}
                  rows={2}
                  className="w-full bg-white/5 border border-white/10 focus:border-indigo-500 rounded px-3 py-2 text-xs font-mono focus:outline-none resize-none"
                  placeholder="React, TypeScript, Node.js, WebSockets"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-400 mb-1.5 uppercase tracking-wide">
                  Sidebar Short Bio Description
                </label>
                <textarea 
                  value={profileForm.shortBio} 
                  onChange={e => setProfileForm({ ...profileForm, shortBio: e.target.value })}
                  rows={2}
                  className="w-full bg-white/5 border border-white/10 focus:border-indigo-500 rounded px-3 py-2 text-xs focus:outline-none resize-none"
                  placeholder="Enter short executive summary for the sidebar view."
                  required
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-400 mb-1.5 uppercase tracking-wide">
                  About Intro Extended Philosophy Bio
                </label>
                <textarea 
                  value={profileForm.extendedBio} 
                  onChange={e => setProfileForm({ ...profileForm, extendedBio: e.target.value })}
                  rows={5}
                  className="w-full bg-white/5 border border-white/10 focus:border-indigo-500 rounded px-3 py-2 text-xs leading-relaxed focus:outline-none resize-y"
                  placeholder="Enter deep biography text shown in Section 1 (Intro)."
                  required
                />
              </div>

              <div className="pt-4 border-t border-white/5 flex justify-end">
                <button
                  type="submit"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold uppercase tracking-widest px-5 py-3 rounded flex items-center gap-2 cursor-pointer transition-all shadow-md shadow-indigo-600/15"
                >
                  <Save className="size-3.5" />
                  Save General Profile
                </button>
              </div>
            </form>
          )}

          {/* SELECTED PROJECTS (CASE STUDIES) */}
          {activeTab === 'projects' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-white/5 pb-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black uppercase text-slate-350 select-none font-mono">
                    Section Status:
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      updateSectionVisibility({
                        ...sectionVisibility,
                        projects: !sectionVisibility.projects
                      });
                    }}
                    className={`px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider transition-all cursor-pointer border ${
                      sectionVisibility.projects !== false
                        ? 'bg-emerald-500/25 text-emerald-405 border-emerald-550/20'
                        : 'bg-rose-500/25 text-rose-405 border-rose-550/20'
                    }`}
                  >
                    {sectionVisibility.projects !== false ? '● ACTIVE (ON)' : '○ HIDDEN (OFF)'}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between border-b border-white/5 pb-2 mb-4">
                <div>
                  <h3 className="text-xs font-black uppercase text-slate-400 tracking-widest">
                    Manage Selected Case Studies
                  </h3>
                  <p className="text-[10px] text-slate-500 font-mono mt-0.5 uppercase">
                    ({projectsList.length} Total items)
                  </p>
                </div>
                <button
                  onClick={addProject}
                  className="bg-indigo-600/25 hover:bg-indigo-600 text-indigo-400 hover:text-white border border-indigo-500/20 text-[10px] font-black uppercase px-3 py-1.5 rounded flex items-center gap-1 cursor-pointer transition-all"
                >
                  <Plus className="size-3.5" /> Add New
                </button>
              </div>

              {projectsList.length === 0 ? (
                <div className="p-8 text-center bg-white/5 rounded border border-white/10 border-dashed text-slate-500 text-xs">
                  No products configured yet. Click "Add New" to get started.
                </div>
              ) : (
                <div className="space-y-4">
                  {projectsList.map((proj, idx) => (
                    <div key={proj.id} className="p-5 bg-white/5 rounded-lg border border-white/10 space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[10px] bg-indigo-500/10 text-indigo-400 px-2 py-0.5 rounded uppercase font-bold">
                          Case Study #{projectsList.length - idx}
                        </span>
                        <button
                          onClick={() => deleteProject(proj.id)}
                          className="text-rose-400 hover:text-rose-600 p-1 rounded hover:bg-white/5 transition-all cursor-pointer"
                          title="Delete Case Study"
                        >
                          <Trash2 className="size-3.5" />
                        </button>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[9px] font-bold text-slate-400 mb-1 uppercase">
                            Case Title
                          </label>
                          <input 
                            type="text" 
                            value={proj.title}
                            onChange={e => {
                              const updated = [...projectsList];
                              updated[idx].title = e.target.value;
                              setProjectsList(updated);
                            }}
                            className="w-full bg-white/5 border border-white/10 rounded px-2.5 py-1.5 text-xs focus:outline-none"
                            placeholder="e.g. Aether Engine"
                          />
                        </div>
                        <div>
                          <label className="block text-[9px] font-bold text-slate-400 mb-1 uppercase">
                            Campaign Period
                          </label>
                          <input 
                            type="text" 
                            value={proj.period}
                            onChange={e => {
                              const updated = [...projectsList];
                              updated[idx].period = e.target.value;
                              setProjectsList(updated);
                            }}
                            className="w-full bg-white/5 border border-white/10 rounded px-2.5 py-1.5 text-xs focus:outline-none"
                            placeholder="e.g. 2024"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[9px] font-bold text-slate-400 mb-1 uppercase">
                            Architecture Class / Category
                          </label>
                          <input 
                            type="text" 
                            value={proj.category}
                            onChange={e => {
                              const updated = [...projectsList];
                              updated[idx].category = e.target.value;
                              setProjectsList(updated);
                            }}
                            className="w-full bg-white/5 border border-white/10 rounded px-2.5 py-1.5 text-xs focus:outline-none"
                            placeholder="e.g. SaaS Platform"
                          />
                        </div>
                        <div>
                          <label className="block text-[9px] font-bold text-slate-400 mb-1 uppercase">
                            Your Strategic Role
                          </label>
                          <input 
                            type="text" 
                            value={proj.role}
                            onChange={e => {
                              const updated = [...projectsList];
                              updated[idx].role = e.target.value;
                              setProjectsList(updated);
                            }}
                            className="w-full bg-white/5 border border-white/10 rounded px-2.5 py-1.5 text-xs focus:outline-none"
                            placeholder="e.g. Lead UI architect"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[9px] font-bold text-slate-400 mb-1 uppercase">
                          Case Study Tech Badges (Comma-separated)
                        </label>
                        <input 
                          type="text" 
                          value={proj.tags.join(', ')}
                          onChange={e => {
                            const updated = [...projectsList];
                            updated[idx].tags = e.target.value.split(',').map(t => t.trim()).filter(t => t.length > 0);
                            setProjectsList(updated);
                          }}
                          className="w-full bg-white/5 border border-white/10 rounded px-2.5 py-1.5 text-xs font-mono focus:outline-none"
                          placeholder="React, TypeScript, WebSockets"
                        />
                      </div>

                      <div>
                        <label className="block text-[9px] font-bold text-slate-400 mb-1 uppercase">
                          Description Summary text
                        </label>
                        <textarea 
                          value={proj.description}
                          onChange={e => {
                            const updated = [...projectsList];
                            updated[idx].description = e.target.value;
                            setProjectsList(updated);
                          }}
                          rows={2}
                          className="w-full bg-white/5 border border-white/10 rounded px-2.5 py-1.5 text-xs focus:outline-none resize-none"
                          placeholder="Executive bullet points."
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[9px] font-bold text-slate-400 mb-1 uppercase">
                            GitHub Repository Link
                          </label>
                          <input 
                            type="url" 
                            value={proj.githubUrl || ''}
                            onChange={e => {
                              const updated = [...projectsList];
                              updated[idx].githubUrl = e.target.value;
                              setProjectsList(updated);
                            }}
                            className="w-full bg-white/5 border border-white/10 rounded px-2.5 py-1.5 text-xs font-mono focus:outline-none"
                            placeholder="https://github.com..."
                          />
                        </div>
                        <div>
                          <label className="block text-[9px] font-bold text-slate-400 mb-1 uppercase">
                            Live URL Deployment
                          </label>
                          <input 
                            type="url" 
                            value={proj.liveUrl || ''}
                            onChange={e => {
                              const updated = [...projectsList];
                              updated[idx].liveUrl = e.target.value;
                              setProjectsList(updated);
                            }}
                            className="w-full bg-white/5 border border-white/10 rounded px-2.5 py-1.5 text-xs font-mono focus:outline-none"
                            placeholder="https://app.com..."
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="pt-4 border-t border-white/5 flex justify-end">
                <button
                  onClick={saveProjects}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold uppercase tracking-widest px-5 py-3 rounded flex items-center gap-2 cursor-pointer transition-all shadow-md shadow-indigo-600/15"
                >
                  <Save className="size-3.5" />
                  Save Projects Database
                </button>
              </div>
            </div>
          )}

          {/* EXPERIENCE TIMELINE */}
          {activeTab === 'experience' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-white/5 pb-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black uppercase text-slate-350 select-none font-mono">
                    Section Status:
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      updateSectionVisibility({
                        ...sectionVisibility,
                        experience: !sectionVisibility.experience
                      });
                    }}
                    className={`px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider transition-all cursor-pointer border ${
                      sectionVisibility.experience !== false
                        ? 'bg-emerald-500/25 text-emerald-405 border-emerald-550/20'
                        : 'bg-rose-500/25 text-rose-405 border-rose-550/20'
                    }`}
                  >
                    {sectionVisibility.experience !== false ? '● ACTIVE (ON)' : '○ HIDDEN (OFF)'}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between border-b border-white/5 pb-2 mb-4">
                <div>
                  <h3 className="text-xs font-black uppercase text-slate-400 tracking-widest">
                    Manage Work History Timeline
                  </h3>
                  <p className="text-[10px] text-slate-500 font-mono mt-0.5 uppercase">
                    ({experiencesList.length} Total slots)
                  </p>
                </div>
                <button
                  onClick={addExperience}
                  className="bg-indigo-600/25 hover:bg-indigo-600 text-indigo-400 hover:text-white border border-indigo-500/20 text-[10px] font-black uppercase px-3 py-1.5 rounded flex items-center gap-1 cursor-pointer transition-all"
                >
                  <Plus className="size-3.5" /> Add New
                </button>
              </div>

              {experiencesList.length === 0 ? (
                <div className="p-8 text-center bg-white/5 rounded border border-white/10 border-dashed text-slate-500 text-xs">
                  No work experience configured yet. Click "Add New" to begin.
                </div>
              ) : (
                <div className="space-y-4">
                  {experiencesList.map((exp, idx) => (
                    <div key={exp.id} className="p-5 bg-white/5 rounded-lg border border-white/10 space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[10px] bg-slate-800 text-slate-300 px-2.5 py-1 border border-white/5 rounded uppercase font-bold">
                          Employment Experience #{experiencesList.length - idx}
                        </span>
                        <button
                          onClick={() => deleteExperience(exp.id)}
                          className="text-rose-400 hover:text-rose-600 p-1 rounded hover:bg-white/5 transition-all cursor-pointer"
                          title="Delete Experience Row"
                        >
                          <Trash2 className="size-3.5" />
                        </button>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[9px] font-bold text-slate-400 mb-1 uppercase">
                            Role / Job Title
                          </label>
                          <input 
                            type="text" 
                            value={exp.role}
                            onChange={e => {
                              const updated = [...experiencesList];
                              updated[idx].role = e.target.value;
                              setExperiencesList(updated);
                            }}
                            className="w-full bg-white/5 border border-white/10 rounded px-2.5 py-1.5 text-xs focus:outline-none"
                            placeholder="Senior Engineer"
                          />
                        </div>
                        <div>
                          <label className="block text-[9px] font-bold text-slate-400 mb-1 uppercase">
                            Employing Company
                          </label>
                          <input 
                            type="text" 
                            value={exp.company}
                            onChange={e => {
                              const updated = [...experiencesList];
                              updated[idx].company = e.target.value;
                              setExperiencesList(updated);
                            }}
                            className="w-full bg-white/5 border border-white/10 rounded px-2.5 py-1.5 text-xs focus:outline-none"
                            placeholder="Gojek"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-3">
                        <div>
                          <label className="block text-[9px] font-bold text-slate-400 mb-1 uppercase">
                            Logo Initials
                          </label>
                          <input 
                            type="text" 
                            maxLength={2}
                            value={exp.companyLogoUrl || ''}
                            onChange={e => {
                              const updated = [...experiencesList];
                              updated[idx].companyLogoUrl = e.target.value.toUpperCase();
                              setExperiencesList(updated);
                            }}
                            className="w-full bg-white/5 border border-white/10 rounded px-2.5 py-1.5 text-xs font-bold text-center focus:outline-none"
                            placeholder="GJ"
                          />
                        </div>
                        <div>
                          <label className="block text-[9px] font-bold text-slate-400 mb-1 uppercase">
                            Job Location
                          </label>
                          <input 
                            type="text" 
                            value={exp.location}
                            onChange={e => {
                              const updated = [...experiencesList];
                              updated[idx].location = e.target.value;
                              setExperiencesList(updated);
                            }}
                            className="w-full bg-white/5 border border-white/10 rounded px-2.5 py-1.5 text-xs focus:outline-none"
                            placeholder="Jakarta, Indonesia"
                          />
                        </div>
                        <div>
                          <label className="block text-[9px] font-bold text-slate-400 mb-1 uppercase">
                            Working Period
                          </label>
                          <input 
                            type="text" 
                            value={exp.period}
                            onChange={e => {
                              const updated = [...experiencesList];
                              updated[idx].period = e.target.value;
                              setExperiencesList(updated);
                            }}
                            className="w-full bg-white/5 border border-white/10 rounded px-2.5 py-1.5 text-xs focus:outline-none"
                            placeholder="Jan 2024 - Present"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[9px] font-bold text-slate-400 mb-1 uppercase">
                          Achievements & Core Bullets (One achievement per line)
                        </label>
                        <textarea 
                          value={exp.bullets.join('\n')}
                          onChange={e => {
                            const updated = [...experiencesList];
                            updated[idx].bullets = e.target.value.split('\n').filter(b => b.trim().length > 0);
                            setExperiencesList(updated);
                          }}
                          rows={4}
                          className="w-full bg-white/5 border border-white/10 rounded px-2.5 py-1.5 text-xs font-sans leading-relaxed focus:outline-none"
                          placeholder="Example Accomplishment Bullet Point"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="pt-4 border-t border-white/5 flex justify-end">
                <button
                  onClick={saveExperience}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold uppercase tracking-widest px-5 py-3 rounded flex items-center gap-2 cursor-pointer transition-all shadow-md shadow-indigo-600/15"
                >
                  <Save className="size-3.5" />
                  Save Experiences Database
                </button>
              </div>
            </div>
          )}

          {/* EDUCATION SECTION */}
          {activeTab === 'education' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-white/5 pb-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black uppercase text-slate-350 select-none font-mono">
                    Section Status:
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      updateSectionVisibility({
                        ...sectionVisibility,
                        education: !sectionVisibility.education
                      });
                    }}
                    className={`px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider transition-all cursor-pointer border ${
                      sectionVisibility.education !== false
                        ? 'bg-emerald-500/25 text-emerald-405 border-emerald-550/20'
                        : 'bg-rose-500/25 text-rose-405 border-rose-550/20'
                    }`}
                  >
                    {sectionVisibility.education !== false ? '● ACTIVE (ON)' : '○ HIDDEN (OFF)'}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between border-b border-white/5 pb-2 mb-4">
                <div>
                  <h3 className="text-xs font-black uppercase text-slate-400 tracking-widest">
                    Manage Educational Credentials
                  </h3>
                  <p className="text-[10px] text-slate-500 font-mono mt-0.5 uppercase">
                    ({educationsList.length} Total items)
                  </p>
                </div>
                <button
                  onClick={addEducation}
                  className="bg-indigo-600/25 hover:bg-indigo-600 text-indigo-400 hover:text-white border border-indigo-500/20 text-[10px] font-black uppercase px-3 py-1.5 rounded flex items-center gap-1 cursor-pointer transition-all"
                >
                  <Plus className="size-3.5" /> Add New
                </button>
              </div>

              {educationsList.length === 0 ? (
                <div className="p-8 text-center bg-white/5 rounded border border-white/10 border-dashed text-slate-500 text-xs">
                  No education history entry listed. Click "Add New" to include studies.
                </div>
              ) : (
                <div className="space-y-4">
                  {educationsList.map((edu, idx) => (
                    <div key={edu.id} className="p-5 bg-white/5 rounded-lg border border-white/10 space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[10px] bg-slate-800 text-slate-300 px-2.5 py-1 border border-white/5 rounded uppercase font-bold">
                          Academic Degree #{educationsList.length - idx}
                        </span>
                        <button
                          onClick={() => deleteEducation(edu.id)}
                          className="text-rose-400 hover:text-rose-600 p-1 rounded hover:bg-white/5 transition-all cursor-pointer"
                          title="Delete Educational Degree"
                        >
                          <Trash2 className="size-3.5" />
                        </button>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[9px] font-bold text-slate-400 mb-1 uppercase">
                            Degree Awarded
                          </label>
                          <input 
                            type="text" 
                            value={edu.degree}
                            onChange={e => {
                              const updated = [...educationsList];
                              updated[idx].degree = e.target.value;
                              setEducationsList(updated);
                            }}
                            className="w-full bg-white/5 border border-white/10 rounded px-2.5 py-1.5 text-xs focus:outline-none"
                            placeholder="B.S. in Computer Science"
                          />
                        </div>
                        <div>
                          <label className="block text-[9px] font-bold text-slate-400 mb-1 uppercase">
                            Institution / Academy
                          </label>
                          <input 
                            type="text" 
                            value={edu.institution}
                            onChange={e => {
                              const updated = [...educationsList];
                              updated[idx].institution = e.target.value;
                              setEducationsList(updated);
                            }}
                            className="w-full bg-white/5 border border-white/10 rounded px-2.5 py-1.5 text-xs focus:outline-none"
                            placeholder="Universitas Indonesia"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[9px] font-bold text-slate-400 mb-1 uppercase">
                            Location
                          </label>
                          <input 
                            type="text" 
                            value={edu.location}
                            onChange={e => {
                              const updated = [...educationsList];
                              updated[idx].location = e.target.value;
                              setEducationsList(updated);
                            }}
                            className="w-full bg-white/5 border border-white/10 rounded px-2.5 py-1.5 text-xs focus:outline-none"
                            placeholder="Depok, Indonesia"
                          />
                        </div>
                        <div>
                          <label className="block text-[9px] font-bold text-slate-400 mb-1 uppercase">
                            Enrollment Period
                          </label>
                          <input 
                            type="text" 
                            value={edu.period}
                            onChange={e => {
                              const updated = [...educationsList];
                              updated[idx].period = e.target.value;
                              setEducationsList(updated);
                            }}
                            className="w-full bg-white/5 border border-white/10 rounded px-2.5 py-1.5 text-xs focus:outline-none"
                            placeholder="2017 - 2021"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[9px] font-bold text-slate-400 mb-1 uppercase">
                          Academic bullets (One description bullet per line)
                        </label>
                        <textarea 
                          value={edu.bullets.join('\n')}
                          onChange={e => {
                            const updated = [...educationsList];
                            updated[idx].bullets = e.target.value.split('\n').filter(b => b.trim().length > 0);
                            setEducationsList(updated);
                          }}
                          rows={3}
                          className="w-full bg-white/5 border border-white/10 rounded px-2.5 py-1.5 text-xs leading-relaxed focus:outline-none"
                          placeholder="Activities, Honors, or Thesis description statements."
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="pt-4 border-t border-white/5 flex justify-end">
                <button
                  onClick={saveEducation}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold uppercase tracking-widest px-5 py-3 rounded flex items-center gap-2 cursor-pointer transition-all shadow-md shadow-indigo-600/15"
                >
                  <Save className="size-3.5" />
                  Save Education History
                </button>
              </div>
            </div>
          )}

          {/* LICENSES & CERTIFICATIONS */}
          {activeTab === 'certifications' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-white/5 pb-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black uppercase text-slate-350 select-none font-mono">
                    Section Status:
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      updateSectionVisibility({
                        ...sectionVisibility,
                        certifications: !sectionVisibility.certifications
                      });
                    }}
                    className={`px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider transition-all cursor-pointer border ${
                      sectionVisibility.certifications !== false
                        ? 'bg-emerald-500/25 text-emerald-405 border-emerald-550/20'
                        : 'bg-rose-500/25 text-rose-405 border-rose-550/20'
                    }`}
                  >
                    {sectionVisibility.certifications !== false ? '● ACTIVE (ON)' : '○ HIDDEN (OFF)'}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between border-b border-white/5 pb-2 mb-4">
                <div>
                  <h3 className="text-xs font-black uppercase text-slate-400 tracking-widest">
                    Manage Professional Certifications
                  </h3>
                  <p className="text-[10px] text-slate-500 font-mono mt-0.5 uppercase">
                    ({certificationsList.length} Total items)
                  </p>
                </div>
                <button
                  onClick={addCertification}
                  className="bg-indigo-600/25 hover:bg-indigo-600 text-indigo-400 hover:text-white border border-indigo-500/20 text-[10px] font-black uppercase px-3 py-1.5 rounded flex items-center gap-1 cursor-pointer transition-all"
                >
                  <Plus className="size-3.5" /> Add New
                </button>
              </div>

              {certificationsList.length === 0 ? (
                <div className="p-8 text-center bg-white/5 rounded border border-white/10 border-dashed text-slate-500 text-xs">
                  No certifications configured yet. Click "Add New" to include professional licensing.
                </div>
              ) : (
                <div className="space-y-4">
                  {certificationsList.map((cert, idx) => (
                    <div key={cert.id} className="p-5 bg-white/5 rounded-lg border border-white/10 space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[10px] bg-slate-800 text-slate-300 px-2.5 py-1 border border-white/5 rounded uppercase font-bold">
                          Credential Record #{certificationsList.length - idx}
                        </span>
                        <button
                          onClick={() => deleteCert(cert.id)}
                          className="text-rose-400 hover:text-rose-600 p-1 rounded hover:bg-white/5 transition-all cursor-pointer"
                          title="Delete Certificate"
                        >
                          <Trash2 className="size-3.5" />
                        </button>
                      </div>

                      <div className="grid grid-cols-3 gap-3">
                        <div className="col-span-2">
                          <label className="block text-[9px] font-bold text-slate-400 mb-1 uppercase">
                            Certification Title
                          </label>
                          <input 
                            type="text" 
                            value={cert.title}
                            onChange={e => {
                              const updated = [...certificationsList];
                              updated[idx].title = e.target.value;
                              setCertificationsList(updated);
                            }}
                            className="w-full bg-white/5 border border-white/10 rounded px-2.5 py-1.5 text-xs focus:outline-none"
                            placeholder="AWS Certified Solutions Architect"
                          />
                        </div>
                        <div>
                          <label className="block text-[9px] font-bold text-slate-400 mb-1 uppercase">
                            Year Achieved
                          </label>
                          <input 
                            type="text" 
                            value={cert.year}
                            onChange={e => {
                              const updated = [...certificationsList];
                              updated[idx].year = e.target.value;
                              setCertificationsList(updated);
                            }}
                            className="w-full bg-white/5 border border-white/10 rounded px-2.5 py-1.5 text-xs focus:outline-none"
                            placeholder="e.g. 2024"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[9px] font-bold text-slate-400 mb-1 uppercase">
                            Issuing Entity
                          </label>
                          <input 
                            type="text" 
                            value={cert.issuer}
                            onChange={e => {
                              const updated = [...certificationsList];
                              updated[idx].issuer = e.target.value;
                              setCertificationsList(updated);
                            }}
                            className="w-full bg-white/5 border border-white/10 rounded px-2.5 py-1.5 text-xs focus:outline-none"
                            placeholder="Amazon Web Services"
                          />
                        </div>
                        <div>
                          <label className="block text-[9px] font-bold text-slate-400 mb-1 uppercase">
                            Verification Credential URL
                          </label>
                          <input 
                            type="url" 
                            value={cert.credentialUrl || ''}
                            onChange={e => {
                              const updated = [...certificationsList];
                              updated[idx].credentialUrl = e.target.value;
                              setCertificationsList(updated);
                            }}
                            className="w-full bg-white/5 border border-white/10 rounded px-2.5 py-1.5 text-xs font-mono focus:outline-none"
                            placeholder="https://aws.amazon.com/verify..."
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="pt-4 border-t border-white/5 flex justify-end">
                <button
                  onClick={saveCertifications}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold uppercase tracking-widest px-5 py-3 rounded flex items-center gap-2 cursor-pointer transition-all shadow-md shadow-indigo-600/15"
                >
                  <Save className="size-3.5" />
                  Save Certifications
                </button>
              </div>
            </div>
          )}

          {/* SYSTEM SETTINGS & CLEAR DATA */}
          {activeTab === 'settings' && (
            <div className="space-y-6">
              <div className="p-5 bg-white/5 border border-white/10 rounded-lg space-y-4">
                <h4 className="text-xs font-black uppercase tracking-wider text-slate-300 border-b border-white/5 pb-2">
                  Content Section Visibility (On / Off)
                </h4>
                <p className="text-[11px] text-slate-400 font-sans leading-relaxed">
                  Toggle which main segments are active on your public-facing biography portfolio index:
                </p>

                <div className="space-y-3 pt-2">
                  {[
                    { key: 'intro', label: 'About & Introduction Section' },
                    { key: 'projects', label: 'Case Studies / Selected Projects' },
                    { key: 'experience', label: 'Work Experience Timeline' },
                    { key: 'education', label: 'Academic & Course Education' },
                    { key: 'certifications', label: 'Professional Licenses & Certifications' },
                    { key: 'testimonials', label: 'Testimonials / Client Quotes' },
                    { key: 'contact', label: 'Consultation Booker & Contact Form' },
                  ].map((sec) => (
                    <div key={sec.key} className="flex items-center justify-between p-3 bg-white/5 hover:bg-white/10 rounded-md border border-white/5 transition-all">
                      <span className="text-xs font-semibold text-slate-200">{sec.label}</span>
                      <button
                        type="button"
                        onClick={() => {
                          updateSectionVisibility({
                            ...sectionVisibility,
                            [sec.key]: !sectionVisibility[sec.key as keyof SectionVisibility]
                          });
                        }}
                        className={`px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer border ${
                          sectionVisibility[sec.key as keyof SectionVisibility] !== false
                            ? 'bg-emerald-500/25 text-emerald-405 border-emerald-550/20'
                            : 'bg-rose-500/25 text-rose-405 border-rose-550/20'
                        }`}
                      >
                        {sectionVisibility[sec.key as keyof SectionVisibility] !== false ? '● ACTIVE (ON)' : '○ HIDDEN (OFF)'}
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-5 bg-rose-500/10 border border-rose-500/20 rounded-lg space-y-4">
                <div className="flex items-center gap-2.5 text-rose-405">
                  <RefreshCw className="size-4 shrink-0 animate-spin-slow" />
                  <h4 className="text-xs font-black uppercase tracking-wider">
                    Factory Reset & System Purge
                  </h4>
                </div>

                <p className="text-xs text-rose-350 leading-relaxed font-light">
                  This will instantly drop all local modifications, wipe the browser's persistent cache key store, and reset your virtual biography portfolio to Emeralda Patrisnandari's custom default dataset.
                </p>

                <div className="pt-2">
                  <button 
                    type="button"
                    onClick={() => {
                      if (confirm('Are you absolutely sure you want to reset all customized values back to the default setup? All your unsaved changes will act as a system wipe.')) {
                        resetAllData();
                      }
                    }}
                    className="bg-rose-600 hover:bg-rose-500 text-white text-xs font-black uppercase tracking-widest px-4 py-2.5 rounded cursor-pointer transition-all flex items-center gap-2"
                  >
                    <Trash2 className="size-3.5" />
                    Purge Storage & Restart
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Footer info bar */}
        <div className="p-4 border-t border-white/10 bg-black/40 text-center flex items-center justify-between text-[9px] font-mono text-slate-500 tracking-wider select-none">
          <span>SECURE COOKIE-LESS LOCAL WORKSPACE</span>
          <span>SYSTEM ACTIVE v2026.1</span>
        </div>
    </div>
  );
}
