import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '30ch',
        },
    },
    div: {
        "marginTop": 150
    },
    fields: {
        "marginBottom": 10,
        "width": '30ch',
    },
    containerLogin: {
        "margin": "auto",
    },
    permission: {
        'color': "blue",
        'float': 'right',
        'marginTop': '8rem',
        'marginRight': '1rem'
    }

}));


const Login = ({
    login,
    createusers,
    getSenha,
    getEmail,
    emailError,
    passwordError,
    hasAccount,
    setHasAccount }) => {

    const classes = useStyles();
    return (
        <div className="containerLogin">
            <form>
                <div className="input-label">
                    <label  htmlFor="email">Email:</label>
                    <input type="text" name="email" inputMode="email" onChange={getEmail} />
                    <p>{emailError}</p>
                </div>
                <div className="input-label">
                    <label  htmlFor="senha">Senha:</label>
                    <input type="password" name="senha" onChange={getSenha} />
                    <p>{passwordError}</p>
                </div>
                {hasAccount ?
                    (
                        <section className="help-text">
                            <button className="btn-form" onClick={createusers}>Criar conta</button>
                            <p>Tem conta, <span onClick={() => setHasAccount(!hasAccount)}>Acessar</span></p>
                        </section>

                    ) :
                    (
                        <section className="help-text">
                            <button className="btn-form" onClick={login}>Acessar</button>
                            <p>Não tem conta, <span onClick={() => setHasAccount(!hasAccount)}>increva-se</span></p>
                        </section>

                    )}
            </form>
        </div>
    )
}

export default Login;
