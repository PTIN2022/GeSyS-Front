import type { NextPage } from 'next'
import dynamic from 'next/dynamic'

const AdminHome: NextPage = () => {
  // Dynamic import becuase of server side rendering
  const MapWithNoSSR = dynamic(() => import('../../components/MapElements/Map'), { ssr: false });

  return (
    <MapWithNoSSR />
  )
}

export default AdminHome
