import { AppProps } from "next/app";
import { MantineProvider} from "@mantine/core";
const BasicLandingUser = (props: AppProps) => {

  const { Component, pageProps } = props;

  return (
    <div>
      <MantineProvider
        theme={{
          headings:{
            sizes: {
              h1: { fontSize: 55 },
              h3: { fontSize: 30 },
              h6: { fontSize: 12 },
            },
          } 
        }}    
      >
        <Component {...pageProps} />
      </MantineProvider>
    </div>
  )
}

export default BasicLandingUser;