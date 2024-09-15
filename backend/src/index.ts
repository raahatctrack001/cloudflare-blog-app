import { Hono } from 'hono'

import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'

const prisma = new PrismaClient().$extends(withAccelerate())
import { sign, decode, verify } from 'hono/jwt'

import userRouter from './routes/users.routes'
import blogRouter from './routes/blog.routes'

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string,
    JWT_SECRET: string,
  }
}>() //to remove warning or error from c.env.....

app.route('/api/v1/user', userRouter);
app.route('/api/v1/blog', blogRouter);







export default app;
