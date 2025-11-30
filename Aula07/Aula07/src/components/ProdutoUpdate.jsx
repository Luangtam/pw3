import { useState, useEffect } from 'react'
import { TextField, Button } from '@mui/material'
import axios from 'axios'
import './site.css'

function ProdutoUpdate({ setCurrentPage, idProduto }) {
    const [name, setName] = useState('')
    const [preco, setPreco] = useState('')
    const [estoqueMinimo, setEstoqueMinimo] = useState('')
    const [id, setId] = useState(idProduto)

    useEffect(() => {
        if (idProduto) {
            axios.get(`http://localhost:3000/v1/produtos/${idProduto}`)
                .then(response => {
                    const produto = response.data
                    setName(produto.name)
                    setPreco(produto.preco)
                    setEstoqueMinimo(produto.estoqueMinimo || '')
                    setId(produto.id)
                })
                .catch(error => {
                    console.error('Erro ao carregar produto:', error.message)
                    alert('Erro ao carregar dados do produto!')
                })
        }
    }, [idProduto])

    function handleBack() {
        setCurrentPage('produto')
    }

    function handleSave() {
        const body = {
            name: name,
            preco: parseFloat(preco),
            estoqueMinimo: estoqueMinimo ? parseFloat(estoqueMinimo) : null
        }

        axios.put(`http://localhost:3000/v1/produtos/${id}`, body)
            .then(response => {
                alert('Produto atualizado com sucesso!')
                setCurrentPage('produto') // Volta para a lista
            })
            .catch(error => {
                console.error('Erro ao atualizar produto:', error.message)
                alert('Erro ao atualizar produto!')
            })
    }

    return (
        <div>
            <div className="conteudo">
                <h1>Update de Produto</h1>
                <TextField label="Nome do Produto" variant="outlined" fullWidth margin="normal" value={name} onChange={(e) => setName(e.target.value)} />
                <TextField label="Preço" variant="outlined" fullWidth margin="normal" type="number"value={preco} onChange={(e) => setPreco(e.target.value)}/>
                <TextField label="Estoque Mínimo" variant="outlined" fullWidth margin="normal" type="number"value={estoqueMinimo}onChange={(e) => setEstoqueMinimo(e.target.value)}placeholder="Opcional"/>
                <div style={{ display: 'flex', gap: '10px', marginTop: 20 }}>
                <Button variant="contained" color="primary" onClick={handleSave}>Cadastrar</Button>
                <Button variant="contained" color="primary" onClick={handleBack}>Voltar</Button>
                </div>
            </div>
        </div>
    )
}

export default ProdutoUpdate