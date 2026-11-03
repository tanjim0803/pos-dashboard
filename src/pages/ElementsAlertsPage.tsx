import pageHtml from './elements-alerts.html?raw';

export default function ElementsAlertsPage() {
  return <div dangerouslySetInnerHTML={{ __html: pageHtml }} />;
}
