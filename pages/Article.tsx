
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getNewsletterById } from '../services/newsletterService';
import { Newsletter } from '../types';
import MarkdownRenderer from '../components/MarkdownRenderer';
import { ArrowLeftIcon } from '../components/icons';

const Article: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [article, setArticle] = useState<Newsletter | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      if (!id) return;
      setLoading(true);
      const data = await getNewsletterById(id);
      setArticle(data || null);
      setLoading(false);
    };
    fetchArticle();
  }, [id]);

  if (loading) {
    return (
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 animate-pulse">
            <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/4 mb-8"></div>
            <div className="h-10 bg-slate-200 dark:bg-slate-700 rounded w-full mb-4"></div>
            <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded w-3/4 mb-10"></div>
            <div className="space-y-4">
                <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded"></div>
                <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded"></div>
                <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-5/6"></div>
            </div>
            <div className="my-8 h-px bg-slate-200 dark:bg-slate-700 rounded"></div>
             <div className="space-y-4">
                <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded w-1/2 mb-4"></div>
                <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded"></div>
                <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-5/6"></div>
            </div>
        </div>
    );
  }

  if (!article) {
    return <div className="text-center py-20">Artigo não encontrado.</div>;
  }

  return (
    <article className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <Link to="/" className="inline-flex items-center gap-2 text-sky-600 dark:text-sky-500 hover:underline mb-8">
        <ArrowLeftIcon className="w-5 h-5" />
        Voltar para todas as edições
      </Link>
      
      <header>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 sm:text-4xl">
          {article.title}
        </h1>
        <p className="mt-2 text-lg text-slate-600 dark:text-slate-400">
          {article.subtitle}
        </p>
        <div className="mt-4 text-sm text-slate-500 dark:text-slate-500">
          <span>Publicado em {new Date(article.publishedDate).toLocaleDateString('pt-BR', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
          <span className="mx-2">&middot;</span>
          <span>Edição #{article.issueNumber}</span>
        </div>
      </header>

      <div className="mt-8">
        <MarkdownRenderer content={article.contentMarkdown} />
      </div>
    </article>
  );
};

export default Article;
