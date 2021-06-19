import React, {useState, useEffect} from 'react';
import '../randomChar/randomChar.css';
import Spinner from '../spinner';
import PropTypes from 'prop-types';




export default function RandomChar({getData, interval})  {
    
    
    const [char, updateChar] = useState(null);   //наш state


    
    useEffect(()=>{   //вместо componentDidMount - загрузка компонента
        renderChar();
        const timerId = setInterval( renderChar, interval);
        
        
        return () =>{  //вместо componentWillUnmount
            clearInterval(timerId);  //удаление элемента со стейта. завершениe жизненного цикла
        }
    }, [])
    
    function renderChar() {
        const id = Math.floor(Math.random() * 140 + 25); //25-140
        getData(id)
            .then( (char) => {
                updateChar(char) //функция изменяющяя state (itemList)
            })
    }

        if (!char){
            return <Spinner/>
        }


    const content = <View char={char}/>;

    return (
        <div className="random-block rounded">
            {content}
        </div>
    );
   
}

RandomChar.defaultProps ={  //если переданный пропс пропадет, страница не ляжет(делаем дефольный пропс)
    interval: 1500
}

RandomChar.propTypes = { 
    interval: PropTypes.number
}

const View = ({char}) => {
    const {name, gender, born, died, culture} = char;
    return (
        <>
            <h4>Random Character: {name}</h4>
            <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Gender </span>
                    <span>{gender}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Born </span>
                    <span>{born}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Died </span>
                    <span>{died}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Culture </span>
                    <span>{culture}</span>
                </li>
            </ul>
        </>
    )
}