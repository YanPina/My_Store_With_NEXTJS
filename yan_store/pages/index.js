import Head from 'next/head';
import Header from '../components/Header';
import Banner from '../components/Banner';

export default function Home() {
  return (
    <div>

      <Head>
        <title>Yan Store</title>
      </Head>

      <Header/>
      <main className='max-w-screen-2xl mx-auto'>
        {/* Banner */}
        <Banner/>
        {/* ProductFeed */}
      </main>
    </div>
  );
}