import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import Person from './Person';


export default function Main(props) {
    let history = useHistory();
    const [name, setName] = useState('')
    const [age, setAge] = useState(0)
    const [listUser, setListUser] = useState([])
    const [indexEdit, setIndexEdit] = useState(null)
    const [listCheck, setListCheck] = useState([])
    
    const handleCheckBox = (index) => {
        if (listCheck.indexOf(index) == -1) {
            setListCheck([...listCheck, index])
        } else {
            setListCheck([...listCheck.filter(item => item != index)])
        }
    }

    const deleteAll = () => {
        setListUser([...listUser.filter((item, index) => !listCheck.includes(index))])
        setListCheck([])
    }

    const submit = () => {
        let obj = {
            name,
            age
        }
        setName('')
        setAge(0)
        let newList = listUser
        newList.push(obj)
        setListUser([...newList])
    }

    const changeName = (event) => setName(event.target.value)
    const addAge = () => setAge(age + 1)
    const minusAge = () => setAge(age - 1)

    const remove = (index) => {

    }

    const edit = (index) => {

        setName(listUser[index].name)
        setAge(listUser[index].age)

        setIndexEdit(index)
        history.push('/edit/'+index)
    }

    const save = () => {
        let newArray = listUser
        newArray[indexEdit].age = age
        newArray[indexEdit].name = name
        setListUser([...newArray])

        setIndexEdit(null)
        setName('')
        setAge(0)
    }

    const renderItem = (item, index) => {
        return <Person
            item={item}
            index={index}
            listCheck={listCheck}
            handleCheckBox={handleCheckBox}
            remove={remove}
            edit={edit}
        />
    }
    return (
        <div>
            Hello {name},
            Age {age}
            <br />
            <input type='text' value={name} onChange={changeName} />
            <button onClick={addAge} >Add</button>
            <button onClick={minusAge}>Minus</button>
            <button onClick={deleteAll}>Delete All</button>
            <button onClick={indexEdit!=null ? save : submit} >{indexEdit!=null ? "Edit" : "Submit"}</button>
            <ul>
                {listUser.map(renderItem)}
            </ul>
        </div>
    )
}
// THêm 1 nút edit vào từng thẻ li
// khi bấm edit thì hiện tên tuổi lên trên ô nhập
// nút submit thành nút edit, xuất hiện thêm nút cancel
// bấm cancel thì nút edit lại trở thành nút submit, nút cancel mất đi
//bấm edit thì edit data, giữ nguyên thứ tự
