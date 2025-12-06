
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleGenAI } from '@google/genai';
import { addNewsletter } from '../services/newsletterService';

const CreateArticle: React.FC = () => {
  const [topic, setTopic] = useState('');
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [contentMarkdown, setContentMarkdown] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleGenerateContent = async () => {
    if (!topic) {
      setError('Por favor, insira um tópico para gerar o conteúdo.');
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const prompt = `
        Você é um redator especialista em newsletters de tecnologia sobre Inteligência Artificial.
        Sua tarefa é gerar o conteúdo para uma nova edição da "AI Tech Newsletter".
        O tópico principal é: "${topic}".
        
        Gere o seguinte em formato JSON:
        1.  "title": Um título curto, impactante e informativo para a newsletter.
        2.  "subtitle": Um subtítulo que complementa o título e resume o conteúdo em uma frase.
        3.  "contentMarkdown": O corpo do artigo em formato Markdown. Use títulos (###), negrito (**) e listas (-). Mantenha um tom profissional e informativo, similar a artigos de tecnologia. O conteúdo deve ser bem estruturado e detalhado.
        
        Responda APENAS com o objeto JSON, sem nenhum texto, comentários ou formatação de código como \`\`\`json.
      `;
      
      const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: prompt,
          config: {
              responseMimeType: 'application/json',
          }
      });
      
      const result = JSON.parse(response.text);
      
      setTitle(result.title || '');
      setSubtitle(result.subtitle || '');
      setContentMarkdown(result.contentMarkdown || '');

    } catch (e) {
      console.error(e);
      setError('Ocorreu um erro ao gerar o conteúdo. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !contentMarkdown) {
      setError('Título e conteúdo são obrigatórios para publicar.');
      return;
    }
    await addNewsletter({ title, subtitle, contentMarkdown });
    navigate('/');
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 sm:text-4xl mb-8">
        Criar Nova Edição
      </h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="topic" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            1. Tópico da Newsletter
          </label>
          <div className="mt-1 flex gap-2">
            <input
              type="text"
              id="topic"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="block w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
              placeholder="Ex: Últimas atualizações do Google e OpenAI"
            />
            <button
              type="button"
              onClick={handleGenerateContent}
              disabled={isLoading}
              className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-sky-500 text-white hover:bg-sky-600 h-10 px-4 py-2 flex-shrink-0"
            >
              {isLoading ? 'Gerando...' : 'Gerar Conteúdo com IA'}
            </button>
          </div>
        </div>

        {error && <p className="text-sm text-red-600 dark:text-red-400">{error}</p>}
        
        <hr className="border-slate-200 dark:border-slate-700" />
        
        <div>
          <h2 className="text-lg font-medium text-slate-900 dark:text-slate-100">2. Revise e Edite o Conteúdo</h2>
        </div>

        <div>
          <label htmlFor="title" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            Título
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
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
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            className="mt-1 block w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="content" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            Conteúdo (Markdown)
          </label>
          <textarea
            id="content"
            rows={20}
            value={contentMarkdown}
            onChange={(e) => setContentMarkdown(e.target.value)}
            className="mt-1 block w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm font-mono"
            required
          />
        </div>
        <div>
          <button
            type="submit"
            className="w-full inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-slate-900 text-white hover:bg-slate-800 dark:bg-sky-500 dark:hover:bg-sky-600 h-10 px-4 py-2"
          >
            Publicar Edição
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateArticle;
