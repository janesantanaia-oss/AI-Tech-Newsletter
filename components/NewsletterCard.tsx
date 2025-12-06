
import React from 'react';
import { Link } from 'react-router-dom';
import { Newsletter } from '../types';

interface NewsletterCardProps {
  article: Newsletter;
}

const NewsletterCard: React.FC<NewsletterCardProps> = ({ article }) => {
  const preview = article.contentMarkdown.split('\n').slice(0, 4).join(' ').substring(0, 150) + '...';

  return (
    <Link to={`/article/${article.id}`} className="block group">
      <div className="p-6 bg-white dark:bg-slate-800 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-slate-200 dark:border-slate-700 hover:border-sky-500 dark:hover:border-sky-500">
        <div className="flex justify-between items-baseline text-sm text-slate-500 dark:text-slate-400">
          <span>Edição #{article.issueNumber}</span>
          <time dateTime={article.publishedDate}>{new Date(article.publishedDate).toLocaleString('pt-BR', { year: 'numeric', month: 'long', day: 'numeric' })}</time>
        </div>
        <h2 className="mt-2 text-xl font-bold text-slate-900 dark:text-slate-100 group-hover:text-sky-600 dark:group-hover:text-sky-500 transition-colors">
          {article.title}
        </h2>
        <h3 className="text-md text-slate-600 dark:text-slate-300 mt-1">
          {article.subtitle}
        </h3>
        <p className="mt-4 text-slate-600 dark:text-slate-400 leading-relaxed">
          {preview}
        </p>
        <div className="mt-4 text-sky-600 dark:text-sky-500 font-semibold group-hover:underline">
          Ler mais &rarr;
        </div>
      </div>
    </Link>
  );
};

export default NewsletterCard;