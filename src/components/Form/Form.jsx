import React, {useCallback, useEffect, useState} from 'react';
import './Form.css'
import {useTelegram} from "../hooks/useTelegram";

const Form = () => {
    const [country, setCountry] = useState('');
    const [street, setStreet] = useState('');
    const [subject, setSubject] = useState('physical');

    const{tg}=useTelegram()

    const onSendData= useCallback(()=>{
        const data = {
            country,
            street,
            subject
        }
        tg.sendData(JSON.stringify(data))
    }, [country,street,subject])


    useEffect(()=>{
        tg.onEvent('mainButtonClicked',onSendData)
        return ()=>{
            tg.offEvent('mainButtonClicked',onSendData)
        }
    },[])

    useEffect(()=>{
        tg.MainButton.setParams({
            text: 'Отправить данные'
        })
    }, [])


    const onChangeCountry = (e) => {
        setCountry(e.target.valuee)
    }
    const onChangeStreet = (e) => {
        setStreet(e.target.valuee)
    }
    const onChangeSubject = (e) => {
        setSubject(e.target.valuee)
    }

    return (
        <div className={"form"}>
            <h3>Введите ваши данные</h3>
            <input type="text" value={country} onChange={onChangeCountry} className={"input"} placeholder={"Страна"}/>
            <input type="text" value={street} onChange={onChangeStreet} className={"input"} placeholder={"Улица"}/>
            <select value={subject} onChange={onChangeSubject} className={"select"}>
                <option value={"physical"}>Физ. лицо</option>
                <option value={"legal"}>Юр. лицо</option>
            </select>
        </div>

    );
};

export default Form;