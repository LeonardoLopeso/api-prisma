import { Post } from "@prisma/client";

// Outro forma de passar a tipagem é criando um type
/*
type Post = {
  id: number;
  title: string | null;
  content: string;
  userId: number
}
*/

export interface IPostRepository {
  create(title: string, content: string, userId: number): Promise<Post>;
}