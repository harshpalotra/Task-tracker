import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const backgroundImage = 'https://images.unsplash.com/photo-1593642532973-d31b6557fa68?auto=format&fit=crop&w=1600&q=80';

  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${backgroundImage})`,
      }}
    >
      {/* Navbar */}
      <nav className="flex justify-between items-center px-8 py-4 bg-black bg-opacity-70 text-white">
        <h1 className="text-3xl font-bold tracking-wide">TaskTracker</h1>
        <div className="space-x-4">
          <Link
            to="/login"
            className="px-4 py-2 border border-white rounded hover:bg-white hover:text-black transition"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="px-4 py-2 border border-white rounded hover:bg-white hover:text-black transition"
          >
            Signup
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center h-[80vh] text-white text-center px-4">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 drop-shadow-lg">
          Organize. Track. Succeed.
        </h2>
        <p className="text-lg md:text-xl max-w-2xl mb-8 drop-shadow-md">
          Welcome to TaskTracker – your simple solution to manage tasks, track progress, and improve productivity across projects.
        </p>
        <Link
          to="/signup"
          className="bg-blue-600 hover:bg-blue-700 transition text-white px-6 py-3 rounded text-lg font-semibold shadow-lg"
        >
          Get Started
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
