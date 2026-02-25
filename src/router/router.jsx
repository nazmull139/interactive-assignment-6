import { createBrowserRouter } from "react-router"
import PrivateAdminRoute from "../components/PrivateAdminRoute"
import PrivateLoggedInRoute from "../components/PrivateLoggedInRoute"
import AddProductForm from "../pages/AddProduct"
import AdminProductList from "../pages/AdminProducts"
import Cart from "../pages/Cart"
import EditProduct from "../pages/EditProduct"
import Login from "../pages/Login"
import RootLayout from "../pages/RootLayout"
import Shop from "../pages/Shop"
import SignupForm from "../pages/Signup"

export const rootRouter = createBrowserRouter([

    {
		path: "/",
		element: <RootLayout />,
		children: [
			{ path: "/", index: true, element: <Shop /> },
			{
				path: "/cart",
				element: (
					<PrivateLoggedInRoute>
						<Cart />
					</PrivateLoggedInRoute>
				),
			},
			{ path: "/signup", element: <SignupForm /> },
			{ path: "/login", element: <Login /> },
			{
				path: "/add-product",
				element: (
					<PrivateAdminRoute>
						<AddProductForm />
					</PrivateAdminRoute>
				),
			},
			{
				path: "/admin/product-listing",
				element: (
					<PrivateAdminRoute>
						<AdminProductList/>
					</PrivateAdminRoute>
				),
			},
			{
				path: "/admin/edit-product/:id",
				element: (
					<PrivateAdminRoute>
						<EditProduct/>
					</PrivateAdminRoute>
				),
			},
		],
	},

])