import { generateImagePrompt } from "@/lib/openai"
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"

interface AuthResult {
  userId: string | null;
}

export async function POST(req: Request){

  const { userId }: AuthResult = auth();

    if (!userId){
        return new NextResponse("unauthorised", {status: 401})
    }

    const body = await req.json()
    const {name} = body
    try{
        const image_description = await generateImagePrompt(name);
        console.log({image_description})
        return new NextResponse("ok")
    }
    catch(error){
        return NextResponse.json(error, {
            status: 401
        })
    }

}