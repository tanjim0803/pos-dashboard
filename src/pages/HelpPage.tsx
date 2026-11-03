import pageHtml from './help.html?raw';

export default function HelpPage() {
  return <div dangerouslySetInnerHTML={{ __html: pageHtml }} />;
}
