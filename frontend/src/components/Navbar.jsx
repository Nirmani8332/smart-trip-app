import { Link } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {
    // This is a simulation of auth state. In a real app, this would come from a context or global state.
    const [user, setUser] = useState({ role: 'vendor' }); // Simulate a logged-in vendor
    // const [user, setUser] = useState(null); // Simulate a logged-out user

    const handleLogout = () => {
        setUser(null);
        // In a real app, you would also clear the token from storage
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
                                {user.role === 'vendor' && (
                                    <Link to={"/dashboard"} className="btn btn-ghost btn-sm">
                                        Dashboard
                                    </Link>
                                )}
                                <button onClick={handleLogout} className="btn btn-primary btn-sm">
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to={"/login"} className="btn btn-primary btn-sm">
                                    Login
                                </Link>
                                <Link to={"/register"} className="btn btn-ghost btn-sm">
                                    Register
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
