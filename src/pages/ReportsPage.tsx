import pageHtml from './reports.html?raw';

export default function ReportsPage() {
  return <div dangerouslySetInnerHTML={{ __html: pageHtml }} />;
}
