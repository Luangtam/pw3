import { useState, useEffect } from 'react'

import viteLogo from '/vite.svg'
import { TextField, Button, Menu } from '@mui/material'
import axios from 'axios'
import  './site.css'
import MenuLateral from './MenuLateral'
import Usuario from './Usuario'
import UsuarioList from './UsuarioList'
import UsuarioUpdate from './UsuarioUpdate'
import Produto from './Produto'
import ProdutoList from './ProdutoList'
import ProdutoUpdate from './ProdutoUpdate'

function Home() {
   
    const [page,setPage]  = useState('home');
    const [idUser,setIdUser]  = useState(1);
    const [idProduto, setIdProduto] = useState(1)

    function renderContent() {
        if (page === 'home') { 
            return <h1>Bem-vindo à página Home!</h1>;
        }
        if (page === 'usuario') {
            return <UsuarioList setCurrentPage={setPage} setIdUser={setIdUser}  />;
        } 
        if (page === 'newusuario') {
            return <Usuario setCurrentPage={setPage}/>;
        }
        
        if (page === 'updateusuario') {
            console.log('ID do usuário para atualizar:', idUser);
            return <UsuarioUpdate setCurrentPage={setPage} idUser={idUser} />;
        }

        if (page === 'produto') {
            return <ProdutoList setCurrentPage={setPage} setIdProduto={setIdProduto}  />; 
        }
        if (page === 'newproduto') {
            return <Produto setCurrentPage={setPage}/>;
        }
        if (page === 'updateproduto') {
            console.log('ID do produto para atualizar:', idProduto); 
            return <ProdutoUpdate setCurrentPage={setPage} idProduto={idProduto} />; 
        if (page === 'cliente') {
            return <ClienteList setCurrentPage={setPage} setIdCliente={setIdCliente}  />;
        } 
        if (page === 'newcliente') {
            return <Cliente setCurrentPage={setPage}/>;
        }
        
        if (page === 'updatecliente') {
            console.log('ID do cliente para atualizar:', idCliente);
            return <ClienteUpdate setCurrentPage={setPage} idCliente={idCliente} />;
        }
        
    }

    return (
        <>
        <div style={{display:'flex', flexDirection:'row' }}>
         <MenuLateral setCurrentPage={setPage} />
         <div  className="conteudo">
           {renderContent()}
         </div>
         </div>
        </>
    )
}



export default Home
