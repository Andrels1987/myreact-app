import { Button, FormControl, FormControlLabel, FormGroup, FormHelperText, Input, InputLabel, Select, Switch } from '@material-ui/core'
import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import {salvarProduto} from '../components/Services/produto.service'


const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

const AddProdutos = ({ reference, product }) => {
    const classes = useStyles();
    const [checked, setChecked] = useState(false)
    const [produto, setProduto] = useState({})
    

    const handleChange = (event) => {
        setChecked(event.target.checked);
        setProduto({...produto, descontinuado: !checked})
    };

    return (
        <div>
            <div className="add" style={{
                display: "grid",
                gridTemplateColumns: "1fr", width: 300
            }}>
                <div style={{ textAlign: "center" }}>
                    <h3>Adicionar Produto</h3>
                </div>
                <FormControl className="form-control">
                    <InputLabel htmlFor="pizza-nome">Nome do produto</InputLabel>
                    <Input inputMode="numeric" id="pizza-nome" aria-describedby="my-helper-text" onChange={(e) => setProduto({...produto, nomeProduto: e.target.value})} />
                    <FormHelperText style={{ color: "#e49144" }} id="my-helper-text">Insira o nome do produto</FormHelperText>
                </FormControl>
                <FormControl className="form-control">
                    <InputLabel htmlFor="ingredientes" >Quantidade em estoque</InputLabel>
                    <Input inputMode="numeric" id="ingredientes" aria-describedby="my-helper-text" onChange={(e) => setProduto({...produto, quantidadeEstoque: e.target.value})} />
                    <FormHelperText style={{ color: "#e49144" }} id="my-helper-text">Quantidade em estoque</FormHelperText>
                </FormControl>
                <FormControl className="form-control">
                    <InputLabel htmlFor="quantidade" >Minimo em estoque</InputLabel>
                    <Input inputMode="numeric" id="minimo-estoque" aria-describedby="my-helper-text" onChange={(e) =>  setProduto({...produto, minimoEstoque: e.target.value})} />
                    <FormHelperText style={{ color: "#e49144" }} id="my-helper-text">Estoque minimo</FormHelperText>
                </FormControl>
                <FormControl className="form-control">
                    <InputLabel htmlFor="quantidade" >Categoria</InputLabel>
                    <Input id="categoria" aria-describedby="my-helper-text" onChange={(e) =>  setProduto({...produto, categoria: e.target.value})} />
                    <FormHelperText style={{ color: "#e49144" }} id="my-helper-text">Ex.: Bebida, frio, legumes etc.</FormHelperText>
                </FormControl>
                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="quantidade" >Tipo</InputLabel>
                    <Select
                        native
                        value={produto.tipo}
                        onChange={(e) =>  setProduto({...produto, tipo: e.target.value})}                        
                    >
                        <option aria-label="None" value="" />
                        <option value={`Grama(s)`}>Gramas</option>
                        <option value={`Maço(s)`}>Maço</option>
                        <option value={`Unidade(s)`}>Unidade</option>
                    </Select>
                    <FormHelperText>Ex.: Gramas, pacotes, unidades etc.</FormHelperText>
                </FormControl>
                <FormGroup>
                    <InputLabel htmlFor="quantidade" style={{ color: "#3686ee", marginTop: "1rem" }}>Descontinuado</InputLabel>
                    <FormControlLabel control={<Switch checked={checked} onChange={handleChange} name="checked" />} />
                </FormGroup>
                <Button variant="contained" color="primary" onClick={() => salvarProduto(produto, reference)}>Enviar</Button>
            </div>
        </div>
    )
}

export default AddProdutos
