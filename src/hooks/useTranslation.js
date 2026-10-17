import { useState, useEffect, useCallback } from "react";

const translationLoaders = import.meta.glob("../translations/*.json", {
  import: "default",
});

export const useTranslation = (language = "en") => {
  const [translations, setTranslations] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isCurrent = true;

    const loadLanguage = async (languageToLoad) => {
      const load = translationLoaders[`../translations/${languageToLoad}.json`];
      if (!load) {
        throw new Error(`No translation file found for "${languageToLoad}"`);
      }
      return load();
    };

    const loadTranslations = async () => {
      setLoading(true);
      try {
        const data = await loadLanguage(language);
        if (isCurrent) {
          setTranslations(data);
          setLoading(false);
        }
      } catch (error) {
        console.error('Error loading translations:', error);
        if (language !== "en") {
          try {
            const fallback = await loadLanguage("en");
            if (isCurrent) setTranslations(fallback);
          } catch (fallbackError) {
            console.error("Error loading fallback translations:", fallbackError);
            if (isCurrent) setTranslations({});
          }
        } else if (isCurrent) {
          setTranslations({});
        }
        if (isCurrent) setLoading(false);
      }
    };

    loadTranslations();
    return () => {
      isCurrent = false;
    };
  }, [language]);

  // Memoize the translate function
  const translate = useCallback((keyPath, fallback = keyPath) => {
    if (!translations || loading) return fallback;

    const keys = keyPath.split('.');
    let result = translations;

    for (const key of keys) {
      if (result && typeof result === 'object' && key in result) {
        result = result[key];
      } else {
        return fallback;
      }
    }

    return result !== null && result !== undefined ? result : fallback;
  }, [translations, loading]);

  return { translate, loading };
};

export default useTranslation;