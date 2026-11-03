import pageHtml from './elements.html?raw';

export default function ElementsPage() {
  return <div dangerouslySetInnerHTML={{ __html: pageHtml }} />;
}
