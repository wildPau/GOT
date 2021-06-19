import React, {useState, useEffect} from 'react';
import './itemList.css';
import Spinner from '../spinner';
import PropTypes from 'prop-types';

 function ItemList ({getData, onItemSelected, renderItem}) {

    const [itemList, updateList] = useState([]);  

    useEffect(()=>{   //вместо componentDidMount - загрузка компонента
        getData()
            .then( (data) => {
                updateList(data) 
            })
    }, []) 


    function renderItems(arr) {
        return arr.map((item) => {
            const {id} = item;

            const label = renderItem(item);
            return (
                <li 
                    key={id}
                    className="list-group-item"
                    onClick={ () => onItemSelected(id)}>
                    {label}
                </li>
            )
        })
    }



    if (!itemList) {
        return <Spinner/>
    }

    const items = renderItems(itemList);

    return (
        <ul className="item-list list-group">
            {items}
        </ul>
    );
}

    ItemList.defaulProps ={
        onItemSelected: () => {}
    }




ItemList.propTypes ={
    onItemSelected: PropTypes.func,
    getData: PropTypes.func
    
}


export default ItemList;




/**
 * передаём пустой массив как второй аргумент useEffect для сравнения полученных данных с сервера и имеющихся, что бы не было бесконеч цикла (не скачиваем данные которые у нас уже есть)
 * Логика компонента: получает список items, отрисовывает его, при клике отслеживает id item и передает родителю что бы тот отрисовал другой компонент с нашим id
 * PropTypes : проверка передаваемых пропсов на тип данных
 */