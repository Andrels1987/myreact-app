import React, { useEffect, useRef, useState } from 'react'
//import config from '../firebase.config'
import 'firebase/firestore'
import firebase from 'firebase/app'
import config from '../firebase.config';
import AddCircleOutlinedIcon from '@material-ui/icons/AddCircleOutlined';
import AddProdutos from './AddProdutos';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import { slideInRight } from 'react-animations'
import Radium, { StyleRoot } from 'radium';
import Loading from '../Loading';

const styles = {
    bounce: {
        animation: 'x 1s',
        animationName: Radium.keyframes(slideInRight, 'bounce'),

    }
}

const useStyles = makeStyles({
    root: {
        minWidth: 15,
        maxHeight: 130,
    },
    title: {
        fontSize: 20,
        fontWeight: "bolder",
        color: "#F2B854 ",
        lineHeight: "20px"
    },
    pos: {
        marginBottom: 12,
        fontWeight: "bolder",
        color: "#ACA7A0"
    },

});

const Home = ({ produto, setProduto }) => {
    const classes = useStyles();
    let collection = 'products'
    let [products, setProducts] = useState([])
    let db = firebase.firestore(config)
    let refProdutoBox = useRef(null);
    let boxRef = refProdutoBox.current;
    let [loading, setLoading] = useState(true)

    useEffect(() => {

        // const FetchData = async (collection) => {
        //     const response = await db.collection(collection).get();
        //     const prodData = await response.docs.map(prod => {
        //         let id = prod.id
        //         let data = prod.data()
        //         return { id, ...data }
        //     })
        //     setProducts(prodData)
        //     return prodData
        // }
        // FetchData(collection);
        return db.collection(collection).onSnapshot(
            snapshot => {
                const intermediateData = []
                snapshot.docs.map((doc) => {
                    let id = doc.id
                    let data = doc.data()
                    intermediateData.push({ id, ...data })
                    return { id, ...data }
                });
                if(intermediateData){
                    setProducts(intermediateData)
                    setLoading(false)
                }
                
            }
        )
    }, [db, collection])

    const showAddProduto = () => {
        let top = refProdutoBox.current.style.top
        if (top === "68px") {
            boxRef.style.transition = "1s"
            boxRef.style.top = "-600px"            
        } else {
            boxRef.style.top = "68px"
            boxRef.style.transition = "1s"
        }
    }

    return (
        <div>
            <div ref={refProdutoBox} className="add-prod-box" >
                <AddProdutos reference={boxRef} />
            </div>
            {produto && (
                <section className="home-container" style={{ display: "grid", borderBottom: "solid 2px #F7934E", gridTemplateColumns: "repeat(3, 1fr)", gap: "5px", padding: "2px" }}>
                    {produto.map(p => (
                        <Link to={`/produto/${p.id}`} key={p.id} onClick={() => setProduto(null)}>
                            <Card className={classes.root}>
                                <CardContent>
                                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                                        {p.nomeProduto}
                                    </Typography>
                                    <Typography variant="h5" component="h2">
                                        {p.quantidadeEstoque}
                                    </Typography>
                                    <Typography className={classes.pos} color="textSecondary">
                                        {p.tipo}
                                    </Typography>
                                </CardContent>
                            </Card>

                        </Link>

                    ))}
                </section>
            )
            }
            <StyleRoot>
            {loading  ? <Loading /> : ( <div className="test" style={styles.bounce}>
                    <div className="container-list">
                        {products.map(prod => (
                            <Link to={`/produto/${prod.id}`} key={prod.id} style={{ color: "black", textAlign: "center" }} onClick={() => setProduto(null)}>
                                <Card className={classes.root}>
                                    <CardContent>
                                        <Typography className={classes.title} color="textSecondary" gutterBottom>
                                            {prod.nomeProduto}
                                        </Typography>
                                        {prod.quantidadeEstoque < prod.minimoEstoque ?
                                            (<Typography variant="h5" component="h2" style={{ color: "red", fontWeight: "bolder" }}>
                                                {prod.quantidadeEstoque}
                                            </Typography>) :
                                            (<Typography variant="h5" style={{ fontWeight: "bolder" }} component="h2">
                                                {prod.quantidadeEstoque}
                                            </Typography>)}
                                        <Typography className={classes.pos} color="textSecondary">
                                            {prod.tipo}
                                        </Typography>
                                    </CardContent>
                                </Card>

                            </Link>

                        ))}

                    </div>
                </div>)}
               
                <AddCircleOutlinedIcon onClick={() => showAddProduto()} className="add-icon" color="primary" style={{ fontSize:45 }} />

            </StyleRoot>
        </div>
    )
}



export default Home;
