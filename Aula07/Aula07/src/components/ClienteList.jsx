import { useState, useEffect } from 'react'

import viteLogo from '/vite.svg'
import { TextField, Button, Menu } from '@mui/material'
import axios from 'axios'
import  './site.css'
import MenuLateral from './MenuLateral'
function ClienteList({ setCurrentPage, setIdCliente }) {

    const [nome,setNome]  = useState('');
    const [email,setEmail]  = useState('');
    const [listaClientes, setListaClientes] = useState([]);

    function setClientesList(){

        const body={
            name:  "%"+nome+"%",
            email: "%"+email+"%"
        }

         axios.post('http://localhost:3000/v1/clientes/by', body).then(response => {
            console.log('Cliente data:', response.data);
            setListaClientes(response.data);
       
        }   ).catch(error => {
            console.error('There was an error!', error.message);
        }   );   

    }

    function handleNew() {
        setCurrentPage('newcliente');

    }

    function handleSave() {
       // alert('Pesquisar usuario: '+nome+' - '+email);
        const body = {
            name: nome,
            email: email
        };
        setClientesList();
    }

    function handleDelete(id) {
        const resposta = confirm('Deseja excluir o cliente '+id.name+" ?");
        if (resposta){

            axios.delete('http://localhost:3000/v1/clientes/'+id.id).then(response => {
                console.log('Cliente deleted:', response.data);
                setClientesList();
            }).catch(error => {
                console.error('Houve um erro ao excluir!', error.message);
            });
        }
    }

    function handleUpdade(id){
      //  alert('Editar usuario '+id.name);
        setCurrentPage('updatecliente');
        setIdCliente(id.id);
    }

     useEffect(() => {
       setClientesList();

     }, []);

   
    return (
        <>
        <div>
         <div  className="conteudo">
            <h1>Cadastro de Clientes</h1>
            <TextField label="Nome" variant="outlined" fullWidth margin="normal" onChange={(e) => setNome(e.target.value)} />
            <TextField label="Email" variant="outlined" fullWidth margin="normal" onChange={(e) => setEmail(e.target.value)} />
            <Button variant="contained" color="primary" style={{marginTop:20}} onClick={handleSave} >Pesquisar</Button>
            <Button variant="contained" color="primary" style={{marginTop:20}} onClick={handleNew} >Novo</Button>
       
         </div>
         <div className="table_component" style={{marginTop:20}}>
            <table>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Email</th>
                        <th>excluir</th>
                        <th>Editar</th>
                    </tr>
                </thead>
                <tbody>
                    {listaClientes.map((cliente) => (
                    <tr key={cliente.id}>
                        <td>{cliente.name}</td>
                        <td>{cliente.email}</td>
                        <td> <a  onClick={() => handleDelete(cliente)} href='#'>excluir</a>  </td>
                        <td> <a  onClick={() => handleUpdade(cliente)} href='#'>editar</a>  </td>
                    </tr>))}
                </tbody>
            </table>
         </div>
         </div>
        </>
    )
}



export default ClienteList