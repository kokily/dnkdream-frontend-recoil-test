import { AppProps } from 'next/app';
import { RecoilRoot } from 'recoil';

// Recoil SSR config
const allAtoms = {};

const initRecoilState =
  (initialState) =>
  ({ set }) =>
    Object.keys(initialState).map((key) => {
      const value = initialState[key];
      const atom = allAtoms[key];

      set(atom, value);
    });

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <RecoilRoot initializeState={initRecoilState({})}>
        <Component {...pageProps} />
      </RecoilRoot>
    </>
  );
}

export default App;
