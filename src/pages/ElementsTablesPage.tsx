import pageHtml from './elements-tables.html?raw';

export default function ElementsTablesPage() {
  return <div dangerouslySetInnerHTML={{ __html: pageHtml }} />;
}
