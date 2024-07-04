const huminizeDateOptionsPack = {
  month: 'long',
  year: 'numeric'
} as const;

function huminizeDateString(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleString('en-US', huminizeDateOptionsPack);
}

export { huminizeDateString };
