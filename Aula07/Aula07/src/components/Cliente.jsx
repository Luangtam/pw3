import { useState } from 'react'

import viteLogo from '/vite.svg'
import { TextField, Button, Menu } from '@mui/material'
import axios from 'axios'
import  './site.css'
import MenuLateral from './MenuLateral'
function Cliente({ setCurrentPage }) {

    const [nome,setNome]  = useState('');
    const [email,setEmail]  = useState('');
    const [senha,setSenha]  = useState('');
    const [ende,setEnde]  = useState('');
    
    function handleBack() {
        setCurrentPage('cliente');
    }

    function handleSave() {
        const body = {
            name: nome,
            email: email,
            password: senha,
            endereco: ende
        };
        axios.post('http://localhost:3000/v1/clientes', body).then(response => {
         //   console.log('Cliente data:', response.data);
          //s  console.log(response.data);
            alert('Cliente cadastrado com sucesso!');
       
        }).catch(error => {
            console.error('There was an error!', error.message);
        });
      
    
    }

    return (
        <>
        <div>
         <div  className="conteudo">
            <h1>Cadastro de Cliente</h1>
            <TextField label="Nome" variant="outlined" fullWidth margin="normal" onChange={(e) => setNome(e.target.value)} />
            <TextField label="Email" variant="outlined" fullWidth margin="normal" onChange={(e) => setEmail(e.target.value)} />
            <TextField label="Senha" type="password" variant="outlined" fullWidth margin="normal" onChange={(e) => setSenha(e.target.value)} />
            <TextField label="Endereço" variant="outlined" fullWidth margin="normal" onChange={(e) => setEnde(e.target.value)} />
            <Button variant="contained" color="primary" style={{marginTop:20}} onClick={handleSave} >Cadastrar</Button>
            <div style={{width:20}}>

            </div>
            <Button variant="contained" color="primary" style={{marginTop:20}} onClick={handleBack} >Voltar</Button>
         </div>
         </div>
        </>
    )
}



export default Cliente