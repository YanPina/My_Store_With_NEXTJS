import { StarIcon } from '@heroicons/react/solid';
import Image from "next/image";
import Currency from 'react-currency-formatter';
import { useDispatch } from 'react-redux';
import { addToCart, removeFromCart } from '../slices/cartSlice';

function CheckoutProduct({id,title,rating ,price, description, category, image}) {
    
    const dispatch = useDispatch();

    const addItemToCart = () => {
        const product = {id,title,rating ,price, description, category, image};
        dispatch(addToCart(product));
    };

    const removeItemFromCart = () => {
        dispatch(removeFromCart({ id }));
    };
    return (
        
        <div className='grid grid-cols-5'>
            <Image src={image} height={200} width={200} objectFit='contain' alt=''/>   
        
            <div className='col-span-3 mx-5'>
                <p>{title}</p>

                <div className='flex'>
                    {Array(rating).fill().map((_,i) => (<StarIcon className='h-5 text-yellow-500'/>))}
                </div>

                <p className='text-xs my-2 line-clamp-3' >{description}</p>
                <Currency quantity={price} currency='USD' />
            </div>

            <div className='flex flex-col space-y-2 my-auto justify-self-end'>
                <button onClick={addItemToCart} className='buttom'>Add To Cart</button>
                <button onClick={removeItemFromCart} className='buttom'>Remove from Cart</button>
            </div>
        </div>
    );
}

export default CheckoutProduct
