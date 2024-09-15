import { Hono } from 'hono'

import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'

const prisma = new PrismaClient().$extends(withAccelerate())
import { sign, decode, verify } from 'hono/jwt'

const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string,
    JWT_SECRET: string,
  }
}>() //to specify the type of env variables



userRouter.post('/signup', async (c)=>{
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
  
    const body = await c.req.json()
  
    const user = await prisma.user.create({
      data: {
        username: body.username,
        email: body.username,
        password: body.password,
      }
    });
  
    if(!user){
      c.status(403)
      return c.json({error: "failed to create user"})
    }
  
    const token = await sign({id: user.id, username: user.username, email: user.email}, c.env.JWT_SECRET);
    console.log("token: ", token);
    return c.json({"token: ": token});
  })
  
  userRouter.post('/signin', async (c)=>{
    try {
        const { username, password } = await c.req.json();
        const prisma = new PrismaClient({
          datasourceUrl: c.env.DATABASE_URL,
        }).$extends(withAccelerate())
      
        const currentUser = await prisma.user.findFirst({where: { username }});
        if(!currentUser){
            c.status(404);
            return c.json({message: "user doesn't exist"});
        }
        if(currentUser?.password !== password){
            c.status(403);
            return c.json({message: "unauthorised"})
        }

        return c.json({message: `user ${currentUser?.username} is loggedIn`, user: currentUser})
    } catch (error) {
        console.log(error);
    }
  })

  export default userRouter;