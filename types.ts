export interface Newsletter {
  id: string;
  title: string;
  subtitle: string;
  publishedDate: string;
  issueNumber: number;
  contentMarkdown: string;
  author: string;
}

export type Theme = 'light' | 'dark' | 'system';

export interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed',
    platform: string,
  }>;
  prompt(): Promise<void>;
}
