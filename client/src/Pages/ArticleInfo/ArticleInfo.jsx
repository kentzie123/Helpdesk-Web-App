import './ArticleInfo.css';
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useGlobalContext } from '../../Context/Context';
import axios from 'axios';
import { API_BASE } from '../../config/api';

const ArticleInfo = () => {
    const { slug } = useParams();
    const { fetchArticleInfo, selectedArticle, isLoading, userInfo } = useGlobalContext();

    const [hoveredStar, setHoveredStar] = useState(null);
    const [selectedRating, setSelectedRating] = useState(0);

    useEffect(() => {
        fetchArticleInfo(slug);    
    }, [slug]);


    useEffect(() => {
        if (!selectedArticle?._id || !userInfo?.userID) return;

        const getUserRatings = async () => {
            try{
                const res = await axios.get(`${API_BASE}/api/article-ratings/${selectedArticle._id}/${userInfo.userID}`) 
                setSelectedRating(res.data.rating);
            }catch(err){
                console.error('Error fetching user rating:', err);
            }
        }

        const handleArticleView = async () => {
            try {
                const res = await axios.post(`${API_BASE}/api/article-views`, {
                    userID: userInfo.userID,
                    _id: selectedArticle._id
                });
                console.log(res.data);
            } catch (err) {
                console.error('Error creating view article:', err);
            }
        };

        getUserRatings();
        handleArticleView();
    }, [selectedArticle]);

    useEffect(()=>{
        console.log(selectedRating);     
    },[selectedRating])
    const handleRatingSubmit = async (rating) => {
        try {
            setSelectedRating(rating); // Update local state immediately for UX

            const res = await axios.post(`${API_BASE}/api/article-ratings`, {
                userID: userInfo.userID,
                articleId: selectedArticle._id,
                rating
            });

            console.log('Rating submitted:', res.data);
            fetchArticleInfo(slug); // Refresh article info to update average/count
        } catch (err) {
            console.error('Error submitting rating:', err);
        }
    };

    const getRoleById = (id) => {
        switch(id) {
            case '1': return 'Admin';
            case '2': return 'Staff';
            case '3': return 'Client';
            default: return 'Unknown';
        }
    }


    const getCategoryBadgeClass = (category) => {
        if (!category) return 'text-dark bg-light';

        switch (category) {
            case 'Technical Issue': return 'text-primary bg-primary-subtle';
            case 'Account Access': return 'text-info bg-info-subtle';
            case 'Hardware Request': return 'text-success bg-success-subtle';
            case 'Software Installation': return 'text-warning bg-warning-subtle';
            case 'Network Problem': return 'text-danger bg-danger-subtle';
            case 'Maintenance Request': return 'text-secondary bg-secondary-subtle';
            case 'Other':
            default: return 'text-dark bg-light';
        }
    };

    const timeAgo = (dateString) => {
        if (!dateString) return 'Recently';
        try {
            const date = new Date(dateString);
            const now = new Date();
            const seconds = Math.floor((now - date) / 1000);
            if (isNaN(seconds)) return 'Recently';

            if (seconds < 60) return seconds === 1 ? '1 second ago' : `${seconds} seconds ago`;
            const minutes = Math.floor(seconds / 60);
            if (minutes < 60) return minutes === 1 ? '1 minute ago' : `${minutes} minutes ago`;
            const hours = Math.floor(minutes / 60);
            if (hours < 24) return hours === 1 ? '1 hour ago' : `${hours} hours ago`;
            const days = Math.floor(hours / 24);
            if (days < 7) return days === 1 ? '1 day ago' : `${days} days ago`;
            const weeks = Math.floor(days / 7);
            if (weeks < 4) return weeks === 1 ? '1 week ago' : `${weeks} weeks ago`;
            const months = Math.floor(days / 30);
            if (months < 12) return months === 1 ? '1 month ago' : `${months} months ago`;
            const years = Math.floor(days / 365);
            return years === 1 ? '1 year ago' : `${years} years ago`;
        } catch {
            return 'Recently';
        }
    };

    if (isLoading || !selectedArticle) {
        return (
            <div className='px-5 py-3 d-flex justify-content-center align-items-center' style={{ height: '300px' }}>
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    return (
        <div className='px-5 py-3'>
            <div className='d-flex flex-column gap-4'>
                <Link to={'/knowledge-base'}>
                    <button className='btn btn-light fw-medium' style={{width: '210px'}}>
                        <i className='bi bi-arrow-left me-2'></i> Back to Knowledge Base
                    </button>
                </Link>
                
                <div className="card border-0 shadow-sm p-4 d-flex flex-column gap-2 rounded-3 position-relative">
                    <div className="d-flex justify-content-between align-items-start">
                        <div className="d-flex align-items-center gap-3 text-body-secondary">
                            <span className={`badge rounded-pill ${getCategoryBadgeClass(selectedArticle?.category)}`}>
                                {selectedArticle?.category || 'Uncategorized'}
                            </span>
                            <span className="text-muted small">
                                <i className="bi bi-eye me-1 icon-bold"></i>
                                {selectedArticle?.views || 0} views
                            </span>
                        </div>
                        <div className="d-flex align-items-center gap-1">
                            <i className="bi bi-star-fill text-warning"></i>
                            <span className="fw-semibold">
                                {selectedArticle?.ratings?.average?.toFixed(1) || 0}
                            </span>
                            <span className="text-muted small">
                                ({selectedArticle?.ratings?.count || 0} ratings)
                            </span>
                        </div>
                    </div>

                    <h5 className="fw-bold mt-1 mb-2">{selectedArticle?.title || 'Untitled Article'}</h5>

                    <div className="d-flex flex-wrap gap-3 text-muted small align-items-center">
                        <div>
                            <i className="bi bi-person me-1 icon-bold"></i> 
                            By {selectedArticle?.author?.name || 'Unknown Author'}
                        </div>
                        <div>
                            <i className="bi bi-calendar-event me-1 icon-bold"></i> 
                            Published {timeAgo(selectedArticle?.publishedAt)}
                        </div>
                        <div>
                            <i className="bi bi-clock me-1 icon-bold"></i> 
                            Updated {timeAgo(selectedArticle?.updatedAt)}
                        </div>
                    </div>
                </div>

                <div className='p-4 border shadow-sm rounded-3' style={{whiteSpace: 'pre-wrap'}}>
                    {selectedArticle?.content || 'No content available'}
                </div>

                <div className='p-4 border shadow-sm rounded-3'>
                    <div><i className="bi bi-tag text-body-secondary icon-bold"></i> Tags</div>
                    <div className='d-flex gap-3 mt-2'>
                        {selectedArticle?.tags?.length > 0 ? (
                            selectedArticle.tags.map((tag) => (
                                <div key={tag} className='badge rounded-pill border text-dark'>#{tag}</div>
                            ))
                        ) : (
                            <div className='text-muted'>No tags available</div>
                        )}
                    </div>
                </div>

                <div className='p-4 border shadow-sm rounded-3'>
                    <h5 className='fw-medium m-0'><i className="bi bi-hand-thumbs-up me-2"></i>Was this article helpful?</h5>
                    <div className="mt-2">
                        <div className='d-flex justify-content-between f-size-14'>
                            <div className="d-flex align-items-center gap-3">
                                <div className='fw-medium'>Rate this article</div>
                                <div className='d-flex gap-1 f-size-16'>
                                    {[...Array(5)].map((_, index) => {
                                        const starNumber = index + 1;
                                        const isFilled = starNumber <= (hoveredStar || selectedRating);

                                        return (
                                            <i
                                                key={index}
                                                className={`bi ${isFilled ? 'bi-star-fill text-warning' : 'bi-star'} icon-bold`}
                                                style={{ cursor: 'pointer' }}
                                                onMouseEnter={() => setHoveredStar(starNumber)}
                                                onMouseLeave={() => setHoveredStar(null)}
                                                onClick={() => handleRatingSubmit(starNumber)}
                                            ></i>
                                        );
                                    })}
                                </div>
                            </div>
                            <div className='text-muted'>
                                <i className='bi bi-star-fill text-warning icon-bold me-2'></i> 
                                Average: {selectedArticle?.ratings?.average?.toFixed(1) || 0} 
                                ({selectedArticle?.ratings?.count || 0} ratings)
                            </div>
                        </div>
                    </div>
                </div>

                <div className='d-flex align-items-center gap-3 p-4 border shadow-sm rounded-3'>
                    <div className='d-flex align-items-center justify-content-center rounded-circle bg-primary-subtle text-primary fw-medium'>
                        {selectedArticle?.author?.profilePic ? (
                            <img className='rounded-circle' style={{width:'45px', height:'45px'}} src={selectedArticle.author.profilePic} alt={selectedArticle?.author?.name || 'Author'} />
                        ) : (
                            <div style={{width:'45px', height:'45px'}} className="d-flex align-items-center justify-content-center">
                                <i className="bi bi-person-fill"></i>
                            </div>
                        )}
                    </div>
                    <div>
                        <div className='fw-medium'>{selectedArticle?.author?.name || 'Unknown Author'}</div>
                        <div className='text-muted f-size-14'>
                            {getRoleById(selectedArticle?.author?.role)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ArticleInfo;
