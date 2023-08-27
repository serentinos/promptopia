import Prompt from "@/models/prompt";
import { connectToDB } from "@/utils/db";


export const POST = async (req: Request, res: Response) => {
  const { userId, prompt, tag } = await req.json();

  try {
    await connectToDB();
    const newPrompt = new Prompt({
      creator: userId,
      prompt,
      tag,
    })

    await newPrompt.save();

    return new Response(JSON.stringify(newPrompt), {
      status: 201,
    })
  } catch (error) {
    console.log(error)
    return new Response("Failed to create new Prompt", {
      status: 501,
    })
  }
}
