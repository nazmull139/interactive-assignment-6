import { useState } from "react";
import { useNavigate } from "react-router";
import { useAddProductMutation, useGetCategoriesQuery } from "../features/api/apiSlice";

const AddProductForm = () => {
    const [product, setProduct] = useState({
        title: "",
        price: "",
        image: "",
        categoryId: "",
    });
    const [isUploading, setIsUploading] = useState(false);
    
    const { data: categories = [] } = useGetCategoriesQuery();
    const navigate = useNavigate();
    const [addProduct, { isLoading: isSaving }] = useAddProductMutation();

    const handleChange = (e) => {
        setProduct({
            ...product,
            [e.target.name]: e.target.name === "price" ? Number(e.target.value) : e.target.value,
        });
    };

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setIsUploading(true);
        const data = new FormData();
        data.append("file", file);
        data.append("cloud_name", "dekucno3g");
        data.append("upload_preset", "6th-assignment");

        try {
            const res = await fetch(
                `https://api.cloudinary.com/v1_1/dekucno3g/image/upload`,
                { method: "POST", body: data }
            );
            const result = await res.json();
            setProduct({ ...product, image: result.secure_url });
        } catch (error) {
            console.error("Upload failed", error);
            alert("Image upload failed");
        } finally {
            setIsUploading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!product.image) {
            alert(`Please wait for the image to finish uploading.`);
            return;
        }
        await addProduct(product);
        navigate("/"); // Navigate back to the list
    };

    return (
        <div className="max-w-2xl mx-auto py-10 px-4">
            <div className="bg-white rounded-3xl border border-zinc-200 shadow-sm p-8">
                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-zinc-900 tracking-tight">Add New Product</h2>
                    <p className="text-zinc-500 text-sm mt-1">Fill in the details to list a new item in your store.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Title Input */}
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-zinc-700 ml-1">Product Title</label>
                        <input
                            name="title"
                            value={product.title}
                            onChange={handleChange}
                            placeholder="e.g. Classic Leather Boots"
                            className="w-full px-4 py-3 rounded-xl border border-zinc-300 focus:ring-2 focus:ring-zinc-900 focus:border-zinc-900 outline-none transition-all"
                            required
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Price Input */}
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-zinc-700 ml-1">Price ($)</label>
                            <input
                                name="price"
                                type="number"
                                value={product.price}
                                onChange={handleChange}
                                placeholder="0.00"
                                className="w-full px-4 py-3 rounded-xl border border-zinc-300 focus:ring-2 focus:ring-zinc-900 focus:border-zinc-900 outline-none transition-all"
                                required
                            />
                        </div>

                        {/* Category Dropdown */}
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-zinc-700 ml-1">Category</label>
                            <select
                                name="categoryId"
                                value={product.categoryId}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-xl border border-zinc-300 focus:ring-2 focus:ring-zinc-900 focus:border-zinc-900 outline-none transition-all appearance-none bg-white"
                                required
                            >
                                <option value="">Select Category</option>
                                {categories.map((cat) => (
                                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Image Upload Area */}
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-zinc-700 ml-1">Product Image</label>
                        <div className="relative group">
                            <input
                                type="file"
                                onChange={handleImageChange}
                                accept=".jpg, .jpeg, .png"
                                className="w-full text-sm text-zinc-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-bold file:bg-zinc-100 file:text-zinc-700 hover:file:bg-zinc-200 cursor-pointer border border-dashed border-zinc-300 p-4 rounded-xl transition-all"
                                required
                            />
                            {isUploading && (
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2 text-zinc-500">
                                    <div className="animate-spin h-4 w-4 border-2 border-zinc-400 border-t-transparent rounded-full"></div>
                                    <span className="text-xs font-medium">Uploading...</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Image Preview */}
                    {product.image && (
                        <div className="relative w-32 h-32 rounded-2xl overflow-hidden border-4 border-zinc-100 shadow-sm">
                            <img src={product.image} alt="Preview" className="w-full h-full object-cover" />
                        </div>
                    )}

                    {/* Action Buttons */}
                    <div className="pt-4 flex items-center gap-4">
                        <button
                            type="submit"
                            disabled={isUploading || isSaving}
                            className="flex-1 bg-zinc-900 text-white py-3.5 rounded-xl font-bold hover:bg-zinc-800 disabled:bg-zinc-300 transition-all shadow-lg shadow-zinc-900/10 active:scale-[0.98]"
                        >
                            {isSaving ? "Saving Product..." : "Create Product"}
                        </button>
                        <button
                            type="button"
                            onClick={() => navigate(-1)}
                            className="px-6 py-3.5 rounded-xl font-bold text-zinc-600 hover:bg-zinc-100 transition-all"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddProductForm;