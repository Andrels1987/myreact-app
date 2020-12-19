import { Button, FormControl, FormControlLabel, FormGroup, FormHelperText, Input, InputLabel, Switch } from '@material-ui/core'
import React, { useState } from 'react'
import 'firebase/firestore';
import fb from '../firebase.config'
import firebase from 'firebase/app'

const AddProdutos = ({ reference, product }) => {

    const [checked, setChecked] = useState(false)
    const [nomeProduto, setNomeProduto] = useState("")
    const [categoria, setCategoria] = useState("")
    const [descontinuado, setDescontinuado] = useState(checked)
    const [minimoEstoque, setMinimoEstoque] = useState("")
    const [quantidadeEstoque, setQuantidadeEstoque] = useState("")
    const [tipo, setTipo] = useState("");


   


const salvarProduto = () => {
    let data = { categoria, nomeProduto, descontinuado, minimoEstoque, quantidadeEstoque, tipo }
    let db = firebase.firestore(fb)
    db.collection('products').add(data)
    reference.style.top = "-565px"
}

const handleChange = (event) => {
    setChecked(event.target.checked);
    setDescontinuado(!checked)
};

return (
    <div>
        <div className="add" style={{
            display: "grid",
            gridTemplateColumns: "1fr", width: 300
        }}>
            <div style={{ textAlign: "center"}}>
                <h3>Adicionar Produto</h3>
            </div>
            <FormControl className="form-control">
                <InputLabel  htmlFor="pizza-nome">Nome do produto</InputLabel>
                <Input id="pizza-nome" aria-describedby="my-helper-text" onChange={(e) => setNomeProduto(e.target.value)}/>
                <FormHelperText style={{ color: "#e49144" }} id="my-helper-text">Insira o nome do produto</FormHelperText>
            </FormControl>
            <FormControl className="form-control">
                <InputLabel htmlFor="ingredientes" >Quantidade em estoque</InputLabel>
                <Input id="ingredientes" aria-describedby="my-helper-text" onChange={(e) => setQuantidadeEstoque(e.target.value)} />
                <FormHelperText style={{ color: "#e49144" }} id="my-helper-text">Quantidade em estoque</FormHelperText>
            </FormControl>
            <FormControl className="form-control">
                <InputLabel htmlFor="quantidade" >Minimo em estoque</InputLabel>
                <Input id="minimo-estoque" aria-describedby="my-helper-text" onChange={(e) => setMinimoEstoque(e.target.value)} />
                <FormHelperText style={{ color: "#e49144" }} id="my-helper-text">Estoque minimo</FormHelperText>
            </FormControl>
            <FormControl className="form-control">
                <InputLabel htmlFor="quantidade" >Categoria</InputLabel>
                <Input id="categoria" aria-describedby="my-helper-text" onChange={(e) => setCategoria(e.target.value)} />
                <FormHelperText style={{ color: "#e49144" }} id="my-helper-text">Ex.: Bebida, frio, legumes etc.</FormHelperText>
            </FormControl>
            <FormControl className="form-control">
                <InputLabel htmlFor="quantidade" >Tipo</InputLabel>
                <Input id="tipo" aria-describedby="my-helper-text" onChange={(e) => setTipo(e.target.value)} />
                <FormHelperText  id="my-helper-text">Ex.: Gramas, pacotes, unidades etc.</FormHelperText>
            </FormControl>
            <FormGroup>
            <InputLabel htmlFor="quantidade" style={{ color: "#3686ee", marginTop: "1rem" }}>Descontinuado</InputLabel>
                <FormControlLabel control={<Switch checked={checked} onChange={handleChange} name="checked" />} />
            </FormGroup>
            <Button variant="contained" color="primary" onClick={() => salvarProduto()}>Enviar</Button>
        </div>
    </div>
)
}

export default AddProdutos
