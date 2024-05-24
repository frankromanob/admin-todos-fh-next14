import prisma from '@/lib/prisma'
import { NextResponse, NextRequest } from 'next/server'
import bcrypt from 'bcryptjs';

export async function GET(request: Request) {

    await prisma.todo.deleteMany()
    await prisma.user.deleteMany()

    const user = await prisma.user.create({
        data: {
            email: 'test@google.com',
            password: bcrypt.hashSync('1234'),
            roles: ['admin', 'user', 'super user'],
            todos: {
                create: [
                    { description: 'Piedra del alma' },
                    { description: 'Piedra del poder' },
                    { description: 'Piedra del tiempo', complete: true },
                    { description: 'Piedra del realidad' },
                    { description: 'Piedra del espacio' },
                ]
            }
        }
    })

    // const todo = await prisma.todo.createMany({
    //     data: [
    //         {description: 'Piedra del alma'},
    //         {description: 'Piedra del poder'},
    //         {description: 'Piedra del tiempo', complete:true},
    //         {description: 'Piedra del realidad'},
    //         {description: 'Piedra del espacio'},
    //     ]
    // })

    return NextResponse.json({
        message: 'Seed inserted',
        user
    })
}