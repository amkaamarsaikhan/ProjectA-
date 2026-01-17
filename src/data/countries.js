export const countries = [
  { id: 'us', name: 'USA', code: 'US', flag: '🇺🇸', quotaScholarships: 2, globalScholarships: 1 }, // Fulbright, Humphrey (Global), UGRAD (Global but specific quota)
  { id: 'uk', name: 'United Kingdom', code: 'GB', flag: '🇬🇧', quotaScholarships: 1, globalScholarships: 2 }, // Chevening (Quota/Global mix), STEM, Oxford (Global)
  { id: 'au', name: 'Australia', code: 'AU', flag: '🇦🇺', quotaScholarships: 1, globalScholarships: 2 }, // Australia Awards (Quota)
  { id: 'hu', name: 'Hungary', code: 'HU', flag: '🇭🇺', quotaScholarships: 1, globalScholarships: 0 }, // Stipendium Hungaricum (Quota)
  { id: 'cn', name: 'China', code: 'CN', flag: '🇨🇳', quotaScholarships: 1, globalScholarships: 0 }, // CSC (Quota)
  { id: 'kr', name: 'South Korea', code: 'KR', flag: '🇰🇷', quotaScholarships: 1, globalScholarships: 0 }, // GKS (Quota)
  { id: 'jp', name: 'Japan', code: 'JP', flag: '🇯🇵', quotaScholarships: 1, globalScholarships: 0 }, // MEXT (Quota)
  { id: 'de', name: 'Germany', code: 'DE', flag: '🇩🇪', quotaScholarships: 1, globalScholarships: 0 }, // DAAD (Global/Quota mix)
  { id: 'ca', name: 'Canada', code: 'CA', flag: '🇨🇦', quotaScholarships: 0, globalScholarships: 1 }, // Pearson (Global)
  { id: 'ru', name: 'Russia', code: 'RU', flag: '🇷🇺', quotaScholarships: 1, globalScholarships: 0 }, // Russia Quota
  { id: 'tr', name: 'Turkey', code: 'TR', flag: '🇹🇷', quotaScholarships: 1, globalScholarships: 0 }, // Turkiye Burslari (Quota)
  { id: 'tw', name: 'Taiwan', code: 'TW', flag: '🇹🇼', quotaScholarships: 1, globalScholarships: 0 }, // Taiwan MOE (Quota)
  { id: 'in', name: 'India', code: 'IN', flag: '🇮🇳', quotaScholarships: 1, globalScholarships: 0 }, // ICCR (Quota)
  { id: 'fr', name: 'France', code: 'FR', flag: '🇫🇷', quotaScholarships: 0, globalScholarships: 1 }, // Eiffel (Global)
  { id: 'it', name: 'Italy', code: 'IT', flag: '🇮🇹', quotaScholarships: 1, globalScholarships: 1 }, // Invest Your Talent (Specific), Bocconi (Global)
  { id: 'ro', name: 'Romania', code: 'RO', flag: '🇷🇴', quotaScholarships: 1, globalScholarships: 0 }, // Romania Gov (Quota)
  { id: 'se', name: 'Sweden', code: 'SE', flag: '🇸🇪', quotaScholarships: 0, globalScholarships: 1 }, // SI (Global for specific nations)
  { id: 'nl', name: 'Netherlands', code: 'NL', flag: '🇳🇱', quotaScholarships: 0, globalScholarships: 1 }, // Erasmus Mundus (Global)
  { id: 'ch', name: 'Switzerland', code: 'CH', flag: '🇨🇭', quotaScholarships: 1, globalScholarships: 0 }, // Swiss Gov (Specific)
  { id: 'ie', name: 'Ireland', code: 'IE', flag: '🇮🇪', quotaScholarships: 0, globalScholarships: 1 }, // Ireland Gov (Global)
  { id: 'be', name: 'Belgium', code: 'BE', flag: '🇧🇪', quotaScholarships: 0, globalScholarships: 1 }, // Master Mind (Global)
  { id: 'at', name: 'Austria', code: 'AT', flag: '🇦🇹', quotaScholarships: 1, globalScholarships: 0 }, // Ernst Mach (Specific)
  { id: 'vn', name: 'Vietnam', code: 'VN', flag: '🇻🇳', quotaScholarships: 1, globalScholarships: 0 } // VN-MN Gov (Quota)
];

export const getCountryByCode = (code) => {
  return countries.find(country => country.code === code);
};