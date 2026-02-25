import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

import { useUpdateProductMutation } from "../features/api/apiSlice";
import { db } from "../firebase";
import { uploadToCloudinary } from "../utils/cloudinary";

const EditProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [updateProduct] = useUpdateProductMutation();

    const [loading, setLoading] = useState(true);
    const [productData, setProductData] = useState(null);
    const [categories, setCategories] = useState([]);

    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [categoryId, setCategoryId] = useState("");

    const [keepExistingImage, setKeepExistingImage] = useState(true);
    const [newImageFile, setNewImageFile] = useState(null);
    const [newImagePreview, setNewImagePreview] = useState(null);

    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const docRef = doc(db, "products", id);
                const docSnap = await getDoc(docRef);

                if (!docSnap.exists()) {
                    alert("Product not found");
                    navigate("/shop");
                    return;
                }

                const data = docSnap.data();
                setProductData(data);
                setTitle(data.title);
                setPrice(data.price);
                setCategoryId(data.categoryId);

                const catSnap = await getDocs(collection(db, "categories"));
                const catData = catSnap.docs.map((d) => ({
                    id: d.id,
                    ...d.data(),
                }));
                setCategories(catData);
            } catch (error) {
                console.error(error);
                alert("Failed to fetch product");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id, navigate]);

    const handleNewImage = (file) => {
        if (!file) return;
        setNewImageFile(file);
        setNewImagePreview(URL.createObjectURL(file));
        setKeepExistingImage(false);
    };

    const removeNewImage = () => {
        setNewImageFile(null);
        setNewImagePreview(null);
        setKeepExistingImage(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            let image = productData.image;
            if (newImageFile && !keepExistingImage) {
                const uploaded = await uploadToCloudinary(newImageFile);
                image = uploaded.url;
            }

            await updateProduct({
                id,
                updates: { title, price, categoryId, image },
            });

            alert("Product updated successfully!");
            navigate("/");
        } catch (error) {
            console.error(error);
            alert("Failed to update product");
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-zinc-50">
                <div className="animate-pulse text-zinc-500 font-medium tracking-widest uppercase">
                    Loading Product...
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-zinc-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h2 className="text-3xl font-bold text-zinc-900 tracking-tight">Edit Product</h2>
                    <p className="mt-2 text-sm text-zinc-500">
                        Update your product information and media assets.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8 bg-white p-8 rounded-2xl border border-zinc-200 shadow-sm">
                    
                    {/* Input Group */}
                    <div className="grid grid-cols-1 gap-6">
                        {/* Title */}
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-semibold text-zinc-700">Product Title</label>
                            <input
                                type="text"
                                className="w-full px-4 py-2.5 rounded-lg border border-zinc-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all bg-zinc-50/50 disabled:opacity-50"
                                placeholder="Enter product name"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                                disabled={submitting}
                            />
                        </div>

                        {/* Price & Category Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-semibold text-zinc-700">Price ($)</label>
                                <input
                                    type="number"
                                    min="0"
                                    className="w-full px-4 py-2.5 rounded-lg border border-zinc-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all bg-zinc-50/50 disabled:opacity-50"
                                    value={price}
                                    onChange={(e) => setPrice(Number(e.target.value))}
                                    required
                                    disabled={submitting}
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-semibold text-zinc-700">Category</label>
                                <select
                                    className="w-full px-4 py-2.5 rounded-lg border border-zinc-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all bg-zinc-50/50 disabled:opacity-50 appearance-none"
                                    value={categoryId}
                                    onChange={(e) => setCategoryId(e.target.value)}
                                    required
                                    disabled={submitting}
                                >
                                    <option value="">Select a category</option>
                                    {categories.map((cat) => (
                                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    <hr className="border-zinc-100" />

                    {/* Media Section */}
                    <div className="space-y-4">
                        <label className="text-sm font-semibold text-zinc-700 block">Product Media</label>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {/* Current Image */}
                            <div className="relative group">
                                <p className="text-xs text-zinc-400 mb-2 uppercase tracking-wider font-bold">Current Image</p>
                                <div className="aspect-square rounded-xl overflow-hidden border border-zinc-200 bg-zinc-100">
                                    <img
                                        src={productData.image}
                                        alt="Current"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <label className="mt-3 flex items-center gap-2 cursor-pointer group">
                                    <input
                                        type="checkbox"
                                        className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 border-zinc-300 transition-all"
                                        checked={keepExistingImage}
                                        onChange={() => setKeepExistingImage((p) => !p)}
                                        disabled={submitting || !!newImageFile}
                                    />
                                    <span className="text-sm text-zinc-600 group-hover:text-zinc-900 transition-colors">Keep this image</span>
                                </label>
                            </div>

                            {/* New Upload Area */}
                            {!keepExistingImage && (
                                <div className="animate-in fade-in slide-in-from-bottom-2">
                                    <p className="text-xs text-zinc-400 mb-2 uppercase tracking-wider font-bold">Upload New</p>
                                    {!newImagePreview ? (
                                        <div className="relative h-full">
                                            <input
                                                type="file"
                                                accept="image/*"
                                                className="absolute inset-0 opacity-0 cursor-pointer z-10"
                                                onChange={(e) => handleNewImage(e.target.files[0])}
                                                disabled={submitting}
                                            />
                                            <div className="h-[200px] border-2 border-dashed border-zinc-300 rounded-xl flex flex-col items-center justify-center bg-zinc-50 hover:bg-zinc-100 transition-colors">
                                                <span className="text-zinc-400 text-sm">Click to browse</span>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="relative">
                                            <div className="aspect-square rounded-xl overflow-hidden border border-zinc-200">
                                                <img src={newImagePreview} alt="Preview" className="w-full h-full object-cover" />
                                            </div>
                                            <button
                                                type="button"
                                                onClick={removeNewImage}
                                                className="absolute -top-2 -right-2 bg-red-500 text-white p-1.5 rounded-full hover:bg-red-600 shadow-lg transition-transform active:scale-90"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                            </button>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="pt-6 flex flex-col sm:flex-row gap-3">
                        <button
                            type="submit"
                            disabled={submitting}
                            className="flex-1 bg-zinc-900 text-white py-3 px-6 rounded-xl font-semibold hover:bg-zinc-800 disabled:bg-zinc-400 transition-all shadow-md active:scale-[0.98] flex justify-center items-center"
                        >
                            {submitting ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Updating...
                                </>
                            ) : "Update Product"}
                        </button>
                        <button
                            type="button"
                            onClick={() => navigate("/")}
                            className="flex-1 bg-white text-zinc-700 py-3 px-6 rounded-xl font-semibold border border-zinc-300 hover:bg-zinc-50 transition-all"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditProduct;