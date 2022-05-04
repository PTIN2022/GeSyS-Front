import { AppProps } from "next/app";
const BasicLandingUser = (props: AppProps) => {

  const { Component, pageProps } = props;

  return (
    <div>
        <Component {...pageProps} />
    </div>
  )
}

export default BasicLandingUser;