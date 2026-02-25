import { useDispatch, useSelector } from "react-redux";
import CartItem from "../components/CartItem";
import { clearCart } from "../features/cart";

const Cart = () => {
    const cart = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

    return (
        <div className="min-h-screen bg-zinc-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-end sm:items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-zinc-900 tracking-tight">Shopping Cart</h1>
                        <p className="text-zinc-500 mt-1">Review your items before checkout</p>
                    </div>
                    {cart.length > 0 && (
                        <button
                            onClick={() => dispatch(clearCart())}
                            className="text-sm font-semibold text-red-600 hover:text-red-700 transition-colors flex items-center gap-2 group"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transition-transform group-hover:rotate-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                            Clear Cart
                        </button>
                    )}
                </div>

                {cart.length === 0 ? (
                    <div className="bg-white rounded-2xl border border-zinc-200 border-dashed p-20 text-center">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-zinc-100 text-zinc-400 mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold text-zinc-900">Your cart is empty</h3>
                        <p className="text-zinc-500 mt-2">Looks like you haven't added anything yet.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Product List */}
                        <div className="lg:col-span-2 space-y-4">
                            {/* Header Row (Desktop Only) */}
                            <div className="hidden md:grid grid-cols-12 px-6 text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2">
                                <div className="col-span-6">Product</div>
                                <div className="col-span-2 text-center">Price</div>
                                <div className="col-span-2 text-center">Qty</div>
                                <div className="col-span-2 text-right">Subtotal</div>
                            </div>
                            
                            <div className="space-y-3">
                                {cart.map((item) => (
                                    <CartItem item={item} key={item.id} />
                                ))}
                            </div>
                        </div>

                        {/* Summary Sidebar */}
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-2xl border border-zinc-200 p-6 shadow-sm sticky top-8">
                                <h3 className="text-lg font-bold text-zinc-900 mb-6">Order Summary</h3>
                                
                                <div className="space-y-4">
                                    <div className="flex justify-between text-zinc-600">
                                        <span>Subtotal</span>
                                        <span className="font-medium text-zinc-900">${totalPrice.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-zinc-600">
                                        <span>Shipping</span>
                                        <span className="text-green-600 font-medium">Free</span>
                                    </div>
                                    
                                    <hr className="border-zinc-100 my-4" />
                                    
                                    <div className="flex justify-between items-baseline">
                                        <span className="text-base font-bold text-zinc-900">Total</span>
                                        <div className="text-right">
                                            <span className="text-2xl font-black text-zinc-900 tracking-tight">
                                                ${totalPrice.toFixed(2)}
                                            </span>
                                            <p className="text-[10px] text-zinc-400 uppercase mt-1">Including VAT</p>
                                        </div>
                                    </div>

                                    <button className="w-full bg-zinc-900 text-white py-4 rounded-xl font-bold hover:bg-zinc-800 transition-all shadow-lg shadow-zinc-900/10 active:scale-[0.98] mt-4">
                                        Proceed to Checkout
                                    </button>
                                    
                                    <p className="text-center text-xs text-zinc-400 mt-4">
                                        Secure Checkout • Easy Returns
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Cart;