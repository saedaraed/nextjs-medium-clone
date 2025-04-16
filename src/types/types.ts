export interface Blog {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
    image: string;
  authorName?:string;
  category?:string;
  tags?: string[];
  }
  