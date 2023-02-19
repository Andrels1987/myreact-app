import 'firebase/firestore'
import firebase from 'firebase/app'
import config from '../../firebase.config'
//import Swal from 'sweetalert2';

let date = new Date()
let db = firebase.firestore(config);
//const MySwal = withReactContent(Swal)

let today = `${date.getDate()}/${date.getMonth() === 0 ? 1 : date.getMonth() + 1}/${date.getFullYear()}`;
let inicial = [{ dataProducao: today, id: "a", ms35: 0, ms45: 0, md25: 0, md35: 0, md45: 0 }]


//GET DISPONIBILIDADE//
const getDisponivel = async (date, setUsado, setProducao, setDisponivel) => {
    //saida

    await db.collection('saida').where('dataProducao', '==', today).onSnapshot(
        snapshot => {
            console.log("DATE: ", date);
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

            db.collection('producao').where('dataProducao', '==', today.toString())
                .onSnapshot(snapshot => {
                    console.log(today.toString());
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

                    db.collection('disponivel').where('dataProducao', '==', today)
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



}

//FECHAMENTO DO DIA//
const fecharDia = (disponivel) => {
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
//MUDAR A ORDER DAS CAIXAS DE PRODUCÃO E SAIDA
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


export {fecharDia, getDisponivel, today,changeOrder}