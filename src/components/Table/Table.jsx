import React, {useState, useEffect, useRef} from 'react';
import {cloneDeep} from 'lodash';

const Table = ({list=[]}) => {
    const [_list, setList] = useState(cloneDeep(list));
    const [borderWidth, setBorderWidth] = useState('1px');
    const listRef = useRef(_list);

    useEffect(() => {
        listRef.current = _list
    }, [_list])

    useEffect(() => {
        const interval = setInterval(() => {
            const unactiveList = listRef.current.filter(item =>  !item.active);
            const randomIndex = Math.floor(Math.random() * unactiveList.length);
            
            setList(prevList => prevList.map(item =>
                item === unactiveList[randomIndex] ?
                    {...item, active: true} :
                    item
            ));

            //
            if(unactiveList.length === 0 + 1) {
                setBorderWidth('5px');
                clearInterval(interval);
            }
            if(unactiveList.length === Math.floor(_list.length / 2) + 1) {
                setBorderWidth('3px');
            }
        }, 2000)

        return () => clearInterval(interval)
    }, []);

    return (
        <table style={{border: `${borderWidth} solid black`}}>
            <tbody>
                {_list.map((item, index) =>
                <tr key={index}>
                    <td style={item.active ? {color: 'green', fontWeight: 'bold'} : {}}>{item.type}</td>
                    <td>{item.icon}</td>
                </tr>)}
            </tbody>
        </table>
    );
};

export default Table;