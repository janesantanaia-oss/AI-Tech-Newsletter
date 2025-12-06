

import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { getNewsletters, deleteNewsletter } from '../services/newsletterService';
import { Newsletter } from '../types';

const Admin: React.FC = () => {
  const [articles, setArticles] = useState<Newsletter[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterIssue, setFilterIssue] = useState('');
  const [filterDate, setFilterDate] = useState('');

  const fetchArticles = async () => {
    setLoading(true);
    const data = await getNewsletters();
    setArticles(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchArticles();
  }, []);
  
  const filteredArticles = useMemo(() => {
    return articles.filter(article => {
      const issueMatch = filterIssue ? String(article.issueNumber).includes(filterIssue) : true;
      const dateMatch = filterDate 
        ? new Date(article.publishedDate).toISOString().split('T')[0] === filterDate 
        : true;
      return issueMatch && dateMatch;
    });
  }, [articles, filterIssue, filterDate]);

  const handleDelete = async (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir esta edição?')) {
      await deleteNewsletter(id);
      fetchArticles(); // Re-fetch articles to update the list
    }
  };
  
  const handleClearFilters = () => {
    setFilterIssue('');
    setFilterDate('');
  };

  if (loading) {
    return <div className="text-center py-20">Carregando edições...</div>;
  }
  
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 sm:text-4xl">
          Admin de Edições
        </h1>
        <Link
          to="/admin/new"
          className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-sky-500 text-white hover:bg-sky-600 h-10 px-4 py-2"
        >
          Criar Nova Edição
        </Link>
      </div>

      <div className="mb-6 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row gap-4 items-center">
        <div className="flex-grow w-full sm:w-auto">
          <label htmlFor="filter-issue" className="sr-only">Filtrar por edição</label>
          <input
            type="number"
            id="filter-issue"
            placeholder="Filtrar por nº da edição..."
            value={filterIssue}
            onChange={(e) => setFilterIssue(e.target.value)}
            className="block w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
          />
        </div>
        <div className="flex-grow w-full sm:w-auto">
           <label htmlFor="filter-date" className="sr-only">Filtrar por data</label>
           <input
            type="date"
            id="filter-date"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            className="block w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm text-slate-500 dark:text-slate-400"
          />
        </div>
        <button
          onClick={handleClearFilters}
          className="w-full sm:w-auto inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 h-10 px-4 py-2"
        >
          Limpar Filtros
        </button>
      </div>
      
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md border border-slate-200 dark:border-slate-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700">
            <thead className="bg-slate-50 dark:bg-slate-700">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">Edição</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">Título</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">Data</th>
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">Ações</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
              {filteredArticles.map((article) => (
                <tr key={article.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900 dark:text-slate-100">#{article.issueNumber}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600 dark:text-slate-300">{article.title}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600 dark:text-slate-300">
                    {new Date(article.publishedDate).toLocaleDateString('pt-BR')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Link to={`/admin/edit/${article.id}`} className="text-sky-600 hover:text-sky-800 dark:text-sky-500 dark:hover:text-sky-400 mr-4">Editar</Link>
                    <button onClick={() => handleDelete(article.id)} className="text-red-600 hover:text-red-800 dark:text-red-500 dark:hover:text-red-400">Excluir</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
       {filteredArticles.length === 0 && (
          <div className="text-center py-16">
            <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200">
              Nenhuma edição encontrada
            </h2>
            <p className="mt-2 text-slate-600 dark:text-slate-400">
              {filterIssue || filterDate ? 'Tente ajustar seus filtros.' : 'Clique em "Criar Nova Edição" para começar.'}
            </p>
          </div>
        )}
    </div>
  );
};

export default Admin;
