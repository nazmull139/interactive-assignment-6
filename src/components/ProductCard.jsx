import { useDispatch } from "react-redux";
import { addToCart } from "../features/cart";

function ProductCard({ product }) {
    const dispatch = useDispatch();

    const handleAddToCart = () => {
        // Ensuring we pass a quantity of 1 when adding from the shop view
        dispatch(addToCart({ ...product, quantity: 1 }));
    };

    return (
        <div className="group bg-white rounded-3xl border border-zinc-100 overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-zinc-200/50 hover:-translate-y-1">
            {/* Image Container */}
            <div className="relative aspect-square overflow-hidden bg-zinc-50">
                <img 
                    src={product.image} 
                    alt={product.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                
                {/* Overlay Badge (Optional: e.g. "New" or Category) */}
                <div className="absolute top-3 left-3">
                    <span className="bg-white/90 backdrop-blur-sm text-zinc-900 text-[10px] font-bold px-2.5 py-1 rounded-lg uppercase tracking-wider shadow-sm border border-zinc-100">
                        Collection
                    </span>
                </div>
            </div>

            {/* Content Container */}
            <div className="p-5">
                <div className="mb-4">
                    <h3 className="text-zinc-900 font-bold text-lg leading-tight mb-1 truncate">
                        {product.title}
                    </h3>
                    <p className="text-zinc-400 text-xs font-medium uppercase tracking-widest">
                        Available in stock
                    </p>
                </div>

                <div className="flex items-center justify-between gap-2">
                    <div className="flex flex-col">
                        <span className="text-zinc-400 text-[10px] font-bold uppercase leading-none mb-1">Price</span>
                        <span className="text-xl font-black text-zinc-900 leading-none">
                            ${product.price}
                        </span>
                    </div>

                    <button
                        onClick={handleAddToCart}
                        className="flex items-center justify-center w-12 h-12 bg-zinc-900 text-white rounded-2xl hover:bg-zinc-800 transition-all active:scale-90 shadow-lg shadow-zinc-900/10 group/btn"
                        aria-label="Add to cart"
                    >
                        <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            className="h-6 w-6 transition-transform group-hover/btn:rotate-12" 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor"
                        >
                            <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                strokeWidth={2.5} 
                                d="M12 4v16m8-8H4" 
                            />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ProductCard;