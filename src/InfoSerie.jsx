import React, {useState,useEffect} from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom';
import { Badge } from 'reactstrap';

const InfoSerie = ({ match }) => {
    const { id } = match.params;

    const [form,setForm] = useState('');
    const [sucess,setSucess] = useState(false);
    const [mode,setMode] = useState('INFO');

    const [data,setData] = useState({})
    useEffect( () => {
        axios.get(`/api/series/${id}`)
        .then( res => {
            console.log(res)
            setData(res.data)
            setForm(res.data);
        })
    },[id])

    // custo header
    const masterHeader = {
        height: '50vh',
        minHeight: '500px',
        backgroundImage: `url('${data.background}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
    }
    const setValueName = (event) => {
       // setName(event.target.value)
    }
    const save = () => {
        axios.post('/api/series',{
            form
        })
        .then(resp => {
        })
        setSucess(true);
    }
    if (sucess) {
        return <Redirect to='/series'/> 
    }
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
                                    <Badge color='success'>Assistido</Badge>
                                    <Badge color='warning'> Para assistir</Badge>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <div>
                <button className='btn btn-primary' onClick={() => setMode('EDIT')}> Editar</button>
            </div>
            {
                mode === 'EDIT' &&
                <div className="container">
                    <h1> Novo Série</h1>
                    <button className='btn btn-primary' onClick={() => setMode('INFO')} > Cancelar Edição</button>
                    <form>
                        <div className="form-group">
                            <label htmlFor="name"> Nome</label>
                            <input 
                            type="text" 
                            className='form-control' 
                            id="name"
                            onChange={setValueName}
                            value={form.name}
                            />
                        </div>
                        <button onClick={save} type="submit" className='btn btn-primary'> Salvar</button>
                    </form>
                </div>
            }
        </div>
    )
}
export default InfoSerie