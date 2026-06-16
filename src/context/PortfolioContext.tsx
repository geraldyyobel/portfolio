import React, { createContext, useContext, useState, useEffect } from 'react';
import { Project, Experience, Education, Certification, Testimonial, SectionVisibility } from '../types';
import {
  personalInfo as defaultPersonalInfo,
  projects as defaultProjects,
  experiences as defaultExperiences,
  educations as defaultEducations,
  certifications as defaultCertifications,
  testimonials as defaultTestimonials,
} from '../data';

const defaultSectionVisibility: SectionVisibility = {
  intro: true,
  projects: true,
  experience: true,
  education: true,
  certifications: true,
  testimonials: true,
  contact: true,
};

interface PortfolioContextType {
  personalInfo: typeof defaultPersonalInfo;
  projects: Project[];
  experiences: Experience[];
  educations: Education[];
  certifications: Certification[];
  testimonials: Testimonial[];
  sectionVisibility: SectionVisibility;
  isCmsActive: boolean;
  isAuthenticated: boolean;
  viewingAllProjects: boolean;
  setIsCmsActive: (active: boolean) => void;
  setAuthenticated: (auth: boolean) => void;
  setViewingAllProjects: (viewing: boolean) => void;
  updatePersonalInfo: (info: typeof defaultPersonalInfo) => void;
  updateProjects: (projects: Project[]) => void;
  updateExperiences: (experiences: Experience[]) => void;
  updateEducations: (educations: Education[]) => void;
  updateCertifications: (certifications: Certification[]) => void;
  updateTestimonials: (testimonials: Testimonial[]) => void;
  updateSectionVisibility: (visibility: SectionVisibility) => void;
  resetAllData: () => void;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [personalInfo, setPersonalInfoState] = useState(defaultPersonalInfo);
  const [projects, setProjectsState] = useState<Project[]>(defaultProjects);
  const [experiences, setExperiencesState] = useState<Experience[]>(defaultExperiences);
  const [educations, setEducationsState] = useState<Education[]>(defaultEducations);
  const [certifications, setCertificationsState] = useState<Certification[]>(defaultCertifications);
  const [testimonials, setTestimonialsState] = useState<Testimonial[]>(defaultTestimonials);
  const [sectionVisibility, setSectionVisibilityState] = useState<SectionVisibility>(defaultSectionVisibility);
  const [isCmsActive, setIsCmsActiveState] = useState(false);
  const [isAuthenticated, setIsAuthenticatedState] = useState<boolean>(() => {
    return sessionStorage.getItem('yobel_authenticated') === 'true';
  });
  const [viewingAllProjects, setViewingAllProjectsState] = useState(false);

  // Load from local storage on mount
  useEffect(() => {
    const storedInfo = localStorage.getItem('yobel_personal_info');
    if (storedInfo) {
      try {
        const parsed = JSON.parse(storedInfo);
        if (parsed && (parsed.name === 'Geraldy Yobel' || !parsed.name)) {
          parsed.name = 'Emeralda Patrisnandari';
          parsed.pronouns = 'she/her';
          parsed.avatar = 'https://media.licdn.com/dms/image/v2/D5603AQGwZLbJDbib4Q/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1721152545020?e=2147483647&v=beta&t=AMESTvgcNTpExDK4yJohqWoJa5zxiPcRenaH16QA0rk';
          parsed.email = 'emeralda.patrisnandari@gmail.com';
          parsed.website = 'https://emeralda.dev';
          localStorage.setItem('yobel_personal_info', JSON.stringify(parsed));
        }
        setPersonalInfoState(parsed);
      } catch (e) {
        console.error(e);
      }
    }

    const storedProjects = localStorage.getItem('yobel_projects');
    if (storedProjects) {
      try { setProjectsState(JSON.parse(storedProjects)); } catch (e) { console.error(e); }
    }

    const storedExperiences = localStorage.getItem('yobel_experiences');
    if (storedExperiences) {
      try { setExperiencesState(JSON.parse(storedExperiences)); } catch (e) { console.error(e); }
    }

    const storedEducations = localStorage.getItem('yobel_educations');
    if (storedEducations) {
      try { setEducationsState(JSON.parse(storedEducations)); } catch (e) { console.error(e); }
    }

    const storedCertifications = localStorage.getItem('yobel_certifications');
    if (storedCertifications) {
      try { setCertificationsState(JSON.parse(storedCertifications)); } catch (e) { console.error(e); }
    }

    const storedTestimonials = localStorage.getItem('yobel_testimonials');
    if (storedTestimonials) {
      try { setTestimonialsState(JSON.parse(storedTestimonials)); } catch (e) { console.error(e); }
    }

    const storedVisibility = localStorage.getItem('yobel_visibility');
    if (storedVisibility) {
      try { setSectionVisibilityState(JSON.parse(storedVisibility)); } catch (e) { console.error(e); }
    }

    // Toggle CMS or All Projects based on hash
    const checkHash = () => {
      const hash = window.location.hash;
      setIsCmsActiveState(hash === '#yobelganteng');
      setViewingAllProjectsState(hash === '#all-projects');
    };

    checkHash();
    window.addEventListener('hashchange', checkHash);
    return () => window.removeEventListener('hashchange', checkHash);
  }, []);

  const setIsCmsActive = (active: boolean) => {
    if (active) {
      window.location.hash = '#yobelganteng';
    } else {
      // Clear hash safely
      window.location.hash = '';
      // clean hash if possible without reload
      if (window.history.pushState) {
        window.history.pushState('', document.title, window.location.pathname + window.location.search);
      }
    }
    setIsCmsActiveState(active);
  };

  const setViewingAllProjects = (viewing: boolean) => {
    if (viewing) {
      window.location.hash = '#all-projects';
    } else {
      if (window.location.hash === '#all-projects') {
        window.location.hash = '';
        if (window.history.pushState) {
          window.history.pushState('', document.title, window.location.pathname + window.location.search);
        }
      }
    }
    setViewingAllProjectsState(viewing);
  };

  const setAuthenticated = (auth: boolean) => {
    setIsAuthenticatedState(auth);
    if (auth) {
      sessionStorage.setItem('yobel_authenticated', 'true');
    } else {
      sessionStorage.removeItem('yobel_authenticated');
    }
  };

  const updatePersonalInfo = (info: typeof defaultPersonalInfo) => {
    localStorage.setItem('yobel_personal_info', JSON.stringify(info));
    setPersonalInfoState(info);
  };

  const updateProjects = (newProjects: Project[]) => {
    localStorage.setItem('yobel_projects', JSON.stringify(newProjects));
    setProjectsState(newProjects);
  };

  const updateExperiences = (newExperiences: Experience[]) => {
    localStorage.setItem('yobel_experiences', JSON.stringify(newExperiences));
    setExperiencesState(newExperiences);
  };

  const updateEducations = (newEducations: Education[]) => {
    localStorage.setItem('yobel_educations', JSON.stringify(newEducations));
    setEducationsState(newEducations);
  };

  const updateCertifications = (newCertifications: Certification[]) => {
    localStorage.setItem('yobel_certifications', JSON.stringify(newCertifications));
    setCertificationsState(newCertifications);
  };

  const updateTestimonials = (newTestimonials: Testimonial[]) => {
    localStorage.setItem('yobel_testimonials', JSON.stringify(newTestimonials));
    setTestimonialsState(newTestimonials);
  };

  const updateSectionVisibility = (newVisibility: SectionVisibility) => {
    localStorage.setItem('yobel_visibility', JSON.stringify(newVisibility));
    setSectionVisibilityState(newVisibility);
  };

  const resetAllData = () => {
    localStorage.removeItem('yobel_personal_info');
    localStorage.removeItem('yobel_projects');
    localStorage.removeItem('yobel_experiences');
    localStorage.removeItem('yobel_educations');
    localStorage.removeItem('yobel_certifications');
    localStorage.removeItem('yobel_testimonials');
    localStorage.removeItem('yobel_visibility');
    sessionStorage.removeItem('yobel_authenticated');
    
    setPersonalInfoState(defaultPersonalInfo);
    setProjectsState(defaultProjects);
    setExperiencesState(defaultExperiences);
    setEducationsState(defaultEducations);
    setCertificationsState(defaultCertifications);
    setTestimonialsState(defaultTestimonials);
    setSectionVisibilityState(defaultSectionVisibility);
    setIsAuthenticatedState(false);
    
    setIsCmsActive(false);
  };

  return (
    <PortfolioContext.Provider
      value={{
        personalInfo,
        projects,
        experiences,
        educations,
        certifications,
        testimonials,
        sectionVisibility,
        isCmsActive,
        isAuthenticated,
        viewingAllProjects,
        setIsCmsActive,
        setAuthenticated,
        setViewingAllProjects,
        updatePersonalInfo,
        updateProjects,
        updateExperiences,
        updateEducations,
        updateCertifications,
        updateTestimonials,
        updateSectionVisibility,
        resetAllData,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};
