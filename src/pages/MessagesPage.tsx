import pageHtml from './messages.html?raw';

export default function MessagesPage() {
  return <div dangerouslySetInnerHTML={{ __html: pageHtml }} />;
}
