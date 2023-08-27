interface Prompt {
  prompt: string,
  tag: string,
}

interface PromptFromServer extends Prompt {
  _id: number
  creator: {
    _id: number,
    email: string,
    username: string,
    image: string,
  }
}