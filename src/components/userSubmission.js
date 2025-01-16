import React, { useState } from 'react';
import axios from '../axios';
import { useNavigate } from 'react-router-dom';
const UserSubmission = () => {
  const [name, setName] = useState('');
  const [socialMediaHandle, setSocialMediaHandle] = useState('');
  const [images, setImages] = useState([]);
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  
  const [fileInputs, setFileInputs] = useState([0]);

  const handleImageChange = (e, index) => {
    const newImages = [...images];
   
    newImages[index] = e.target.files[0];
    setImages(newImages); 
    console.log(newImages); 
  };

  const handleAddInput = () => {
    
    setFileInputs([...fileInputs, fileInputs.length]);
  };

  const handleRemoveInput = (index) => {
    
    const newFileInputs = fileInputs.filter((_, i) => i !== index);
    setFileInputs(newFileInputs);

    const newImages = images.filter((_, i) => i !== index);
    setImages(newImages);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(''); 
  
    try {
     
      const formData = new FormData();
      formData.append('name', name); 
      formData.append('socialMediaHandle', socialMediaHandle); 
     
      images.forEach((image) => {
        if (image) {
          formData.append('images', image); 
        }
      });
  
      
      const userResponse = await axios.post('/users/submit', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      if (userResponse.status === 201) {
        setMessage('Submission successful!');
  
        
        setName('');
        setSocialMediaHandle('');
        setImages([]);
        setFileInputs([0]); 
      }
    } catch (error) {
      console.error('Submission failed:', error);
      setMessage('Submission failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-8 border rounded-lg shadow-lg mt-10">
      <h2 className="text-2xl font-bold text-center mb-6">User Submission Form</h2>
      {message && <p className="text-center text-green-500 mb-4">{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full px-4 py-2 border rounded-md"
        />
        <input
          type="text"
          placeholder="Social Media Handle"
          value={socialMediaHandle}
          onChange={(e) => setSocialMediaHandle(e.target.value)}
          required
          className="w-full px-4 py-2 border rounded-md"
        />

      
        {fileInputs.map((input, index) => (
          <div key={index} className="flex items-center space-x-2">
            <input
              type="file"
              onChange={(e) => handleImageChange(e, index)}
              className="w-full px-4 py-2 border rounded-md"
            />
            {fileInputs.length > 1 && (
              <button
                type="button"
                onClick={() => handleRemoveInput(index)}
                className="bg-red-600 text-white p-2 rounded-full"
              >
                X
              </button>
            )}
          </div>
        ))}

      
        <button
          type="button"
          onClick={handleAddInput}
          className="py-2 px-4 bg-green-600 text-white rounded-md mt-4 hover:bg-green-700"
        >
          + Add More Files
        </button>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 mt-4"
        >
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
      </form>
      <p className="text-center mt-4 text-blue-600">
          Are you an admin? <span className="cursor-pointer" onClick={() => navigate('/admin-login')}>Login now</span>
        </p>
    </div>
  );
};

export default UserSubmission;
