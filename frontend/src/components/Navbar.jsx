import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <header className="bg-base-300 border-b border-base-content/10">
            <div className="mx-auto max-w-6xl px-4 p-4">
                <div className="flex items-center justify-between">
                    <Link to='/' className="text-3xl font-bold text-primary font-mono tracking-tight">
                        SmartTRIP
                    </Link>
                    <div className="flex items-center gap-4">
                        <Link to={"/login"} className="btn btn-primary btn-sm">
                            Login
                        </Link>
                        <Link to={"/register"} className="btn btn-ghost btn-sm">
                            Register
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
};
export default Navbar;
