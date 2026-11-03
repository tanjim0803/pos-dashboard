import pageHtml from './users.html?raw';

export default function UsersPage() {
  return <div dangerouslySetInnerHTML={{ __html: pageHtml }} />;
}
