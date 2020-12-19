import React, { useEffect, useRef, useState } from 'react'
import config from '../firebase.config';
import firebase from 'firebase/app'
import 'firebase/firestore'
import AddPizzas from './AddPizzas';
import AddCircleOutlinedIcon from '@material-ui/icons/AddCircleOutlined';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content'
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Button } from '@material-ui/core';
import Loading  from '../Loading'

import { slideInLeft } from 'react-animations'
import Radium, { StyleRoot } from 'radium';

const styles = {
    bounce: {
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
    const MySwal = withReactContent(Swal)
    const [pizzas, setPizzas] = useState([])
    const db = firebase.firestore(config)
    const collection = 'pizza';
    let addPizzaBox = useRef(null);
    let ref = addPizzaBox.current;

    useEffect(() => {

        return db.collection(collection).onSnapshot(
            snapshot => {
                const intermadiateData = []
                snapshot.docs.map((doc) => {
                    let id = doc.id;
                    let data = doc.data();
                    intermadiateData.push({ id, ...data })
                    return { id, ...data }
                });
                if(intermadiateData){
                    setPizzas(intermadiateData)
                    setLoading(false)
                }
                
            }
        )
        // const fetchPizzas = async (collection) => {
        //     let response = await db.collection(collection).get();
        //     let pizzas = await response.docs.map(pizza => {
        //         let id = pizza.id;
        //         let data = pizza.data()
        //         return { id, ...data }
        //     })
        //     setPizzas(pizzas)
        //     setLength(pizzas.length)
        //     console.log(pizzas.length);
        //     return pizzas
        // }
        // fetchPizzas(collection)
    }, [db])

    const showAddPizza = () => {
        console.log(ref.style.top);
        if (ref.style.top === "80px") {
            ref.style.transition = "1s"
            ref.style.top = "-400px"
        } else {
            ref.style.top = "80px"
            ref.style.transition = "1s"
        }
    }



    const atualizarEstoque = async (id) => {
        //console.log("ID: ", id);
        const inputOptions = {
            'inteira': '1',
            'metade': '1/2',
            'quarto': '1/4'
        }
        let quant = 0;
        const { value: fraction } = await MySwal.fire({
            title: 'Escolha a fração desejada',
            input: "radio",
            inputOptions: inputOptions,
            inputValidator: (value) => {
                if (!value) {
                    return 'You need to choose something!'
                }
            }
        })
        const { value: quantity } = await MySwal.fire({
            title: 'Quantidade',
            input: "text",
            inputOptions: inputOptions,
            inputValidator: (value) => {
                if (!value) {
                    return 'You need to choose something!'
                }
            }
        })
        if (quantity > 0) {
            quant = quantity
        }

        await db.collection(collection).doc(id).get()
            .then(
                pizza => {
                    let data = pizza.data()
                    return { ingredientes: data.ingredientes, quantidade: data.quantidade }
                }
            ).then(
                res => {
                    let ingredientes = res.ingredientes.split(",")
                    let quantidade = res.quantidade.split(',')
                    quantidade = quantidade.map(q => parseInt(q))
                    //console.log(ingredientes, quantidade)
                    ingredientes.map(ing => {
                        return db.collection('products').where('nomeProduto', '==', ing)
                            .get()
                            .then(
                                d => {
                                    d.docs.map(doc => {
                                        let data = doc.data()
                                        if (fraction === 'inteira') {
                                            let quantidadeEstoque = data.quantidadeEstoque - (quantidade[ingredientes.indexOf(data.nomeProduto)] * quant)
                                            db.collection("products").doc(doc.id).update({ ...data, quantidadeEstoque: quantidadeEstoque })
                                            return fraction
                                        } else if (fraction === 'metade') {
                                            let quantidadeEstoque = data.quantidadeEstoque - ((quantidade[ingredientes.indexOf(data.nomeProduto)] / 2) * quant)
                                            db.collection("products").doc(doc.id).update({ ...data, quantidadeEstoque: quantidadeEstoque })
                                            return fraction
                                        } else {
                                            let quantidadeEstoque = data.quantidadeEstoque - ((quantidade[ingredientes.indexOf(data.nomeProduto)] / 4) * quant)
                                            db.collection("products").doc(doc.id).update({ ...data, quantidadeEstoque: quantidadeEstoque })
                                            return fraction
                                        }
                                        //let quantidadeEstoque = data.quantidadeEstoque - quantidade[ingredientes.indexOf(data.nomeProduto)]
                                        //db.collection("products").doc(doc.id).update({...data, quantidadeEstoque: quantidadeEstoque})
                                        //console.log(quantidadeEstoque);
                                    })
                                }
                            )


                    })
                }
            )
        //p.unsubscribe();

    }

    return (
        <StyleRoot>

            {/* FORM PARA ADICIONAR NOVAS PIZZAS */}
            <div ref={addPizzaBox} className="add-pizza-box" >
                <AddPizzas reference={ref} />
            </div>


            {/* LISTA DE PIZZAS NO FIREBASE */}
            {loading ? <Loading /> : (
                <div style={styles.bounce}>
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
            
            <AddCircleOutlinedIcon onClick={() => showAddPizza()} className="add-icon" color="primary" style={{ fontSize: 50 }} />

        </StyleRoot>
    )
}

export default PizzaList
