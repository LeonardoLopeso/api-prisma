import Express from 'express';
import UserController from './controllers/UserController';
import PostController from './controllers/PostController';

const app = Express();
app.use(Express.json());
const PORT = 8000;

app.get('/', (request, response) => {
  return response.send({ message: "API - Prisma" })
})

app.post('/user', UserController.createUser);

app.post('/post', PostController.createPost);
app.get('/listAllPosts', PostController.listAllPosts);
app.get('/listPost/:id', PostController.listPost);
app.put('/updatePost', PostController.updatePost);
app.delete('/deletePost/:id', PostController.deletePost);

app.listen(PORT, () => {
  console.log('Sever is running: '+PORT);
});