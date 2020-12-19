import React, { useEffect, useRef, useState } from 'react'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    btnLogin: {
        borderRadius: "50%",
        marginLeft: "5px",
        marginRight: "-9px",
        padding: "4px",
        width: "25px",
        background: "#F3A63C",
        fontWeight: "bolder",
        textAlign: "center"
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));



const Header = ({ handleChange, displayName, signout }) => {
    const classes = useStyles();
    const [show, setShow] = useState(false);
    const ulref = useRef(null)
    const inputSearchRef = useRef()



    useEffect(() => {
        setTimeout(() => {
            inputSearchRef.current.children[0].value = "";
        }, 1500)
    }, [handleChange])

    const showMenu = () => {
        let ulElement = ulref.current
        setShow(!show)
        if (!show) {
            setTimeout(() => {
                ulElement.style.animation = "1s"
                ulElement.classList.add('displayed')
            }, 100)
        } else {
            ulElement.classList.remove('displayed')
        }
    }

    const closeMenuAfterChoose = () => {
        let ulElement = ulref.current
        ulElement.style.transition = "1s"
        ulElement.classList.remove('displayed')
        setShow(false)
    }




    return (

        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        edge="start"
                        className={classes.menuButton}
                        color="inherit"
                        aria-label="open drawer"
                        onClick={showMenu}>
                        <MenuIcon />
                    </IconButton>
                    <Typography className={classes.title} variant="h6" noWrap>
                        E-STOCK
            </Typography>
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>
                        <InputBase ref={inputSearchRef} onChange={handleChange}
                            placeholder="Pesquisar produto"
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            inputProps={{ 'aria-label': 'search' }}
                        />



                    </div>
                    
                        <ul ref={ulref} onClick={closeMenuAfterChoose}>
                            <li>
                                <Link to="/add-produto">Adicionar Produto</Link>
                            </li>
                            <li>
                                <Link to="/disponivel">Controle de massa</Link>
                            </li>
                            <li>
                                <Link to="/pizzas">Pizzas</Link>
                            </li>

                        </ul>
                    


                    {/* <Button color="inherit" ></Button> */}
                    <div className={classes.btnLogin} onClick={signout}>
                        <span >{displayName.toUpperCase()}</span>
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    );


}
export default Header;