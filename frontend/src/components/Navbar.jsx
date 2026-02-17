import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <header className="bg-base-300 border-b border-base-content/10">
            <div className="mx-auto max-w-6xl px-4 p-4">
                <div className="flex items-center justify-between">
                    <Link to='/' className="text-3xl font-bold text-primary font-mono tracking-tight">
                        SmartTRIP
                    </Link>
                    <div className="flex items-center gap-4">
                        {user ? (
                            <>
                                <Link to={"/notifications"} className="btn btn-ghost btn-sm">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
                                </Link>
                                <Link to={"/profile"} className="btn btn-ghost btn-sm">
                                    My Profile
                                </Link>
                                <Link to={"/my-trips"} className="btn btn-ghost btn-sm">
                                    My Trips
                                </Link>
                                <Link to={"/saved-trips"} className="btn btn-ghost btn-sm">
                                    Saved Trips
                                </Link>
                                <Link to={"/reviews-ratings"} className="btn btn-ghost btn-sm">
                                    Reviews & Ratings
                                </Link>
                                {user.role === 'vendor' && (
                                    <Link to={"/dashboard"} className="btn btn-ghost btn-sm">
                                        Dashboard
                                    </Link>
                                )}
                                <Link to={"/help-support"} className="btn btn-ghost btn-sm">
                                    Help & Support
                                </Link>
                                <button onClick={handleLogout} className="btn btn-primary btn-sm">
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to={"/help-support"} className="btn btn-ghost btn-sm">
                                    Help & Support
                                </Link>
                                <Link to={"/login"} className="btn btn-primary btn-sm">
                                    Login
                                </Link>
                                <Link to={"/vendor/login"} className="btn btn-outline btn-sm">
                                    Vendor Login
                                </Link>
                                <Link to={"/register"} className="btn btn-ghost btn-sm">
                                    Traveler Sign Up
                                </Link>
                                <Link to={"/vendor/register"} className="btn btn-ghost btn-sm">
                                    Become a Partner
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};
export default Navbar;
