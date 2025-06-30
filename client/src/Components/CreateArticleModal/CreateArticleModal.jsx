import './CreateArticleModal.css';
import { useState, useRef } from 'react';

const CreateArticleModal = () => {
    const [ articleTag, setArticleTag ] = useState(['sample','sample1']);
    const articleTagInput = useRef();

   const handleInsertArticleTag = (newItem) => {
        const trimmedItem = newItem.trim();
        if (trimmedItem) {
            setArticleTag(prev => [trimmedItem, ...prev]);
            articleTagInput.current.value = ''; // clear input
        }
    };

    const handleRemoveArticleTag = (index) => {
        setArticleTag(prev => prev.filter((tag, i) => i !== index));
    }

    return (
        <div className="create-article-modal offcanvas offcanvas-end" tabIndex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
            <div className="offcanvas-header">
                <h5 className="offcanvas-title" id="offcanvasRightLabel">Create New Knowledge Base Article</h5>
                <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div className="offcanvas-body">
                <div className='row mt-3'>
                    <div className="col-12 col-md-6">
                        <label htmlFor="article-title" className="form-label fw-medium">Title</label>
                        <input type="email" className="form-control" id="article-title" placeholder="Enter article title"/>
                    </div>
                    <div className="col-12 col-md-6">
                        <label htmlFor="article-category" className="form-label fw-medium">Select Category</label>
                        <select className="form-select" aria-label="Category" id='article-category'>
                            <option value="" selected hidden>Select a category</option>
                            <option value="Technical Issue">Technical Issue</option>
                            <option value="Account Access">Account Access</option>
                            <option value="Hardware Request">Hardware Request</option>
                            <option value="Software Installation">Software Installation</option>
                            <option value="Network Problem">Network Problem</option>
                            <option value="Maintenance Request">Maintenance Request</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                </div>

                <div className='mt-3'>
                    <label htmlFor="article-description" className="form-label fw-medium">Description</label>
                    <textarea className="form-control" id="article-description" rows="3" placeholder='Brief description of the article'></textarea>
                </div>

                <div className='mt-3'>
                    <label htmlFor="article-content" className="form-label fw-medium">Content</label>
                    <textarea className="form-control" id="article-content" rows="8" placeholder='Write your article content here'></textarea>
                </div>

                <div className='mt-3'>
                    <label htmlFor="article-tag" className="form-label fw-medium">Tag</label>
                    <div className='row'>
                        <div className='col-10'>
                            <input type="email" className="form-control" id="article-tag" placeholder="Add tags" ref={articleTagInput} />
                        </div>                 
                        <button onClick={()=> handleInsertArticleTag(articleTagInput.current.value)} className='btn btn-light border fw-medium col-2' type='button'>Add tag</button>
                    </div>     
                </div>
                <div className='d-flex gap-1 mt-1'>
                    {
                      articleTag.map((tag, index)=>(
                        <div key={index} className='p-1'>
                            <div className='rounded-pill bg-primary-subtle text-primary f-size-12 px-2 py-1'>{tag} <span onClick={()=> handleRemoveArticleTag(index)} className='ms-1' style={{cursor:'pointer'}}>×</span></div>
                        </div>
                      ))  
                    }
                </div>
                <div className='mt-3'>
                    <div className="form-check form-switch">
                        <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault"/>
                        <label className="form-check-label fw-medium" htmlFor="flexSwitchCheckDefault">Publish immediately</label>
                    </div>
                </div>

                <div className='d-flex justify-content-end gap-2 mt-5'>
                    <button className='btn btn-primary'>Create Article</button>
                </div>
            </div>
        </div>
    )
}

export default CreateArticleModal