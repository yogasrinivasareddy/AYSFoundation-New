/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { initialFoundationData, FoundationData } from './data/foundationContent';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ContentEditorModal } from './components/ContentEditorModal';
import { VideoModal } from './components/VideoModal';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { TestimonialsPage } from './pages/TestimonialsPage';
import { DonationsPage } from './pages/DonationsPage';
import { ResourcesPage } from './pages/ResourcesPage';
import { ContactPage } from './pages/ContactPage';
import { Edit3 } from 'lucide-react';

const LOCAL_STORAGE_KEY = 'ays_yoga_foundation_data_v40';

export default function App() {
  const [data, setData] = useState<FoundationData>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...initialFoundationData,
          ...parsed,
          general: {
            ...initialFoundationData.general,
            ...(parsed.general || {}),
          },
        };
      }
    } catch {
      // Fallback
    }
    return initialFoundationData;
  });

  // Simple, robust hash-based & state-based routing
  const [currentPage, setCurrentPage] = useState<string>(() => {
    const hash = window.location.hash.replace('#', '').toLowerCase();
    const validPages = ['home', 'about', 'projects', 'testimonials', 'donations', 'resources', 'contact'];
    return validPages.includes(hash) ? hash : 'home';
  });

  const [selectedProjectIdForDonation, setSelectedProjectIdForDonation] = useState<string | null>(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [videoModal, setVideoModal] = useState<{ isOpen: boolean; url: string; title: string }>({
    isOpen: false,
    url: '',
    title: '',
  });

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '').toLowerCase();
      const validPages = ['home', 'about', 'projects', 'testimonials', 'donations', 'resources', 'contact'];
      if (validPages.includes(hash)) {
        setCurrentPage(hash);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
    window.location.hash = page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectProjectForDonation = (projectId: string) => {
    setSelectedProjectIdForDonation(projectId);
    handleNavigate('donations');
  };

  const handleSaveData = (newData: FoundationData) => {
    setData(newData);
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newData));
    } catch {
      // ignore
    }
  };

  const handleResetData = () => {
    setData(initialFoundationData);
    try {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    } catch {
      // ignore
    }
    setIsEditorOpen(false);
  };

  const handleOpenVideo = (url: string, title: string) => {
    setVideoModal({
      isOpen: true,
      url,
      title,
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#292524] selection:bg-[#E2D5C3]">
      {/* 3-Zone Top Bar Navigation */}
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        foundationName={data.general.foundationName}
      />

      {/* Main Page Body */}
      <main className="flex-1">
        {currentPage === 'home' && (
          <HomePage
            data={data}
            onNavigate={handleNavigate}
            onOpenVideo={handleOpenVideo}
            onSelectProjectForDonation={handleSelectProjectForDonation}
          />
        )}

        {currentPage === 'about' && (
          <AboutPage
            data={data}
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === 'projects' && (
          <ProjectsPage
            data={data}
            onNavigate={handleNavigate}
            onSelectProjectForDonation={handleSelectProjectForDonation}
          />
        )}

        {currentPage === 'testimonials' && (
          <TestimonialsPage data={data} />
        )}

        {currentPage === 'donations' && (
          <DonationsPage
            data={data}
            selectedProjectId={selectedProjectIdForDonation}
          />
        )}

        {currentPage === 'resources' && (
          <ResourcesPage
            data={data}
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === 'contact' && (
          <ContactPage data={data} />
        )}
      </main>

      {/* Grounded & Elegant Institutional Footer */}
      <Footer
        data={data}
        onNavigate={handleNavigate}
      />

      {/* Subtle Floating Content & Media Customizer Button */}
      <div className="fixed bottom-5 right-5 z-40">
        <button
          onClick={() => setIsEditorOpen(true)}
          className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold uppercase tracking-wider text-stone-800 bg-white/95 hover:bg-stone-100 border border-stone-300 rounded-full shadow-lg backdrop-blur-md transition-all cursor-pointer hover:shadow-xl"
          title="Click to edit website text, replace pictures, or add video links"
        >
          <Edit3 className="w-3.5 h-3.5 text-amber-800" />
          <span>Edit Content & Media</span>
        </button>
      </div>

      {/* Live Content Customizer Modal */}
      <ContentEditorModal
        isOpen={isEditorOpen}
        onClose={() => setIsEditorOpen(false)}
        data={data}
        onSave={handleSaveData}
        onReset={handleResetData}
      />

      {/* Video Walkthrough Modal */}
      <VideoModal
        isOpen={videoModal.isOpen}
        onClose={() => setVideoModal({ isOpen: false, url: '', title: '' })}
        videoUrl={videoModal.url}
        title={videoModal.title}
      />
    </div>
  );
}
