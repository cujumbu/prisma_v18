import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { sendStatusUpdateEmail } from '../utils/emailService';

// ... (keep the existing interface)

const AdminDashboard: React.FC = () => {
  const [claims, setClaims] = useState<Claim[]>([]);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || !user.isAdmin) {
      navigate('/login');
      return;
    }

    const fetchClaims = async () => {
      try {
        const response = await fetch('/api/claims');
        if (!response.ok) {
          throw new Error('Failed to fetch claims');
        }
        const claimsData = await response.json();
        setClaims(claimsData);
      } catch (error) {
        console.error('Error fetching claims:', error);
      }
    };

    fetchClaims();
  }, [user, navigate]);

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      const response = await fetch(`/api/claims/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        throw new Error('Failed to update claim status');
      }

      const updatedClaim = await response.json();

      setClaims(prevClaims => prevClaims.map(claim =>
        claim.id === id ? { ...claim, status: newStatus } : claim
      ));

      // Send email notification
      await sendStatusUpdateEmail(updatedClaim.email, updatedClaim.orderNumber, newStatus);
    } catch (error) {
      console.error('Error updating claim status:', error);
      // Handle error (e.g., show error message to admin)
    }
  };

  // ... (keep the rest of the component unchanged)
};

export default AdminDashboard;