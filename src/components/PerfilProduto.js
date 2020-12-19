import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { slideInLeft } from 'react-animations'
import Radium, { StyleRoot } from 'radium';
import { useParams } from 'react-router-dom';
import 'firebase/firestore'
import firebase from 'firebase/app'
import config from '../firebase.config';
import { Button, FormControl, FormControlLabel, FormGroup, FormHelperText, Input, InputLabel, Switch } from '@material-ui/core'

const styles = {
    bounce: {
        animation: 'x 1s',
        animationName: Radium.keyframes(slideInLeft, 'bounce'),
        width: "95%",
        margin: "2rem auto",
        display: "grid",
        gridTemplateColumns: "1fr",

    }
}

const PerfilProduto = () => {
    const history = useHistory();
    const [checked, setChecked] = useState(false)
    let collection = 'products'
    let db = firebase.firestore(config)
    let [product, setProduct] = useState({})
    let params = useParams()



    useEffect(() => {

        const getDoc = (params) => {
            let unsubscribe = db.collection(collection).doc(params.id)
                .get()
                .then(
                    res => {
                        if (res.exists) {
                            let data = res.data()
                            let id = res.id
                            setProduct({id,...data})
                        }
                    }
                )
            return unsubscribe
        }
        getDoc(params)

    }, [collection, db, params])

    const atualizarProduto = () => {        
        let data = product;
        let db = firebase.firestore(config)
        db.collection(collection).doc(product.id).update(data)
        //reference.style.top = "-350px"
        console.log(product.id);
    }

    const deletarProduto = () => {
        //let data = product;
        //let db = firebase.firestore(config)
        //db.collection(collection).doc(params.id).delete().then(res => console.log("DELETED"))
        history.push('/')
    }


    return (
        <StyleRoot>
            <div className="test" style={styles.bounce}>
                <FormControl className="form-control">
                    <InputLabel style={{ color: "#3686ee" }} htmlFor="pizza-nome">Nome do produto</InputLabel>
                    <Input id="pizza-nome" aria-describedby="my-helper-text" onChange={(e) => setProduct({ ...product, nomeProduto: e.target.value })} value={product.nomeProduto || "Loading..."} />
                    <FormHelperText style={{ color: "#e49144" }} id="my-helper-text">Insira o nome do produto</FormHelperText>
                </FormControl>
                <FormControl className="form-control">
                    <InputLabel htmlFor="ingredientes" style={{ color: "#3686ee" }}>Quantidade em estoque</InputLabel>
                    <Input id="ingredientes" aria-describedby="my-helper-text" onChange={(e) => setProduct({ ...product, quantidadeEstoque: e.target.value })} value={product.quantidadeEstoque || "Loading..."} />
                    <FormHelperText style={{ color: "#e49144" }} id="my-helper-text">Quantidade em estoque</FormHelperText>
                </FormControl>
                <FormControl className="form-control">
                    <InputLabel htmlFor="quantidade" style={{ color: "#3686ee" }}>Minimo em estoque</InputLabel>
                    <Input id="minimo-estoque" aria-describedby="my-helper-text" onChange={(e) => setProduct({ ...product, minimoEstoque: e.target.value })} value={product.minimoEstoque || "Loading..."} />
                    <FormHelperText style={{ color: "#e49144" }} id="my-helper-text">Estoque minimo</FormHelperText>
                </FormControl>
                <FormControl className="form-control">
                    <InputLabel htmlFor="quantidade" style={{ color: "#3686ee" }}>Categoria</InputLabel>
                    <Input id="categoria" aria-describedby="my-helper-text" onChange={(e) => setProduct({ ...product, categoria: e.target.value })} value={product.categoria || "Loading..."} />
                    <FormHelperText style={{ color: "#e49144" }} id="my-helper-text">Ex.: Bebida, frio, legumes etc.</FormHelperText>
                </FormControl>
                <FormControl className="form-control">
                    <InputLabel htmlFor="quantidade" style={{ color: "#3686ee" }}>Tipo</InputLabel>
                    <Input id="tipo" aria-describedby="my-helper-text" onChange={(e) => setProduct({ ...product, tipo: e.target.value })} value={product.tipo || "Loading..."} />
                    <FormHelperText style={{ color: "#e49144" }} id="my-helper-text">Ex.: Gramas, pacotes, unidades etc.</FormHelperText>
                </FormControl>
                <FormGroup>
                    <InputLabel htmlFor="quantidade" style={{ color: "#3686ee", marginTop: "1rem" }}>Descontinuado</InputLabel>
                    <FormControlLabel control={<Switch checked={checked} onChange={(e) => setChecked(!checked)} name="checked" />} />
                </FormGroup>
                <div style={{ display: 'grid', justifyContent: "space-between",gridTemplateColumns: "1fr 1fr",  }}>
                    <Button variant="contained" color="primary" onClick={() => atualizarProduto()}>atualizar</Button>
                    <Button variant="contained" color="primary" onClick={deletarProduto}>deletar</Button>
                </div>
            </div>
        </StyleRoot>
    )
}

export default PerfilProduto
