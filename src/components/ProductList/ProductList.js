import React, {useCallback, useEffect, useState} from 'react';
import './ProductList.css'
import ProductItem from "../ProductItem/ProductItem";
import {useTelegram} from "../hooks/useTelegram";

const products =[
    {id:'1', title:'Джинсы',price:1222, description: 'Синего цвета, прямые'},
    {id:'2', title:'Куртка',price:519, description: 'Синего цвета, прямая'},
    {id:'3', title:'Джинсы 2',price:5115, description: 'чёрного, с дырками'},
    {id:'4', title:'Спартифки:)',price:5112, description: 'белого цвета, zxc'},
    {id:'5', title:'Джинсы 4',price:13124, description: 'Синего цвета, прямые'},
    {id:'6', title:'Штаны ',price:100, description: 'Синего цвета, прямые'},
    {id:'7', title:'кофта',price:9441, description: 'Синего цвета, шёлк'},
    {id:'8', title:'сумка',price:5000, description: 'Синего цвета, кожа'},
]
const getTotalPrice=(items=[])=>{
    return items.reduce((acc,item)=>{
        return acc += item.price
    },0)
}

const ProductList = () => {
    const[addedItems, setAddedItems]=useState([]);
    const{tg, queryId} = useTelegram()

    const onSendData= useCallback(()=>{
        const data = {
           products: addedItems,
            totalPrice: getTotalPrice(addedItems),
            queryId,
        }
        fetch('http://localhost:8000/web-data',{
            method: 'POST',
            headers:{
                'Content-Type':'application/json',
            },
            body: JSON.stringify(data)
        })

    }, [addedItems])


    useEffect(()=>{
        tg.onEvent('mainButtonClicked',onSendData)
        return ()=>{
            tg.offEvent('mainButtonClicked',onSendData)
        }
    },[onSendData])

    const onAdd=(product)=>{
        const alreadyAdded = addedItems.find(item=> item.id === product.id)
        let newItems = [];
        if(alreadyAdded){
            newItems = addedItems.filter(item=>item.id !== product.id);
        } else {
            newItems = [...addedItems, product]
        }
        setAddedItems(newItems)

        if(newItems.length === 0){
            tg.MainButton.hide();
        }else{
            tg.MainButton.show();
            tg.MainButton.setParams({
                text:`Купить ${getTotalPrice(newItems)}`
            })
        }
    }
    return (
        <div className={'list'}>
            {products.map(item => (
                <ProductItem
                    product={item}
                    onAdd={onAdd}
                    className={'item'}
                />
            ))}
        </div>
    );
};

export default ProductList;