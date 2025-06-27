import { useGlobalContext } from "../../Context/Context"

const DeleteArticleModal = () => {

    const { setDeleteArticleModal } = useGlobalContext();

    const closeArticleModal = () => {
        setDeleteArticleModal(false);
    };

    return (
        <div
            className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center bg-dark bg-opacity-50 z-3"
            aria-modal="true"
            role="dialog"
        >
            <div className="d-flex flex-column gap-2 bg-white rounded-3 shadow p-4 m-2" style={{maxWidth:'500px'}}>
                <div className="d-flex align-items-center gap-3">
                    <div className="d-flex align-items-center justify-content-center rounded-circle bg-danger-subtle p-3" style={{width: '45px', height: '45px'}}>
                        <i className="bi bi-exclamation-triangle text-danger icon-bold" style={{fontSize:'21px'}}></i>
                    </div>
                    <div className="f-size-16 fw-medium">Delete Knowledge Article</div>
                </div>
                <div className="text-muted f-size-14">
                    Are you sure you want to delete this knowledge base article? This will permanently remove the article and all associated data.
                </div>
                <div className="fw-bold f-size-14">"Sample Knowledge Base Article"</div>
                <div className="fw-bold text-danger f-size-14">This action cannot be undone.</div>
                <div className="d-flex justify-content-end gap-3">
                    <button onClick={closeArticleModal} className="btn btn-light border f-size-14">Close</button>
                    <button className="btn btn-danger f-size-14"><i class="bi bi-trash"></i> Delete</button>
                </div>
            </div>
        </div>
    );
}

export default DeleteArticleModal