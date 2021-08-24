import Image from 'next/image'
import { useState } from 'react';
import { StarIcon } from '@heroicons/react/solid';
import Currency from 'react-currency-formatter';
import { useDispatch } from 'react-redux';
import { addToCart } from '../slices/cartSlice';

const MAX_RATING = 5;
const MIN_RATING = 1;

function Product({id, title, price, description, category, image}) {

    const [rating] = useState(
        Math.floor(Math.random() * (MAX_RATING - MIN_RATING + 1)) + MIN_RATING);

    const dispatch = useDispatch();

    const addItemToCart = () => {
        const product = {id, title, price, description, category, image};

        //Adiciona o produto no carrinho
        dispatch(addToCart(product))
    };

        
    return (
        <div className='relative flex flex-col m-5 bg-white z-30 p-10 '>
            <p className= 'absolute top-2 right-2 text-xs italic text-gray-400'>{category}</p>

            <Image src={image} height={200} width={200} objectFit='contain' alt=''/>
        
            <h4 className='my-3' >{title}</h4>

            <div className='flex'>
                {Array(rating)
                .fill()
                .map((_,i) => (
                    <StarIcon className='h-5 text-yellow-500' />
                ))}
            </div>
            
            <p className='text-xs my-2 line-clamp-2'>{description}</p>

            <div>
                <Currency quantity={price} currency='USD' />
            </div>

            <button onClick={addItemToCart} className='mt-auto buttom'>Add to Cart</button>
        </div>
    );
}

export default Product
