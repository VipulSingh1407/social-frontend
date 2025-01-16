import React, { useState, useEffect } from 'react';
import axios from '../axios'; 
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); 

 
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/admin-login'); 
    } else {
      fetchUsers();
      const interval = setInterval(fetchUsers, 10000); 
      return () => clearInterval(interval); 
    }
  }, [navigate]);

  
  const fetchUsers = async () => {
    try {
      const response = await axios.get('/users/dashboard', {
        headers: {
          token: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setUsers(response.data); 
    } catch (err) {
      setError('Failed to fetch users.');
      console.error('Error fetching users:', err);
    } finally {
      setLoading(false);
    }
  };


  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/admin-login');
  };

  return (
    <div className="max-w-screen-xl mx-auto p-8">
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Admin Dashboard</h2>

      {loading && <p className="text-gray-500">Loading user submissions...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="flex justify-end mb-6">
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white py-2 px-6 rounded-md hover:bg-red-600 transition-all"
        >
          Logout
        </button>
      </div>

      <div className="overflow-x-auto bg-white p-6 rounded-lg shadow-lg">
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr className="bg-blue-100 text-left">
              <th className="px-6 py-3 border-b text-gray-700">Name</th>
              <th className="px-6 py-3 border-b text-gray-700">Social Media Handle</th>
              <th className="px-6 py-3 border-b text-gray-700">Uploaded Images</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user._id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4">{user.name}</td>
                  <td className="px-6 py-4">{user.socialMediaHandle}</td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-4">
                      {user.images.map((imageUrl, index) => (
                        <a
                          key={index}
                          href={imageUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <img
                            src={imageUrl}
                            alt={`Uploaded Image ${index + 1}`}
                            className="w-16 h-16 object-cover rounded-lg shadow-md border"
                          />
                        </a>
                      ))}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="px-6 py-4 text-center text-gray-500">
                  No submissions found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
