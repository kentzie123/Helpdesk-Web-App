import './KnowledgeBase.css';
import { useGlobalContext } from '../../Context/Context';
import CreateArticleModal from '../../Components/CreateArticleModal/CreateArticleModal';

const KnowledgeBase = () => {
    const { setDeleteArticleModal } = useGlobalContext();
    const showDeleteArticleModal = ()=>{
        setDeleteArticleModal(true);
    }

  return (
    <div className="knowledge-base-main-container d-flex flex-column gap-1 p-2">
        <CreateArticleModal/>
        <div className="d-flex justify-content-between">
            <h4>Knowledge Base</h4>
            <div className="d-flex gap-2">
                <button type="button" className="btn btn-light border f-size-14 fw-medium">
                    Show Drafts
                </button>
                <button className="btn btn-primary f-size-14 fw-medium" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">
                    <i className="bi bi-plus"></i> New Article
                </button>
            </div>
        </div>
        <div className='row'>
            <div className='p-2 col-12 col-md-6 col-lg-3'>
            <div className="d-flex align-items-center gap-3 border rounded-3 p-3 shadow-sm">
                <div className='bg-primary-subtle rounded-3 reports-icon-container d-flex align-items-center justify-content-center'>
                    <i className="text-primary bi bi-book reports-card-icon"></i>
                </div>
                <div>
                    <div className='text-muted fw-medium'>Total Articles</div>
                    <h4 className='fw-bold m-0'>2</h4>
                </div>
            </div>
            </div>
            <div className='p-2 col-12 col-md-6 col-lg-3 '>
            <div className="d-flex align-items-center gap-3 border rounded-3 p-3 shadow-sm">
                <div className='bg-success-subtle rounded-3 reports-icon-container d-flex align-items-center justify-content-center'>
                    <i className="text-success bi bi-eye reports-card-icon"></i>
                </div>
                <div>
                    <div className='text-muted fw-medium'>Total Views</div>
                    <h4 className='fw-bold m-0'>2,235</h4>
                </div>
            </div>
            </div>
            <div className='p-2 col-12 col-md-6 col-lg-3 '>
            <div className="d-flex align-items-center gap-3 border rounded-3 p-3 shadow-sm">
                <div className='bg-warning-subtle rounded-3 reports-icon-container d-flex align-items-center justify-content-center'>
                    <i className="text-warning bi bi-star reports-card-icon"></i>
                </div>
                <div>
                    <div className='text-muted fw-medium'>Avg Rating</div>
                    <h4 className='fw-bold m-0'>2.4</h4>
                </div>
            </div>
            </div>
            <div className='p-2 col-12 col-md-6 col-lg-3 '>
            <div className="d-flex align-items-center gap-3 border rounded-3 p-3 shadow-sm">
                <div className="bg-violet-subtle rounded-3 reports-icon-container d-flex align-items-center justify-content-center">
                    <i className="text-violet bi bi-people reports-card-icon"></i>
                </div>
                <div>
                    <div className="text-muted fw-medium">Contributors</div>
                    <h4 className="fw-bold m-0">4</h4>
                </div>
                </div>
            </div>
        </div>

        <div className="row">
            <div className="col-12 col-md-3 p-2">
                <div className='rounded-3 shadow-sm border p-4 h-100    '>
                    <h4 className='mb-3'>Categories</h4>
                    <div className="d-flex flex-column gap-1">
                        <div className="article-category-menu d-flex justify-content-between align-items-center bg-primary-subtle fw-medium w-100 px-3 py-2 rounded-3">
                            <div className='text-primary'>All Articles</div>
                            <div className="rounded-circle p-1 bg-body-secondary articles-category-counter f-size-12">3</div>
                        </div>
                        <div className="article-category-menu d-flex justify-content-between align-items-center text-muted fw-medium w-100 px-3 py-2 rounded-3">
                            <div className=''>Technical Support</div>
                            <div className="rounded-circle p-1 bg-body-secondary articles-category-counter f-size-12">3</div>
                        </div>
                        <div className="article-category-menu d-flex justify-content-between align-items-center text-muted fw-medium w-100 px-3 py-2 rounded-3">
                            <div className=''>Security</div>
                            <div className="rounded-circle p-1 bg-body-secondary articles-category-counter f-size-12">3</div>
                        </div>
                        <div className="article-category-menu d-flex justify-content-between align-items-center text-muted fw-medium w-100 px-3 py-2 rounded-3">
                            <div className=''>Account Management</div>
                            <div className="rounded-circle p-1 bg-body-secondary articles-category-counter f-size-12">3</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-12 col-md-9 p-2">
                <div className='d-flex flex-column gap-3'>
                    <div className='border shadow-sm rounded-3 p-4'>
                        <div className="position-relative">
                            <i className="bi bi-search position-absolute top-50 start-0 translate-middle-y ms-3 text-muted"></i>
                            <input
                                type="text"
                                className="form-control ps-5"
                                placeholder="Search articles, tags, or content..."
                            />
                        </div>
                    </div>

                    <div className='d-flex flex-column gap-3'>
                        <div className='knowledge-base d-flex justify-content-between border shadow-sm rounded-3 p-4'>
                            <div className='d-flex flex-column gap-2'>
                                <div className='d-flex align-items-center gap-3'>
                                    <h5 className='m-0'>Troubleshooting Login Issues</h5>
                                    <div className='article-category-badge rounded-pill text-danger bg-danger-subtle f-size-12 fw-medium px-2 d-flex align-items-center'>Technical Support</div>
                                </div>
                                <div className='text-muted'>Common solutions for login problems and authentication errors.</div>
                                <div className='d-flex gap-2'>
                                    {
                                        ['login','troubleshooting','authentication'].map((tag)=> (
                                            <div className='rounded-pill bg-body-secondary px-2 py-1 f-size-12 text-muted'><i className="bi bi-tag"></i> {tag}</div>
                                        ))
                                    }
                                </div>
                                <div className='d-flex gap-3 text-muted f-size-14'>
                                    <div>By Juan Cardo</div>
                                    <div>
                                        <i className='bi bi-eye'></i> 1234 views
                                    </div>
                                    <div>
                                        <i className='bi bi-star text-warning'></i> 4.8
                                    </div>
                                    <div>
                                        <i className='bi bi-clock'></i> Updated 6/25/2025
                                    </div>
                                </div>
                            </div>

                            <div className='d-flex gap-4'>
                                <i className='kb-action-btn bi bi-eye'></i>
                                <i className='kb-action-btn bi bi-pencil-square'></i>
                                <i onClick={showDeleteArticleModal} className='kb-action-btn bi bi-trash text-danger'></i>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default KnowledgeBase