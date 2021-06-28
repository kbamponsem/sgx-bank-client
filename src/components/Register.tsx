import React, { useState } from 'react';
import { createAccount, hash } from '../services';
import BigButton from './BigButton';
import Input from './Input';
import { useHistory } from 'react-router';

const Register = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [accountNumber, setAccountNumber] = useState(0)
    const [showAccountNumber, setShowAccountNumber] = useState(false)
    const handleRegister = async (data: { username: string, password: string }) => await createAccount(data)
    const history = useHistory()

    return (
        <div className='wrapper'>
            <div className='register'>
                {
                    showAccountNumber ?
                        (<>
                            <div className='accounts-details'>
                                Username: {username}
                            </div>
                            <div className='accounts-details'>
                                Account Number: {accountNumber}
                            </div>

                            <BigButton buttonText="Login" onClick={() => {
                                history.push("/login", {accountNumber})
                            }} />
                        </>) :
                        (<>
                            <Input onChange={(e) => { setUsername(e.target.value) }} placeholder="Username" type="text" />
                            <Input onChange={(e) => { setPassword(hash(e.target.value)) }} placeholder="Password" type="password" />
                            <Input onChange={(e) => { setConfirmPassword(hash(e.target.value)) }} placeholder="Confirm Password" type="password" />

                            <BigButton buttonText="Register" onClick={async () => {
                                if (password === confirmPassword) {
                                    const results = await handleRegister({ username, password });
                                    if (results.message === "SUCCESS") {
                                        setAccountNumber(results.account_number)
                                        setShowAccountNumber(true)
                                    }
                                }

                            }} />
                            <p>Already have an account? <span className="link" onClick={() => history.push("/login")}>Login</span></p>
                        </>)
                }



            </div>
        </div>
    )
}

export default Register;