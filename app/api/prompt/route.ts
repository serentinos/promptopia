import Prompt from "@/models/prompt";
import { connectToDB } from "@/utils/db";

export const GET = async (request: Request) => {
  await connectToDB();
  
  try {

    const prompts = await Prompt.find({}).populate('creator');

    return new Response(JSON.stringify(prompts), {
      status: 200,
    })
  } catch (error) {
    console.log(error);
    return new Response('Failed to fetch all prompts', {
      status: 500,
    })
  }
};