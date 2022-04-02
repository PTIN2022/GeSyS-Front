import type { NextPage } from 'next'
import Link from 'next/link';

const Home: NextPage = () => {
    return (
        <>
        
        <h1>
        Soporte técnico
        </h1>
        
        <Link href="/">
            <a>Índice</a>
            </Link>

        <br></br>
        
        <Link href="/responder">
        <a>Responder</a>
        </Link>
        </>
    )
    //test
}

export default Home