import React, { useEffect, useState } from 'react'
import Producao from './Producao'
import { Button } from '@material-ui/core'
import Saida from './Saida'
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import { slideInRight } from 'react-animations'
import Radium, { StyleRoot } from 'radium';

import {fecharDia,getDisponivel,today,changeOrder} from './Services/disponibilidade.service'

const styles = {
    bounce: {
        animation: 'x 1s',
        animationName: Radium.keyframes(slideInRight, 'bounce'),

    }
}

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
        padding: "4px .1em"
    },
    body: {
        fontSize: 13,
        padding: "4px .1em"
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);

const useStyles = makeStyles({
    table: {
        maxWidth: 700,
    },
    btns: {
        padding: "0 1px",
        margin: "1px 8px",
        height: "35px",
        fontSize: "10px"
    }
});

const Disponivel = () => {    
    const classes = useStyles();
    const [disponivel, setDisponivel] = useState([])
    const [producao, setProducao] = useState([])
    const [usada, setUsado] = useState([])



    useEffect(() => {        
        return getDisponivel(today, setUsado, setProducao, setDisponivel)
    }, [ ])   

    return (
        <StyleRoot>
            <div className="test" style={styles.bounce}>
                <h3 style={{ fontSize: ".7em", }}>{today}</h3>

                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="customized table" style={{ margin: "0 auto" }}>
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Bolas</StyledTableCell>
                                <StyledTableCell align="center" style={{ padding: 0 }}>Salgada</StyledTableCell>
                                <StyledTableCell align="center">35</StyledTableCell>
                                <StyledTableCell align="center">45</StyledTableCell>
                                <StyledTableCell align="center">Doce</StyledTableCell>
                                <StyledTableCell align="center">25</StyledTableCell>
                                <StyledTableCell align="center">35</StyledTableCell>
                                <StyledTableCell align="center">45</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {disponivel.map(item => (
                                <StyledTableRow key={item.dataProducao}>
                                    <StyledTableCell component="th" scope="row">
                                        Disp.:
                                </StyledTableCell>
                                    <StyledTableCell align="center"></StyledTableCell>
                                    <StyledTableCell align="center">{item.ms35 || "0"}</StyledTableCell>
                                    <StyledTableCell align="center">{item.ms45}</StyledTableCell>
                                    <StyledTableCell align="center"></StyledTableCell>
                                    <StyledTableCell align="center">{item.md25}</StyledTableCell>
                                    <StyledTableCell align="center">{item.md35}</StyledTableCell>
                                    <StyledTableCell align="center">{item.md45}</StyledTableCell>
                                </StyledTableRow>
                            ))}
                            {producao.map(item => (
                                <StyledTableRow key={item.dataProducao}>
                                    <StyledTableCell component="th" scope="row">
                                        Prod.:
                                </StyledTableCell>
                                    <StyledTableCell align="center"></StyledTableCell>
                                    <StyledTableCell align="center">{item.ms35 || "0"}</StyledTableCell>
                                    <StyledTableCell align="center">{item.ms45}</StyledTableCell>
                                    <StyledTableCell align="center"></StyledTableCell>
                                    <StyledTableCell align="center">{item.md25}</StyledTableCell>
                                    <StyledTableCell align="center">{item.md35}</StyledTableCell>
                                    <StyledTableCell align="center">{item.md45}</StyledTableCell>
                                </StyledTableRow>
                            ))}
                            {usada.map(item => (
                                <StyledTableRow key={item.dataProducao}>
                                    <StyledTableCell component="th" scope="row">
                                        Usada:
                                </StyledTableCell>
                                    <StyledTableCell align="center"></StyledTableCell>
                                    <StyledTableCell align="center">{item.ms35 || "0"}</StyledTableCell>
                                    <StyledTableCell align="center">{item.ms45}</StyledTableCell>
                                    <StyledTableCell align="center"></StyledTableCell>
                                    <StyledTableCell align="center">{item.md25}</StyledTableCell>
                                    <StyledTableCell align="center">{item.md35}</StyledTableCell>
                                    <StyledTableCell align="center">{item.md45}</StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>

                    </Table>
                </TableContainer>

                <div className=" btnsDisponivel" >
                    <Button className={`${classes.btns} btn-prod`} variant="contained" color="primary" onClick={() => changeOrder()} >Produçao</Button>
                    <Button className={`${classes.btns} btn-saida`} variant="contained" color="primary" onClick={() => changeOrder()} >Saida</Button>
                    <Button className={`${classes.btns} btn-fechar`} variant="contained" color="secondary" onClick={() => fecharDia(disponivel)} >Fechar dia</Button>
                </div>
            </div>
            <div className="frente">
                <Producao />
            </div>

            <div className="atras">
                <Saida />
            </div>



        </StyleRoot>
    )
}

export default Disponivel
