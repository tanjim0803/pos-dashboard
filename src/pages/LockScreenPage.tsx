import pageHtml from './lock-screen.html?raw';

export default function LockScreenPage() {
  return <div dangerouslySetInnerHTML={{ __html: pageHtml }} />;
}
