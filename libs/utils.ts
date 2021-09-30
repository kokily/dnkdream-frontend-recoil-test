export function removeHtml(text: string): string {
  return text
    .replace(/<br\/>/gi, '\n')
    .replace(/<(\/)?([a-zA-Z]*)(\s[a-zA-Z]*=[^>]*)?(\s)*(\/)?>/gi, '');
}
