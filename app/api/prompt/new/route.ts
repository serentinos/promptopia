import Prompt from "@/models/prompt";
import { connectToDB } from "@/utils/db";
import { formatTag } from "@/utils/formatTag";


export const POST = async (req: Request, res: Response) => {
  const { userId, prompt, tag } = await req.json();
  const formatedTag = formatTag(tag);
  await connectToDB();


  try {
    const newPrompt = new Prompt({
      creator: userId,
      prompt,
      tag: formatedTag,
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
