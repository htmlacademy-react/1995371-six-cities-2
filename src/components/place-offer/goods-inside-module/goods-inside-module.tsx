import GoodsList from './goods-list/goods-list';

type GoodsInsideModuleProps = {
  goods: string[];
}

export default function GoodsInsideModule({goods}: GoodsInsideModuleProps): React.JSX.Element {
  return (
    <div className="offer__inside">
      <h2 className="offer__inside-title">What&apos;s inside</h2>
      <GoodsList goods={goods}/>
    </div>
  );
}
