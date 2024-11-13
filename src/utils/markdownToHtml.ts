const markdownToHtml = (markdown: string) => {
  // Convert headers
  markdown = markdown.replace(/^### (.*$)/gim, "<h3>$1</h3>");
  markdown = markdown.replace(/^## (.*$)/gim, "<h2>$1</h2>");
  markdown = markdown.replace(/^# (.*$)/gim, "<h1>$1</h1>");

  // Convert bold text
  markdown = markdown.replace(/\*\*(.*?)\*\*/gim, "<strong>$1</strong>");

  // Convert italic text
  markdown = markdown.replace(/\*(.*?)\*/gim, "<em>$1</em>");

  // Convert line breaks
  markdown = markdown.replace(/\n/g, "<br>");

  return markdown.trim();
};

export default markdownToHtml;
