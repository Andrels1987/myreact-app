import { Button, FormControl, FormHelperText, Input, InputLabel } from '@material-ui/core'
import React, { useState } from 'react'
import {salvarPizzas} from '../components/Services/pizza.service'

export const AddPizzas = ({ reference }) => {
    const [nome, setNome] = useState("");
    const [ingredientes, setIngredientes] = useState("");
    const [quantidade, setQuantidade] = useState("");


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
                    <Input inputMode="numeric" id="quantidade" aria-describedby="my-helper-text" onChange={(e) => setQuantidade(e.target.value)} />
                    <FormHelperText style={{ color: "#e49144" }} id="my-helper-text">quantidade de cada ingrediente de acordo com a lista de ingredientes</FormHelperText>
                </FormControl>
                <Button variant="contained" color="primary" onClick={() => salvarPizzas(nome, ingredientes, quantidade, reference)}>Enviar</Button>
            </div>
        
    )
}



export default AddPizzas;
