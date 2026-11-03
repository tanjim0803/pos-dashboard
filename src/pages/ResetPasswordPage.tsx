import pageHtml from './reset-password.html?raw';

export default function ResetPasswordPage() {
  return <div dangerouslySetInnerHTML={{ __html: pageHtml }} />;
}
