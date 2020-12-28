import { Button, FormControl, Input, InputLabel } from '@material-ui/core'
import React, { useState } from 'react'
import firebase from 'firebase/app'
import config from '../firebase.config'
import 'firebase/firestore'

const Saida = () => {
    let dia = new Date().getDate()
    let mes = new Date().getMonth()
    let ano = new Date().getFullYear()
    let mesFormatado = mes === 12 ? 1 : mes + 1
    let hoje = dia + "/" + mesFormatado + "/" + ano
    const [date, setDate] = useState(hoje)
    const [ms35, setMs35] = useState(null)
    const [ms45, setMs45] = useState(null)
    const [md25, setMd25] = useState(null)
    const [md35, setMd35] = useState(null)
    const [md45, setMd45] = useState(null)



    const bolasUsadaNoDia = () => {
        let saida = { dataProducao: date.toString(), md25, md35, md45, ms35, ms45 }
        let db = firebase.firestore(config)
        db.collection('saida').where('dataProducao', '==', date).get()
            .then(
                res => {
                    if (res.docs.length !== 0) {
                        let usadas = res.docs.map(doc => {
                            let id = doc.id
                            let data = doc.data()
                            return { id, ...data }
                        });

                        saida = {
                            dataProducao: date.toString(),
                            id: usadas[0].id,
                            md25: md25 + usadas[0].md25,
                            md35: md35 + usadas[0].md35,
                            md45: md45 + usadas[0].md45,
                            ms35: ms35 + usadas[0].ms35,
                            ms45: ms45 + usadas[0].ms45,
                        }
                        console.log(saida);
                        db.collection('saida').doc(usadas[0].id).update(saida)
                    } else {
                        db.collection('saida').add(saida)
                    }
                }
            )
        setMs35("")
        setMs45("")
        setMd25("")
        setMd35("")
        setMd45("")

    }
    return (
        <div className="wrap-saida">
            <h3>Usadas</h3>

            <div className="wrap-form">
                <div className="ms">
                    <div>
                        <InputLabel htmlFor="ms35">Massa salgada 35</InputLabel>
                        <FormControl className="form-control" style={{ width: "70px", margin: "1px 5px" }}>
                            <Input type="number" inputMode="numeric" id="ms35" aria-describedby="my-helper-text" onChange={(e) => setMs35(parseInt(e.target.value))} value={ms35 || ""} />
                        </FormControl>
                    </div>
                    <div>
                        <InputLabel htmlFor="ms35">Massa salgada 45</InputLabel>
                        <FormControl className="form-control" style={{ width: "70px", margin: "1px 5px" }}>
                            <Input type="number" inputMode="numeric" id="ms45" aria-describedby="my-helper-text" onChange={(e) => setMs45(parseInt(e.target.value))} value={ms45 || ""} />
                        </FormControl>
                    </div>
                </div>

                <div className="md">
                    <div>
                        <InputLabel htmlFor="ms35">Massa doce 25</InputLabel>
                        <FormControl className="form-control" style={{ width: "70px", margin: "1px 5px" }}>
                            <Input type="number" inputMode="numeric" id="md25" aria-describedby="my-helper-text" onChange={(e) => setMd25(parseInt(e.target.value))} value={md25 || ""} />
                        </FormControl>
                    </div>

                    <div >
                        <InputLabel htmlFor="ms35">Massa doce 35</InputLabel>
                        <FormControl className="form-control" style={{ width: "70px", margin: "1px 5px" }}>
                            <Input type="number" inputMode="numeric" id="md35" aria-describedby="my-helper-text" onChange={(e) => setMd35(parseInt(e.target.value))} value={md35 || ""} />
                        </FormControl>
                    </div>

                    <div >
                        <InputLabel htmlFor="ms35">Massa doce 45</InputLabel>
                        <FormControl className="form-control" style={{ width: "70px", margin: "1px 5px" }}>
                            <Input type="number" inputMode="numeric" id="md45" aria-describedby="my-helper-text" onChange={(e) => setMd45(parseInt(e.target.value))} value={md45 || ""} />
                        </FormControl>
                    </div>

                </div>
            </div>
            <Button variant="contained" color="primary" onClick={bolasUsadaNoDia}>Lançar</Button>
        </div>
    )
}

export default Saida
