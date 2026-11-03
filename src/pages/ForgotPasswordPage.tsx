import pageHtml from './forgot-password.html?raw';

export default function ForgotPasswordPage() {
  return <div dangerouslySetInnerHTML={{ __html: pageHtml }} />;
}
