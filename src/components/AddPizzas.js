import { Button, FormControl, FormHelperText, Input, InputLabel } from '@material-ui/core'
import React, { useState } from 'react'
import 'firebase/firestore'
import firebase from 'firebase/app'
import fb from '../firebase.config'

export const AddPizzas = ({ reference }) => {
    const [nome, setNome] = useState("");
    const [ingredientes, setIngredientes] = useState("");
    const [quantidade, setQuantidade] = useState("");



    const salvarPizzas = async () => {
        let db = firebase.firestore(fb);
        await db.collection('pizza').add({ nome: nome, ingredientes: ingredientes, quantidade: quantidade })
        reference.style.top = "-400px"
    }

    return (
        
            <div className="add">
                <div style={{ textAlign: "center"}}>
                    <h3 >Adicionar Pizza</h3>
                </div>
                <FormControl className="form-control">
                    <InputLabel  htmlFor="pizza-nome">Nome da Pizza</InputLabel>
                    <Input id="pizza-nome" aria-describedby="my-helper-text" onChange={(e) => setNome(e.target.value)} />
                    <FormHelperText style={{ color: "#969DAF" }} id="my-helper-text">Insira o nome da pizza</FormHelperText>
                </FormControl>
                <FormControl className="form-control">
                    <InputLabel htmlFor="ingredientes" >Ingredientes</InputLabel>
                    <Input id="ingredientes" aria-describedby="my-helper-text" onChange={(e) => setIngredientes(e.target.value)} />
                    <FormHelperText style={{ color: "#e49144" }} id="my-helper-text">Lista de ingredientes separados por virgula</FormHelperText>
                </FormControl>
                <FormControl className="form-control">
                    <InputLabel htmlFor="quantidade" >Quantidade</InputLabel>
                    <Input id="quantidade" aria-describedby="my-helper-text" onChange={(e) => setQuantidade(e.target.value)} />
                    <FormHelperText style={{ color: "#e49144" }} id="my-helper-text">quantidade de cada ingrediente de acordo com a lista de ingredientes</FormHelperText>
                </FormControl>
                <Button variant="contained" color="primary" onClick={() => salvarPizzas()}>Enviar</Button>
            </div>
        
    )
}



export default AddPizzas;
