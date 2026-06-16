import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { usePortfolio } from '../context/PortfolioContext';
import { 
  ArrowLeft, 
  Github, 
  ExternalLink, 
  Search,
  Grid,
  Sparkles,
  Layers,
  Filter,
  LayoutGrid,
  List,
  Calendar,
  Tag,
  ArrowUpRight
} from 'lucide-react';

export default function AllProjectsView() {
  const { 
    projects, 
    setViewingAllProjects, 
    isCmsActive,
    personalInfo
  } = usePortfolio();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Scroll to top on mount
  useEffect(() => {
    const scrollContainer = document.getElementById('all-projects-scroll');
    if (scrollContainer) {
      scrollContainer.scrollTo({ top: 0, behavior: 'instant' });
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, []);

  // Compute unique categories and counts dynamically from database
  const categoriesList = useMemo(() => {
    const cats = new Set(projects.map(p => p.category).filter(Boolean));
    return ['All', ...Array.from(cats)];
  }, [projects]);

  const categoryStats = useMemo(() => {
    const stats: { [key: string]: number } = { All: projects.length };
    projects.forEach(p => {
      if (p.category) {
        stats[p.category] = (stats[p.category] || 0) + 1;
      }
    });
    return stats;
  }, [projects]);

  // Filter projects based on query and selected category
  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      const titleMatch = project.title.toLowerCase().includes(searchQuery.toLowerCase());
      const descMatch = project.description.toLowerCase().includes(searchQuery.toLowerCase());
      const tagMatch = project.tags && project.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      const categoryMatch = project.category && project.category.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesSearch = titleMatch || descMatch || tagMatch || categoryMatch;
      
      const matchesCategory = 
        selectedCategory === 'All' || 
        (project.category && project.category.toLowerCase() === selectedCategory.toLowerCase());

      return matchesSearch && matchesCategory;
    });
  }, [projects, searchQuery, selectedCategory]);

  const handleReturnHome = () => {
    setViewingAllProjects(false);
    // Scroll to section projects after returning
    setTimeout(() => {
      const projectsEl = document.getElementById('projects');
      if (projectsEl) {
        projectsEl.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  // Framer Motion Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: { type: 'spring', stiffness: 100, damping: 15 }
    }
  };

  return (
    <main 
      id="all-projects-scroll"
      className={`w-full lg:w-[68%] bg-[#fafafa] text-[#121214] relative flex flex-col font-sans transition-all duration-300 ${
        isCmsActive 
          ? 'h-full overflow-y-auto' 
          : 'min-h-screen lg:ml-[32%]'
      }`}
    >
      {/* Header Top Bar Navigation (Sleek Sticky UI) */}
      <nav className="sticky top-0 z-50 bg-[#fafafa]/90 backdrop-blur-md border-b border-slate-200/80 flex items-center justify-between px-6 lg:px-12 py-4 shrink-0 transition-all">
        <button
          onClick={handleReturnHome}
          className="group inline-flex items-center gap-2.5 text-[11px] font-bold uppercase tracking-widest text-slate-500 hover:text-slate-900 transition-all cursor-pointer font-mono"
        >
          <ArrowLeft className="size-3.5 group-hover:-translate-x-1 transition-transform stroke-[2.5]" />
          <span>PORTFOLIO</span>
        </button>

        <div className="flex items-center gap-1.5 font-mono text-[10px] text-indigo-650 font-bold uppercase py-1 px-3 bg-indigo-50/80 border border-indigo-100/60 rounded-full shadow-sm shadow-indigo-100/10">
          <Layers className="size-3 text-indigo-500 animate-pulse" />
          <span>ARCHIVE INDEX // {projects.length} SYSTEMS</span>
        </div>
      </nav>

      <div className="flex-1 px-6 lg:px-12 py-10 space-y-10 max-w-5xl mx-auto w-full">
        
        {/* Page Hero Area with clean display typography alignment */}
        <div className="space-y-3 pb-2 border-b border-slate-200/50">
          <div className="flex items-center gap-2">
            <div className="size-2 rounded-full bg-indigo-600 animate-ping" />
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-indigo-630 font-extrabold">SYSTEM ARCHIVE</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-display font-black tracking-tight text-slate-900 leading-none">
            ENGINEERED WORKS
          </h1>
          <p className="text-xs md:text-sm font-light text-slate-500 max-w-xl leading-relaxed">
            A comprehensive, modular log of built architectures, software pipelines, web applications, and interactive portals completed by {personalInfo.name}.
          </p>
        </div>

        {/* Precise Filters, Search Input & Layout Controls */}
        <div className="space-y-4">
          <div className="flex flex-col lg:flex-row gap-4 justify-between items-stretch lg:items-center">
            
            {/* Search Input Custom Box */}
            <div className="relative flex-1 max-w-xl">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-slate-400 stroke-[2]" />
              <input
                type="text"
                placeholder="Search stacks, titles, components..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border border-slate-200 hover:border-slate-300 focus:border-indigo-600 focus:bg-white focus:ring-4 focus:ring-indigo-100/50 rounded px-10 py-3 text-xs font-semibold focus:outline-none transition-all placeholder:text-slate-400/80 shadow-sm font-sans"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[10px] font-mono font-bold text-slate-400 hover:text-slate-900 hover:underline"
                >
                  CLEAR
                </button>
              )}
            </div>

            {/* Layout Toggler Switcher */}
            <div className="flex items-center gap-1 bg-slate-100 p-1.5 rounded-lg self-end lg:self-auto border border-slate-200/40 shrink-0 shadow-inner">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded flex items-center gap-1.5 text-xs font-bold transition-all cursor-pointer ${
                  viewMode === 'grid'
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
                title="Grid representation"
              >
                <LayoutGrid className="size-3.5" />
                <span className="font-mono text-[9px] uppercase tracking-wider hidden sm:inline">Grid</span>
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded flex items-center gap-1.5 text-xs font-bold transition-all cursor-pointer ${
                  viewMode === 'list'
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
                title="Sleek detailed index"
              >
                <List className="size-3.5" />
                <span className="font-mono text-[9px] uppercase tracking-wider hidden sm:inline">Index</span>
              </button>
            </div>
          </div>

          {/* Dynamic Categories Selection Bar */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1 whitespace-nowrap border-b border-slate-200/30">
            {categoriesList.map((cat) => {
              const count = categoryStats[cat] || 0;
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`group inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[11px] font-mono uppercase tracking-wider font-bold transition-all cursor-pointer border ${
                    isSelected
                      ? 'bg-slate-950 text-white border-slate-950 shadow-md shadow-slate-950/10'
                      : 'bg-white text-slate-500 border-slate-200/60 hover:border-slate-350 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <span>{cat}</span>
                  <span className={`text-[10px] px-1.5 py-0.25 rounded-full font-extrabold ${isSelected ? 'bg-white/20 text-slate-100' : 'bg-slate-100 text-slate-400 group-hover:bg-slate-200 group-hover:text-slate-700'}`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Results Info Bar */}
        <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-slate-400 font-bold border-b border-slate-200/40 pb-2">
          <div className="flex items-center gap-2">
            <Filter className="size-3.5 text-indigo-500" />
            <span>RESULT METRICS: {filteredProjects.length} OF {projects.length} SPECIFICATIONS</span>
          </div>
          {searchQuery && (
            <span className="text-slate-505 font-light normal-case">
              Filtering for <strong className="text-slate-800 font-bold">"{searchQuery}"</strong>
            </span>
          )}
        </div>

        {/* Projects View Render */}
        <AnimatePresence mode="wait">
          {filteredProjects.length > 0 ? (
            viewMode === 'grid' ? (
              // GRID REPRESENTATION
              <motion.div 
                key="grid-view"
                variants={containerVariants}
                initial="hidden"
                animate="show"
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-16"
              >
                {filteredProjects.map((project, idx) => (
                  <motion.div 
                    key={project.id}
                    variants={itemVariants}
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.2 }}
                    className="group flex flex-col justify-between bg-white border border-slate-200/80 hover:border-slate-400 p-6 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden"
                  >
                    {/* Tiny Absolute Index Badge */}
                    <span className="absolute top-0 right-0 font-mono text-[65px] leading-none font-bold text-slate-50 group-hover:text-slate-100/50 transition-colors pointer-events-none select-none -translate-y-4 translate-x-2 font-display">
                      {String(idx + 1).padStart(2, '0')}
                    </span>

                    <div className="relative z-10 space-y-4">
                      {/* Meta information row */}
                      <div className="flex justify-between items-center gap-2">
                        <span className="font-mono text-[9px] tracking-[0.18em] text-indigo-600 bg-indigo-50 border border-indigo-100/40 px-2 py-0.5 rounded font-extrabold uppercase">
                          {project.category}
                        </span>
                        
                        <div className="flex items-center gap-1.5 font-mono text-[10px] text-slate-400 font-semibold bg-slate-50/80 px-2.5 py-0.5 rounded border border-slate-100">
                          <Calendar className="size-3 text-slate-350" />
                          <span>{project.period || 'Continuous'}</span>
                        </div>
                      </div>

                      {/* Main project title & description */}
                      <div className="space-y-2">
                        <h4 className="text-base font-display font-bold text-slate-900 group-hover:text-indigo-600 transition-colors duration-200 leading-snug uppercase tracking-tight">
                          {project.title}
                        </h4>
                        <p className="text-slate-500 text-xs leading-relaxed font-light line-clamp-3 group-hover:line-clamp-none transition-all duration-300">
                          {project.description}
                        </p>
                      </div>
                    </div>

                    {/* Lower element: Tags & Core Links */}
                    <div className="relative z-10 space-y-5 pt-5 mt-4 border-t border-slate-200/50">
                      {/* Tags container */}
                      <div className="flex flex-wrap gap-1">
                        {project.tags && project.tags.map((tag) => (
                          <span 
                            key={tag} 
                            className="font-mono text-[8px] tracking-wider uppercase font-bold bg-slate-100/80 text-slate-500 px-2 py-0.75 rounded border border-slate-200/20 hover:border-slate-300 hover:text-slate-800 transition-all cursor-default"
                          >
                            #{tag.toLowerCase()}
                          </span>
                        ))}
                      </div>

                      {/* Unified footer buttons */}
                      <div className="flex items-center gap-4">
                        {project.githubUrl && (
                          <a 
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-wider font-extrabold text-slate-500 hover:text-slate-950 transition-colors duration-200 py-1"
                          >
                            <Github className="size-3.5" />
                            <span>CODE</span>
                          </a>
                        )}
                        {project.liveUrl && (
                          <a 
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-wider font-extrabold text-indigo-600 hover:text-indigo-900 transition-colors duration-200 py-1"
                          >
                            <ExternalLink className="size-3.5" />
                            <span>LAUNCH</span>
                          </a>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              // SLEEK DETAILED INDEX ROWS (LIST REPRESENTATION)
              <motion.div 
                key="list-view"
                variants={containerVariants}
                initial="hidden"
                animate="show"
                exit={{ opacity: 0 }}
                className="space-y-4 pb-16"
              >
                {filteredProjects.map((project, idx) => (
                  <motion.div 
                    key={project.id}
                    variants={itemVariants}
                    className="group bg-white border border-slate-200 hover:border-slate-350 p-5 rounded-lg flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all duration-300 hover:shadow-sm"
                  >
                    {/* Left Column: Number, Title, description, Category */}
                    <div className="space-y-2 flex-1 md:pr-4">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-xs font-bold text-slate-300">
                          {String(idx + 1).padStart(2, '0')}
                        </span>
                        <span className="font-mono text-[8px] tracking-widest text-indigo-600 font-extrabold bg-indigo-50 border border-indigo-100/50 px-2 py-0.5 rounded uppercase">
                          {project.category}
                        </span>
                        <div className="font-mono text-[9px] text-slate-400 flex items-center gap-1">
                          <Calendar className="size-3" />
                          <span>{project.period}</span>
                        </div>
                      </div>

                      <h4 className="text-base font-display font-bold text-slate-900 group-hover:text-indigo-600 transition-colors duration-200 uppercase tracking-tight">
                        {project.title}
                      </h4>
                      <p className="text-slate-500 text-xs leading-relaxed font-light line-clamp-2 md:line-clamp-1 group-hover:line-clamp-none transition-all">
                        {project.description}
                      </p>
                      
                      {/* Tags list */}
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {project.tags && project.tags.map((tag) => (
                          <span 
                            key={tag} 
                            className="font-mono text-[8px] bg-slate-50 text-slate-400 px-1.5 py-0.25 rounded border border-slate-200/25"
                          >
                            #{tag.toLowerCase()}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Right column: Action panel */}
                    <div className="flex items-center gap-3 shrink-0 border-t md:border-t-0 border-slate-100 pt-3 md:pt-0 self-end md:self-auto">
                      {project.githubUrl && (
                        <a 
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 sm:px-3 sm:py-2 rounded border border-slate-200 hover:border-slate-800 text-slate-600 hover:text-slate-900 transition-all font-mono text-[9px] font-bold uppercase tracking-wider flex items-center gap-1.5"
                          title="View source repository"
                        >
                          <Github className="size-3.5" />
                          <span className="hidden sm:inline">REPO</span>
                        </a>
                      )}
                      {project.liveUrl && (
                        <a 
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 sm:px-3.5 sm:py-2 rounded bg-slate-950 hover:bg-slate-800 text-white transition-all font-mono text-[9px] font-bold uppercase tracking-wider flex items-center gap-1.5 cursor-pointer shadow-sm shadow-slate-950/10"
                          title="Open live link"
                        >
                          <span>LIVE</span>
                          <ArrowUpRight className="size-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </a>
                      )}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )
          ) : (
            // DETAILED HIGH-ACCURACY EMPTY STATE
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-20 text-center border border-dashed border-slate-200 rounded-lg bg-slate-50 space-y-4 max-w-lg mx-auto"
            >
              <div className="size-14 rounded-full bg-slate-100 flex items-center justify-center mx-auto border border-slate-200/50 shadow-inner">
                <Grid className="size-6 text-slate-400 stroke-[1.5]" />
              </div>
              <div className="space-y-1 px-4">
                <p className="text-sm font-display font-bold text-slate-800 uppercase tracking-tight">NO MATCHING ARCHIVES FOUND</p>
                <p className="text-xs font-light text-slate-400 leading-relaxed">
                  Your search query or category filter yielded zero results. Try resetting the query keyword or looking under alternate tags.
                </p>
              </div>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded bg-indigo-600 hover:bg-indigo-700 text-white transition-all font-mono text-[10px] uppercase font-bold tracking-wider cursor-pointer shadow-sm shadow-indigo-600/15"
              >
                RESET SCANNER METRICS
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Persistent high-fidelity precise footer section */}
      <footer className="shrink-0 border-t border-slate-200/80 py-8 text-center bg-slate-50 bg-gradient-to-t from-slate-100 to-transparent mt-auto relative z-10">
        <p className="font-mono text-[9px] text-slate-400 uppercase tracking-[0.2em] font-extrabold flex items-center justify-center gap-1.5">
          <Sparkles className="size-3.5 text-indigo-400 animate-pulse" />
          <span>{personalInfo.name.toUpperCase()} PORTFOLIO ENGINE • ALL SYSTEMS NOMINAL</span>
        </p>
      </footer>
    </main>
  );
}
