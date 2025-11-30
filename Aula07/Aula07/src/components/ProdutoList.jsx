import { useState, useEffect } from 'react'
import { TextField, Button } from '@mui/material'
import MenuLateral from './MenuLateral'
import axios from 'axios'
import './site.css'

function ProdutoList({ setCurrentPage, setIdProduto }) {
    const [nome, setNome] = useState('')
    const [listaProdutos, setListaProdutos] = useState([])

    function carregarProdutos() {
        axios.get('http://localhost:3000/v1/produtos')
            .then(response => {
                setListaProdutos(response.data)
            })
            .catch(error => {
                console.error('Erro ao buscar produtos:', error.message)
                alert('Erro ao carregar produtos!')
            })
    }

    function handleNew() {
        setCurrentPage('newproduto')
    }

    function handleSearch() {
        if (nome.trim() === '') {
            carregarProdutos()
        } else {
            const produtosFiltrados = listaProdutos.filter(produto =>
                produto.name.toLowerCase().includes(nome.toLowerCase())
            )
            setListaProdutos(produtosFiltrados)
        }
    }

    function handleDelete(produto) {
        const resposta = confirm(`Deseja excluir o produto "${produto.name}"?`)
        if (resposta) {
            axios.delete(`http://localhost:3000/v1/produtos/${produto.id}`)
                .then(response => {
                    alert('Produto excluído com sucesso!')
                    carregarProdutos() 
                })
                .catch(error => {
                    console.error('Erro ao excluir produto:', error.message)
                    alert('Erro ao excluir produto!')
                })
        }
    }

    function handleUpdate(produto) {
        setCurrentPage('updateproduto')
        setIdProduto(produto.id)
    }

    function formatarPreco(preco) {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(preco)
    }

    useEffect(() => {
        carregarProdutos()
    }, [])

    return (
        <div>
            <div className="conteudo">
                <h1>Cadastro de Produtos</h1>
                <TextField label="Buscar por nome" variant="outlined" value={nome}onChange={(e) => setNome(e.target.value)}/>
                <Button variant="contained" color="primary" style={{marginTop:20}} onClick={handleSearch}>Pesquisar</Button>
                <Button variant="contained" color="primary" style={{marginTop:20}} onClick={handleNew}>Novo</Button>
            </div>

            <div className="table_component" style={{ marginTop: 20 }}>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>Preço</th>
                            <th>Estoque Mínimo</th>
                            <th>Editar</th>
                            <th>Excluir</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listaProdutos.length > 0 ? (
                            listaProdutos.map((produto) => (
                                <tr key={produto.id}>
                                    <td>{produto.id}</td>
                                    <td>{produto.name}</td>
                                    <td>{formatarPreco(produto.preco)}</td>
                                    <td>{produto.estoqueMinimo ? produto.estoqueMinimo : 'Não definido'}</td>
                                    <td> <a onClick={() => handleUpdate(produto)} href='#'>Editar</a></td>
                                    <td> <a onClick={() => handleDelete(produto)} href='#'>Excluir</a></td>
            
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" style={{ textAlign: 'center', padding: '20px' }}>
                                    Nenhum produto encontrado
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ProdutoList