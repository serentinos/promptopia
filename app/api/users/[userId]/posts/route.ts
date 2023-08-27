import Prompt from "@/models/prompt";
import { connectToDB } from "@/utils/db";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";

export const GET = async (reguest: Request, { params }: Params) => {
  const { userId } = params;
  
  try {
    await connectToDB();

    const prompts = await Prompt.find({
      creator: userId
    }).populate('creator');

    return new Response(JSON.stringify(prompts), {
      status: 200,
    })
  } catch (error) {
    return new Response('Failed to fetch all prompts', {
      status: 500,
    })
  }
};