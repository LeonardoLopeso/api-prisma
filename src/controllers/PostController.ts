import { Request, Response } from 'express';
import { prisma } from '../database';
import { CreatePostService } from '../service/CreatePostService';
import { PostRepository } from '../repositories/PostRepositories';

export default {
  async createPost(request: Request, response: Response) {
    try {
      const { title, content, userId } = request.body;

      const createPost = new CreatePostService(new PostRepository());

      const post = await createPost.execute(
        title,
        content,
        userId
      );

      return response.json({
        error: false,
        message: "Sucesso: Post cadastrado com sucesso!",
        post
      })

    } catch (error) {
      return response.json({ message: error.message })
    }
  },

  async listAllPosts(request: Request, response: Response) {
    try {
      const post = await prisma.post.findMany();

      if(!post) {
        return response.json({
          error: true,
          message: "Error: Posts não encontrado!",
        })
      }

      return response.json({
        error: false,
        posts: post
      })

    } catch (error) {
      return response.json({ message: error.message })
    }
  },

  async listPost(request: Request, response: Response) {
    try {
      const { id } = request.params;

      const post = await prisma.post.findUnique({ where: {id: Number(id)} });

      if(!post) {
        return response.json({
          error: true,
          message: "Error: Post não encontrado!",
        })
      }

      return response.json({
        error: false,
        post
      })

    } catch (error) {
      return response.json({ message: error.message })
    }
  },

  async updatePost(request: Request, response: Response) {
    try {
      const { id, title, content } = request.body;

      const postExist = await prisma.post.findUnique({ where: {id: Number(id)} });

      if(!postExist) {
        return response.json({
          error: true,
          message: "Error: Post não encontrado!",
        })
      }

      const post = await prisma.post.update({
        where: {
          id: Number(request.body.id)
        },
        data: {
          title,
          content
        }
      })

      return response.json({
        error: false,
        message: 'Sucesso: Post atualizado com sucesso!',
        post
      })

    } catch (error) {
      return response.json({ message: error.message })
    }
  },

  async deletePost(request: Request, response: Response) {
    try {
      const { id } = request.params;

      const postExist = await prisma.post.findUnique({ where: {id: Number(id)} });

      if(!postExist) {
        return response.json({
          error: true,
          message: "Error: Post não encontrado!",
        })
      }

      const post = await prisma.post.delete({
        where: {
          id: Number(id)
        }
      })

      return response.json({
        error: false,
        message: 'Sucesso: Post deletado com sucesso!',
        post
      })

    } catch (error) {
      return response.json({ message: error.message })
    }
  }
}