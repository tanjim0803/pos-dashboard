import pageHtml from './500.html?raw';

export default function ServerErrorPage() {
  return <div dangerouslySetInnerHTML={{ __html: pageHtml }} />;
}
