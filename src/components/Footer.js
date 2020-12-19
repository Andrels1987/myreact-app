import React from 'react'
import HomeIcon from '@material-ui/icons/Home';
import { green } from '@material-ui/core/colors';
import { Link } from 'react-router-dom';

const Footer = () => {


    return (
        <footer className="container">
            <nav className="navbar">

                <div className="homeIcon">
                    <Link to="/">
                        <HomeIcon style={{ color: green[500] }} fontSize="large" />
                    </Link>
                </div>             

            </nav>

        </footer>
    )
}

export default Footer
