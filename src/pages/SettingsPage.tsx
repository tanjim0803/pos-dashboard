import pageHtml from './settings.html?raw';

export default function SettingsPage() {
  return <div dangerouslySetInnerHTML={{ __html: pageHtml }} />;
}
