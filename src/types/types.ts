import { Timestamp } from "firebase/firestore";

export interface Blog {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
    image: string;
  authorName?:string;
  category?:string;
  tags?: string[];
  comments?:string[];
  }
  
  export interface Comment {
    id: string;
    content: string;
    createdAt: Timestamp;
    userName: string;
    userPhoto?: string;
  }
  
  export interface UserData {
    username?: string;
    email?: string;
    bio?: string;
  }