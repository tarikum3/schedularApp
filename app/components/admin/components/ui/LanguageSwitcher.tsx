"use client";

import { useState } from "react";

interface Language {
  id: string;
  title: string;
  flag: string;
}

const languages: Language[] = [
  {
    id: "en",
    title: "English",
    flag: "us",
  },
  {
    id: "tr",
    title: "Turkish",
    flag: "tr",
  },
  {
    id: "ar",
    title: "Arabic",
    flag: "sa",
  },
];

const LanguageSwitcher = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState<Language>(
    languages[0]
  );

  const handleLanguageChange = (lng: Language) => {
    setCurrentLanguage(lng);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center px-4 py-2 border border-gray-300 rounded-lg bg-white shadow-sm hover:bg-gray-100"
      >
        <img
          src={`/assets/images/flags/${currentLanguage.flag}.png`}
          alt={currentLanguage.title}
          className="w-6 h-6 mr-2"
        />
        <span className="uppercase font-semibold text-gray-700">
          {currentLanguage.id}
        </span>
      </button>
      {isOpen && (
        <div className="absolute left-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
          {languages.map((lng) => (
            <button
              key={lng.id}
              onClick={() => handleLanguageChange(lng)}
              className="flex items-center w-full px-4 py-2 text-left hover:bg-gray-100"
            >
              <img
                src={`/assets/images/flags/${lng.flag}.png`}
                alt={lng.title}
                className="w-6 h-6 mr-2"
              />
              <span className="text-gray-700">{lng.title}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
