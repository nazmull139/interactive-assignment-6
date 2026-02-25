import { useSearchParams } from "react-router";
import ProductCard from "../components/ProductCard";
import {
  useGetAllProductsQuery,
  useGetCategoriesQuery,
  useGetProductsByCategoryQuery,
} from "../features/api/apiSlice";

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeSlug = searchParams.get("category");

  // Get categories
  const { data: categories = [] } = useGetCategoriesQuery();
  const activeCategory = categories.find((cat) => cat.slug === activeSlug);
  const activeCategoryId = activeCategory?.id;
  const isCategoryActive = Boolean(activeCategoryId);

  // Fetch products conditionally
  const { data: allProducts = [], isLoading: allLoading } =
    useGetAllProductsQuery(undefined, { skip: isCategoryActive });

  const { data: categoryProducts = [], isLoading: categoryLoading } =
    useGetProductsByCategoryQuery(activeCategoryId, { skip: !isCategoryActive });

  const products = isCategoryActive ? categoryProducts : allProducts;
  const isLoading = allLoading || categoryLoading;

  // Handlers
  const handleCategoryChange = (category) => {
    setSearchParams({ category: category.slug });
  };

  const clearCategoryFilter = () => {
    searchParams.delete("category");
    setSearchParams(searchParams);
  };

  return (
    <>
      {/* Banner */}
      <div className="bg-gradient-to-r from-red-500 to-pink-500 py-16">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white">
            Our E-commerce Website
          </h1>
          <p className="text-white mt-2">Find the best products for you!</p>
        </div>
      </div>

      {/* Section */}
      <div className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          {/* Section Header */}
          <div className="mb-6">
            <h2 className="text-3xl font-semibold text-gray-800">All Products</h2>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-3 mb-8">
            <button
              onClick={clearCategoryFilter}
              className={`px-4 py-2 rounded-full border ${
                !activeSlug
                  ? "bg-red-500 text-white border-red-500"
                  : "bg-white text-gray-800 border-gray-300 hover:bg-red-500 hover:text-white transition"
              }`}
            >
              All
            </button>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryChange(category)}
                className={`px-4 py-2 rounded-full border ${
                  activeSlug === category.slug
                    ? "bg-red-500 text-white border-red-500"
                    : "bg-white text-gray-800 border-gray-300 hover:bg-red-500 hover:text-white transition"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* Products */}
          {isLoading ? (
            <p className="text-gray-500 text-lg text-center">Loading...</p>
          ) : products?.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center text-lg">No products found.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Shop;