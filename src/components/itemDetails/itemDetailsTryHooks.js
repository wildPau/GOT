import React, {useState, useEffect} from 'react';
import './itemDetails.css';

//todo I don`t khow how to chandge  React.Children.map in the Hooks component  it just doesn`t render (всё сделал, только отрисовать нужно, ниже нужно правильно передать только item)


const Field = ({item, field, label}) => {
    console.log(field)
    return (
        <li className="list-group-item d-flex justify-content-between">
            <span className="term">{label}</span>
            <span>{item[field]}</span>
        </li>
    )
}

export {
    Field
};

export default function  ItemDetails ({getData, itemId}) {


    const [item, setItem] = useState(null);   

    useEffect( () => {   //вместо componentDidMount - загрузка компонента
        updateItem();
    }, [itemId])
    
    

    
    const updateItem = () => {

        if (!itemId) {
            return;
        }
        
        getData(itemId)
        .then((item) =>{
            setItem(item)

        })

    }
    

    if (!item) {
        return <span className='select-error'>Please select item in the list</span>
    }
    
    const {name} = item;


    return (
        <div className="char-details rounded">
            <h4>{name}</h4>
            <ul className="list-group list-group-flush">
                {
                        React.Children.map(this.props.children, (child) => {
                            return React.cloneElement(child, {item})
                        })
                }
            </ul>
        </div>
    );

}