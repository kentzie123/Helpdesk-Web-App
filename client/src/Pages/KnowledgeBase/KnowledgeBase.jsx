import './KnowledgeBase.css';
import { useState, useMemo } from 'react';

import CreateArticleModal from '../../Components/CreateArticleModal/CreateArticleModal';
import EditArticleModal from '../../Components/EditArticleModal/EditArticleModal';
import KnowledgeBaseCard from '../../Components/KnowledgeBaseCard/KnowledgeBaseCard';
import { useGlobalContext } from '../../Context/Context';

const KnowledgeBase = () => {
    const { articles } = useGlobalContext();

    const [searchTerm, setSearchTerm] = useState('');
    const [showArticleDrafts, setShowArticleDrafts] = useState(false);
    const [selectedArticleCategory, setSelectedArticleCategory] = useState('All Articles');

    const filteredArticles = articles.filter(article => {
        const term = searchTerm.toLowerCase();

        const matchesSearch = 
            article.title.toLowerCase().includes(term) ||
            article.content.toLowerCase().includes(term) ||
            article.tags.some(tag => tag.toLowerCase().includes(term));

        const matchesPublishStatus = article.isPublished === !showArticleDrafts;

        const matchesCategory = selectedArticleCategory === 'All Articles' 
            || article.category === selectedArticleCategory;

        return matchesSearch && matchesPublishStatus && matchesCategory;
    });



    const handleShowDrafts = () => {
        setShowArticleDrafts((prev)=> !prev);
    }

    const allArticlesCount = useMemo(()=>{
        return articles.length;
    },[articles])
    const technicalIssueCount = useMemo(()=>{
        return articles.filter((a)=> a.category === 'Technical Issue').length
    },[articles])
    const accountAccessCount = useMemo(()=>{
        return articles.filter((a)=> a.category === 'Account Access').length
    },[articles])
    const hardwareRequestCount = useMemo(()=>{
        return articles.filter((a)=> a.category === 'Hardware Request').length
    },[articles])
    const softwareInstallationCount = useMemo(()=>{
        return articles.filter((a)=> a.category === 'Software Installation').length
    },[articles])
    const networkProblemCount = useMemo(()=>{
        return articles.filter((a)=> a.category === 'Network Problem').length
    },[articles])
    const maintenanceRequestCount = useMemo(()=>{
        return articles.filter((a)=> a.category === 'Maintenance Request').length
    },[articles])

    const articleCategories = [
        {
            name: 'All Articles',
            count: allArticlesCount
        },
        {
            name: 'Technical Issue',
            count: technicalIssueCount
        },
        {
            name: 'Account Access',
            count: accountAccessCount
        },
        {
            name: 'Hardware Request',
            count: hardwareRequestCount
        },
        {
            name: 'Software Installation',
            count: softwareInstallationCount
        },
        {
            name: 'Network Problem',
            count: networkProblemCount
        },
        {
            name: 'Maintenance Request',
            count: maintenanceRequestCount
        }
    ]
    return (
        <div className="knowledge-base-main-container d-flex flex-column gap-1 p-2">
            <CreateArticleModal />
            <EditArticleModal />
            <div className="d-flex justify-content-between">
                <h4>Knowledge Base</h4>
                <div className="d-flex gap-2">
                    <button onClick={handleShowDrafts} type="button" className={`btn ${showArticleDrafts?'btn-primary':'btn-light'} border f-size-14 fw-medium`}>
                        {showArticleDrafts?'Show Published':'Show Drafts'}
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
                            <h4 className='fw-bold m-0'>{articles.length}</h4>
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
                    <div className='rounded-3 shadow-sm border p-4 h-100'>
                        <h4 className='mb-3'>Categories</h4>
                        <div className="d-flex flex-column gap-1">
                            {
                                articleCategories.map((ac, i)=>(
                                   <div key={i} onClick={()=> setSelectedArticleCategory(ac.name)} className={`${ac.name === selectedArticleCategory ? 'bg-primary-subtle' : ''} article-category-menu d-flex justify-content-between align-items-center fw-medium w-100 px-3 py-2 rounded-3`}>
                                        <div className={`${ac.name === selectedArticleCategory ? 'text-primary' : ''}`}>{ac.name}</div>
                                        <div className="rounded-circle p-1 bg-body-secondary articles-category-counter f-size-12">{ac.count}</div>
                                    </div> 
                                ))
                            }
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
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className='d-flex flex-column gap-3'>
                            {
                                filteredArticles.length > 0 ? (
                                    filteredArticles.map(article => (
                                        <KnowledgeBaseCard key={article._id} article={article} />
                                    ))
                                ) : (
                                    <div className='text-muted text-center p-4 border shadow-sm rounded-3 fw-medium'>No articles found.</div>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default KnowledgeBase;
