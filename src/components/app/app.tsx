import MainScreen from '../../pages/main-screen/main-screen';

type AppProps = {
  offersAmount: number;
}

export default function App({offersAmount}: AppProps): React.JSX.Element {
  return (
    <MainScreen offersAmount={offersAmount} />
  );
}
