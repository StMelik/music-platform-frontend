import { useState } from 'react'
import styles from './navbar.module.scss'

function NavBar() {
    const [open, setOpen] = useState(false)

    function handleMenuOpen() {
        setOpen(true)
    }

    function handleMenuClose() {
        setOpen(false)
    }

    return (
        <nav className={styles.nav}>
            <button
                className={styles['button-open']}
                onClick={handleMenuOpen}
            >
                Открыть
            </button>

            {open &&
                <div className={styles.menu}>
                    <button
                        className={styles["button-close"]}
                        onClick={handleMenuClose}
                    >
                        Закрыть
                    </button>
                    <ul className={styles.list}>
                        <li className={styles.item}>
                            <a className={styles.link} href="">Главная</a>
                        </li>
                        <li className={styles.item}>
                            <a className={styles.link} href="">Альбомы</a>
                        </li>
                        <li className={styles.item}>
                            <a className={styles.link} href="">Треки</a>
                        </li>
                    </ul>
                </div>
            }

        </nav>
    )
}

export default NavBar