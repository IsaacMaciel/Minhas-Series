import React, {useState,useEffect} from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom';
import { Badge } from 'reactstrap';

const InfoSerie = ({ match }) => {
    const { id } = match.params;

    const [form,setForm] = useState({
        name:''
    });
    const [sucess,setSucess] = useState(false);
    const [mode,setMode] = useState('INFO');
    const [genreId,setGenreId] = useState('');
    
    const [data,setData] = useState({})
    useEffect( () => {
        axios.get(`/api/series/${id}`)
        .then( res => {
            setData(res.data)
            setForm(res.data);
        })
    },[id])

    const [genres,setGenres] = useState([]);
    useEffect( () => {
       axios
       .get('/api/genres')
       .then( resp => {
           setGenres(resp.data.data)
           const genres = resp.data.data;
           const founded = genres.find(value => data.genre === value.name);
           if(founded) {
                setGenreId(founded.id);
           }
       }) 
    },[data])

    // custo header
    const masterHeader = {
        height: '50vh',
        minHeight: '500px',
        backgroundImage: `url('${data.background}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
    }
    
    const genre_set = event => {
        setGenreId(event.target.value);
    }

    const setValue = field => (event) => {
       setForm({
           ...form,
           [field]:event.target.value
       })
    }
    const save = () => {
        axios.put(`/api/series/${id}`,{
            ...form,
            genre_id: genreId
        }
        )
        .then(resp => {
        })
        setSucess(true);
    }

    // if (sucess) {
    //     return <Redirect to='/series'/> 
    // }
    return (
        <div>
            <header style={masterHeader}>
                <div className="h-100" style={{background: 'rgba(0,0,0,0.7)'}}>
                    <div className='h-100 container'>
                        <div className="row h-100 align-items-center">
                            <div className="col-3">
                                <img alt={data.name} className='img-fluid img-thumbnail' src={data.poster} alt=""/>
                            </div>
                            <div className="col-8">
                                <h1 className='font-weight-light text-white'>{data.name}</h1>
                                <div className="lead text-white">
                                    {data.status === 'ASSISTIDO' && <Badge color='success mr-2 p-2'>Assistido</Badge>}
                                    {data.status === 'PARA_ASSISTIR' && <Badge color='warning mr-2 p-2'> Para assistir</Badge>}
                                
                                        <Badge color='danger p-2'>{data.genre}</Badge>
                                       
                                    
                                    <div className='mt-3'>
                                        {data.comments}
                                    </div>    
                                                                                    
                                </div>
                            </div>

                            


                        </div>
                    </div>
                </div>
            </header>
            <div className='container'>
                <button className='btn btn-primary my-3'  onClick={() => setMode('EDIT')}> Editar</button>
            </div>
            {
                mode === 'EDIT' &&
                <div className="container">
                    <h1> Novo Série</h1>
                   
                    <button className='btn btn-primary my-3' onClick={() => setMode('INFO')} > Cancelar Edição</button>
                    <form>
                        <div className="form-group">
                            <label htmlFor="name"> Nome</label>
                            <input 
                            type="text" 
                            className='form-control' 
                            id="name"
                            onChange={setValue('name')}
                            value={form.name}
                            />
                        </div>

                        
                        <div className="form-group">
                            <label htmlFor="name"> Genero</label>
                           <select onChange={genre_set} defaultValue={genreId} className="form-control">
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

                        <div className="form-check">
                            <input 
                            type="radio" 
                            className="form-check-input"
                            name='status'
                            id='assistido'
                            value='ASSISTIDO'
                            checked={form.status === 'ASSISTIDO'}
                            onChange={setValue('status')}
                            />
                            <label 
                            htmlFor="assistido" 
                            className="form-check-label"
                            > Assistido
                            </label>
                        </div>

                        <div className="form-check">             
                            <input 
                            type="radio" 
                            className="form-check-input"
                            name='status'
                            id='paraAssistir'
                            value='PARA_ASSISTIR'
                            checked={form.status === 'PARA_ASSISTIR'}
                            onChange={setValue('status')}

                            />
                            <label 
                            htmlFor="paraAssistir" 
                            className="form-check-label"
                            > Para assistir
                            </label>
                        </div>

                       
                        <button onClick={save} type="submit" className='btn btn-primary my-3'> Salvar</button>
                    </form>
                </div>
            }
        </div>
    )
}
export default InfoSerie