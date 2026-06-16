import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { usePortfolio } from '../context/PortfolioContext';
import { 
  geraldyYobelAvatar 
} from '../data';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Copy, 
  Check, 
  Github, 
  Linkedin, 
  Twitter, 
  Instagram, 
  Youtube, 
  Globe,
  MessageSquare
} from 'lucide-react';

export default function Sidebar() {
  const { personalInfo, isCmsActive } = usePortfolio();
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const copyPhone = () => {
    navigator.clipboard.writeText(personalInfo.phone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };


  const getSocialIcon = (platform: string) => {
    switch (platform) {
      case 'GitHub':
        return <Github className="size-4" />;
      case 'LinkedIn':
        return <Linkedin className="size-4" />;
      case 'X':
        return <Twitter className="size-4" />;
      case 'Instagram':
        return <Instagram className="size-4" />;
      case 'YouTube':
        return <Youtube className="size-4" />;
      default:
        return <Globe className="size-4" />;
    }
  };

  return (
    <aside 
      className={`w-full lg:w-[32%] bg-[#0a0a0a] text-white border-r border-[#1e1e1e] dark-scroll flex flex-col justify-between font-sans ${
        isCmsActive 
          ? 'h-full overflow-y-auto' 
          : 'lg:fixed lg:h-screen lg:left-0 lg:top-0 lg:overflow-y-auto'
      }`}
      id="profile-sidebar"
    >
      <div className="p-8 lg:p-10 flex-grow">
        {/* Profile Avatar with Bold Border */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="relative w-24 h-24 lg:w-28 lg:h-28 mb-6 mx-auto lg:mx-0"
        >
          <div className="relative w-full h-full rounded-full border-2 border-white/20 p-1 bg-[#0a0a0a] overflow-hidden">
            <img 
              src={personalInfo.avatar || geraldyYobelAvatar} 
              alt={personalInfo.name} 
              className="w-full h-full object-cover rounded-full filter saturate-[0.8] contrast-[1.1]"
              referrerPolicy="no-referrer"
            />
          </div>
          {/* Active Work Pulse Status Badge */}
          <div className="absolute right-0 bottom-0 bg-[#0a0a0a] border border-white/10 flex items-center gap-1 px-2 py-0.5 rounded-full shadow-lg">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
            </span>
            <span className="text-[8px] text-slate-300 font-mono tracking-widest font-bold">LIVE</span>
          </div>
        </motion.div>

        {/* Name, Pronouns & Title */}
        <div className="text-center lg:text-left mb-8">
          <div className="flex flex-col lg:flex-row items-center lg:items-baseline gap-2">
            <h1 className="text-3xl font-black font-display tracking-tight text-white uppercase leading-none">
              {personalInfo.name}
            </h1>
            <span className="text-[9px] font-mono tracking-widest font-bold text-slate-400 bg-white/5 border border-white/10 px-1.5 py-0.5 rounded uppercase mt-1 lg:mt-0">
              {personalInfo.pronouns}
            </span>
          </div>
          <p className="text-slate-400 text-sm font-medium tracking-tight mt-1">
            {personalInfo.role}
          </p>
          <p className="text-[10px] text-slate-500 font-mono uppercase tracking-widest mt-1">
            {personalInfo.location}
          </p>
        </div>

        {/* Short Bio Block with Custom header */}
        <div className="space-y-4 mb-8">
          <section>
            <h3 className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-bold mb-3">
              About
            </h3>
            <p className="text-xs leading-relaxed text-slate-400 font-light">
              {personalInfo.shortBio}
            </p>
          </section>
        </div>

        {/* Contact info list with visual interactive Copy actions */}
        <div className="space-y-3 mb-8 border-t border-b border-white/10 py-5">
          <div className="flex items-center justify-between group/copy text-slate-400 text-xs hover:text-white transition-colors duration-200">
            <div className="flex items-center gap-2.5">
              <Mail className="size-3.5 shrink-0 text-slate-500" />
              <a href={`mailto:${personalInfo.email}`} className="font-light hover:underline">
                {personalInfo.email}
              </a>
            </div>
            <button 
              onClick={copyEmail}
              className="p-1 rounded hover:bg-white/5 text-slate-600 hover:text-slate-300 transition-all duration-200"
              title="Copy Email"
              id="copy-email-btn"
            >
              {copiedEmail ? <Check className="size-3 text-emerald-400" /> : <Copy className="size-3" />}
            </button>
          </div>

          <div className="flex items-center justify-between group/copy text-slate-400 text-xs hover:text-white transition-colors duration-200">
            <div className="flex items-center gap-2.5">
              <Phone className="size-3.5 shrink-0 text-slate-500" />
              <a href={`tel:${personalInfo.phone}`} className="font-light hover:underline">
                {personalInfo.phone}
              </a>
            </div>
            <button 
              onClick={copyPhone}
              className="p-1 rounded hover:bg-white/5 text-slate-600 hover:text-slate-300 transition-all duration-200"
              title="Copy Phone"
              id="copy-phone-btn"
            >
              {copiedPhone ? <Check className="size-3 text-emerald-400" /> : <Copy className="size-3" />}
            </button>
          </div>
        </div>

        {/* Compact Skill Badges matching Bold Typography theme */}
        <div className="mb-8">
          <h3 className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-bold mb-3">
            Skills
          </h3>
          <div className="flex flex-wrap gap-1.5">
            {personalInfo.skills.map((skill) => (
              <span 
                key={skill} 
                className="px-2 py-0.5 bg-white/5 border border-white/10 rounded text-[10px] text-slate-300 font-mono"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Languages section */}
        <div className="mb-4">
          <h3 className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-bold mb-3">
            Languages
          </h3>
          <div className="space-y-2">
            {personalInfo.languages.map((lang) => (
              <div key={lang.name} className="flex justify-between items-center text-xs">
                <span className="font-sans text-slate-300 font-medium">{lang.name}</span>
                <span className="font-mono text-slate-500 text-[10px]">{lang.level}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer social icons link sidebar border top */}
      <div className="p-8 border-t border-white/10 bg-black/40 lg:pb-10 font-sans">
        <div className="flex flex-wrap gap-2.5 mb-4 justify-between lg:justify-start">
          {personalInfo.socials.map((social) => (
            <motion.a 
              whileHover={{ y: -1, scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              key={social.platform}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white border border-white/5 hover:border-white/10 rounded transition-all duration-200"
              title={social.platform}
            >
              {getSocialIcon(social.platform)}
            </motion.a>
          ))}
        </div>
        <p className="text-[9px] font-mono text-slate-500 uppercase tracking-widest leading-none">
          © {new Date().getFullYear()} {personalInfo.name}. rev.{new Date().getFullYear()}
        </p>
      </div>
    </aside>
  );
}
