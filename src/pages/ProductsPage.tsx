import pageHtml from './products.html?raw';

export default function ProductsPage() {
  return <div dangerouslySetInnerHTML={{ __html: pageHtml }} />;
}
