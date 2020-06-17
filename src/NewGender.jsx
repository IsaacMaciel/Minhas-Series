import React, {useState} from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom';

const NewGender = () => {
    const [name,setName] = useState('');
    const [sucess,setSucess] = useState(false);

    const setValueName = (event) => {
        setName(event.target.value)
    }
    const save = () => {
        axios.post('/api/genres',{
            name
        })
        .then(resp => {
        })
        setSucess(true);
    }
    if (sucess) {
        return <Redirect to='/generos'/> 
    }
    return (
        <div className="container">
            <h1> Novo Gênero</h1>
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
export default NewGender