import React, { useEffect, useState } from 'react'
import { getPokemon,getJamja } from './axios'
import './pokemon.css'
export default function Pokemon() {
    const [name, setName] = useState('')
    const [data, setData] = useState(null)
    const [jamja, setjamja] = useState(null)
    const changeName = (event) => setName(event.target.value)
    const [loading, setLoading] = useState(false)

const fetchJamja = ()=>{
    getJamja().then(res=>{
        setjamja(res.data)
    })
}

    const fetchPokemon = () => {

        if (name) {
            setLoading(true)
            getPokemon(name).then(res => {
              
                    setData(res.data)
                    setLoading(false)
             

            }).catch(err => {
                setLoading(false)
                setData(null)
            })
        } else {
            alert('Nhập tên đê')
        }
    }

    return (
        <div>

            <input type='text'
                value={name}
                onChange={changeName}
            ></input>
            <button onClick={() => fetchPokemon()}>Search</button>
            <button onClick={() => fetchJamja()}>Show Jamja</button>

            {jamja?jamja.objects.map(item=><p>{item.author[0]}</p>) : null}

            {loading ? <div className="loader">Loading...</div> : data ? (<div>
                <p>Thông tin: {data.name}</p>
                <p>Cân nặng: {data.weight} kg</p>
                <img src={data?.sprites?.other["official-artwork"]?.front_default} />
            </div>) : <p>Không có con nào tên là: {name} đâu</p>
            }
        </div>
    )
}
