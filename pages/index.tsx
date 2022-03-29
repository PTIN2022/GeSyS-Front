import type { NextPage } from 'next'
import Link from 'next/link';

const Home: NextPage = () => {
  return (
    <>
    
    <h1>
      Welcome to GeSyS
    </h1>
    
    <Link href="/soporte-tecnico">
          <a>Soporte técnico</a>
        </Link>
    </>
  )
}

export default Home
