import pageHtml from './elements-modals.html?raw';

export default function ElementsModalsPage() {
  return <div dangerouslySetInnerHTML={{ __html: pageHtml }} />;
}
