import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign, decode, verify } from 'hono/jwt'

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string,
    JWT_SECRET: string,
  }
}>() //to remove warning or error from c.env.....

app.get('/api/v1/', (c) => {
  return c.text("this is a home route!")
})

app.post('/api/v1/signup', async (c)=>{
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  console.log("body: c.req.json()", c.req.json());

  const body = await c.req.json();

  const user = await prisma.user.create({
    data: {
      username: body.username,
      email: body.username,
      password: body.password,
    }
  });

  const token = sign({id: user.id}, c.env.JWT_SECRET);
  return c.text('Hello Mr Hono!, I hope you are fine bro!')
})

app.post('/api/v1/signin', (c)=>{
  return c.text('hello, this is sign in route')
})

app.post('/post-blog', (c)=>{
  return c.text('Hello this is post blog route')
})

app.get('/api/v1/get-blog/:blogId', (c)=>{
  return c.text('Hello this is get specific blog')
})

app.put('/api/v1/update-blog', (c)=>{
  return c.text('hello, this is update blog rotue')
})

app.get('/api/v1/get-all-blogs', (c)=>{
  return c.text('this is get all blog routes')
})

export default app;
