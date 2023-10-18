import "@/styles/globals.css";
import ar from "../i18n/ar.json";
import en from "../i18n/en.json";
import { useRouter } from "next/router";
import { CookiesProvider } from "react-cookie";
import { IntlProvider } from "react-intl";
import { Provider } from "react-redux";
import store from "@/Redux/Store";
import { ToastContainer } from "react-toastify";
import NextProgress from "nextjs-progressbar";

const message = {
  en,
  ar,
};

export default function App({ Component, pageProps }) {
  return (
    <CookiesProvider>
      <Provider store={store}>
        <>
          <ToastContainer className="ToastContainer" />
          <div className={``}>
            <div className="flex || flex-col || min-h-full">
              <NextProgress color="#42a5f5" />
              <div className="flex-1">
                <Component {...pageProps} />
              </div>
            </div>
          </div>
        </>
      </Provider>
    </CookiesProvider>
  );
}
// export const getServerSideProps = ({ req, res }) => {
//   console.log(req)
//   return {
//     props: {
//       token: req.cookies.token,
//     },
//   };
// };
{
  /*
acc:64ff21df26f55d3c2d1dce3d
mer:64ff220b26f55d3c2d1dce3f
menu:64ff22ec26f55d3c2d1dce44
br:64ff235026f55d3c2d1dce50
*/
}
