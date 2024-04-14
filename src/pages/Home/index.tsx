import GlitchText from "../../components/GlitchText"
import Header from "../../components/Header"

function Home() {

  return (
    <>
      <Header />
      <main className="h-full w-full flex justify-center items-center flex-col">
        
        <p className="text-2xl -mb-4 uppercase text-center tracking-[.8rem] z-10 xs:text-3xl xs:tracking-[1rem] md:text-4xl md:mb-0 lg:text-[2.8rem]">Coming soon a new</p>
        
        <GlitchText />
      </main>
    </>
  ) 
}

export default Home