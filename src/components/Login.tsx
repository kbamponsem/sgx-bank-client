import React, { useState } from 'react'
import { hash, login, getSymmetricKey, sendIdAndSymmetricKey, getBalance } from '../services'
import BigButton from './BigButton';
import Input from './Input'
import { useHistory } from 'react-router';
import { useLocation } from 'react-router-dom';

interface IAccountDetails {
    accountNumber: number
}
const Login = () => {
    const history = useHistory()
    const location = useLocation<IAccountDetails>()
    const [account_number, setAccountNumber] = useState(location.state?.accountNumber ?? 0);
    const [password, setPassword] = useState("");
    const handleLogin = async (data: { account_number: number, password: string }) => await login(data)

    return (
        <div className="wrapper">
            <div className="login">
                <Input
                    value={account_number === 0 ? "" : account_number.toString()}
                    onChange={(e) => { setAccountNumber(Number(e.target.value)) }}
                    placeholder="Account Number" type="text"
                />
                <Input onChange={(e) => { setPassword(hash(e.target.value)) }} placeholder="Password" type="password" />

                <BigButton buttonText="Login" onClick={async () => {
                    const results: { message: string } = await handleLogin({ account_number, password });
                    if (results.message === "SUCCESS") {
                        const { enclave1, enclave2 } = await getSymmetricKey()
                        const stat = await sendIdAndSymmetricKey({ account_number, enclave1_symmetric_key: `${enclave1}`, enclave2_symmetric_key: `${enclave2}` })
                        // if (stat.message === "SUCCESS") {
                        //     sessionStorage.setItem("id", account_number.toString())
                        //     let res = await getBalance({account_number})

                        //     // history.replace("/accounts", res?.data)
                        // }
                    }

                }} />
                <p>New here? <span className="link" onClick={() => history.push("/register")}>Register</span></p>
            </div>
        </div>
    )
}

export default Login;