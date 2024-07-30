import { THost } from '../../../types/offers';

type HostModuleProps = {
  hostInfo: THost;
  description: string;
}

export default function HostModule({hostInfo, description}: HostModuleProps): React.JSX.Element {
  const hostStatus = hostInfo.isPro ? (<span className="offer__user-status">Pro</span>) : null;
  return (
    <div className="offer__host">
      <h2 className="offer__host-title">Meet the host</h2>
      <div className="offer__host-user user">
        <div className="offer__avatar-wrapper offer__avatar-wrapper--pro user__avatar-wrapper">
          <img className="offer__avatar user__avatar" src={hostInfo.avatarUrl} width="74" height="74" alt="Host avatar" />
        </div>
        <span className="offer__user-name">{hostInfo.name}</span>
        {hostStatus}
      </div>
      <div className="offer__description">
        <p className="offer__text">{description}</p>
      </div>
    </div>
  );
}
