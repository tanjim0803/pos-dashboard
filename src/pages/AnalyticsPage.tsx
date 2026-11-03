import pageHtml from './analytics.html?raw';

export default function AnalyticsPage() {
  return <div dangerouslySetInnerHTML={{ __html: pageHtml }} />;
}
