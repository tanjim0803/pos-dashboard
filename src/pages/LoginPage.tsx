import pageHtml from './login.html?raw';

export default function LoginPage() {
  return <div dangerouslySetInnerHTML={{ __html: pageHtml }} />;
}
