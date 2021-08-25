import Image from 'next/image';
import { useState } from 'react';
import { StarIcon } from '@heroicons/react/solid';
import Currency from 'react-currency-formatter';
import { useDispatch } from 'react-redux';
import { addToCart } from '../slices/cartSlice';
import { toast } from "react-toastify";

const MAX_RATING = 5;
const MIN_RATING = 1;

function Product({ id, title, price, description, category, image }) {
    const dispatch = useDispatch();

    const [rating] = useState(
        Math.floor(Math.random() * (MAX_RATING - MIN_RATING + 1) + MIN_RATING)
    );

    const [hasPrime] = useState(Math.random() < 0.5);

    function addItemToCart() {
        const product = {
            id,
            title,
            price,
            description,
            category,
            image,
            rating,
        };

        // Sending the product via an action to the redux store (= basket "slice")
        dispatch(addToCart(product));

        toast.success(
            <>
                <span className="font-bold">Added to Cart!</span>
                <br />
                {product.title.slice(0, 30)}
                {product.title.length > 30 ? "…" : ""}
            </>,
            {
                position: "top-right",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                draggablePercent: 20,
                progress: undefined,
            }
        );
    }

    return (
        <div className="relative flex flex-col m-5 bg-white z-30 p-10 growing-hover">
            <p className="absolute top-2 right-3 text-sm italic text-gray-400">
                {category}
            </p>
            <Image src={image} width={200} height={200} objectFit="contain" />
            <h4 className="my-3">{title}</h4>
            <div className="flex">
                {Array(rating)
                    .fill()
                    .map((_, i) => (
                        <StarIcon key={i} className="h-5 text-yellow-500" />
                    ))}
            </div>
            <p className="text-xs my-2 line-clamp-2">{description}</p>
            <div className="mb-5">
                <Currency quantity={price} currency="USD" />
            </div>

            <button onClick={addItemToCart} className="mt-auto button">
                Add to basket
            </button>
        </div>
    );
}

export default Product;