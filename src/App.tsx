/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import AllProjectsView from './components/AllProjectsView';
import CmsPanel from './components/CmsPanel';
import { PortfolioProvider, usePortfolio } from './context/PortfolioContext';
import { Sparkles, Settings } from 'lucide-react';

function AppContent() {
  const { isCmsActive, setIsCmsActive, isAuthenticated, viewingAllProjects } = usePortfolio();

  if (isCmsActive) {
    // If not authenticated, let the CmsPanel render its fullscreen gate
    if (!isAuthenticated) {
      return <CmsPanel />;
    }

    // If authenticated, render the rich split-screen CMS Page with Live Preview!
    return (
      <div className="min-h-screen w-full bg-[#0a0a0c] text-white flex flex-col h-screen overflow-hidden font-sans">
        {/* Top bar */}
        <div className="h-14 shrink-0 bg-[#121215] border-b border-white/10 px-6 flex items-center justify-between z-50">
          <div className="flex items-center gap-3">
            <span className="text-xs font-black tracking-widest text-indigo-400 font-display select-none">
              GERALDY YOBEL
            </span>
            <span className="text-[9px] uppercase bg-indigo-500/10 text-indigo-400 font-bold px-2 py-0.5 rounded border border-indigo-505/15 font-mono select-none">
              CREATOR ENVIRONMENT
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[10px] text-slate-500 font-mono hidden md:inline select-none">
              SECURE WORKSPACE PORT: 3000
            </span>
            <button
              onClick={() => setIsCmsActive(false)}
              className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-mono text-[10px] uppercase font-bold tracking-wider rounded transition-all cursor-pointer shadow-lg shadow-indigo-650/15"
            >
              Exit & Publish Site
            </button>
          </div>
        </div>

        {/* Real split-screen layout */}
        <div className="flex-1 flex flex-col lg:flex-row overflow-hidden relative">
          
          {/* Left: Interactive Editor Panel */}
          <div className="w-full lg:w-[48%] xl:w-[45%] h-full flex flex-col border-r border-white/10 overflow-hidden bg-[#121215]">
            <CmsPanel />
          </div>

          {/* Right: Live Preview Frame */}
          <div className="hidden lg:flex flex-1 h-full bg-[#161619] flex-col p-6 overflow-hidden relative">
            <div className="flex items-center justify-between mb-3.5 shrink-0 select-none">
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  <span className="size-2 bg-rose-500 rounded-full" />
                  <span className="size-2 bg-amber-500 rounded-full" />
                  <span className="size-2 bg-emerald-500 rounded-full" />
                </div>
                <span className="text-xs font-mono text-slate-400 font-bold tracking-wider uppercase ml-1">
                  LIVE PORTFOLIO INDEX PREVIEW
                </span>
              </div>
              <div className="text-[9px] font-mono text-indigo-400 font-bold tracking-wider uppercase bg-indigo-500/10 px-2.5 py-0.5 border border-indigo-500/20 rounded-md">
                AUTO-SYNCS LIVE
              </div>
            </div>

            {/* Sandbox portfolio preview emulator container */}
            <div className="flex-1 w-full bg-[#fafafa] border border-white/10 rounded-lg shadow-2xl overflow-hidden relative">
              <div className="flex flex-col lg:flex-row h-full w-full overflow-hidden">
                <Sidebar />
                {viewingAllProjects ? <AllProjectsView /> : <MainContent />}
              </div>
            </div>
          </div>

        </div>
      </div>
    );
  }

  // Regular public website view
  return (
    <div className="min-h-screen w-full relative bg-[#FDFDFD] flex flex-col lg:flex-row antialiased font-sans">
      <Sidebar />
      {viewingAllProjects ? <AllProjectsView /> : <MainContent />}
    </div>
  );
}

export default function App() {
  return (
    <PortfolioProvider>
      <AppContent />
    </PortfolioProvider>
  );
}

