import React, { useState } from 'react'
import Link from 'next/link'
import styles from './navbar.module.scss'
import { CSSTransition } from 'react-transition-group';

interface NavBarProps {
    isMain?: boolean,
}

const NavBar: React.FC<NavBarProps> = ({ isMain }) => {
    const [open, setOpen] = useState(false)

    const links = [
        { href: '/', text: 'Главная' },
        { href: '/albums', text: 'Альбомы' },
        { href: '/tracks', text: 'Треки' },
    ]

    const navCl = [styles.nav, styles.navMain]

    function handleMenuOpen() {
        setOpen(true)
    }

    function handleMenuClose() {
        setOpen(false)
    }

    return (
        <>
            <nav className={isMain ? navCl.join(' ') : navCl[0]}>
                <button
                    className={`${styles.buttonOpen} ${styles.button}`}
                    onClick={handleMenuOpen}
                />
                <CSSTransition
                    in={open}
                    timeout={500}
                    classNames="menu"
                    mountOnEnter
                    unmountOnExit
                >
                    <div className={styles.menu}>
                        <button
                            className={`${styles.buttonClose} ${styles.button}`}
                            onClick={handleMenuClose}
                        />
                        <ul className={styles.list}>
                            {links.map(({ href, text }, id) =>
                                <li key={id} >
                                    <Link href={href}>
                                        <a className={styles.link} >{text}</a>
                                    </Link>
                                </li>
                            )}
                        </ul>
                    </div>
                </CSSTransition >
            </nav>

            <style jsx>
                {`
                .menu-enter {
                    transform: translateX(-100%);
                }
                .menu-enter-active {
                    transform: translateX(0);
                    transition: transform 0.5s;
                }
                .menu-exit {
                    transform: translateX(0);
                }
                .menu-exit-active {
                    transform: translateX(-100%);
                    transition: transform 0.5s;
                }
                `}
            </style>
        </>
    )
}

export default NavBar