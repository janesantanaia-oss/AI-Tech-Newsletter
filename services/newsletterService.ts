
import { Newsletter } from '../types';

// Dados de exemplo para substituir a necessidade do Supabase
let mockNewsletters: Newsletter[] = [
  {
    id: '2',
    issueNumber: 2,
    title: 'A Ascensão dos Modelos de IA Multimodais',
    subtitle: 'Como a combinação de texto, imagens e som está revolucionando a inteligência artificial.',
    author: 'Equipe AI Tech Newsletter',
    publishedDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    contentMarkdown: `### O Que São Modelos Multimodais?\n\nModelos de IA multimodais são sistemas capazes de processar e entender informações de múltiplas fontes (modalidades) simultaneamente, como texto, imagens, áudio e vídeo. Diferente de modelos que lidam com apenas um tipo de dado, os multimodais conseguem criar uma compreensão mais rica e contextualizada do mundo, similar à percepção humana.\n\n### Exemplos em Ação\n\n**Geração de Imagem a partir de Texto:** Ferramentas como DALL-E e Midjourney são exemplos clássicos. Elas recebem uma descrição em texto e geram uma imagem correspondente, demonstrando uma profunda compreensão da relação entre palavras e conceitos visuais.\n\n**Análise de Vídeo:** Um modelo multimodal pode analisar um vídeo, transcrever a fala, identificar objetos e pessoas, e até mesmo descrever as ações que estão ocorrendo. Isso tem aplicações em segurança, edição de conteúdo e acessibilidade.\n\n**Assistentes Virtuais Avançados:** Assistentes como o futuro GPT-4o podem ver o que você está vendo através da câmera do seu celular, ouvir sua pergunta e responder verbalmente, combinando visão computacional e processamento de linguagem natural em tempo real.\n\n---\n\n### Por Que Isso Importa?\n\nA multimodalidade é o próximo grande passo para uma IA mais intuitiva e poderosa. Ela permite que as máquinas interajam conosco de maneira mais natural e resolvam problemas complexos que exigem a síntese de diferentes tipos de informação. Estamos caminhando para um futuro onde a barreira entre o mundo digital e o físico se torna cada vez mais tênue, graças a esses avançados sistemas de IA.`
  },
  {
    id: '1',
    issueNumber: 1,
    title: 'Gemini: A Nova Geração da IA do Google',
    subtitle: 'Uma análise profunda sobre a janela de contexto de 1 milhão de tokens e suas implicações.',
    author: 'Equipe AI Tech Newsletter',
    publishedDate: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
    contentMarkdown: `### Uma Janela para o Futuro\n\nO Google anunciou recentemente o Gemini, um modelo que promete redefinir os limites do que a inteligência artificial pode fazer. A principal inovação é sua gigantesca janela de contexto de 1 milhão de tokens. Mas o que isso significa na prática?\n\n**O que é Janela de Contexto?**\n\nA janela de contexto é a quantidade de informação que um modelo de IA pode "lembrar" e processar em uma única conversa ou tarefa. Modelos anteriores tinham limitações de alguns milhares de tokens, o que dificultava a análise de documentos longos, bases de código complexas ou conversas extensas.\n\n### Capacidades Impressionantes\n\nCom 1 milhão de tokens, o Gemini pode processar de uma só vez:\n\n- **Livros inteiros:** Analisar obras literárias, encontrar temas e resumir capítulos em segundos.\n- **Bases de código massivas:** Entender a arquitetura de um software complexo, encontrar bugs e sugerir otimizações.\n- **Horas de vídeo:** Processar transcrições de vídeo para identificar momentos-chave e gerar resumos.\n\nEssa capacidade de processar vastas quantidades de informação de forma coesa abre portas para aplicações revolucionárias em pesquisa, desenvolvimento de software, análise de dados e muito mais.\n\n---\n\n### O Impacto no Desenvolvimento\n\nPara desenvolvedores, isso significa a possibilidade de criar aplicações mais inteligentes e contextualmente cientes. Imagine um chatbot de suporte ao cliente que pode ler todo o histórico de um usuário instantaneamente ou uma ferramenta de programação que entende todo o projeto em que você está trabalhando. O Gemini não é apenas uma melhoria incremental; é um salto quântico nas capacidades da IA.`
  },
];

export const getNewsletters = async (): Promise<Newsletter[]> => {
  // Simula um atraso de rede
  await new Promise(resolve => setTimeout(resolve, 500));
  return Promise.resolve([...mockNewsletters].sort((a, b) => b.issueNumber - a.issueNumber));
};

export const getNewsletterById = async (id: string): Promise<Newsletter | undefined> => {
  // Simula um atraso de rede
  await new Promise(resolve => setTimeout(resolve, 300));
  const article = mockNewsletters.find(article => article.id === id);
  return Promise.resolve(article);
};

export const addNewsletter = async (articleData: Partial<Omit<Newsletter, 'id' | 'author'>>): Promise<Newsletter> => {
  // Simula um atraso de rede
  await new Promise(resolve => setTimeout(resolve, 700));

  const newArticle: Newsletter = {
    id: String(Date.now()), // Usa um ID simples para os dados de exemplo
    issueNumber: articleData.issueNumber || mockNewsletters.reduce((max, a) => Math.max(a.issueNumber, max), 0) + 1,
    publishedDate: articleData.publishedDate || new Date().toISOString(),
    author: 'Equipe AI Tech Newsletter',
    title: articleData.title || 'Sem Título',
    subtitle: articleData.subtitle || '',
    contentMarkdown: articleData.contentMarkdown || '',
  };

  mockNewsletters.unshift(newArticle);
  
  return Promise.resolve(newArticle);
};

export const updateNewsletter = async (id: string, data: Partial<Omit<Newsletter, 'id'>>): Promise<Newsletter | undefined> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  const index = mockNewsletters.findIndex(n => n.id === id);
  if (index > -1) {
      mockNewsletters[index] = { ...mockNewsletters[index], ...data };
      return Promise.resolve(mockNewsletters[index]);
  }
  return Promise.resolve(undefined);
};

export const deleteNewsletter = async (id: string): Promise<boolean> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  const initialLength = mockNewsletters.length;
  mockNewsletters = mockNewsletters.filter(n => n.id !== id);
  return Promise.resolve(mockNewsletters.length < initialLength);
};
