import { auth } from '@/app/auth'
import prisma from '@/lib/prisma'
import { NextResponse, NextRequest } from 'next/server'

export async function GET(request: Request) {

    const { searchParams } = new URL(request.url)

    const take = searchParams.get('take') ?? '5'
    const skip = searchParams.get('skip') ?? '0'

    const todos = await prisma.todo.findMany({
        take: Number(take),
        skip: Number(skip),
    })

    return NextResponse.json(todos)

}


export async function POST(request: Request) {

    const body = await request.json()

    const todo = await prisma.todo.create({ data: body })

    return NextResponse.json(todo, { status: 201 })
}


export async function DELETE(request: Request) {

    const session = await auth()
    if (!session) {
        return NextResponse.json({ status: 404 })
    }
    //console.log(session.user?.id)
    const todo = await prisma.todo.deleteMany({ where: { userId: session.user?.id, complete: true } })

    return NextResponse.json(todo, { status: 200 })
}