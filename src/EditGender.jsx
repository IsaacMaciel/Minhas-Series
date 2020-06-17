import React, {useState,useEffect} from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom';

const EditGender = ({ match }) => {
    const id = match.params.id
    const [name,setName] = useState('');
    const [sucess,setSucess] = useState(false);

    useEffect( () => {
        axios.get(`/api/genres/${id}`)
        .then( resp => {
            setName(resp.data.name)
        })
    },[id])

    const setValueName = (event) => {
        setName(event.target.value)
    }
    const save = () => {
        axios.put(`/api/genres/${id}`,{
            name
        })
        .then(resp => {
            
        })
        setSucess(true)
    }
    if (sucess) {
        return <Redirect to='/generos'/> 
    }
    return (
        <div className="container">
            <h1> Editar Gênero</h1>
            <form>
                <div className="form-group">
                    <label htmlFor="name"> Nome</label>
                    <input 
                    type="text" 
                    className='form-control' 
                    id="name"
                    placeholder='Nome do Gênero'
                    onChange={setValueName}
                    value={name}
                    />
                </div>
                <button onClick={save} type="submit" className='btn btn-primary'> Salvar</button>
            </form>
        </div>
    )
}
export default EditGender