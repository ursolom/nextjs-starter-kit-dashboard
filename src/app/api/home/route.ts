import { NextResponse } from "next/server";

const data = [
    {
        name: "asd",
        age: 50
    },
    {
        name: "asdasd",
        age: 50
    },
    {
        name: "asdasd",
        age: 50
    },
    {
        name: "asdasd",
        age: 50
    },
    {
        name: "asdq",
        age: 50
    },
    {
        name: "asdw",
        age: 50
    },
    {
        name: "asdb",
        age: 50
    },
]
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))
export async function GET() {
    try {
        await delay(5000)
        return NextResponse.json(
            { message: "Successfully fetched data", data },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Cache-Control': 'no-store'
                }
            }
        );

    } catch (error) {
        return NextResponse.json("error")
    }
}