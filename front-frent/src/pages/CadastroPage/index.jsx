import { useState } from 'react'
import './style.css'
import api from '../../services/api'
import { toast } from 'react-toastify'
import { set } from 'react-hook-form'

export default function CadastroPage() {
    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [telefone, setTelefone] = useState('')
    const [estaEnviado, setEstaEnviando] = useState('false')

    function limparCamposDoFormulario() {
        setNome('')
        setEmail('')
        setTelefone('')
    }

    async function envioDoFormulario(e) {
        e.preventDefault()
        setEstaEnviando(true)

        const dadosDoFormulario = {nome, email, telefone }

        try {
            // Se der certo.
            const resposta = await api.post('/alunos', dadosDoFormulario)

            toast.success(resposta.data.mensagem ||
                'Aluno cadastrado com sucesso!')
            limparCamposDoFormulario()
        } catch (erro) {
            // Se der errado
            const mensagemDoServidor = erro?.resposta?.data?.mensagem ||
            'Erro ao cadastrar aluno'
            toast.error('Erro no cadastro: ', erro)
        } finally {
            // Executa de qualquer jeito, dando certo ou errado.
            setEstaEnviando(false)
        }
    }

    return (
        <div className='cadastro-page'>
            <form onSubmit={envioDoFormulario}>
                <div className='form-grupo'>
                    <label htmlFor="campo-nome">Nome</label>
                    <input
                        id='campo-nome'
                        type='text'
                        placehold='Ex.: Maria Silva'
                        value={nome}
                        onChange={(e) => setNome (e.target.value)}
                    />
                </div>
                <div className='form-grupo'>
                    <label htmlFor="campo-email">E-mail</label>
                    <input
                        id='campo-email'
                        type='email'
                        placehold='Ex.: email@senai.com'
                        value={email}
                        onChange={(e) => setEmail (e.target.value)}
                    />
                </div>
                <div className='form-grupo'>
                    <label htmlFor="campo-telefone">Telefone</label>
                    <input
                        id='campo-telefone'
                        type='telefone'
                        placehold='Ex.: 71 90000-0000'
                        value={telefone}
                        onChange={(e) => setTelefone(e.target.value)}
                    />
                </div>
            <button type='submit' disabled={estaEnviado}>
                {estaEnviado ? 'Cadastrando...' : 'Cadastrar'}
            </button>
            </form>
        </div>
    )
}
