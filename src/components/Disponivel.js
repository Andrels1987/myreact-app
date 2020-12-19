import React, { useEffect, useRef, useState } from 'react'
import config from '../firebase.config'
import firebase from 'firebase/app'
import 'firebase/firestore'
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
    let date = new Date()
    let today = `${date.getDate()}/${date.getMonth() === 0 ? 1 : date.getMonth() + 1}/${date.getFullYear()}`;
    const classes = useStyles();
    const refP = useRef(null)
    const refS = useRef(null)
    const [disponivel, setDisponivel] = useState([])
    const [producao, setProducao] = useState([])
    const [usada, setUsado] = useState([])

    let db = firebase.firestore(config)


    useEffect(() => {
        let inicial = [{ dataProducao: today, id: "a", ms35: 0, ms45: 0, md25: 0, md35: 0, md45: 0 }]
        const getDisponivel = async (date) => {

            //saida

            await db.collection('saida').where('dataProducao', '==', date).onSnapshot(
                snapshot => {
                    let s = snapshot.docs.map(doc => {
                        let id = doc.id
                        let data = doc.data()
                        return { id, ...data }
                    })
                    if (s.length !== 0) {
                        setUsado(s)
                    } else {
                        setUsado(inicial)
                        s = inicial
                    }

                    //producao

                    db.collection('producao').where('dataProducao', '==', date)
                        .onSnapshot(snapshot => {
                            let p = snapshot.docs.map(doc => {
                                let id = doc.id;
                                let data = doc.data()
                                return { id, ...data }
                            })
                            if (p.length !== 0) {
                                setProducao(p)
                            } else {
                                p = inicial
                                setProducao(inicial)
                            }

                            //disponivel

                            db.collection('disponivel').where('dataProducao', '==', date)
                                .onSnapshot(snapshot => {
                                    let d = snapshot.docs.map(doc => {
                                        let id = doc.id;
                                        let data = doc.data()
                                        return { id, ...data }
                                    })
                                    if (d.length !== 0) {
                                        console.log("U ", s)
                                        console.log("P ", p)
                                        console.log("D ", d)
                                    } else {
                                        setDisponivel(inicial)
                                        d = inicial
                                    }
                                    let disp = {
                                        dataProducao: d[0].dataProducao,
                                        id: d[0].id,
                                        ms35: d[0].ms35 + p[0].ms35 - s[0].ms35,
                                        ms45: d[0].ms45 + p[0].ms45 - s[0].ms45,
                                        md25: d[0].md25 + p[0].md25 - s[0].md25,
                                        md35: d[0].md35 + p[0].md35 - s[0].md35,
                                        md45: d[0].md45 + p[0].md45 - s[0].md45,
                                    }
                                    setDisponivel([disp])

                                })

                        })

                }
            );



            //disponivel

            await db.collection('disponivel').where('dataProducao', '==', date)
                .onSnapshot(snapshot => {
                    let d = snapshot.docs.map(doc => {
                        let id = doc.id;
                        let data = doc.data()
                        return { id, ...data }
                    })
                    if (d.length !== 0) {
                        setDisponivel(d)
                    } else {
                        setDisponivel(inicial)
                    }


                })



        }
        return getDisponivel(today)


    }, [today, db])

    //change the boxes order   

    const changeOrder = () => {
        let screenWidth = window.screen.width
        let frente = document.querySelector(".frente")
        let  atras= document.querySelector(".atras")
        if(screenWidth <= 628){
            frente.classList.add("frente-esquerda")
            atras.classList.add("atras-direita")
            setTimeout(()=>{
                frente.classList.remove("frente", "frente-esquerda")
                frente.classList.add("atras") 
                atras.classList.remove("atras", "atras-direita")                       
                atras.classList.add("frente")
            }, 800)
        }
        

    }


    const fecharDia = () => {
        console.log("FECHAR DIA");
        function diasNoMesSearch(mes, ano) {
            let data = new Date(ano, mes, 0);
            return data.getDate();
        }

        let mesAtual = new Date().getMonth() + 1;
        let anoAtual = new Date().getFullYear();
        let diasNoMes = diasNoMesSearch(mesAtual, anoAtual);
        let diaAtual = new Date().getDate();
        if (diaAtual === diasNoMes) {
            diaAtual = 1;
        } else {
            diaAtual += 1;
        }
        let amanha = `${diaAtual}/${mesAtual}/${anoAtual}`


        let data = {
            dataProducao: amanha,
            ms35: disponivel[0].ms35,
            ms45: disponivel[0].ms45,
            md25: disponivel[0].md25,
            md35: disponivel[0].md35,
            md45: disponivel[0].md45,
        }
        db.collection('disponivel').add(data)
    }

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

                <div style={{ marginTop: ".6rem", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", justifyContent: "space-around" }}>
                    <Button className={classes.btns} variant="contained" color="primary" onClick={() => changeOrder()} >Produçao</Button>
                    <Button className={classes.btns} variant="contained" color="primary" onClick={() => changeOrder()} >Saida</Button>
                    <Button className={classes.btns} variant="contained" color="secondary" onClick={() => fecharDia()} >Fechar dia</Button>
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
