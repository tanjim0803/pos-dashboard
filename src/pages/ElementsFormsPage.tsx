import pageHtml from './elements-forms.html?raw';

export default function ElementsFormsPage() {
  return <div dangerouslySetInnerHTML={{ __html: pageHtml }} />;
}
