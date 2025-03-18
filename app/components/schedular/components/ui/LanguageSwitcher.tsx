"use client";

import { useState, useMemo } from "react";
import { useTranslations, useLocale } from "next-intl";
import { useTransition } from "react";
import { Locale } from "@/i18n/config";
import { setUserLocale } from "@lib/services/locale";

const LanguageSwitcher = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const t = useTranslations("LocaleSwitcher");
  const locale = useLocale();

  // Memoize the languages array to avoid unnecessary re-renders
  const languages = useMemo(
    () => [
      {
        value: "en",
        label: t("en"),
      },
      {
        value: "am",
        label: t("am"),
      },
    ],
    [t]
  );

  const handleLanguageChange = (value: string) => {
    const newLocale = value as Locale;
    startTransition(() => {
      try {
        setUserLocale(newLocale);
        setIsOpen(false); // Close the dropdown after selection
      } catch (error) {
        console.error("Failed to change locale:", error);
      }
    });
  };

  return (
    <div className="relative inline-block text-left">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="true"
        aria-expanded={isOpen}
        className="flex items-center px-4 py-2 border border-primary-300 rounded-lg bg-primary-0 shadow-sm hover:bg-primary-100  "
      >
        <img
          src={`/assets/flags/${locale}.png`}
          alt={locale}
          className="w-6 h-6 mr-2"
          aria-hidden="true"
        />
        <span className="uppercase font-semibold ">{locale}</span>
      </button>

      {isOpen && (
        <div
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="language-switcher"
          className="absolute left-0 mt-2 w-48 bg-primary-0 border border-primary-200 rounded-lg shadow-lg z-50"
        >
          {languages.map((lng) => (
            <button
              key={lng.value}
              type="button"
              role="menuitem"
              onClick={() => handleLanguageChange(lng.value)}
              className="flex items-center w-full px-4 py-2 text-left hover:bg-primary-100 focus:outline-none focus:bg-primary-100"
            >
              <img
                src={`/assets/flags/${lng.value}.png`}
                alt={lng.label}
                className="w-6 h-6 mr-2"
                aria-hidden="true"
              />
              <span className="text-primary-700">{lng.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
