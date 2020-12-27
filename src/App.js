import React, { useState, useEffect } from 'react';
import Disponivel from './components/Disponivel';
import Footer from './components/Footer';
import Header from './components/Header';
import Home from './components/Home';
import PizzaList from './components/PizzaList';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import PerfilProduto from './components/PerfilProduto';
import 'firebase/firestore'
import 'firebase/auth'
import config from './firebase.config';
import firebase from 'firebase/app'
import Login from './components/Login';
import PerfilPizza from './components/PerfilPizza';

const auth = firebase.auth();
let body = document.querySelector('body')
function App() {

  const [produto, setProduto] = useState(null);
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")
  const [userDisplayName, setUserDisplayName] = useState("")
  const [emailError, setEmailError] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const [hasAccount, setHasAccount] = useState(false)

  const authListener = () => {
    auth.onAuthStateChanged(user => {
      if (user) {
        setUserDisplayName(user.email.charAt(0))
        setUser(user)
        body.style.background = "#F2F5E6"
      } else {
        setUser(null)
        setEmailError("")
        setPasswordError("")
        body.style.background = "linear-gradient(90deg, rgba(56,177,215,1) 0%, rgba(2,23,41,1) 0%, rgba(6,82,147,1) 100%)"
      }
    })
  }

  const getEmail = (e) => {
    if(e.target.value){
      setEmailError("")
      setEmail(e.target.value);
    }
    
  }

  const getSenha = (e) => {
    if(e.target.value)
    {
      setPasswordError("")
      setSenha(e.target.value)
    }
  }

  useEffect(() => {
    authListener();
  }, [])


  let db = firebase.firestore(config)

  const handleChange = async (event) => {
    let inputValue = event.target.value
    //setInputText(inputValue)
    if (inputValue !== "") {
      let data = await db.collection('products').get()
      let allProds = await data.docs.map(doc => {
        let id = doc.id
        let data = doc.data()
        return { id, ...data }
      })
      let prod = allProds.filter(doc => doc.nomeProduto.toLowerCase().includes(inputValue.toLowerCase()))
      setProduto(prod)

    } else {
      setProduto(null)
    }
  }



  const login = (e) => {
    e.preventDefault()
    auth.signInWithEmailAndPassword(email, senha)
      .catch(err => {
        switch (err.code) {
          case 'auth/invalid-email':
          case 'auth/user-disabled':
          case 'auth/user-not-found':
            setEmailError(err.message)
            break;
          case "auth/wrong-password":
            setPasswordError(err.message)
            break;
          default:
            console.log("YOU CAN'T GET IN")

        }
      })
  }
  const createUsers = (e) => {
    e.preventDefault()
    auth.createUserWithEmailAndPassword(email, senha)
      .then()
      .catch(err => {
        switch (err.code) {
          case 'auth/email-already-in-use':
          case 'auth/invalid-email':
            setEmailError(err.message)
            break;
          case "auth/weak-password":
            setPasswordError(err.message)
            break;
          default:
            console.log("YOU CAN'T GET IN")
        }
      })
  }

  const signOut = () => {
    auth.signOut()
  }

  return (
    <div>
      {user ?
        (
          <Router>
            <Header handleChange={handleChange} displayName={userDisplayName} user={user} signout={signOut} />
            <Switch>
              <Route path="/pizzas">
                <PizzaList />
              </Route>
              <Route path="/produto/:id">
                <PerfilProduto />
              </Route>
              <Route path="/pizza/:id">
                <PerfilPizza />
              </Route>
              <Route path="/disponivel">
                <Disponivel />
              </Route>
              <Route path="/">
                <Home produto={produto} setProduto={setProduto} />
              </Route>
            </Switch>
            <Footer />
          </Router>
        ) :
        (
          <Login login={login}
            createusers={createUsers}
            user={user}
            getEmail={getEmail}
            getSenha={getSenha}
            emailError={emailError}
            passwordError={passwordError}
            setEmailError={setEmailError}
            setPasswordError={setPasswordError}
            hasAccount={hasAccount}
            setHasAccount={setHasAccount} />
        )}




    </div>
  );
}

export default App;