import React, { useState, useEffect, useMemo } from 'react';
import { getNewsletters } from '../services/newsletterService';
import { Newsletter } from '../types';
import NewsletterCard from '../components/NewsletterCard';

interface HomeProps {
  searchQuery: string;
}

const Home: React.FC<HomeProps> = ({ searchQuery }) => {
  const [articles, setArticles] = useState<Newsletter[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      const data = await getNewsletters();
      setArticles(data);
      setLoading(false);
    };
    fetchArticles();
  }, []);

  const filteredArticles = useMemo(() => {
    return articles.filter(article => {
      if (!searchQuery) {
        return true;
      }
      const lowercasedQuery = searchQuery.toLowerCase();
      return (
        article.title.toLowerCase().includes(lowercasedQuery) ||
        article.contentMarkdown.toLowerCase().includes(lowercasedQuery)
      );
    });
  }, [articles, searchQuery]);

  const renderContent = () => {
    if (loading) {
      return (
        <div className="space-y-8">
          {[...Array(2)].map((_, i) => (
             <div key={i} className="p-6 bg-white dark:bg-slate-800 rounded-xl shadow-md border border-slate-200 dark:border-slate-700 animate-pulse">
                <div className="flex justify-between items-baseline">
                    <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/4"></div>
                    <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/3"></div>
                </div>
                <div className="mt-4 h-6 bg-slate-200 dark:bg-slate-700 rounded w-3/4"></div>
                <div className="mt-2 h-5 bg-slate-200 dark:bg-slate-700 rounded w-1/2"></div>
                <div className="mt-6 space-y-2">
                    <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded"></div>
                    <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-5/6"></div>
                </div>
            </div>
          ))}
        </div>
      );
    }

    if (filteredArticles.length > 0) {
      return (
        <div className="space-y-8">
          {filteredArticles.map(article => (
            <NewsletterCard key={article.id} article={article} />
          ))}
        </div>
      );
    }

    return (
      <div className="text-center py-16">
        <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200">
          Nenhum artigo encontrado
        </h2>
        <p className="mt-2 text-slate-600 dark:text-slate-400">
          Tente ajustar seus termos de pesquisa.
        </p>
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 sm:text-5xl">
          Edições Recentes
        </h1>
        <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
          Mantenha-se atualizado com as últimas novidades do mundo da Inteligência Artificial.
        </p>
      </div>
      
      {renderContent()}
    </div>
  );
};

export default Home;
