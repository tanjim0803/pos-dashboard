import pageHtml from './orders.html?raw';

export default function OrdersPage() {
  return <div dangerouslySetInnerHTML={{ __html: pageHtml }} />;
}
