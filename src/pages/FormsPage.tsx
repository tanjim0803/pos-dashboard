import pageHtml from './forms.html?raw';

export default function FormsPage() {
  return <div dangerouslySetInnerHTML={{ __html: pageHtml }} />;
}
