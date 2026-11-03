import pageHtml from './security.html?raw';

export default function SecurityPage() {
  return <div dangerouslySetInnerHTML={{ __html: pageHtml }} />;
}
