import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { getBalance, logout } from '../services';
import BigButton from './BigButton';
import Input from './Input';


const Account = () => {
    const handleLogout = async (data: { id: number }) => {
        const results = await logout(data)
        console.log(results)
    }
    const history = useHistory()
    const location = useLocation<string>()
    const data = JSON.parse(location.state);
    console.log(data.amount)
    const [balance, setBalance] = useState(parseFloat(data.amount) ?? 0);
    return (
        <div className="wrapper">
            <div className='accounts'>

                <div className='balance'>
                    <div>
                        Balance: {balance}
                    </div>
                    <BigButton buttonText='Sign out' onClick={() => {
                        const id = sessionStorage.getItem("id")
                        if (id !== undefined) {
                            sessionStorage.removeItem("id")
                            handleLogout({ id: Number(id) })
                        }
                        history.replace("/login")
                    }} />
                </div>
                <div className='inputs'>
                    <Input placeholder="Amount" type="number" />
                    <div className='buttons'>
                        <BigButton buttonText='Deposit' />
                        <BigButton buttonText='Withdraw' />
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Account;