import type { NextPage } from 'next';
import dynamic from 'next/dynamic';

const BgImage = dynamic(() => import("../pages/BGImage"), {
  ssr: false
});

const Home: NextPage = () => {
  return (  
   <BgImage/>
  );
}

export default Home
