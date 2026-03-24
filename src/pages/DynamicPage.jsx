import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { pageService } from '../services/pageService';

const DynamicPage = () => {
  const { slug } = useParams(); // use name as slug
  const [page, setPage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    pageService.getAll()
      .then(res => {
        const found = res.data.find(p => p.name === slug);
        setPage(found);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <div className="container py-5">Loading...</div>;
  if (!page) return <div className="container py-5">Page not found</div>;

  return (
    <div className="container py-5">
      <h1>{page.name}</h1>
      <div dangerouslySetInnerHTML={{ __html: page.description }} />
    </div>
  );
};

export default DynamicPage;