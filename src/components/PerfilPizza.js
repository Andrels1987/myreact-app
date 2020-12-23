import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { slideInLeft } from 'react-animations'
import Radium, { StyleRoot } from 'radium';
import { useParams } from 'react-router-dom'
import {deletarPizza, atualizarPizza, getDoc} from './Services/pizza.service'
import { Button, FormControl, FormHelperText, Input, InputLabel} from '@material-ui/core'
const styles = {
    bounce: {
        animation: 'x 1s',
        animationName: Radium.keyframes(slideInLeft, 'slideInLeft'),
        width: "95%",
        margin: "2rem auto",
        display: "grid",
        gridTemplateColumns: "1fr",

    }, 
    btn: {
        marginTop: "2em",
        display: 'grid', 
        gridTemplateColumns: "1fr 1fr",
        justifyContent: "space-between", 
        
    },
    fc: {
        marginTop: "1rem"
    }
}


const PerfilPizza = () => {
    const history = useHistory();
    const params = useParams()
    const [pizza, setPizza] = useState({})
    

    useEffect(() => {
        
        getDoc(params, setPizza)

    }, [params])

    

   
    return (
        <StyleRoot>
            <div className="test" style={styles.bounce}>
                <FormControl className="form-control" style={styles.fc}>
                    <InputLabel style={{ color: "#3686ee" }} htmlFor="pizza-nome">Nome da Pizza</InputLabel>
                    <Input id="pizza-nome" aria-describedby="my-helper-text" onChange={(e) => setPizza({ ...pizza, nome: e.target.value })} value={pizza.nome || "Loading..."} />
                    <FormHelperText style={{ color: "#e49144" }} id="my-helper-text">Insira o nome da pizza</FormHelperText>
                </FormControl>
                <FormControl className="form-control" style={styles.fc}>
                    <InputLabel htmlFor="ingredientes" style={{ color: "#3686ee" }}>ingredientes</InputLabel>
                    <Input id="ingredientes" aria-describedby="my-helper-text" onChange={(e) => setPizza({ ...pizza, ingredientes: e.target.value })} value={pizza.ingredientes || "Loading..."} />
                    <FormHelperText style={{ color: "#e49144" }} id="my-helper-text">Ingredientes</FormHelperText>
                </FormControl>
                <FormControl className="form-control" style={styles.fc}>
                    <InputLabel htmlFor="quantidade" style={{ color: "#3686ee" }}>Minimo em estoque</InputLabel>
                    <Input id="minimo-estoque" aria-describedby="my-helper-text" onChange={(e) => setPizza({ ...pizza, quantidade: e.target.value })} value={pizza.quantidade || "Loading..."} />
                    <FormHelperText style={{ color: "#e49144" }} id="my-helper-text">Quantidade</FormHelperText>
                </FormControl>
                <div style={styles.btn}>
                    <Button variant="contained" color="primary" onClick={() => atualizarPizza(pizza,history)}>atualizar</Button>
                    <Button variant="contained" color="primary" onClick={() => deletarPizza(params.id, history)}>deletar</Button>
                </div>
            </div> 
        </StyleRoot>
    )
}

export default PerfilPizza
