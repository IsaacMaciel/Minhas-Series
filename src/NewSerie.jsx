import React, {useState,useEffect} from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom';

const NewSerie = () => {
    const [name,setName] = useState('');
    const [sucess,setSucess] = useState(false);
    const [genreiD,setGenreId] = useState('');

    const setValueName = (event) => {
        setName(event.target.value)
    }

    const gender = (event) => {
        setGenreId(event.target.value)
    }

    const [genres,setGenres] = useState([]);
    useEffect( () => {
       axios
       .get('/api/genres')
       .then( resp => {
           setGenres(resp.data.data)
        //    const genres = resp.data.data;
        //    const founded = genres.find(value => data.genre === value.name);
        //    if(founded) {
        //         setGenreId(founded.id);
        //    }
       }) 
    },[])

    const save = () => {
        axios.post('/api/series',{
            name,
            genre_id:genreiD
        })
        .then(resp => {
        })
        setSucess(true);
    }
    if (sucess) {
        return <Redirect to='/series'/> 
    }
    return (
        <div className="container">
            <h1> Nova Série</h1>
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

                <div className="form-group">
                    <label htmlFor="name"> Genero</label>
                    <select onChange={gender} defaultValue={genreiD} className="form-control">
                        <option value=""> Selecione um gênero...</option>
                        { genres.map(genre => 
                            <option 
                            key={genre.id}
                            value={genre.id}
                            >
                            {genre.name}
                            </option>
                            )}
                    </select>
                </div>

                <button onClick={save} type="submit" className='btn btn-primary'> Salvar</button>
            </form>
        </div>
    )
}
export default NewSerie