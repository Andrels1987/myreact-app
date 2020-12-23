
import 'firebase/firestore'
import firebase from 'firebase/app'
import config from '../../firebase.config'
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content'


let db = firebase.firestore(config);
const MySwal = withReactContent(Swal)
let collection = 'pizza'


//ADICIONAR PIZZA AO FIREBASE
const salvarPizzas = async (nome, ingredientes, quantidade, reference) => {
    await db.collection('pizza').add({ nome: nome, ingredientes: ingredientes, quantidade: quantidade })
    reference.style.top = "-400px"
}
//DELETAR PIZZA NO FIREBASE
const deletarPizza = (id, history) => {
    db.collection(collection).doc(id).delete().then(res => console.log("DELETED"))
    history.push('/pizzas')
}
//ATUALIZAR O A PIZZA NO FIREBASE
const atualizarPizza = (pizza, history) => {
    db.collection(collection).doc(pizza.id).update(pizza)
    history.push('/pizzas')
}
//BUSCAR PIZZA DE ACORDO COM O ID NO PERFIL PIZZA
const getDoc = async (params, setPizza) => {
    let unsubscribe = await db.collection(collection).doc(params.id)
        .get()
        .then(
            res => {
                if (res.exists) {
                    let data = res.data()
                    let id = res.id
                    setPizza({ id, ...data })
                }
            }
        )
    return unsubscribe
}
//MOSTRAR O FORMULARIO PRA ADICIONAR PIZZAS
const showAddPizza = (ref) => {
    if (ref.style.top === "80px") {
        ref.style.transition = "1s"
        ref.style.top = "-400px"
    } else {
        ref.style.top = "80px"
        ref.style.transition = "1s"
    }
}
//TODAS AS PIZZAS NO BANCO DE DADOS
const getAllPizzas = (setPizzas, setLoading) => {
    return db.collection(collection).onSnapshot(
        snapshot => {
            const intermadiateData = []
            snapshot.docs.map((doc) => {
                let id = doc.id;
                let data = doc.data();
                intermadiateData.push({ id, ...data })
                return { id, ...data }
            });
            if (intermadiateData) {
                setPizzas(intermadiateData)
                setLoading(false)
            }

        }
    )
}

//ATUALIZAÇÃO DO ESTOQUE
const atualizarEstoque = async (id) => {
    //console.log("ID: ", id);
    const inputOptions = {
        'inteira': '1',
        'metade': '1/2',
        'quarto': '1/4'
    }
    let quant = 0;
    const { value: fraction } = await MySwal.fire({
        title: 'Escolha a fração desejada',
        input: "radio",
        inputOptions: inputOptions,
        inputValidator: (value) => {
            if (!value) {
                return 'You need to choose something!'
            }
        }
    })
    const { value: quantity } = await MySwal.fire({
        title: 'Quantidade',
        input: "text",
        inputOptions: inputOptions,
        inputValidator: (value) => {
            if (!value) {
                return 'You need to choose something!'
            }
        }
    })
    if (quantity > 0) {
        quant = quantity
    }

    await db.collection(collection).doc(id).get()
        .then(
            pizza => {
                let data = pizza.data()
                return { ingredientes: data.ingredientes, quantidade: data.quantidade }
            }
        ).then(
            res => {
                let ingredientes = res.ingredientes.split(",")
                let quantidade = res.quantidade.split(',')
                quantidade = quantidade.map(q => parseInt(q))
                //console.log(ingredientes, quantidade)
                ingredientes.map(ing => {
                    return db.collection('products').where('nomeProduto', '==', ing)
                        .get()
                        .then(
                            d => {
                                d.docs.map(doc => {
                                    let data = doc.data()
                                    if (fraction === 'inteira') {
                                        let quantidadeEstoque = data.quantidadeEstoque - (quantidade[ingredientes.indexOf(data.nomeProduto)] * quant)
                                        db.collection("products").doc(doc.id).update({ ...data, quantidadeEstoque: quantidadeEstoque })
                                        return fraction
                                    } else if (fraction === 'metade') {
                                        let quantidadeEstoque = data.quantidadeEstoque - ((quantidade[ingredientes.indexOf(data.nomeProduto)] / 2) * quant)
                                        db.collection("products").doc(doc.id).update({ ...data, quantidadeEstoque: quantidadeEstoque })
                                        return fraction
                                    } else {
                                        let quantidadeEstoque = data.quantidadeEstoque - ((quantidade[ingredientes.indexOf(data.nomeProduto)] / 4) * quant)
                                        db.collection("products").doc(doc.id).update({ ...data, quantidadeEstoque: quantidadeEstoque })
                                        return fraction
                                    }
                                    //let quantidadeEstoque = data.quantidadeEstoque - quantidade[ingredientes.indexOf(data.nomeProduto)]
                                    //db.collection("products").doc(doc.id).update({...data, quantidadeEstoque: quantidadeEstoque})
                                    //console.log(quantidadeEstoque);
                                })
                            }
                        )


                })
            }
        )
    //p.unsubscribe();

}
export { atualizarEstoque, getAllPizzas, salvarPizzas, deletarPizza, atualizarPizza, getDoc, showAddPizza };