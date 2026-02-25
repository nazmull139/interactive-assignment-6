import { signOut } from "firebase/auth";
import { useState } from "react";
import { Link } from "react-router";
import { useAuth } from "../contexts/Auth";
import { auth } from "../firebase";

const Nav = () => {
  const { userLoggedIn, role } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleSignOut = () => {
    signOut(auth);
    setMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold text-red-500 hover:text-red-600 transition"
        >
          E-Shop
        </Link>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center space-x-6">
          <li>
            <Link
              to="/"
              className="text-gray-700 hover:text-red-500 transition font-medium"
            >
              Home
            </Link>
          </li>

          {userLoggedIn && role === "admin" && (
            <>
              <li>
                <Link
                  to="/add-product"
                  className="text-gray-700 hover:text-red-500 transition font-medium"
                >
                  Add Product
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/product-listing"
                  className="text-gray-700 hover:text-red-500 transition font-medium"
                >
                  Admin-Product
                </Link>
              </li>
            </>
          )}

          {!userLoggedIn && (
            <>
              <li>
                <Link
                  to="/signup"
                  className="text-gray-700 hover:text-red-500 transition font-medium"
                >
                  Sign Up
                </Link>
              </li>
              <li>
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-red-500 transition font-medium"
                >
                  Login
                </Link>
              </li>
            </>
          )}

          {userLoggedIn && (
            <>
              <li>
                <Link
                  to="/cart"
                  className="text-gray-700 hover:text-red-500 transition font-medium"
                >
                  Cart
                </Link>
              </li>
              <li>
                <button
                  onClick={handleSignOut}
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition font-medium"
                >
                  Log Out
                </button>
              </li>
            </>
          )}
        </ul>

        {/* Mobile Hamburger */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-gray-700 focus:outline-none"
          >
            {menuOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-md">
          <ul className="flex flex-col space-y-2 px-4 py-4">
            <li>
              <Link
                to="/"
                onClick={() => setMenuOpen(false)}
                className="text-gray-700 hover:text-red-500 transition font-medium block"
              >
                Home
              </Link>
            </li>

            {userLoggedIn && role === "admin" && (
              <>
                <li>
                  <Link
                    to="/add-product"
                    onClick={() => setMenuOpen(false)}
                    className="text-gray-700 hover:text-red-500 transition font-medium block"
                  >
                    Add Product
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/product-listing"
                    onClick={() => setMenuOpen(false)}
                    className="text-gray-700 hover:text-red-500 transition font-medium block"
                  >
                    Admin-Product
                  </Link>
                </li>
              </>
            )}

            {!userLoggedIn && (
              <>
                <li>
                  <Link
                    to="/signup"
                    onClick={() => setMenuOpen(false)}
                    className="text-gray-700 hover:text-red-500 transition font-medium block"
                  >
                    Sign Up
                  </Link>
                </li>
                <li>
                  <Link
                    to="/login"
                    onClick={() => setMenuOpen(false)}
                    className="text-gray-700 hover:text-red-500 transition font-medium block"
                  >
                    Login
                  </Link>
                </li>
              </>
            )}

            {userLoggedIn && (
              <>
                <li>
                  <Link
                    to="/cart"
                    onClick={() => setMenuOpen(false)}
                    className="text-gray-700 hover:text-red-500 transition font-medium block"
                  >
                    Cart
                  </Link>
                </li>
                <li>
                  <button
                    onClick={handleSignOut}
                    className="w-full px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition font-medium"
                  >
                    Log Out
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Nav;