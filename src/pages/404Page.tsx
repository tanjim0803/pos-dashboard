import pageHtml from './404.html?raw';

export default function NotFoundPage() {
  return <div dangerouslySetInnerHTML={{ __html: pageHtml }} />;
}
