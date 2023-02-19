import { Button, FormControl, Input, InputLabel } from '@material-ui/core'
import React, { useState } from 'react'
import firebase from 'firebase/app'
import config from '../firebase.config'
import 'firebase/firestore'

const Producao = () => {
    let db = firebase.firestore(config)
    let dia = new Date().getDate()
    let mes = new Date().getMonth()
    let ano = new Date().getFullYear()
    let mesFormatado = mes === 12 ? 1 : mes + 1
    let hoje = dia + "/" + mesFormatado + "/" + ano
    const [ms35, setMs35] = useState(0)
    const [ms45, setMs45] = useState(0)
    const [md25, setMd25] = useState(0)
    const [md35, setMd35] = useState(0)
    const [md45, setMd45] = useState(0)



    const bolasProduzidasNoDia = () => {
        let producao = { dataProducao: hoje, md25, md35, md45, ms35, ms45 }
        
        db.collection('producao').where('dataProducao', '==', hoje).get()
            .then(
                res => {
                    
                    if (res.docs.length !== 0) {
                        let prods = res.docs.map(doc => {
                            let id = doc.id
                            let data = doc.data()
                            return { id, ...data }
                        });

                        producao = {
                            dataProducao: hoje,
                            id: prods[0].id,
                            md25: md25 + prods[0].md25,
                            md35: md35 + prods[0].md35,
                            md45: md45 + prods[0].md45,
                            ms35: ms35 + prods[0].ms35,
                            ms45: ms45 + prods[0].ms45,
                        }

                        console.log(producao);
                        db.collection('producao').doc(prods[0].id).update(producao)

                    } else {
                        db.collection('producao').add(producao)
                    
                    }


                }


            )
        //let producao = {dataProducao: date.toString(), md25,md35,md45,ms35,ms45}
        //console.log("SAIDA: ", producao);        
        //db.collection('producao').add(producao)
        setMs35(0)
        setMs45(0)
        setMd25(0)
        setMd35(0)
        setMd45(0)
    }




    return (
        <div className="wrap-producao">
            <h3>Produçao</h3>

            <div className="wrap-form">
                <div className="ms">
                    <div>
                        <InputLabel htmlFor="ms35">Massa salgada 35</InputLabel>
                        <FormControl className="form-control" style={{ width: "70px", margin: "1px 5px" }}>
                            <Input  inputMode="numeric" aria-describedby="my-helper-text" onChange={(e) => setMs35(parseInt(e.target.value))} value={ms35 || 0}/>
                        </FormControl>
                    </div>
                    <div>
                        <InputLabel htmlFor="ms35">Massa salgada 45</InputLabel>
                        <FormControl className="form-control" style={{ width: "70px", margin: "1px 5px" }}>
                            <Input  inputMode="numeric" aria-describedby="my-helper-text" onChange={(e) => setMs45(parseInt(e.target.value))} value={ms45 || 0} />
                        </FormControl>
                    </div>
                </div>

                <div className="md">
                    <div>
                        <InputLabel htmlFor="ms35">Massa doce 25</InputLabel>
                        <FormControl className="form-control" style={{ width: "70px", margin: "1px 5px" }}>
                            <Input   inputMode="numeric" aria-describedby="my-helper-text" onChange={(e) => setMd25(parseInt(e.target.value))} value={md25 || 0} />
                        </FormControl>
                    </div>

                    <div >
                        <InputLabel htmlFor="ms35">Massa doce 35</InputLabel>
                        <FormControl className="form-control" style={{ width: "70px", margin: "1px 5px" }}>
                            <Input  inputMode="numeric" aria-describedby="my-helper-text" onChange={(e) => setMd35(parseInt(e.target.value))} value={md35 || 0} />
                        </FormControl>
                    </div>

                    <div >
                        <InputLabel htmlFor="ms35">Massa doce 45</InputLabel>
                        <FormControl className="form-control" style={{ width: "70px", margin: "1px 5px" }}>
                            <Input inputMode="numeric" aria-describedby="my-helper-text" onChange={(e) => setMd45(parseInt(e.target.value))} value={md45 || 0} />
                        </FormControl>
                    </div>

                </div>
            </div>
            <Button variant="contained" color="primary" onClick={bolasProduzidasNoDia}>Lançar</Button>
        </div>
    )
}

export default Producao
