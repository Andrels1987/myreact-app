import React from 'react'

const Login = ({
    login,
    createusers,
    getSenha,
    getEmail,
    emailError,
    passwordError,
    hasAccount,
    setHasAccount }) => {


    return (
        <div className="containerLogin" >
            <section className="lateral" >
                <h1>E-STOCK</h1>
                <div className="images img1"></div>
                <div  className="images img2"></div>
                <div  className="images img3"></div>
            </section>
            <form >
                <div className="input-label">
                    <label htmlFor="email">Email</label>
                    <input type="text" name="email" inputMode="email" onChange={getEmail} autoFocus={true} />
                    <p>{emailError}</p>
                </div>
                <div className="input-label">
                    <label htmlFor="senha">Senha</label>
                    <input type="password" name="senha" onChange={getSenha} />
                    <p>{passwordError}</p>
                </div>
                {hasAccount ?
                    (
                        <section className="help-text">
                            <button className="btn-form" onClick={createusers}>Criar conta</button>
                            <p>Tem conta, <span onClick={() => setHasAccount(!hasAccount)}>Acesse</span></p>
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
