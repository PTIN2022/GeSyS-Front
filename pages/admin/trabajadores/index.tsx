import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'

const ListaTrabajadores: NextPage = () => {
  return (
    <>
    <Head>
      <title>Gesys - Trabajadores</title>
    </Head>
    
    <h1>Trabajadores</h1>
    <Link href="/">Home</Link>
    </>
  )
}

export default ListaTrabajadores
