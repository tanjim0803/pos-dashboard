import pageHtml from './elements-badges.html?raw';

export default function ElementsBadgesPage() {
  return <div dangerouslySetInnerHTML={{ __html: pageHtml }} />;
}
