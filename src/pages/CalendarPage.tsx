import pageHtml from './calendar.html?raw';

export default function CalendarPage() {
  return <div dangerouslySetInnerHTML={{ __html: pageHtml }} />;
}
