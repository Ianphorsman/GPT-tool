import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";
import { type NextPage } from "next";
import Head from "next/head";
import Playground from "./chat/playground";

/* const Home: NextPage = () => {
  const user = useUser()

  return (
    <>
      <Head>
        <title>Generative AI Playground</title>
        <meta name="description" content="Generative AI Playground" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        {!user.isSignedIn && <SignInButton />}
        {!!user.isSignedIn && <SignOutButton />}
      </main>
    </>
  );
};

export default Home;*/
export default Playground
