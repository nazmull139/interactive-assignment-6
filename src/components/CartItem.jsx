import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { modifyQuantityOfAnItem, removeItemFromCart } from "../features/cart";

function CartItem({ item }) {
    // Sync local state with Redux item quantity
    const [itemQuantity, setItemQuantity] = useState(item.quantity);
    const dispatch = useDispatch();

    useEffect(() => {
        setItemQuantity(item.quantity);
    }, [item.quantity]);

    const handleQuantityChange = (newQty) => {
        if (newQty < 1) {
            alert("Quantity cannot be less than 1");
            return;
        }
        dispatch(
            modifyQuantityOfAnItem({
                id: item.id,
                quantity: newQty,
            })
        );
        setItemQuantity(newQty);
    };

    return (
        <div className="group bg-white p-4 sm:p-6 rounded-2xl border border-zinc-200 hover:border-zinc-300 transition-all hover:shadow-md">
            <div className="grid grid-cols-12 gap-4 items-center">
                
                {/* Product Image & Title */}
                <div className="col-span-12 md:col-span-6 flex items-center gap-4">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0 bg-zinc-100 rounded-xl overflow-hidden border border-zinc-100">
                        <img
                            src={item.image}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            alt={item.title}
                        />
                    </div>
                    <div className="flex flex-col">
                        <h4 className="font-bold text-zinc-900 text-sm sm:text-base leading-tight">
                            {item.title}
                        </h4>
                        <p className="text-zinc-400 text-xs mt-1 uppercase tracking-wider font-medium">
                            Unit Price: ${item.price}
                        </p>
                    </div>
                </div>

                {/* Price (Hidden on mobile, shown in subtotal) */}
                <div className="hidden md:block md:col-span-2 text-center text-zinc-600 font-medium">
                    ${item.price}
                </div>

                {/* Quantity Stepper */}
                <div className="col-span-7 md:col-span-2 flex justify-start md:justify-center">
                    <div className="flex items-center border border-zinc-200 rounded-lg overflow-hidden bg-zinc-50">
                        <button
                            type="button"
                            className="w-8 h-8 flex items-center justify-center hover:bg-zinc-200 transition-colors text-zinc-600"
                            onClick={() => handleQuantityChange(itemQuantity - 1)}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M20 12H4" />
                            </svg>
                        </button>
                        
                        <input
                            type="number"
                            className="w-10 text-center bg-transparent text-sm font-bold text-zinc-800 focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                            value={itemQuantity}
                            onChange={(e) => handleQuantityChange(Number(e.target.value))}
                        />

                        <button
                            type="button"
                            className="w-8 h-8 flex items-center justify-center hover:bg-zinc-200 transition-colors text-zinc-600"
                            onClick={() => handleQuantityChange(itemQuantity + 1)}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Subtotal & Delete */}
                <div className="col-span-5 md:col-span-2 flex items-center justify-end gap-4">
                    <div className="text-right">
                        <p className="text-sm font-bold text-zinc-900">
                            ${(item.price * item.quantity).toFixed(2)}
                        </p>
                    </div>
                    
                    <button
                        onClick={() => dispatch(removeItemFromCart(item.id))}
                        className="p-2 text-zinc-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                        aria-label="Remove item"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                    </button>
                </div>

            </div>
        </div>
    );
}

export default CartItem;