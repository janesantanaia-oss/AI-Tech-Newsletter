
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getNewsletterById, addNewsletter, updateNewsletter } from '../services/newsletterService';
import { ArrowLeftIcon } from '../components/icons';

const NewsletterForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    issueNumber: '',
    publishedDate: '',
    contentMarkdown: '',
  });
  const [loading, setLoading] = useState(isEditing);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isEditing && id) {
      getNewsletterById(id).then(article => {
        if (article) {
          setFormData({
            title: article.title,
            subtitle: article.subtitle,
            issueNumber: String(article.issueNumber),
            publishedDate: new Date(article.publishedDate).toISOString().split('T')[0],
            contentMarkdown: article.contentMarkdown,
          });
        } else {
          setError('Artigo não encontrado.');
        }
        setLoading(false);
      });
    }
  }, [id, isEditing]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const articleData = {
      title: formData.title,
      subtitle: formData.subtitle,
      issueNumber: parseInt(formData.issueNumber, 10),
      publishedDate: new Date(formData.publishedDate).toISOString(),
      contentMarkdown: formData.contentMarkdown,
    };

    if (isNaN(articleData.issueNumber)) {
        setError('Número da edição deve ser um número válido.');
        return;
    }

    try {
      if (isEditing && id) {
        await updateNewsletter(id, articleData);
      } else {
        await addNewsletter(articleData);
      }
      navigate('/admin');
    } catch (err) {
      setError('Ocorreu um erro ao salvar o artigo.');
      console.error(err);
    }
  };

  if (loading) {
    return <div className="text-center py-20">Carregando...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <Link to="/admin" className="inline-flex items-center gap-2 text-sky-600 dark:text-sky-500 hover:underline mb-8">
        <ArrowLeftIcon className="w-5 h-5" />
        Voltar para Admin
      </Link>
      <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 sm:text-4xl mb-8">
        {isEditing ? 'Editar Edição' : 'Criar Nova Edição'}
      </h1>
      <form onSubmit={handleSubmit} className="space-y-6 bg-white dark:bg-slate-800 p-8 rounded-lg shadow-md border border-slate-200 dark:border-slate-700">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                Título
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="mt-1 block w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                required
              />
            </div>
            <div>
              <label htmlFor="subtitle" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                Subtítulo
              </label>
              <input
                type="text"
                id="subtitle"
                name="subtitle"
                value={formData.subtitle}
                onChange={handleChange}
                className="mt-1 block w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
              />
            </div>
             <div>
              <label htmlFor="issueNumber" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                Número da Edição
              </label>
              <input
                type="number"
                id="issueNumber"
                name="issueNumber"
                value={formData.issueNumber}
                onChange={handleChange}
                className="mt-1 block w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                required
              />
            </div>
             <div>
              <label htmlFor="publishedDate" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                Data de Publicação
              </label>
              <input
                type="date"
                id="publishedDate"
                name="publishedDate"
                value={formData.publishedDate}
                onChange={handleChange}
                className="mt-1 block w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                required
              />
            </div>
        </div>
        
        <div>
          <label htmlFor="contentMarkdown" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            Conteúdo (Markdown)
          </label>
          <textarea
            id="contentMarkdown"
            name="contentMarkdown"
            rows={20}
            value={formData.contentMarkdown}
            onChange={handleChange}
            className="mt-1 block w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm font-mono"
            required
          />
        </div>
        
        {error && <p className="text-sm text-red-600 dark:text-red-400">{error}</p>}
        
        <div>
          <button
            type="submit"
            className="w-full inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-sky-500 text-white hover:bg-sky-600 h-10 px-4 py-2"
          >
            {isEditing ? 'Salvar Alterações' : 'Publicar Edição'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewsletterForm;
