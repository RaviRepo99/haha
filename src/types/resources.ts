export type ResourceCategory =
  | 'certificates'
  | 'source-codes'
  | 'banners'
  | 'documents'
  | 'notes'
  | 'templates'
  | 'other'
  | 'selected-members'
  | 'budgets';

export type FileType = 'PDF' | 'Image' | 'Video' | 'Markdown' | 'Code' | 'Text' | 'Document' | 'Archive';

export type PreviewType = 'image' | 'pdf' | 'video' | 'markdown' | 'code' | 'text' | 'binary';

export interface ResourceItem {
  id: string;
  title: string;
  description: string;
  category: ResourceCategory;
  fileType: FileType;
  size: string;
  uploadedAt: string;
  downloads: number;
  previewType: PreviewType;
  previewUrl: string;
  downloadUrl: string;
  badge?: string;
  language?: string;
  framework?: string;
  technologies?: string[];
  repoUrl?: string;
}
