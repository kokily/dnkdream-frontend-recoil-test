import { AppProps } from 'next/app';
import { RecoilRoot } from 'recoil';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-quill/dist/quill.snow.css';
import { meState } from '../libs/store/auth';
import { Notices } from '../libs/store/notices';
import { Notice } from '../libs/store/notice';
import { TagNotices } from '../libs/store/tagNotices';

// Recoil SSR config
const allAtoms = {
  auth: meState,
  notices: Notices,
  notice: Notice,
  tagNotices: TagNotices,
};

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
        <ToastContainer position="top-center" draggable={false} />
      </RecoilRoot>
    </>
  );
}

export default App;
