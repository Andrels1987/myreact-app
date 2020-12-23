import firebase from 'firebase/app'
import config from '../../firebase.config'
import 'firebase/firestore'

const collection = 'products'
let db = firebase.firestore(config)


const showAddProduto = (ref) => {
    let top = ref.style.top
    if (top === "68px") {
        ref.style.transition = "1s"
        ref.style.top = "-600px"            
    } else {
        ref.style.top = "68px"
        ref.style.transition = "1s"
    }
}
//ADICIONAR PRODUTOS
const salvarProduto = (produto, reference) => {
    //let data = { categoria, nomeProduto, descontinuado, minimoEstoque, quantidadeEstoque, tipo }
    db.collection(collection).add(produto)
    reference.style.top = "-565px"
}

//DELETAR PRODUTOS
const deletarProduto = (id, history) => {
    db.collection(collection).doc(id).delete()
    .then(res => {
        console.log("DELETED")
    })
    history.push('/')
}
//ATUALIZAR PRODUTOS
const atualizarProduto = (produto, history) => {
    db.collection(collection).doc(produto.id).update(produto)
    history.push('/')
}

const getDoc = (params, setProduto, setChecked) => {
    return db.collection(collection).doc(params.id)
        .get()
        .then(
            res => {
                if (res.exists) {
                    let data = res.data()
                    let id = res.id
                    setProduto({id,...data})
                    setChecked(data.descontinuado)
                }
            }
        )
    
}

const getALLProdutos = (setProdutos, setLoading) =>{
    return db.collection(collection).onSnapshot(
        snapshot => {
            const intermediateData = []
            snapshot.docs.map((doc) => {
                let id = doc.id
                let data = doc.data()
                intermediateData.push({ id, ...data })
                return { id, ...data }
            });
            if(intermediateData){
                setProdutos(intermediateData)
                setLoading(false)
            }
            
        }
    )
}
export {showAddProduto,getALLProdutos, salvarProduto, atualizarProduto, deletarProduto, getDoc}