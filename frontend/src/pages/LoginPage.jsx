import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import api from '../lib/axios';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email.trim() || !password.trim()) {
            toast.error("All fields are required.");
            return;
        }

        setLoading(true);
        try {
            const { data } = await api.post('/auth/login', { email, password });
            toast.success('Logged in successfully!');
            // TODO: Save user and token to global state/context
            console.log(data); 
            navigate('/');
        } catch (error) {
            console.error("Login error", error);
            toast.error(error.response?.data?.message || 'Failed to login.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-base-200 flex items-center justify-center">
            <div className="card w-full max-w-sm shrink-0 bg-base-100 shadow-2xl">
                <form className="card-body" onSubmit={handleSubmit}>
                    <h2 className="card-title">Login</h2>
                    <div className="form-control">
                        <label className="label"><span className="label-text">Email</span></label>
                        <input
                            type="email"
                            placeholder="email"
                            className="input input-bordered"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="form-control">
                        <label className="label"><span className="label-text">Password</span></label>
                        <input
                            type="password"
                            placeholder="password"
                            className="input input-bordered"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="form-control mt-6">
                        <button className="btn btn-primary" type="submit" disabled={loading}>
                            {loading ? 'Logging in...' : 'Login'}
                        </button>
                    </div>
                    <div className="text-center mt-4">
                        <Link to="/register" className="link">
                            Don't have an account? Register
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
