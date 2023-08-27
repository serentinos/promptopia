interface Prompt {
  prompt: string,
  tag: string,
}

interface UserFromServer {
  _id: number,
  email: string,
  username: string,
  image: string,
}

interface PromptFromServer extends Prompt {
  _id: number,
  creator: UserFromServer,
}