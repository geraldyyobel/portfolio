import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { usePortfolio } from '../context/PortfolioContext';
import { 
  Briefcase, 
  GraduationCap, 
  Award, 
  MessageSquare, 
  Send, 
  Calendar, 
  ArrowRight, 
  Github, 
  ExternalLink,
  ChevronRight,
  ClipboardCheck,
  Building,
  Sparkles,
  Smile,
  ShieldCheck
} from 'lucide-react';

const SECTIONS = [
  { id: 'intro', label: 'Intro' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'education', label: 'Education' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'testimonials', label: 'Testimonials' },
  { id: 'contact', label: 'Contact' }
];

export default function MainContent() {
  const {
    personalInfo,
    projects,
    experiences,
    educations,
    certifications,
    testimonials,
    sectionVisibility,
    isCmsActive,
    setViewingAllProjects
  } = usePortfolio();

  const activeSections = SECTIONS.filter(
    (section) => sectionVisibility[section.id as keyof typeof sectionVisibility] !== false
  );

  const [activeSection, setActiveSection] = useState('intro');
  const [isSubmitSuccess, setIsSubmitSuccess] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingDate, setBookingDate] = useState('');
  const [bookingTime, setBookingTime] = useState('');

  const [bookingSuccess, setBookingSuccess] = useState(false);

  // ScrollSpy Tracker using IntersectionObserver
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -60% 0px', // high density trigger alignment
      threshold: 0
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);

    activeSections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) observer.observe(element);
    });

    return () => {
      activeSections.forEach((section) => {
        const element = document.getElementById(section.id);
        if (element) observer.unobserve(element);
      });
    };
  }, [activeSections.map(s => s.id).join(',')]);

  // Form handle
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmitMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    
    setIsSubmitting(true);
    // Simulate real network submission delay
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitSuccess(true);
      setFormData({ name: '', email: '', message: '' });
    }, 1200);
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingDate || !bookingTime) return;
    setBookingSuccess(true);
    setTimeout(() => {
      setBookingSuccess(false);
      setBookingDate('');
      setBookingTime('');
    }, 5000);
  };

  return (
    <main 
      className={`w-full lg:w-[68%] bg-[#fafafa] text-[#121214] relative flex flex-col font-sans ${
        isCmsActive 
          ? 'h-full overflow-y-auto' 
          : 'min-h-screen lg:ml-[32%]'
      }`}
      id="main-content-scroll"
    >
      {/* Sticky Top Scrolling Indicator & Navigation Bar */}
      <nav className="sticky top-0 z-50 bg-[#fafafa]/90 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-6 lg:px-12 py-4 shadow-none">
        {/* Nav Links scroll anchors */}
        <div className="flex gap-4 lg:gap-6 overflow-x-auto no-scrollbar py-1 w-full lg:w-auto">
          {activeSections.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className={`text-xs font-semibold tracking-wider uppercase transition-all duration-300 relative pb-1 whitespace-nowrap shrink-0 ${
                activeSection === section.id 
                  ? 'text-slate-900 font-black' 
                  : 'text-slate-400 hover:text-slate-900'
              }`}
            >
              {section.label}
              {activeSection === section.id && (
                <motion.span 
                  layoutId="activeNavIndicator" 
                  className="absolute bottom-0 left-0 right-0 h-[3px] bg-slate-900 rounded-full"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </a>
          ))}
        </div>

        {/* CTA quick button inside sticky header */}
        <div className="hidden xl:block">
          <a
            href="#contact"
            className="text-[10px] font-mono uppercase bg-[#0a0a0a] hover:bg-slate-800 text-white font-bold px-4 py-2 rounded tracking-widest transition-colors duration-300"
          >
            Hire {personalInfo.name.split(' ')[0]}
          </a>
        </div>
      </nav>

      {/* Content wrapper with generous spacing */}
      <div className="px-6 md:px-12 lg:px-16 py-12 lg:py-16 space-y-24 flex-1">
        
        {/* SECTION 1: INTRO / ABOUT ME */}
        {sectionVisibility.intro && (
          <section id="intro" className="scroll-mt-24 space-y-6">
            <div className="text-[10px] uppercase tracking-[0.2em] text-slate-400 font-bold">
              Intro
            </div>

            <h2 className="text-4xl lg:text-5xl font-black tracking-tighter leading-none mb-4 uppercase text-slate-900 font-display">
              CRAFTING<br/>DIGITAL PRODUCTS.
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-2">
              <div className="md:col-span-8">
                <p className="text-slate-650 text-sm lg:text-base leading-relaxed font-sans font-light">
                  {personalInfo.extendedBio}
                </p>
              </div>
              {/* Quick stats right column match Bold theme */}
              <div className="md:col-span-4 bg-white border border-slate-200 p-5 rounded-lg space-y-4 shadow-sm">
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">Experience</p>
                  <p className="text-3xl font-black text-slate-900 tracking-tight mt-1">5+ Years</p>
                </div>
                <div className="border-t border-slate-100 pt-3">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">Location</p>
                  <p className="text-sm font-semibold text-slate-800 mt-1">{personalInfo.location}</p>
                </div>
                <div className="border-t border-slate-100 pt-3">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">Status</p>
                  <p className="text-sm font-semibold text-slate-800 mt-1">{personalInfo.availability}</p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* SECTION 2: PROJECTS */}
        {sectionVisibility.projects && (
          <section id="projects" className="scroll-mt-24 space-y-8">
            <h3 className="text-[11px] font-black uppercase tracking-[0.25em] text-slate-400 mb-5 pb-2 border-b border-slate-200">
              Selected Case Studies
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.slice(0, 6).map((project) => (
                <motion.div 
                  whileHover={{ y: -3 }}
                  transition={{ duration: 0.2 }}
                  key={project.id}
                  className="group relative bg-white border border-slate-200 hover:border-slate-400 p-6 rounded-lg shadow-sm flex flex-col justify-between transition-all duration-300"
                >
                  <div>
                    <div className="flex justify-between items-baseline mb-2 flex-wrap gap-x-2">
                      <span className="text-[10px] font-mono tracking-widest text-slate-455 uppercase font-bold">
                        {project.category}
                      </span>
                      <span className="font-mono text-[10px] text-slate-405 font-semibold">{project.period}</span>
                    </div>

                    <h4 className="text-base font-bold text-slate-900 group-hover:text-indigo-600 transition-colors duration-200 mb-2">
                      {project.title}
                    </h4>
                    <p className="text-slate-505 text-xs leading-relaxed font-light mb-4">
                      {project.description}
                    </p>
                  </div>

                  <div className="space-y-4">
                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5">
                      {project.tags.map((tag) => (
                        <span 
                          key={tag} 
                          className="font-mono text-[9px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded border border-slate-200/30"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-4 pt-3 border-t border-slate-100">
                      {project.githubUrl && (
                        <a 
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase text-slate-450 hover:text-slate-950 transition-colors duration-200"
                        >
                          <Github className="size-3" />
                          <span>Source Code</span>
                        </a>
                      )}
                      {project.liveUrl && (
                        <a 
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase text-indigo-650 hover:text-indigo-850 transition-colors duration-200"
                        >
                          <ExternalLink className="size-3" />
                          <span>Live Preview</span>
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {projects.length > 6 && (
              <div className="flex justify-center pt-4">
                <button
                  onClick={() => {
                    setViewingAllProjects(true);
                    // scroll to top of main container or window
                    const mainScroll = document.getElementById('main-content-scroll');
                    if (mainScroll) {
                      mainScroll.scrollTo({ top: 0, behavior: 'smooth' });
                    } else {
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }
                  }}
                  className="group inline-flex items-center gap-2 px-6 py-2.5 bg-slate-900 text-white hover:bg-slate-800 transition-all font-mono text-[10px] uppercase tracking-wider font-bold rounded cursor-pointer shadow-md hover:shadow-lg hover:shadow-slate-900/10"
                >
                  <span>See All Projects ({projects.length})</span>
                  <ArrowRight className="size-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            )}
          </section>
        )}

        {/* SECTION 3: WORK EXPERIENCE */}
        {sectionVisibility.experience && (
          <section id="experience" className="scroll-mt-24 space-y-8">
            <h3 className="text-[11px] font-black uppercase tracking-[0.25em] text-slate-400 mb-5 pb-2 border-b border-slate-200">
              Selected Experience
            </h3>

            <div className="relative border-l-2 border-slate-200 pl-6 ml-1 space-y-10 font-sans">
              {experiences.map((exp) => (
                <div key={exp.id} className="relative group">
                  {/* Timeline Dot Indicator */}
                  <div className="absolute -left-[32px] top-1.5 size-3.5 rounded-full border-2 border-slate-900 bg-white group-hover:bg-slate-900 transition-colors duration-300" />

                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-3">
                      <div className="size-8 rounded bg-[#0a0a0a] text-white font-mono text-[11px] font-bold flex items-center justify-center shrink-0 border border-slate-800 uppercase shadow-sm">
                        {exp.companyLogoUrl}
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-slate-900">
                          {exp.role}
                        </h4>
                        <p className="text-slate-400 font-mono text-[10px] uppercase tracking-wider mt-0.5">
                          {exp.company} &bull; {exp.location}
                        </p>
                      </div>
                    </div>
                    <span className="font-mono text-[10px] bg-slate-100/80 text-slate-600 px-2 py-0.5 rounded font-bold uppercase">
                      {exp.period}
                    </span>
                  </div>

                  <ul className="space-y-1.5 mt-3 ml-1 md:ml-11">
                    {exp.bullets.map((bullet, bIdx) => (
                      <li key={bIdx} className="flex gap-2 text-xs text-slate-500 leading-relaxed font-light">
                        <span className="text-slate-350 shrink-0 select-none">&bull;</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* SECTION 4: EDUCATION */}
        {sectionVisibility.education && (
          <section id="education" className="scroll-mt-24 space-y-8 font-sans">
            <h3 className="text-[11px] font-black uppercase tracking-[0.25em] text-slate-400 mb-5 pb-2 border-b border-slate-200">
              Education
            </h3>

            <div className="relative border-l-2 border-slate-200 pl-6 ml-1 space-y-10">
              {educations.map((edu) => (
                <div key={edu.id} className="relative group">
                  {/* Timeline Dot Indicator */}
                  <div className="absolute -left-[32px] top-1.5 size-3.5 rounded-full border-2 border-slate-900 bg-white group-hover:bg-slate-900 transition-colors duration-300" />

                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-3">
                      <div className="size-8 rounded bg-[#0a0a0a] text-white font-mono text-[11px] font-bold flex items-center justify-center shrink-0 border border-slate-800 shadow-sm uppercase">
                        UI
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-slate-900">
                          {edu.degree}
                        </h4>
                        <p className="text-slate-400 font-mono text-[10px] uppercase tracking-wider mt-0.5">
                          {edu.institution} &bull; {edu.location}
                        </p>
                      </div>
                    </div>
                    <span className="font-mono text-[10px] bg-slate-100/80 text-slate-600 px-2 py-0.5 rounded font-bold uppercase">
                      {edu.period}
                    </span>
                  </div>

                  <ul className="space-y-1.5 mt-3 ml-1 md:ml-11">
                    {edu.bullets.map((bullet, bIdx) => (
                      <li key={bIdx} className="flex gap-2 text-xs text-slate-500 leading-relaxed font-light">
                        <span className="text-slate-350 shrink-0 select-none">&bull;</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* SECTION 5: CERTIFICATIONS */}
        {sectionVisibility.certifications && (
          <section id="certifications" className="scroll-mt-24 space-y-8">
            <h3 className="text-[11px] font-black uppercase tracking-[0.25em] text-slate-400 mb-5 pb-2 border-b border-slate-200">
              Certifications
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {certifications.map((cert) => (
                <div 
                  key={cert.id}
                  className="bg-white border border-slate-205 p-5 rounded-lg flex flex-col justify-between hover:border-slate-350 transition-colors duration-200 shadow-sm"
                >
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 leading-snug">
                      {cert.title}
                    </h4>
                    <p className="text-[10px] text-slate-450 mt-1 font-mono uppercase tracking-wider">
                      {cert.issuer}
                    </p>
                  </div>

                  <div className="flex items-center justify-between border-t border-slate-50 pt-3 mt-4 text-[10px] font-mono">
                    <span className="text-slate-400">{cert.year}</span>
                    {cert.credentialUrl && (
                      <a 
                        href={cert.credentialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-indigo-650 hover:underline inline-flex items-center gap-0.5"
                      >
                        <span>Verify</span>
                        <ChevronRight className="size-3" />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* SECTION 6: TESTIMONIALS */}
        {sectionVisibility.testimonials && (
          <section id="testimonials" className="scroll-mt-24 space-y-8">
            <h3 className="text-[11px] font-black uppercase tracking-[0.25em] text-slate-400 mb-5 pb-2 border-b border-slate-200">
              Testimonials
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonials.map((test) => (
                <div 
                  key={test.id}
                  className="bg-white border border-slate-200 p-6 rounded-lg relative flex flex-col justify-between shadow-sm"
                >
                  {/* Big decorative quotes sign in top right */}
                  <span className="absolute top-2 right-4 text-slate-100 font-serif text-5xl leading-none font-black select-none pointer-events-none">
                    “
                  </span>

                  <div className="relative z-10">
                    <p className="text-slate-650 text-xs leading-relaxed font-light italic mb-5">
                      "{test.quote}"
                    </p>
                  </div>

                  <div className="flex items-center gap-2.5 border-t border-slate-100 pt-3">
                    <div className="size-7 rounded bg-slate-900 text-white font-mono text-[10px] font-bold uppercase flex items-center justify-center shrink-0 shadow-sm">
                      {test.author.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <h5 className="text-xs font-bold text-slate-900 leading-none">
                        {test.author}
                      </h5>
                      <p className="text-[9px] font-mono text-slate-400 mt-1 leading-none">
                        {test.role}, <span className="text-slate-500 font-bold">{test.company}</span>
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}        {/* SECTION 7: CONTACT / MEETING BOOKING */}
        {sectionVisibility.contact && (
          <section id="contact" className="scroll-mt-24 space-y-8">
            <h3 className="text-[11px] font-black uppercase tracking-[0.25em] text-slate-400 mb-5 pb-2 border-b border-slate-200">
              Get in Touch
            </h3>

            <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
              
              {/* Contact Form column */}
              <div className="xl:col-span-7 bg-white border border-slate-200 p-6 lg:p-8 rounded-lg shadow-sm">
                <h4 className="text-base font-bold text-slate-900 mb-1">
                  Send a Message
                </h4>
                <p className="text-xs text-slate-455 font-sans font-light mb-6">
                  Have a project specification, position, or consulting opportunity? Drop me a line directly.
                </p>

                <AnimatePresence mode="wait">
                  {!isSubmitSuccess ? (
                    <motion.form 
                      key="contact-form"
                      initial={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onSubmit={handleSubmitMessage} 
                      className="space-y-4"
                    >
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 mb-1.5 uppercase tracking-wider">
                          Full Name <span className="text-slate-900 font-black">*</span>
                        </label>
                        <input 
                          type="text" 
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="w-full bg-slate-50 border border-slate-200 rounded px-3.5 py-2.5 text-sm text-slate-850 focus:outline-none focus:border-slate-800 focus:bg-white transition-all font-sans"
                          placeholder="e.g. John Doe"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 mb-1.5 uppercase tracking-wider">
                          Email Address <span className="text-slate-900 font-black">*</span>
                        </label>
                        <input 
                          type="email" 
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="w-full bg-slate-50 border border-slate-200 rounded px-3.5 py-2.5 text-sm text-slate-850 focus:outline-none focus:border-slate-800 focus:bg-white transition-all font-sans"
                          placeholder="e.g. john@company.com"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 mb-1.5 uppercase tracking-wider">
                          Your Message <span className="text-slate-900 font-black">*</span>
                        </label>
                        <textarea 
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          required
                          rows={4}
                          className="w-full bg-slate-50 border border-slate-200 rounded px-3.5 py-2.5 text-sm text-slate-850 focus:outline-none focus:border-slate-800 focus:bg-white transition-all font-sans resize-none"
                          placeholder="What would you like to build?"
                        />
                      </div>

                      <button 
                        type="submit" 
                        disabled={isSubmitting}
                        className="w-full bg-[#0a0a0a] hover:bg-slate-850 text-white font-mono text-xs uppercase tracking-widest py-3.5 px-4 rounded font-bold transition-colors duration-300 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? (
                          <>Sending...</>
                        ) : (
                          <>
                            <span>Submit Message</span>
                            <Send className="size-3.5" />
                          </>
                        )}
                      </button>
                    </motion.form>
                  ) : (
                    <motion.div 
                      key="success-message"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-6 bg-slate-50 text-slate-800 border border-slate-200 rounded text-center space-y-3"
                    >
                      <div className="size-10 bg-slate-900 rounded-full flex items-center justify-center mx-auto text-white">
                        <ClipboardCheck className="size-5" />
                      </div>
                      <h5 className="font-sans font-bold text-sm text-slate-900">Message Transmitted Successfully</h5>
                      <p className="text-xs font-sans font-light leading-relaxed max-w-sm mx-auto text-slate-600">
                        Thank you! Your message has been routed to my primary inbox. I usually reply to technical requests within 24 working hours.
                      </p>
                      <button 
                        onClick={() => setIsSubmitSuccess(false)}
                        className="inline-block mt-2 font-mono text-[10px] uppercase underline cursor-pointer text-slate-800 hover:text-slate-950 font-bold"
                      >
                        Send another message
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Interactive Scheduler widget column */}
              <div className="xl:col-span-5 bg-white border border-slate-200 p-6 rounded-lg space-y-6 shadow-sm">
                <div>
                  <h4 className="text-base font-bold text-slate-900 mb-1">
                    Schedule Consultation
                  </h4>
                  <p className="text-xs text-slate-450 font-sans font-light leading-relaxed">
                    Avoid back-and-forth emails. Lock in a quick 15-minute alignment call directly through my calendar slot.
                  </p>
                </div>

                {/* Simulative Calendar Form */}
                <form onSubmit={handleBookingSubmit} className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                      Select Target Date
                    </label>
                    <input 
                      type="date" 
                      required
                      value={bookingDate}
                      onChange={(e) => setBookingDate(e.target.value)}
                      min="2026-05-25" // Sets min to current simulated year
                      className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-2 text-xs text-slate-700 focus:outline-none focus:border-slate-800 font-sans"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                      Select Convenient Slot
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {['10:00 AM', '11:30 AM', '02:00 PM', '04:30 PM'].map((slot) => (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => setBookingTime(slot)}
                          className={`py-2 px-3 border rounded text-[11px] font-mono text-center transition-all cursor-pointer ${
                            bookingTime === slot 
                              ? 'bg-slate-900 text-white border-slate-900 font-bold' 
                              : 'bg-[#fafafa] text-slate-600 border-slate-200 hover:border-slate-450 hover:bg-slate-50 font-semibold'
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={!bookingDate || !bookingTime}
                    className="w-full bg-[#0a0a0a] hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed text-white font-mono text-[10px] uppercase tracking-widest py-3 rounded cursor-pointer transition-colors duration-300 flex items-center justify-center gap-1.5"
                  >
                    <Calendar className="size-3.5" />
                    <span>Lock Consultation Slot</span>
                  </button>
                </form>

                {/* Show booking confirmation modal-like inline box */}
                {bookingSuccess && (
                  <motion.div 
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-slate-905 text-white border border-slate-800 rounded flex gap-3 items-start bg-slate-900"
                  >
                    <div className="p-1.5 bg-slate-800 rounded mt-0.5 text-white shrink-0">
                      <ClipCheckIcon className="size-4" />
                    </div>
                    <div>
                      <h5 className="font-sans font-bold text-xs text-white">Call Scheduled!</h5>
                      <p className="text-[10px] text-slate-300 font-sans leading-relaxed mt-1">
                        Your call for <span className="font-semibold text-indigo-300">{bookingDate} @ {bookingTime}</span> (Jakarta Time) is confirmed. Invitation link has been auto-queued.
                      </p>
                    </div>
                  </motion.div>
                )}

                <div className="border-t border-slate-200 pt-4 text-xs font-sans text-slate-500 font-light text-center leading-relaxed">
                  Prefer Calendly? <a href={personalInfo.bookingUrl} target="_blank" rel="noopener noreferrer" className="text-slate-800 hover:underline font-bold font-mono">Open in External Tab</a>
                </div>
              </div>

            </div>
          </section>
        )}

      </div>
    </main>
  );
}

// Quick helper check icon matching types
function ClipCheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}
