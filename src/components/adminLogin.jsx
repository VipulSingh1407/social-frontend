import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import axios from '../axios'; 

const AdminLogin = () => {
  const [email, setEmail] = useState('admin@test.com'); 
  const [password, setPassword] = useState('testadmin');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(''); 

    try {
     
      const response = await axios.post('/admin/login', { email, password });

      if (response.status === 200) {
        
        localStorage.setItem('token', response.data.token);

       
        navigate('/admin-dashboard'); 
      }
    } catch (error) {
      console.error('Login failed:', error);
      setMessage('Invalid credentials or server error.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-8 border rounded-lg shadow-lg mt-10">
      <h2 className="text-2xl font-bold text-center mb-6">Admin Login</h2>
      {message && <p className="text-center text-red-500 mb-4">{message}</p>}
      
      
      <p className="text-center text-sm text-gray-500 mb-4">
        Sample credentials are already filled: 
        <strong>Email: admin@test.com | Password: testadmin</strong>
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-4 py-2 border rounded-md"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full px-4 py-2 border rounded-md"
        />

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 mt-4"
        >
          {isSubmitting ? 'Logging In...' : 'Login'}
        </button>
        <p className="text-center mt-4 text-blue-600">Are you an user? <span className="cursor-pointer" onClick={() => navigate('/')}>Fill Details now</span></p>
      </form>
    </div>
  );
};

export default AdminLogin;
