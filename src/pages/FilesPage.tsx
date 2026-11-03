import pageHtml from './files.html?raw';

export default function FilesPage() {
  return <div dangerouslySetInnerHTML={{ __html: pageHtml }} />;
}
