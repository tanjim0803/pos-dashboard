import pageHtml from './register.html?raw';

export default function RegisterPage() {
  return <div dangerouslySetInnerHTML={{ __html: pageHtml }} />;
}
