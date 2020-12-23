import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { slideInLeft } from 'react-animations'
import Radium, { StyleRoot } from 'radium';
import { useParams } from 'react-router-dom';
import { Button, FormControl, FormControlLabel, FormGroup, FormHelperText, Input, InputLabel, Select, Switch } from '@material-ui/core'
import { atualizarProduto, deletarProduto, getDoc } from './Services/produto.service'

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
    let [produto, setProduto] = useState({})
    let params = useParams()



    useEffect(() => {        
        return getDoc(params, setProduto, setChecked)        
        
    }, [params])

    const handleChange = (event) => {
        setChecked(event.target.checked)
        setProduto({ ...produto, descontinuado: !checked })
    };

    return (
        <StyleRoot>
            <div className="test" style={styles.bounce}>
                <FormControl className="form-control">
                    <InputLabel style={{ color: "#3686ee" }} htmlFor="pizza-nome">Nome do produto</InputLabel>
                    <Input id="pizza-nome" aria-describedby="my-helper-text" onChange={(e) => setProduto({ ...produto, nomeProduto: e.target.value })} value={produto.nomeProduto || "Loading..."} />
                    <FormHelperText style={{ color: "#e49144" }} id="my-helper-text">Insira o nome do produto</FormHelperText>
                </FormControl>
                <FormControl className="form-control">
                    <InputLabel htmlFor="ingredientes" style={{ color: "#3686ee" }}>Quantidade em estoque</InputLabel>
                    <Input id="ingredientes" aria-describedby="my-helper-text" onChange={(e) => setProduto({ ...produto, quantidadeEstoque: e.target.value })} value={produto.quantidadeEstoque || "Loading..."} />
                    <FormHelperText style={{ color: "#e49144" }} id="my-helper-text">Quantidade em estoque</FormHelperText>
                </FormControl>
                <FormControl className="form-control">
                    <InputLabel htmlFor="quantidade" style={{ color: "#3686ee" }}>Minimo em estoque</InputLabel>
                    <Input id="minimo-estoque" aria-describedby="my-helper-text" onChange={(e) => setProduto({ ...produto, minimoEstoque: e.target.value })} value={produto.minimoEstoque || "Loading..."} />
                    <FormHelperText style={{ color: "#e49144" }} id="my-helper-text">Estoque minimo</FormHelperText>
                </FormControl>
                <FormControl className="form-control">
                    <InputLabel htmlFor="quantidade" style={{ color: "#3686ee" }}>Categoria</InputLabel>
                    <Input id="categoria" aria-describedby="my-helper-text" onChange={(e) => setProduto({ ...produto, categoria: e.target.value })} value={produto.categoria || "Loading..."} />
                    <FormHelperText style={{ color: "#e49144" }} id="my-helper-text">Ex.: Bebida, frio, legumes etc.</FormHelperText>
                </FormControl>
                <FormControl className="form-control">
                    <InputLabel htmlFor="quantidade" style={{ color: "#3686ee" }}>Tipo</InputLabel>
                    <Select
                        native
                        value={produto.tipo || "Loading"}
                        onChange={(e) => setProduto({ ...produto, tipo: e.target.value })}
                    >
                        <option aria-label="None" value="" />
                        <option value={`Grama(s)`}>Gramas</option>
                        <option value={`Maço(s)`}>Maço</option>
                        <option value={`Unidade(s)`}>Unidade</option>
                    </Select>
                    <FormHelperText style={{ color: "#e49144" }} id="my-helper-text">Ex.: Gramas, pacotes, unidades etc.</FormHelperText>
                </FormControl>
                <FormGroup>
                    <InputLabel htmlFor="quantidade" style={{ color: "#3686ee", marginTop: "1rem" }}>Descontinuado</InputLabel>
                    <FormControlLabel control={<Switch checked={checked} onChange={handleChange} name="checked" />} />
                </FormGroup>
                <div style={{ display: 'grid', justifyContent: "space-between", gridTemplateColumns: "1fr 1fr", }}>
                    <Button variant="contained" color="primary" onClick={() => atualizarProduto(produto, history)}>atualizar</Button>
                    <Button variant="contained" color="primary" onClick={() => deletarProduto(params.id, history)}>deletar</Button>
                </div>
            </div>
        </StyleRoot>
    )
}

export default PerfilProduto
