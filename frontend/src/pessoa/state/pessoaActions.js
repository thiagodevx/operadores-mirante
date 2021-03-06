import api from '../../configurations/api'
import { push } from 'connected-react-router'

export const ALTERAR_CAMPO_PESSOA = 'ALTERAR CAMPO PESSOA'
export const alterarCampoPessoa = event => ({
  type: ALTERAR_CAMPO_PESSOA,
  payload: event.target
})

export const listarPessoas = _ => {
  return dispatch => {
    api
      .get('/pessoa')
      .then(response => dispatch(listarPessoasSucesso(response.data)))
      .catch(_ => alert('Erro ao carregar lista de pessoas'))
  }
}

export const detalhesPessoa = pessoa => {
  return dispatch => {
    dispatch(push(`/pessoa/${pessoa.id}`))
  }
}

export const navegarTelaOperadores = _ => {
  return dispatch => {
    dispatch(push('/operador'))
  }
}

export const LISTAR_PESSOAS_SUCESSO = 'LISTAR PESSOAS SUCESSO'
export const listarPessoasSucesso = pessoas => ({
  type: LISTAR_PESSOAS_SUCESSO,
  payload: pessoas
})

export const cadastrarPessoa = pessoa => {
  return dispatch => {
    api
      .post('/pessoa', pessoa)
      .then(response => dispatch([cadastrarPessoaSucesso(response.data), limparCamposPessoa()]))
      .catch(error => {
        const mensagens = error.response.data.parameterViolations.reduce((erro1, erro2) => erro1.message + ', ' + erro2.message)
        alert(mensagens)
      })
  }
}

export const CADASTRAR_PESSOA_SUCESSO = 'CADASTRAR PESSOA SUCESSO'
export const cadastrarPessoaSucesso = pessoa => ({
  type: CADASTRAR_PESSOA_SUCESSO,
  payload: pessoa
})

export const INICIO_EDITAR_PESSOA = 'INICIO EDITAR PESSOA'
export const inicioEditarPessoa = pessoa => {
  if (pessoa.nomeDoPai === null) pessoa.nomeDoPai = ''
  if (pessoa.nomeDaMae === null) pessoa.nomeDaMae = ''
  return {
    type: INICIO_EDITAR_PESSOA,
    payload: pessoa
  }
}

export const editarPessoa = pessoa => {
  return dispatch => {
    api
      .put('/pessoa', pessoa)
      .then(response => dispatch([editarPessoaSucesso(response.data), limparCamposPessoa()]))
      .catch(error => {
        const mensagens = error.response.data.parameterViolations.reduce((erro1, erro2) => erro1.message + ', ' + erro2.message)
        alert(mensagens)
      })
  }
}

export const EDITAR_PESSOA_SUCESSO = 'EDITAR PESSOA SUCESSO'
export const editarPessoaSucesso = pessoa => ({
  type: EDITAR_PESSOA_SUCESSO,
  payload: pessoa
})

export const LIMPAR_CAMPOS_PESSOA = 'LIMPAR CAMPOS PESSOA'
export const limparCamposPessoa = _ => ({
  type: LIMPAR_CAMPOS_PESSOA
})

export const deletarPessoa = pessoa => {
  return dispatch => {
    api
      .delete(`/pessoa/${pessoa.id}`)
      .then(_ => dispatch([deletarPessoaSucesso(pessoa), limparCamposPessoa()]))
      .catch(_ => alert('Erro ao deletar pessoa'))
  }
}

export const DELETAR_PESSOA_SUCESSO = 'DELETAR PESSOA SUCESSO'
export const deletarPessoaSucesso = pessoa => ({
  type: DELETAR_PESSOA_SUCESSO,
  payload: pessoa
})

export const informacoesPessoa = id => {
  return dispatch => {
    api
      .get(`/pessoa/${id}`)
      .then(response => dispatch(informacoesPessoaSucesso(response.data)))
      .catch(_ => alert('Erro ao carregar informações da pessoa'))
    api
      .get(`/pessoa/telefones/${id}`)
      .then(response => dispatch(informacoesTelefoneSucesso(response.data)))
      .catch(_ => alert('Erro ao carregar telefones da pessoa'))
  }
}

export const INFORMACOES_PESSOA_SUCESSO = 'INFORMACOES PESSOA SUCESSO'
export const informacoesPessoaSucesso = pessoa => ({
  type: INFORMACOES_PESSOA_SUCESSO,
  payload: pessoa
})

export const INFORMACOES_TELEFONE_SUCESSO = 'INFORMACOES TELEFONE SUCESSO'
export const informacoesTelefoneSucesso = telefones => ({
  type: INFORMACOES_TELEFONE_SUCESSO,
  payload: telefones
})

export const deletarTelefone = telefone => {
  return dispatch => {
    api
      .delete(`/pessoa/telefones/${telefone.id}`)
      .then(_ => dispatch(deletarTelefoneSucesso(telefone)))
      .catch(_ => alert('Erro ao deletar telefone da pessoa'))
  }
}

export const DELETAR_TELEFONE_SUCESSO = 'DELETAR_TELEFONE_SUCESSO'
export const deletarTelefoneSucesso = telefone => ({
  type: DELETAR_TELEFONE_SUCESSO,
  payload: telefone
})

export const adicionarTelefone = (telefone, pessoa) => {
  return dispatch => {
    telefone.pessoa = pessoa
    api
      .post('/pessoa/telefones', telefone)
      .then(response => dispatch([adicionarTelefoneSucesso(response.data), limparCamposInformacoesPessoa()]))
      .catch(error => {
        const mensagens = error.response.data.parameterViolations.reduce((erro1, erro2) => erro1.message + ', ' + erro2.message)
        alert(mensagens)
      })
  }
}

export const ADICIONAR_TELEFONE_SUCESSO = 'ADICIONAR TELEFONE SUCESSO'
export const adicionarTelefoneSucesso = telefone => ({
  type: ADICIONAR_TELEFONE_SUCESSO,
  payload: telefone
})

export const ATUALIZAR_CAMPOS_TELEFONE = 'ATUALIZAR_CAMPOS_TELEFONE'
export const atualizarCamposTelefone = event => ({
  type: ATUALIZAR_CAMPOS_TELEFONE,
  payload: event.target
})

export const LIMPAR_CAMPOS_INFORMACOES_PESSOA = 'LIMPAR CAMPOS INFORMACOES PESSOA'
export const limparCamposInformacoesPessoa = _ => ({
  type: LIMPAR_CAMPOS_INFORMACOES_PESSOA
})
