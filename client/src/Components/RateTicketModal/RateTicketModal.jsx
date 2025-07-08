import { use, useState } from "react";
import { useGlobalContext } from "../../Context/Context";

const RateTicketModal = () => {
    const { setShowRateTicketModal} = useGlobalContext();
    const [hoveredStar, setHoveredStar] = useState(null);
    const [selectedRating, setSelectedRating] = useState(0);
    return (
        <div
            className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center bg-dark bg-opacity-50 z-3"
            aria-modal="true"
            role="dialog"
        >
            <div className="d-flex flex-column gap-2 bg-white rounded-3 shadow p-4 m-2" style={{width: '500px'}}>
                <div className="f-size-16 fw-medium">Rate Your Experience</div>
                <div className='fw-medium f-size-14'>How satisfied are you with the resolution?</div>
                <div className='d-flex justify-content-center gap-1 f-size-20 my-3'>
                    {[...Array(5)].map((_, index) => {
                        const starNumber = index + 1;
                        const isFilled = starNumber <= (hoveredStar || selectedRating);

                        return (
                            <i
                                key={index}
                                className={`bi ${isFilled ? 'bi-star-fill text-warning' : 'bi-star'} icon-bold text-secondary`}
                                style={{ cursor: 'pointer' }}
                                onMouseEnter={() => setHoveredStar(starNumber)}
                                onMouseLeave={() => setHoveredStar(null)}
                                // onClick={() => handleRatingSubmit(starNumber)}
                            ></i>
                        );
                    })}
                </div>

                <div className='fw-medium f-size-14'>Additional Comments (Optional)</div>
                <textarea rows='5' className="form-control f-size-14" placeholder="Tell us about your experience..."/>

                <div className="d-flex justify-content-end gap-2 mt-3 fw-medium">
                    <button onClick={()=> setShowRateTicketModal(false)} type="button" className="btn btn-light border fw-medium">Cancel</button>
                    <button type="button" className="btn btn-primary fw-medium">Submit Rating</button>
                </div>
            </div>
        </div>
    )
}

export default RateTicketModal