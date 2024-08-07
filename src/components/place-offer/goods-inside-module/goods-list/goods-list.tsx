type GoodsListProps = {
  goods: string[];
}

export default function GoodsList({goods}: GoodsListProps): React.JSX.Element {
  return (
    <ul className="offer__inside-list" data-testid='goods list'>
      {goods.map((goodsItem) => (<li className="offer__inside-item" key={goodsItem} data-testid='good item'>{goodsItem}</li>))}
    </ul>
  );
}
