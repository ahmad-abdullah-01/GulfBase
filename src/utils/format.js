import i18n from "../i18n";

const numericLocale = () => {
  const lang = i18n.language || 'en'
  return lang.startsWith('ar') ? 'ar-SA-u-nu-latn' : 'en'
}

export const formatCurrency = (value, currency = 'SAR') => new Intl.NumberFormat(numericLocale, { style: 'currency', currency, maximumFractionDigits: 2 }).format(value ?? 0)

export const formatPercent = (value, digits = 2) => {
  const sign = (value ?? 0) > 0 ? '+' : '-'
  return `${sign}${formatNumber(value, digits)}`
}

export const formatNumber = (value) => {
  if (value === null || value === undefined || isNaN(value)) return '0';

  const number = parseFloat(value);
  return number.toLocaleString('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });
};