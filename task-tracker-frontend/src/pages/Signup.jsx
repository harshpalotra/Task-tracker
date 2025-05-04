import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    country: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ 
      ...formData, 
      [e.target.name]: e.target.value 
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
        credentials: 'include',
      });

      const data = await res.json();
      if (res.ok) {
        alert('Signup successful! Redirecting to login...');
        navigate('/login');
      } else {
        alert(data.message || 'Signup failed');
      }
    } catch (err) {
      console.error(err);
      alert('Something went wrong');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
    <div className="bg-white p-8 rounded-xl shadow-md w-96">
      <div className="flex flex-col items-center mb-6">
        <img
          src="https://cdn-icons-png.flaticon.com/512/295/295128.png"
          alt="logo"
          className="w-12 h-12 mb-2"
        />
        <h2 className="text-2xl font-bold">Create Account</h2>
        <p className="text-sm text-gray-600">Signup to continue</p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Name"
          onChange={handleChange}
          className="w-full p-3 border rounded-md"
          required
        />
        <input
          type="text"
          name="country"
          placeholder="Country"
          onChange={handleChange}
          className="w-full p-3 border rounded-md"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          onChange={handleChange}
          className="w-full p-3 border rounded-md"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full p-3 border rounded-md"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 transition"
        >
          Signup
        </button>
      </form>
      <p className="text-sm text-center text-gray-600 mt-4">
        Already have an account?{' '}
        <span
          className="text-blue-600 font-semibold cursor-pointer"
          onClick={() => navigate('/login')}
        >
          Login
        </span>
      </p>
    </div>
  </div>
);
};

export default Signup;
