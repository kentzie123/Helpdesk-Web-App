import { useGlobalContext } from '../../Context/Context';
import { Link } from 'react-router-dom';

const KnowledgeBaseCard = ({ article }) => {
  const { setDeleteArticleModal, formatNotificationDate, setSelectedArticle, handleArticleInfoUpdate } = useGlobalContext();

  const showDeleteArticleModal = () => {
    setDeleteArticleModal(true);
  };

  const getCategoryBadgeClass = (category) => {
    switch (category) {
      case 'Technical Issue':
        return 'text-primary bg-primary-subtle';
      case 'Account Access':
        return 'text-info bg-info-subtle';
      case 'Hardware Request':
        return 'text-success bg-success-subtle';
      case 'Software Installation':
        return 'text-warning bg-warning-subtle';
      case 'Network Problem':
        return 'text-danger bg-danger-subtle';
      case 'Maintenance Request':
        return 'text-secondary bg-secondary-subtle';
      case 'Other':
      default:
        return 'text-dark bg-light';
    }
  };

  return (
    <div className="knowledge-base d-flex justify-content-between border shadow-sm rounded-3 p-4">
      <div className="d-flex flex-column gap-2">
        <div className="d-flex align-items-center gap-3">
          <h5 className="m-0">{article.title}</h5>
          <div className={` rounded-pill f-size-12 fw-medium px-2 d-flex align-items-center ${getCategoryBadgeClass(article.category)}`}>
            {article.category}
          </div>
          {!article.isPublished && 
            <div className='rounded-pill f-size-12 fw-medium px-2 d-flex align-items-center text-dark bg-dark-subtle'>
              Draft
            </div>
          }
        </div>

        <div className="text-muted">{article.description}</div>

        <div className="d-flex gap-2">
          {article.tags.map((tag, i) => (
            <div key={i} className="rounded-pill bg-body-secondary px-2 py-1 f-size-12 text-muted">
              <i className="bi bi-tag"></i> {tag}
            </div>
          ))}
        </div>

        <div className="d-flex gap-3 text-muted f-size-14">
          <div>By {article.author.name}</div>
          <div>
            <i className="bi bi-eye"></i> {article.views} views
          </div>
          <div>
            <i className="bi bi-star-fill text-warning"></i> {article.ratings.average}
          </div>
          <div>
            <i className="bi bi-clock"></i> Updated {formatNotificationDate(article.updatedAt)}
          </div>
        </div>
      </div>

      <div className="d-flex align-items-start gap-4">
        <Link to={`/knowledge-base/${article.slug}`} className='mt-1'><i className="kb-action-btn bi bi-eye"></i></Link>
        
        <button onClick={()=> setSelectedArticle(article)} className="btn btn-light f-size-14 fw-medium" type="button" data-bs-toggle="offcanvas" data-bs-target="#editArticleModal" aria-controls="offcanvasRight">
            <i className="kb-action-btn bi bi-pencil-square mt-1"></i>
        </button>
        {
          !article.isPublished ? 
          <button onClick={()=> handleArticleInfoUpdate(article.slug, {isPublished: true} )} type='button' className='btn btn-light text-success fw-medium'>Publish</button> 
          : null
        }
        <i onClick={()=>{ showDeleteArticleModal(); setSelectedArticle(article); }} className="kb-action-btn bi bi-trash text-danger mt-1"></i>
      </div>
    </div>
  );
};

export default KnowledgeBaseCard;
