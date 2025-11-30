import { useState } from 'react'
import { TextField, Button } from '@mui/material'
import axios from 'axios'
import './site.css'

function Produto({ setCurrentPage }) {
    const [name, setName] = useState('')
    const [preco, setPreco] = useState('')
    const [estoqueMinimo, setEstoqueMinimo] = useState('')

    function handleBack() {
        setCurrentPage('produto')
    }

    function handleSave() {
        const body = {
            name: name,
            preco: parseFloat(preco),
            estoqueMinimo: estoqueMinimo ? parseFloat(estoqueMinimo) : null
        }

        axios.post('http://localhost:3000/v1/produtos', body)
            .then(response => {
                alert('Produto cadastrado com sucesso!')
                setName('')
                setPreco('')
                setEstoqueMinimo('')
            })
            .catch(error => {
                console.error('Erro ao cadastrar produto:', error.message)
                alert('Erro ao cadastrar produto!')
            })
    }

    return (
        <div>
            <div className="conteudo">
                <h1>Cadastro de Produto</h1>
                <TextField label="Nome do Produto" variant="outlined" fullWidth margin="normal" value={name} onChange={(e) => setName(e.target.value)}/>
                <TextField label="Preço" variant="outlined" fullWidth margin="normal" type="number"value={preco} onChange={(e) => setPreco(e.target.value)}/>
                <TextField label="Estoque Mínimo" variant="outlined" fullWidth margin="normal" type="number"value={estoqueMinimo} onChange={(e) => setEstoqueMinimo(e.target.value)}/>

            <div style={{ display: 'flex', gap: '10px', marginTop: 20 }}>
                <Button variant="contained" color="primary" onClick={handleSave}>Cadastrar</Button>
                <Button variant="contained" color="primary" onClick={handleBack}>Voltar</Button>
            </div>
            </div>
        </div>
    )
}

export default Produto