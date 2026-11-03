import pageHtml from './maintenance.html?raw';

export default function MaintenancePage() {
  return <div dangerouslySetInnerHTML={{ __html: pageHtml }} />;
}
