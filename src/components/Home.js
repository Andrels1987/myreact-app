import React, { useEffect, useRef, useState } from 'react'

import AddCircleOutlinedIcon from '@material-ui/icons/AddCircleOutlined';
import AddProdutos from './AddProdutos';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { getALLProdutos, showAddProduto } from '../components/Services/produto.service' 
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
        lineHeight: "20px",
        boxSizing: "border-box",
        padding: "0px",
        margin: " 0 -10px"
    },
    pos: {
        marginBottom: 12,
        fontWeight: "bolder",
        color: "#ACA7A0"
    },

});

const Home = ({ produto, setProduto }) => {
    const classes = useStyles();
    let [produtos, setProdutos] = useState([])
    let refProdutoBox = useRef(null);
    let boxRef = refProdutoBox.current;
    let [loading, setLoading] = useState(true)

    useEffect(() => {        
        return getALLProdutos(setProdutos, setLoading) 
    }, [])

    

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
                                        {p.nomeProduto }
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
            {loading  ? <Loading /> : ( <div  style={styles.bounce}>
                    <div className="container-list">
                        {produtos.map(prod => (
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
               
                <AddCircleOutlinedIcon onClick={() => showAddProduto(boxRef)} className="add-icon" color="primary" style={{ fontSize:45 }} />

            </StyleRoot>
        </div>
    )
}



export default Home;
