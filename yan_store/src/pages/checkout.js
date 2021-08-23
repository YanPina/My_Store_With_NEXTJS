import Head from 'next/head';
import Header from "../components/Header";
import Image from 'next/image';
import { useSelector } from 'react-redux';
import { selectItems } from '../slices/cartSlice';
import CheckoutProduct from '../components/CheckoutProduct';
import Currency from 'react-currency-formatter';
import { useSession } from 'next-auth/client';

function Checkout() {

    const items = useSelector(selectItems)
    const [session] = useSession();

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
                        <h1 className='text-3xl border-b pb-4' >
                            {items.length === 0 ? 'Your Cart is empty.' : 'Shopping Cart'}
                        </h1>

                        {items.map((item, i) => (
                            <CheckoutProduct 
                                key={i}
                                id={item.id}
                                title={item.title}
                                rating={item.rating}
                                price={item.price}
                                description={item.description}
                                category={item.category}
                                image={item.image}
                            />
                        ))}
                    </div>
                </div>

                <div>
                    {items.length > 0 && (
                        <>
                            <h2 className='whitespace-nowrap' >Subtotal ({items.length}items:)
                            <span className='font-bold' >
                                <Currency quantity={total} currency='USD' />
                            </span>
                            </h2>

                            <button className={`buttom mt-2 ${!session && 'from-gray-300 to-gray-500 border-gray'}`} >
                                {!session ? 'Sign In to checkout' : 'Proceed to checkout'}
                            </button>
                        </>
                    )}
                </div>
            </main>
        </div>
    )
}

export default Checkout
