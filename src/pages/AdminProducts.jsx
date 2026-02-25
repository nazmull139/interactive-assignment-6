import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { db } from "../firebase";

const AdminProductList = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProductsAndCategories = async () => {
            setLoading(true);
            try {
                const prodSnap = await getDocs(collection(db, "products"));
                const prodData = prodSnap.docs.map((d) => ({
                    id: d.id,
                    ...d.data(),
                }));
                setProducts(prodData);

                const catSnap = await getDocs(collection(db, "categories"));
                const catData = catSnap.docs.map((d) => ({
                    id: d.id,
                    ...d.data(),
                }));
                setCategories(catData);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchProductsAndCategories();
    }, []);

    const getCategoryName = (categoryId) => {
        const cat = categories.find((c) => c.id === categoryId);
        return cat ? cat.name : "Uncategorized";
    };

    if (loading) return (
        <div className="flex justify-center items-center min-h-[400px]">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-zinc-900"></div>
        </div>
    );

    return (
        <div className="p-6 lg:p-10 bg-white rounded-3xl border border-zinc-200 shadow-sm">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-zinc-900 tracking-tight">Product Inventory</h2>
                    <p className="text-zinc-500 text-sm">Manage your store's catalog and stock levels</p>
                </div>
                <button 
                    onClick={() => navigate("/add-product")}
                    className="bg-zinc-900 text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-zinc-800 transition-all flex items-center gap-2"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Add New Product
                </button>
            </div>

            {/* Table Section */}
            <div className="overflow-x-auto">
                <table className="w-full text-left border-separate border-spacing-y-2">
                    <thead>
                        <tr className="text-zinc-400 text-xs uppercase tracking-widest font-bold">
                            <th className="px-4 py-3">Product</th>
                            <th className="px-4 py-3">Category</th>
                            <th className="px-4 py-3">Price</th>
                            <th className="px-4 py-3">Status</th>
                            <th className="px-4 py-3 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((prod) => (
                            <tr key={prod.id} className="group hover:bg-zinc-50 transition-colors">
                                {/* Product Info */}
                                <td className="px-4 py-3 border-t border-b border-l border-zinc-100 rounded-l-2xl">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-lg overflow-hidden bg-zinc-100 flex-shrink-0 border border-zinc-200">
                                            <img src={prod.image} alt="" className="w-full h-full object-cover" />
                                        </div>
                                        <span className="font-bold text-zinc-900 text-sm">{prod.title}</span>
                                    </div>
                                </td>

                                {/* Category */}
                                <td className="px-4 py-3 border-t border-b border-zinc-100">
                                    <span className="text-sm text-zinc-600 bg-zinc-100 px-2.5 py-1 rounded-md font-medium">
                                        {getCategoryName(prod.categoryId)}
                                    </span>
                                </td>

                                {/* Price */}
                                <td className="px-4 py-3 border-t border-b border-zinc-100">
                                    <span className="font-bold text-zinc-900">${prod.price}</span>
                                </td>

                                {/* Status Badge (Mockup logic) */}
                                <td className="px-4 py-3 border-t border-b border-zinc-100">
                                    <div className="flex items-center gap-1.5 text-green-600">
                                        <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                                        <span className="text-[10px] font-bold uppercase tracking-wider">In Stock</span>
                                    </div>
                                </td>

                                {/* Actions */}
                                <td className="px-4 py-3 border-t border-b border-r border-zinc-100 rounded-r-2xl text-right">
                                    <button
                                        onClick={() => navigate(`/admin/edit-product/${prod.id}`)}
                                        className="inline-flex items-center justify-center w-9 h-9 text-zinc-400 hover:text-zinc-900 hover:bg-zinc-200 rounded-xl transition-all"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                        </svg>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {products.length === 0 && (
                <div className="text-center py-20 border-2 border-dashed border-zinc-100 rounded-3xl mt-4">
                    <p className="text-zinc-400 font-medium">No products found in your inventory.</p>
                </div>
            )}
        </div>
    );
};

export default AdminProductList;