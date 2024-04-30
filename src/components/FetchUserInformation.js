import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useUser } from '../context/useUser';
import ListUserInformation from './ListUserInformation';

export default function FetchUserInformation() {
    const { user } = useUser();
    const [userInformation, setUserInformation] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    console.log('user.token: ', user?.token);
    console.log('user.id: ', user?.id);

    const config = {
        headers: {
            Authorization: `Bearer ${user?.token}`
        },
        params: {
            userId: user?.id
        }
    };

    console.log('config: ', config);

    useEffect(() => {
        if (!user?.token || !user?.id) {
            setError("User token or ID is missing.");
            setLoading(false);
            return;
        }

        setLoading(true);
        setError('');
        console.log('Using params and token: ', config);
        
        axios.get(`${process.env.REACT_APP_SERVER_URL}user/one`, config)
            .then((response) => {
                console.log('User information response:', response);
                setUserInformation(response.data);
            })
            .catch((err) => {
                setError(err.message || 'An error occurred but no error message was received.');
            })
            .finally(() => {
                setLoading(false);
            });
    }, [user]); // Effect depends on `user`, as it includes token and ID.

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div>
            <ListUserInformation userInformation={userInformation} />
        </div>
    );
}
