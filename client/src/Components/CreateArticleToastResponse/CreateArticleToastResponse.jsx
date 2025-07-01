import { useEffect } from "react";
import { useGlobalContext } from "../../Context/Context";

const CreateArticleToastResponse = () => {
    const { createArticleResponse, setCreateArticleResponse } = useGlobalContext();

    useEffect(() => {
        if (createArticleResponse) {
            const timer = setTimeout(() => {
                setCreateArticleResponse("");
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [createArticleResponse]);

    return (
        <div className={`toast position-fixed top-0 start-0 ms-3 mt-3 p-1 z-3 ${createArticleResponse === 'Created article successfully' ? 'text-bg-success' : 'text-bg-danger'} border-0 fade ${createArticleResponse ? 'show' : 'hide'}`} role="alert" aria-live="assertive" aria-atomic="true">
            <div className="d-flex">
                <div className="toast-body">
                    {createArticleResponse}
                </div>
                <button type="button" className="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
        </div>
    );
};


export default CreateArticleToastResponse;