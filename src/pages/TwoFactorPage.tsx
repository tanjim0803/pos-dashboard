import pageHtml from './two-factor.html?raw';

export default function TwoFactorPage() {
  return <div dangerouslySetInnerHTML={{ __html: pageHtml }} />;
}
