import { Hono } from 'hono'

import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'

import { verify } from 'hono/jwt'

const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string,
    JWT_SECRET: string,
  }, 
  Variables: {
    userId: string
  }
}>() //to specify the type of env variables

blogRouter.use('/*', async (c, next)=>{
    try {
        const authHeader = c.req.header("Authorization")?.split(" ")[1] || '';
        const decodedUser = await verify(authHeader, c.env.JWT_SECRET);
        if(!decodedUser){
            c.status(404)
            return c.json({message: "user doesn't exist"});
        }
        //@ts-ignore
        c.set("userId", decodedUser?.id);
        await next();
    
    } catch (error) {
        console.log("error:hai bhai error ", error)
    }
})


blogRouter.post('/post-blog', async (c)=>{
    const body = await c.req.json();
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const blog = await prisma.post.create({
        data: {
            title: body.title,
            content: body.content,
            authorId: c.get("userId")
        }
    });
    if(!blog){
        c.status(500)
        return c.json({message: "failed to add blog!"});
    }

    return c.json({message: "blog added!", blog})
})

blogRouter.get('/get-blog/:blogId', async (c)=>{
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const blogId = c.req.param("blogId");
    const blog = await prisma.post.findFirst({where: {id: blogId}});
    if(!blog){
        c.status(404);
        return c.json({message: "blog not found!"});
    }

    return c.json({message: "blog found!", blog: blog})

})

blogRouter.put('/update-blog/:postId', async (c)=>{
    const body = await c.req.json();
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())


    const updatedBlog = await prisma.post.update({
        where: {
            id: c.req.param("postId")
        },
        data: {
            title: body.title,
            content: body.content,
        }
    });
    if(!updatedBlog){
        c.status(500)
        return c.json({message: "failed to udpated blog!"});
    }

    return c.json({message: "blog updated!", updatedBlog})
})

blogRouter.get('/get-all-blogs', async (c)=>{
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const blogs = await prisma.post.findMany({})
    return c.json({blogs: blogs});

})

export default blogRouter;