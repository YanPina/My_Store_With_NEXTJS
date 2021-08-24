import Head from 'next/head';
import Header from "../components/Header";
import Image from 'next/image';
import { useSelector } from 'react-redux';
import { selectItems, selectTotal } from '../slices/cartSlice';
import { CSSTransition, TransitionGroup } from "react-transition-group";
import CheckoutProduct from '../components/CheckoutProduct';
import Currency from 'react-currency-formatter';
import { useSession } from 'next-auth/client';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import { groupBy } from "lodash";
const stripePromise = loadStripe(process.env.STRIPE_SECRET_KEY);

function Checkout() {

    const items = useSelector(selectItems);
    const total = useSelector(selectTotal);
    const [session] = useSession();

    const createCheckoutSession = async () => {
        const stripe = await stripePromise;

        const checkoutSession = await axios.post('/api/create-checkout-session',{
            items: items,
            email: session.user.email
        });

        //Redireciona o cliente para o checkout (Stripe)
        const result = await stripe.redirectToCheckout({
            sessionId: checkoutSession.data.id,
        });

        if (result.error){

            alert(result.error.message);
        }
    };

    const groupedItems = Object.values(groupBy(items, 'id'));
    return (
        <div className='bg-gray-100' >
            <Header />

            <Head>
                <title>Checkout</title>
            </Head>

            <main className='lg:flex max-w-screen-2xl mx-auto' >
                <div className='flex-grow m5 shadow-sm' >
                    <Image 
                        src='/Banner/banner6.jpg'
                        width={1020}
                        height={250}
                        objectFit='contain'
                        alt=''
                    />

                    <div className='flex flex-col p-5 space-y-50 bg-white ' >
                        <h1 className={`text-3xl ${
                                items.length > 0 ? "border-b pb-4" : "pb-2"
                            }`}>
                            {items.length === 0
                                ? "Your Cart is empty."
                                : "Shopping Basket"}
                        </h1>


                        <TransitionGroup>
                            {groupedItems.map((group, i) => (
                                <CSSTransition
                                    key={group[0].image}
                                    timeout={500}
                                    classNames="item">
                                    <CheckoutProduct
                                        id={group[0].id}
                                        title={group[0].title}
                                        rating={group[0].rating}
                                        price={group[0].price}
                                        description={group[0].description}
                                        category={group[0].category}
                                        image={group[0].image}
                                        quantity={group.length}
                                    />
                                </CSSTransition>
                            ))}
                        </TransitionGroup>
                    </div>
                </div>

                {/* Right */}
                <CSSTransition
                    in={items.length > 0}
                    timeout={300}
                    classNames="disappear"
                    unmountOnExit>
                    <div className="flex flex-col bg-white p-10 shadow-md">
                        <h2 className="whitespace-nowrap">
                            Subtotal ({items.length} items):{" "}
                            <span className="font-bold">
                                <Currency quantity={total} currency="USD" />
                            </span>
                        </h2>

                        <button
                            role="link"
                            onClick={createCheckoutSession}
                            disabled={!session}
                            className={`button mt-2 ${
                                !session &&
                                "from-gray-300 to-gray-500 border-gray-200 text-gray-300 cursor-not-allowed hover:from-gray-300"
                            }`}>
                            {!session
                                ? "Sign in to checkout"
                                : "Proceed to checkout"}
                        </button>
                    </div>
                </CSSTransition>
            </main>
        </div>
    )
}

export default Checkout;
