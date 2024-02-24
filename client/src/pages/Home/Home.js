import React, { useState, useEffect } from 'react'
import style from "./Home.module.css"
import { useNavigate } from "react-router-dom"
import AddProductPage from '../../components/Addproduct';


function Home() {
    const [login, setLogin] = useState(false);
    const navigate = useNavigate();

    const checktoken = () => {
        let token = localStorage.getItem("token");
        if (token) {
            setLogin(true);
        } else {
            setLogin(false);
        }
    };
    useEffect(() => {
        checktoken();
    }, []);

    const handlelogout = () => {
        setLogin(false);
        localStorage.clear();
    }

    return (
        <>
            <div className={style.header}>
                <div className={style.navbar}>
                    <div className={style.logo}>
                        <h2>EasyInvoice</h2>
                    </div>
                    <div className={style.nav}>
                        <p>Why EasyInvoice?</p>
                        <p>Contact us</p>
                        {login ? <><button onClick={() => handlelogout()}>logout</button></> : <div><button style={{ backgroundColor: "transparent", color: "black" }} onClick={() => navigate("/login")} >Login</button>
                            <button onClick={() => navigate("/signup")}>Signup</button></div>}

                    </div>
                </div>
            </div>
            <div className={style.advertise}>
                <div>
                    <div className={style.btn_adv}>100% Safe & Secure!</div>
                </div>
                <div >
                    <h3>SimpleInvoicing</h3>
                    <h4>Create invoices in less than 10 seconds</h4>
                    <div>
                        <p>EasyInvoice Inventory is designed to help you spend less time in front of the <br /> screen and more time with your customers. Download reports on <br /> current inventory and update inventory quantities in bulk, which is <br />helpful when adding new inventory.</p>
                    </div>
                    <br />
                    {login ? <> <button >Create your Invoice</button></> : <> <button onClick={() => navigate("/signup")} >Signup for free</button></>}

                </div>
            </div>
            <div>
                <AddProductPage />
            </div>
        </>
    )
}

export default Home