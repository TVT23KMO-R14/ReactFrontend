import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useUser } from '../context/useUser';
import ListOtherGroups from './ListOtherGroups';

export default function FetchOtherGroups() {
  const { user } = useUser();
  const [combinedGroups, setCombinedGroups] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    setError('');

    // Fetch groups user is a member of
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}groupmember/bymember`, {
        params: { userId: user.id },
      })
      .then((userResponse) => {
        const userGroups = userResponse.data;

        // Fetch all groups
        axios
          .get(`${process.env.REACT_APP_SERVER_URL}group/all`)
          .then((allResponse) => {
            const allGroups = allResponse.data;

            // Combine groups with a 'isMember' property
            const combined = allGroups.map((group) => {
              const isMember = userGroups.some(
                (userGroup) => userGroup.idGroup === group.idGroup
              );
              return { ...group, isMember };
            });

            setCombinedGroups(combined);
          })
          .catch((err) => {
            setError(
              err.message || 'An error occurred while fetching all groups.'
            );
          });
      })
      .catch((err) => {
        setError(
          err.message || 'An error occurred while fetching user groups.'
        );
      })
      .finally(() => {
        setLoading(false);
      });
  }, [user]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return <ListOtherGroups groups={combinedGroups} />;
}
