import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// ... (keep the existing interface)

const ClaimStatus: React.FC = () => {
  // ... (keep the existing state and useEffect)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/claims?orderNumber=${orderNumber}&email=${email}`);
      if (!response.ok) {
        throw new Error('Failed to fetch claim');
      }
      const claims = await response.json();
      setClaim(claims[0] || null);
    } catch (error) {
      console.error('Error fetching claim:', error);
      // Handle error (e.g., show error message to user)
    }
  };

  // ... (keep the rest of the component unchanged)
};

export default ClaimStatus;