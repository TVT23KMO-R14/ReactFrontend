import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

export default function GroupListPage() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    
    if (!location.state?.fromCreateGroup) {
      navigate('/creategroup');
    }
  }, [navigate, location.state]);

  return(
    <div>GroupListPage</div>
   );
}