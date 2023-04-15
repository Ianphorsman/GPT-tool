import Head from "next/head";

const Docs = ({ children }) => {
    return (
        <>
            <Head>
                <title>Design System</title>
                <meta name="description" content="Design System" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className="flex min-h-screen flex-col items-center justify-center">
                {children}
            </main>
        </>
    )
}

export default Docs