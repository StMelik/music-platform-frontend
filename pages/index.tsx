import NavBar from '../components/NavBar/NavBar'
import styles from '../styles/index.module.scss'

function Index() {
    return (
        <>
            <NavBar isMain />
            <div className={styles.main}>
                <div className="container main-container">
                    <div className={styles.mainWrapper}>
                        <h1 className={styles.title}>Добро пожаловать!</h1>
                        <h3 className={styles.subtitle}>Здесь собраны все лучшие треки</h3>
                    </div>
                </div>
            </div>

            <style jsx>
                {`
                    .main-container {
                        margin-top: 0;
                    }
                `}
            </style>
        </>
    )
}

export default Index
