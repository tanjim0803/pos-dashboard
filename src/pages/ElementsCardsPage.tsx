import pageHtml from './elements-cards.html?raw';

export default function ElementsCardsPage() {
  return <div dangerouslySetInnerHTML={{ __html: pageHtml }} />;
}
