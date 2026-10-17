import { motion } from "framer-motion";

const LanguageToggle = ({
  visible,
  language,
  onLanguageChange,
  translate = (_key, fallback) => fallback,
}) => {
  const toggleLanguage = () => {
    const newLanguage = language === "en" ? "bn" : "en";
    onLanguageChange(newLanguage);
  };

  return (
    <>
      {visible && (
        <motion.button
          // initial={{ opacity: 0 }}
          // animate={{ opacity: 1 }}
          // transition={{ duration: 0.5, ease: "easeOut" }}
          type="button"
          className={`imm-lang-btn${language === "bn" ? " active" : ""}`}
          onClick={toggleLanguage}
          aria-label={translate(
            "language_switcher.aria_label",
            language === "en" ? "Switch to Bengali" : "Switch to English",
          )}
          aria-pressed={language === "bn"}
          title={translate(
            "language_switcher.title",
            language === "en" ? "Switch to Bengali" : "Switch to English",
          )}
        >
          {language === "en" ? (
            <span className="lang-icon">বাং</span>
          ) : (
            <span className="lang-icon">EN</span>
          )}
        </motion.button>
      )}
    </>
  );
};

export default LanguageToggle;
