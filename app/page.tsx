import Feed from "@/components/Feed";

const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
        Discover and Share
        <br className="max-md:  "/>
        <span className="orange_gradient">AI-Powered prompts</span>
      </h1>

      <p className="desc text-center">Promptopia it an open-source AI programming tool</p>

      <Feed />
    </section>
  )
}

export default Home;