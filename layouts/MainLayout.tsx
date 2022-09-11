import React from "react"
import NavBar from "../components/NavBar/NavBar"
import Player from "../components/Player/Player"
import Head from "../node_modules/next/head"

interface MainLayoutProps {
    title?: string,
    children: React.ReactNode,
    description?: string,
    keywords?: string,

}

const MainLayout: React.FC<MainLayoutProps> = ({ children, title, description, keywords }) => {
    return (
        <>
            <Head>
                <title>{title || 'Музыкальная площадка'}</title>
                <meta name="description" content={'Музыкальная площадка. Здесь каждый может оставть свой трек и стать популярным. ' + description} />
                <meta name="robots" content="index, follow" />
                <meta name="keywords" content={'Музыка, треки, артисты, ' + keywords} />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <NavBar />
            <div className="container">
                {children}
            </div>
            <Player />
        </>
    )
}

export default MainLayout