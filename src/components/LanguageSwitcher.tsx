'use client';

import { useState, useEffect } from 'react';
import { Globe, ChevronDown } from 'lucide-react';

interface Language {
  id: string;
  code: string;
  name: string;
  native_name: string;
  enabled: boolean;
  is_default: boolean;
}

interface LanguageSwitcherProps {
  className?: string;
  onLanguageChange?: (languageCode: string) => void;
}

const LanguageSwitcher = ({ className = '', onLanguageChange }: LanguageSwitcherProps) => {
  const [languages, setLanguages] = useState<Language[]>([]);
  const [currentLanguage, setCurrentLanguage] = useState<Language | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLanguages();
    
    // Get current language from localStorage or use default
    const savedLanguage = localStorage.getItem('selected_language');
    if (savedLanguage) {
      // Will be set when languages are loaded
    }
  }, []);

  useEffect(() => {
    if (languages.length > 0 && !currentLanguage) {
      const savedLanguage = localStorage.getItem('selected_language');
      const defaultLang = languages.find(lang => lang.is_default) || languages[0];
      const selectedLang = savedLanguage 
        ? languages.find(lang => lang.code === savedLanguage) || defaultLang
        : defaultLang;
      
      setCurrentLanguage(selectedLang);
    }
  }, [languages, currentLanguage]);

  const fetchLanguages = async () => {
    try {
      const response = await fetch('/api/languages');
      if (response.ok) {
        const data = await response.json();
        setLanguages(data.languages);
      }
    } catch (error) {
      console.error('Error fetching languages:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLanguageSelect = (language: Language) => {
    setCurrentLanguage(language);
    setIsOpen(false);
    
    // Save to localStorage
    localStorage.setItem('selected_language', language.code);
    
    // Notify parent component
    if (onLanguageChange) {
      onLanguageChange(language.code);
    }

    // Reload page to apply language changes
    window.location.reload();
  };

  if (loading || languages.length <= 1) {
    return null; // Don't show if loading or only one language
  }

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-100 rounded-md transition-colors"
        type="button"
      >
        <Globe className="w-4 h-4" />
        <span className="text-sm font-medium">
          {currentLanguage?.native_name || currentLanguage?.name || 'Language'}
        </span>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown */}
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-20">
            <div className="py-1">
              {languages.map((language) => (
                <button
                  key={language.id}
                  onClick={() => handleLanguageSelect(language)}
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition-colors ${
                    currentLanguage?.code === language.code
                      ? 'bg-blue-50 text-blue-600 font-medium'
                      : 'text-gray-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">{language.native_name}</div>
                      {language.native_name !== language.name && (
                        <div className="text-xs text-gray-500">{language.name}</div>
                      )}
                    </div>
                    {language.is_default && (
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                        Default
                      </span>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default LanguageSwitcher;
