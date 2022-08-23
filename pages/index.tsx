import NavBar from '../components/NavBar/NavBar'
import styles from '../styles/index.module.scss'

function Index() {

    return (
        <>
            <NavBar />
            <div className={styles.main}>
                <h1 className={styles.title}>Добро пожаловать!</h1>
                <h3 className={styles.subtitle}>Здесь собраны все лучшие треки</h3>
            </div>
        </>

    )
}

export default Index