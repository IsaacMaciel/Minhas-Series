import React,{useState,useEffect} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom'

const Generos = () => {
    const [data,setData] = useState([]);
    useEffect(() => {
        axios.get('/api/genres')
        .then( res => {
            setData(res.data.data)
        })
    },[])

    const deleteGenre = id => {
        axios
        .delete(`/api/genres/${id}`)
        .then(resp => {
            const filtered = data.filter( item => item.id !== id)
            setData(filtered)
        })
    }

    const renderLine = record => {
        return (
            <tr key={record.id}>
                <th scope='row'>{record.id}</th>
                <td>{record.name}</td>
                <td>
                    <button className='btn btn-danger mr-2' onClick={() => deleteGenre(record.id)}>-</button>
                    <Link className='btn btn-warning' to={`/generos/${record.id}`}> Editar </Link>
                </td>
            </tr>
        )
    }
    if (data.length === 0) {
        return (
            <div className='container'>
                <h1>Generos</h1>
                <div><Link className='btn btn-primary' to='/generos/novo'> Adicionar Gênero </Link> </div>
                <div className="alert alert-warning" role='alert'>
                    Você não possui gêneros criados.
                </div>

            </div>
        )
    }
    return (
        <div className="container">
            <h1> Generos </h1>
            <div><Link className='btn btn-primary my-3' to='/generos/novo'> Adicionar Gênero </Link> </div>
            <table className="table table-dark">
            <thead>
                <tr>
                <th scope="col">ID</th>
                <th scope="col">Nome</th>       
                <th scope="col">Ações</th>       
                </tr>
            </thead>
            <tbody>
               {data.map(renderLine)}
            </tbody>
            </table>
        </div>
    )

}

export default Generos