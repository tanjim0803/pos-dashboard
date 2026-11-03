import pageHtml from './elements-buttons.html?raw';

export default function ElementsButtonsPage() {
  return <div dangerouslySetInnerHTML={{ __html: pageHtml }} />;
}
