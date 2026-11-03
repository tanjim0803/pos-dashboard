import dashboardHtml from './dashboard.html?raw';

export default function DashboardPage() {
  return <div dangerouslySetInnerHTML={{ __html: dashboardHtml }} />;
}
