export const getLimitedWords = (text, wordLimit = 5) => {
  if (!text) return '';
  const words = text.split(' ');
  return words.slice(0, wordLimit).join(' ') + (words.length > wordLimit ? '...' : '');
};