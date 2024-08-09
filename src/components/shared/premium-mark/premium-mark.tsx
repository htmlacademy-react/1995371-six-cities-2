import { PremiumMarkMode } from '../../../const/mode';
import { TPremiumMarkMode } from '../../../types/common';

type PremiumMarkProps = {
  premiumMarkViewMode?: TPremiumMarkMode;
}

export default function PremiumMark({premiumMarkViewMode = PremiumMarkMode.Card}: PremiumMarkProps): React.JSX.Element {
  return(
    <div className={`${premiumMarkViewMode}__mark`} data-testid='premium mark container'>
      <span>Premium</span>
    </div>
  );
}
