import {
    signInWithEmailAndPassword,
    signInWithPopup
} from "firebase/auth";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { auth, githubProvider, googleProvider } from "../firebase";

const Login = () => {
    const [user, setUser] = useState({
        email: "",
        password: "",
    });
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    // Handler for Social Logins (Google & GitHub)
    const handleSocialLogin = async (provider) => {
        setIsLoading(true);
        setErrorMessage("");
        try {
            const res = await signInWithPopup(auth, provider);
            if (res.user) {
                navigate("/");
            }
        } catch (error) {
            // Handle common Firebase social errors
            setErrorMessage(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    // Handler for Email/Password Login
    const submitHandler = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setErrorMessage(""); 
        try {
            const res = await signInWithEmailAndPassword(
                auth,
                user.email,
                user.password,
            );
            if (res.user) {
                navigate("/");
            }
        } catch (error) {
            setErrorMessage(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <section className="min-h-screen flex items-center justify-center bg-zinc-50 px-4 py-12">
            <div className="w-full max-w-md">
                {/* Logo/Brand Area */}
                <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-zinc-900 text-white mb-4 shadow-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                    </div>
                    <h1 className="text-3xl font-bold text-zinc-900 tracking-tight">Welcome Back</h1>
                    <p className="text-zinc-500 mt-2">Sign in to manage your account</p>
                </div>

                <div className="bg-white p-8 rounded-2xl border border-zinc-200 shadow-xl shadow-zinc-200/50">
                    
                    {/* Social Login Buttons */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                        <button
                            type="button"
                            onClick={() => handleSocialLogin(googleProvider)}
                            disabled={isLoading}
                            className="flex items-center justify-center gap-2 py-2.5 border border-zinc-200 rounded-xl hover:bg-zinc-50 transition-colors font-medium text-sm text-zinc-700 disabled:opacity-50"
                        >
                            <img src="https://www.gstatic.com/firebase/anonymous-scan.png" className="w-4 h-4" alt="Google" />
                            Google
                        </button>
                        <button
                            type="button"
                            onClick={() => handleSocialLogin(githubProvider)}
                            disabled={isLoading}
                            className="flex items-center justify-center gap-2 py-2.5 bg-zinc-900 text-white rounded-xl hover:bg-zinc-800 transition-colors font-medium text-sm disabled:opacity-50"
                        >
                            <svg fill="currentColor" viewBox="0 0 24 24" className="w-4 h-4">
                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.041-1.412-4.041-1.412-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                            </svg>
                            GitHub
                        </button>
                    </div>

                    {/* Divider */}
                    <div className="relative flex items-center mb-6">
                        <div className="flex-grow border-t border-zinc-200"></div>
                        <span className="flex-shrink mx-4 text-zinc-400 text-xs font-bold uppercase tracking-widest">or</span>
                        <div className="flex-grow border-t border-zinc-200"></div>
                    </div>

                    <form onSubmit={submitHandler} className="space-y-6">
                        {/* Error Alert */}
                        {errorMessage && (
                            <div className="p-3 rounded-lg bg-red-50 border border-red-100 flex items-center gap-3 text-red-600 animate-in fade-in zoom-in duration-200">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                                <span className="text-xs font-medium leading-tight">{errorMessage}</span>
                            </div>
                        )}

                        {/* Email Input */}
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-zinc-700 ml-1" htmlFor="email">
                                Email Address
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className="w-full px-4 py-3 rounded-xl border border-zinc-300 focus:ring-2 focus:ring-zinc-900 focus:border-zinc-900 outline-none transition-all placeholder:text-zinc-400"
                                placeholder="name@example.com"
                                value={user.email}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        {/* Password Input */}
                        <div className="space-y-2">
                            <div className="flex justify-between items-center ml-1">
                                <label className="text-sm font-semibold text-zinc-700" htmlFor="password">
                                    Password
                                </label>
                                <button type="button" className="text-xs font-medium text-zinc-500 hover:text-zinc-900 transition-colors">
                                    Forgot password?
                                </button>
                            </div>
                            
                            <div className="relative group">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    name="password"
                                    className="w-full px-4 py-3 rounded-xl border border-zinc-300 focus:ring-2 focus:ring-zinc-900 focus:border-zinc-900 outline-none transition-all placeholder:text-zinc-400"
                                    placeholder="••••••••"
                                    value={user.password}
                                    onChange={handleChange}
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-700 transition-colors p-1"
                                >
                                    {showPassword ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                                        </svg>
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-zinc-900 text-white py-3.5 rounded-xl font-bold hover:bg-zinc-800 disabled:bg-zinc-400 transition-all shadow-lg shadow-zinc-900/10 active:scale-[0.98] flex justify-center items-center"
                        >
                            {isLoading ? (
                                <div className="flex items-center gap-2">
                                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    <span>Processing...</span>
                                </div>
                            ) : (
                                "Sign In"
                            )}
                        </button>
                    </form>

                    {/* Footer Links */}
                    <p className="mt-8 text-center text-sm text-zinc-500">
                        Don't have an account?{" "}
                        <Link to="/signup" className="font-bold text-zinc-900 hover:underline underline-offset-4">
                            Create account
                        </Link>
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Login;