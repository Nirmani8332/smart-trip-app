import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import api from '../lib/axios';

const RegisterPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('user'); // 'user' or 'vendor'
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name.trim() || !email.trim() || !password.trim()) {
            toast.error("All fields are required.");
            return;
        }

        setLoading(true);
        try {
            const { data } = await api.post('/auth/register', { name, email, password, role });
            toast.success('Registration successful!');
            console.log(data);
            navigate('/login');
        } catch (error) {
            console.error("Registration error", error);
            toast.error(error.response?.data?.message || 'Failed to register.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-base-200 flex items-center justify-center">
            <div className="card w-full max-w-sm shrink-0 bg-base-100 shadow-2xl">
                <form className="card-body" onSubmit={handleSubmit}>
                    <h2 className="card-title">Register</h2>
                    <div className="form-control">
                        <label className="label"><span className="label-text">Name</span></label>
                        <input
                            type="text"
                            placeholder="Full Name"
                            className="input input-bordered"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
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
                    <div className="form-control">
                        <label className="label"><span className="label-text">Register as</span></label>
                        <select className="select select-bordered" value={role} onChange={(e) => setRole(e.target.value)}>
                            <option value="user">Traveler</option>
                            <option value="vendor">Vendor</option>
                        </select>
                    </div>
                    <div className="form-control mt-6">
                        <button className="btn btn-primary" type="submit" disabled={loading}>
                            {loading ? 'Registering...' : 'Register'}
                        </button>
                    </div>
                    <div className="text-center mt-4">
                        <Link to="/login" className="link">
                            Already have an account? Login
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RegisterPage;
