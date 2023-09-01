import { Request, Response } from "express";

export default {
  async createUser(request: Request, response: Response) {
    try {

    }catch (error) {
      return response.json({ message: error.message });
    }
  }
}