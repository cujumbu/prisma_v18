import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// ... (keep the existing interface)

const ClaimForm: React.FC = () => {
  // ... (keep the existing state and handleChange function)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/claims', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error('Failed to submit claim');
      }
      const newClaim = await response.json();
      navigate('/status', { state: { claimId: newClaim.id } });
    } catch (error) {
      console.error('Error submitting claim:', error);
      // Handle error (e.g., show error message to user)
    }
  };

  // ... (keep the rest of the component unchanged)
};

export default ClaimForm;