import { NextResponse, NextRequest } from 'next/server'

export async function GET(request: Request) {

    return NextResponse.json(
        {
            hola: 'Party People!!'
        }
    )
}


const numero = 1
const elyn = fetch(`http://elapi.com/${numero}`)