type GoodsListProps = {
  goods: string[];
}

export default function GoodsList({goods}: GoodsListProps): React.JSX.Element {
  return (
    <ul className="offer__inside-list">
      {goods.map((goodsItem) => (<li className="offer__inside-item" key={goodsItem}>{goodsItem}</li>))}
    </ul>
  );
}
