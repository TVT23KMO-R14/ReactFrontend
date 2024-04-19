
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';


export default function MovieCard({movie}) {

    
    const [reviews, setReviews] = useState([]);
    const [reviewInput, setReviewInput] = useState('');

    const handleReviewSubmit = (e) => {
        e.preventDefault();
        if (reviewInput.trim()) {
            setReviews([...reviews, reviewInput]);
            setReviewInput('');
        }
    };

    if (!movie) return null;

    return (
        <div className='card' style={{ width: '25rem', display: 'flex', padding: '20px'}}>
            <img
                className='card-img-top'
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={`${movie.title} poster`}
                style={{ width: '200px', height: 'auto' }} />
            <div className='card-body' style={{ flex: '1'}}>
                <h5 className='card-title'>{movie.title}</h5>
                <p className='card-text'>{movie.overview}</p>
                <form onSubmit={handleReviewSubmit}>
                    <textarea
                        value={reviewInput}
                        onChange={(e) => setReviewInput(e.target.value)}
                        placeholder='Write a review...'
                        style={{ width: '100%', marginBottom: '10px' }}
                    />
                    <button type='submit'>Submit Review</button>
                </form>
                <div className='reviews'>
                    {reviews.map((review, index) => (
                        <p key={index} className='review'>{review}</p>
                    ))}
                </div>
            </div>
        </div>
    );
}
