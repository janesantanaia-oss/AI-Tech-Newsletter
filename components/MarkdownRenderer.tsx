
import React from 'react';

interface MarkdownRendererProps {
  content: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  const lines = content.split('\n');

  return (
    <div className="prose prose-slate dark:prose-invert max-w-none leading-7">
      {lines.map((line, index) => {
        if (line.startsWith('### ')) {
          return <h3 key={index} className="text-xl font-bold mt-8 mb-4">{line.substring(4)}</h3>;
        }
        if (line.startsWith('**') && line.endsWith('**')) {
           return <p key={index} className="font-bold my-4">{line.substring(2, line.length - 2)}</p>;
        }
        if (line.startsWith('- ')) {
          return <li key={index} className="ml-5 list-disc">{line.substring(2)}</li>;
        }
        if (line.trim() === '---') {
          return <hr key={index} className="my-8 border-slate-200 dark:border-slate-700" />;
        }
        if (line.trim() === '') {
            return <div key={index} className="h-4"></div>;
        }
        return <p key={index} className="my-4">{line}</p>;
      })}
    </div>
  );
};

export default MarkdownRenderer;
