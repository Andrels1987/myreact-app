import React, { useEffect, useRef, useState } from 'react'
import AddPizzas from './AddPizzas';
import AddCircleOutlinedIcon from '@material-ui/icons/AddCircleOutlined';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Button } from '@material-ui/core';
import Loading from '../Loading'
import { atualizarEstoque, showAddPizza, getAllPizzas } from '../components/Services/pizza.service'
import { slideInLeft } from 'react-animations'
import Radium, { StyleRoot } from 'radium';

const styles = {
    slideInLeft: {
        animation: 'x 1s',
        animationName: Radium.keyframes(slideInLeft, 'slideInLeft'),
    }
}

const useStyles = makeStyles({
    root: {
        minWidth: 15,
        maxHeight: 130,

    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        height: "40px",
        lineHeight: "18px",
        fontSize: 20,
        fontWeight: "bolder",
        color: "#F2B854 "
    },
    pos: {
        marginBottom: 12,
    },
    btn: {
        marginBottom: ".6rem",
        height: "25px",
    },
    btnPrimary: {
        lineHeight: "18px",
        fontSize: "11px",
        padding: "7px"
    }
});

const PizzaList = () => {
    const [loading, setLoading] = useState(true)
    const classes = useStyles();
    const [pizzas, setPizzas] = useState([])
    let addPizzaBox = useRef(null);
    let ref = addPizzaBox.current;

    useEffect(() => {
        let unsubscribe = getAllPizzas(setPizzas, setLoading)
        return  unsubscribe        
    }, [])
    

    return (
        <StyleRoot>

            {/* FORM PARA ADICIONAR NOVAS PIZZAS */}
            <div ref={addPizzaBox} className="add-pizza-box" >
                <AddPizzas reference={ref} />
            </div>


            {/* LISTA DE PIZZAS NO FIREBASE */}
            {loading ? <Loading /> : (
                <div style={styles.slideInLeft}>
                    <div className="container-list" >
                        {pizzas.map(pizza => (
                            <Card className={classes.root} key={pizza.id} style={{ textAlign: "center", color: "black" }}>
                                <Link to={`/pizza/${pizza.id}`}  >
                                    <CardContent>
                                        <Typography className={classes.title} color="textSecondary" gutterBottom>
                                            {pizza.nome}
                                        </Typography>
                                    </CardContent>
                                </Link>
                                <div className={classes.btn}>
                                    <Button className={classes.btnPrimary} variant="contained" color="primary" onClick={() => atualizarEstoque(pizza.id)}>Atualizar Estoque</Button>
                                </div>
                            </Card>



                        ))}
                    </div>
                </div>
            )}

            <AddCircleOutlinedIcon onClick={() => showAddPizza(ref)} className="add-icon" color="primary" style={{ fontSize: 50 }} />

        </StyleRoot>
    )
}

export default PizzaList
