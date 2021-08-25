import moment from "moment";
import Currency from 'react-currency-formatter';
import { groupBy, isString } from "lodash";
import path from "path";

function Order({ id, amount, amountShipping, items, timestamp, images }) {
    let groupedImages;

    if (images.every((image) => !image.startsWith("["))) {

        groupedImages = Object.values(
            groupBy(images.map((image) => path.basename(image)))
        ).map((group) => [group.length, group[0]]);
        console.log(1, groupedImages);
    } else {
        // All clean here, just parse the text value into an array, because it was stringified in the firestore DB ( "[2,'imageA.jpg']"  ->  [2, 'imageA.jpg'] )
        groupedImages = [...images.map((image) => JSON.parse(image))];
        console.log(2, groupedImages);
    }

    return (
        <div className="relative border rounded-md">
            <div className="block sm:flex items-center sm:space-x-10 p-5 bg-gray-100 text-sm text-gray-600">
                <div className="mb-3 sm:mb-0">
                    <p className="font-bold text-xs">ORDER PLACED</p>
                    <p>{moment.unix(timestamp).format("DD/MM/YYYY")}</p>
                </div>

                <div>
                    <p className="text-xs font-bold">TOTAL</p>
                    <p>
                        <span className="font-bold">
                            <Currency quantity={amount} currency="USD" />
                        </span>{" "}
                        (Including{" "}
                        <Currency quantity={amountShipping} currency="USD" />{" "}
                        for "<span className="italic">Next Day Delivery</span>")
                    </p>
                </div>

                <p className="absolute top-3 right-3 sm:static text-sm whitespace-nowrap sm:text-xl self-end flex-1 text-right text-blue-500">
                    {items.reduce((total, item) => total + item.quantity, 0)}{" "}
                    items
                </p>

                <p className="w-100 sm:absolute top-3 right-2 sm:w-72 truncate text-xs whitespace-nowrap">
                    ORDER #{id}
                </p>
            </div>

            <div className="p-5 sm:p-10">
                <div className="flex space-x-6 overflow-x-auto">
                    {groupedImages.map((group) => (
                        <div className="relative" key={group[1]}>
                            <img
                                src={`https://fakestoreapi.com/img/${group[1]}`}
                                alt=""
                                className="h-20 object-contain sm:h-32"
                            />
                            {group[0] > 1 && (
                                <div className="absolute bottom-1 right-1  rounded shadow font-bold bg-yellow-400 text-black text-1xl text-center">
                                    &times; {group[0]}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Order;
