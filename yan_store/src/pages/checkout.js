import Head from 'next/head';
import Header from "../components/Header";
import Image from 'next/image';
function Checkout() {
    return (

        <div className='bg-gray-100' >
            <Head>
                <title>Yan Store</title>
            </Head>

            <Header />

            <main className='lg:flex max-w-screen-2xl mx-auto' >
                <div className='flex-grow m5 shadow-sm' >
                    <img 
                        src='Banner/banner6.jpg'
                        width={1020}
                        height={250}
                        objectFit='contain'
                    />

                    <div className='flex flex-col p-5 space-y-10 bg-white ' >
                        <h1 className='text-3xl border-b pb-4' >Your Shopping Cart</h1>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Checkout
