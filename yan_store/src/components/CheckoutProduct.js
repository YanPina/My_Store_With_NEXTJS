import { MinusSmIcon, PlusIcon, StarIcon } from '@heroicons/react/solid';
import Image from "next/image";
import Currency from 'react-currency-formatter';
import { useDispatch } from 'react-redux';
import { addToCart, removeGroupedFromCart,removeFromCart } from '../slices/cartSlice';

function CheckoutProduct(props) {
    const dispatch = useDispatch();

    const id = props.id;
    const title = props.title;
    const rating = props.rating;
    const price = props.price;
    const description = props.description;
    const category = props.category;
    const image = props.image;
    const quantity = props.quantity;

    const total = price * quantity;

    function addItemToCart() {
        const product = {
            id,
            title,
            price,
            description,
            category,
            image,
            rating,
            hasPrime,
        };

        //Enviando o produto por meio de uma ação redux para a loja (= cart "slice")
        dispatch(addToCart(product));
    }

    function removeItemFromCart() {
        dispatch(removeFromCart({ id }));
    }

    function removeGroupFromCart() {
        dispatch(removeGroupedFromCart({ id }));
    }

    return (
        <div className="block py-4 sm:grid sm:grid-cols-5 my-16 sm:my-3">
            <div className="text-center sm:text-left">
                <Image
                    src={image}
                    width={200}
                    height={200}
                    objectFit="contain"
                />
            </div>

            {/* Middle */}
            <div className="col-span-3 mx-5 mb-4 sm:mb-0">
                <p className="my-3">{title}</p>
                <div className="flex">
                    {Array(rating)
                        .fill()
                        .map((_, i) => (
                            <StarIcon key={i} className="h-5 text-yellow-500" />
                        ))}
                </div>
                <p className="text-xs my-2 line-clamp-3">{description}</p>
                {quantity} × <Currency quantity={price} currency="USD" /> ={" "}
                <span className="font-bold">
                    <Currency quantity={total} currency="USD" />
                </span>
            </div>

            {/* Buttons on the right of the products */}
            <div className="flex flex-col space-y-2 my-auto justify-self-end">
                <div className="flex justify-between xs:justify-start">
                    <button
                        className="button sm:p-1"
                        onClick={removeItemFromCart}>
                        <MinusSmIcon className="h-5 text-black" />
                    </button>
                    <div className="p-2 whitespace-normal sm:p-1 sm:whitespace-nowrap">
                        Quantity: <span className="font-bold">{quantity}</span>
                    </div>
                    <button className="button sm:p-1" onClick={addItemToCart}>
                        <PlusIcon className="h-5 text-black" />
                    </button>
                </div>
                <button className="button" onClick={removeGroupFromCart}>
                    Remove from Cart
                </button>
            </div>
        </div>
    );
}

export default CheckoutProduct;
