// GET read

import Prompt from "@/models/prompt";
import { connectToDB } from "@/utils/db";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";

// Patch (update)

// Delete (delete)
export const GET = async (reguest: Request, { params }: Params) => {
  const { id } = params;
  
  try {
    await connectToDB();

    const prompt = await Prompt.findOne({
      _id: id
    }).populate('creator');

    if (!prompt) {
      return new Response('Prompt not found', { status: 404 });
    }

    return new Response(JSON.stringify(prompt), {
      status: 200,
    })
  } catch (error) {
    return new Response('Failed to fetch prompt', {
      status: 500,
    })
  }
};

export const PATCH = async (req: Request, { params }: Params) => {
  const { id } = params;
  const { prompt, tag } = await req.json();
  
  try {
    await connectToDB();

    const newPrompt = await Prompt.findOneAndUpdate({
      _id: id
    }, { prompt, tag }, { new: true }).populate('creator');

    if (!newPrompt) {
      return new Response('Prompt not found', { status: 404 });
    }

    return new Response(JSON.stringify(newPrompt), {
      status: 200,
    })
  } catch (error) {
    console.log(error);
    return new Response('Failed to update prompt', {
      status: 500,
    })
  }
};

export const DELETE = async (reg: Request, { params }: Params) => {
  const { id } = params;
  
  try {
    await connectToDB();

    const isDeleted = await Prompt.deleteOne({
      _id: id
    })

    if (isDeleted.deletedCount === 0) {
      return new Response('Prompt not found or not deleted', { status: 404 });
    }

    return new Response('Deleted', {
      status: 200,
    });

  } catch (error) {
    console.log(error);
    return new Response('Failed to delete prompt', {
      status: 500,
    })
  }
}
