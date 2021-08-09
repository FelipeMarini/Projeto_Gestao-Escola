import { React, Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import '../../assets/css/editar_equip.css'
import school from '../../assets/img/school.png'
import pc from '../../assets/img/computer.png'


class Editar_Equip extends Component {


    constructor(props) {

        super(props)

        this.state = {
            listaEquipamento: [],
            marcaEquipamento: '',
            tipoEquipamento: '',
            numeroSerie: 0,
            numeroPatrimonio: 0,
            descricaoEquipamento: '',
            statusEquipamento: 0,
            idEquipamentoEscolhido: 0,
            mensagemSucesso: ''
        }

    }


    buscarEquipamentoPorId = (equipamento) => {

        document.getElementById('pop-up').style.display = 'block'
        document.getElementById('overlay').style.display = 'block'

        this.setState({
            idEquipamentoEscolhido: equipamento.idEquipamento,
            marcaEquipamento: equipamento.marcaEquipamento,
            tipoEquipamento: equipamento.tipoEquipamento,
            numeroSerie: equipamento.numeroSerie,
            numeroPatrimonio: equipamento.numeroPatrimonio,
            descricaoEquipamento: equipamento.descricaoEquipamento,
            statusEquipamento: equipamento.statusEquipamento
        },

            () => {
                console.log('o equipamento ' + this.state.idEquipamentoEscolhido + 'foi selecionado')
            })
    }


    verModal = (equipamento) => {

        document.getElementById('modal').style.display = 'block'

        this.setState({
            idEquipamentoEscolhido: equipamento.idEquipamento,
            marcaEquipamento: equipamento.marcaEquipamento,
            tipoEquipamento: equipamento.tipoEquipamento,
            numeroSerie: equipamento.numeroSerie,
            numeroPatrimonio: equipamento.numeroPatrimonio,
            descricaoEquipamento: equipamento.descricaoEquipamento,
            statusEquipamento: equipamento.statusEquipamento
        }, () => {
            console.log('o equipamento ' + this.state.idEquipamentoEscolhido + 'foi selecionado')
        })
    }


    deslogar = () => {
        localStorage.removeItem('projeto-inicial')
        this.props.history.push('/')
    }


    buscarEquipamentos = () => {

        axios('http://localhost:5000/api/equipamento', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('projeto-inicial')
            }
        })

            .then(resposta => {
                if (resposta.status === 200) {
                    this.setState({ listaEquipamento: resposta.data })
                    console.log(this.state.listaEquipamento)
                }
            })

            .catch(erro => console.log(erro))
    }


    abrirPopUp = (equipamento) => {

        document.getElementById('pop-up').style.display = 'block'
        document.getElementById('overlay').style.display = 'block'

        this.setState({

            idEquipamentoEscolhido: equipamento.idEquipamento,
            marcaEquipamento: equipamento.marcaEquipamento,
            tipoEquipamento: equipamento.tipoEquipamento,
            numeroSerie: equipamento.numeroSerie,
            numeroPatrimonio: equipamento.numeroPatrimonio,
            descricaoEquipamento: equipamento.descricaoEquipamento,

        }, () => {
            console.log('o equipamento ' + this.state.idEquipamentoEscolhido + 'foi selecionado')
        })
    }


    fecharPopUp = () => {
        document.getElementById('pop-up').style.display = 'none'
        document.getElementById('overlay').style.display = 'none'
        document.getElementById('modal').style.display = 'none'
    }


    editarEquipamento = (event) => {

        event.preventDefault()

        let equipamento = {

            marcaEquipamento: this.state.marcaEquipamento,
            tipoEquipamento: this.state.tipoEquipamento,
            numeroSerie: this.state.numeroSerie,
            numeroPatrimonio: this.state.numeroPatrimonio,
            descricaoEquipamento: this.state.descricaoEquipamento,
            statusEquipamento: parseInt(this.state.statusEquipamento)
        }

        if (this.state.idEquipamentoEscolhido !== 0) {

            axios.put('http://localhost:5000/api/equipamento/' + this.state.idEquipamentoEscolhido, equipamento, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('projeto-inicial')
                }
            })

                .then(resposta => {

                    if (resposta.status === 204) {

                        this.setState({ mensagemSucesso: 'Equipamento alterado com sucesso!' })
                        this.abrirPopUpSucesso()

                    }

                })

                .catch(erro => {
                    console.log(erro)
                })

                .then(this.buscarEquipamentos)
        }
    }


    excluirEquipamento = (equipamento) => {

        this.setState({
            idEquipamentoEscolhido: equipamento.idEquipamento
        })

        axios.delete('http://localhost:5000/api/equipamento/' + equipamento.idEquipamento, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('projeto-inicial')
            }
        })

            .then(resposta => {
                if (resposta.status === 204) {
                    console.log('o equipamento ' + this.state.idEquipamentoEscolhido + ' foi excluído')
                }
            })

            .catch(erro => {
                console.log(erro)
            })

            .then(this.buscarEquipamentos)

    }



    atualizaState = (campo) => {
        this.setState({ [campo.target.name]: campo.target.value })
    }


    abrirPopUpSucesso = () => {

        document.getElementById('pop-msg-sucesso').style.display = 'block'

    }


    fecharPopUpSucesso = () => {

        document.getElementById('pop-msg-sucesso').style.display = 'none'

    }



    componentDidMount = () => {
        this.buscarEquipamentos()
    }



    render() {

        return (

            <div>

                <header>

                    <div className="header-box">

                        <div className="logo-container">

                            <Link to="/home">
                                <img className="school" src={school} alt="ícone de uma escola" />
                            </Link>

                            <div className="titulo-container">

                                <p className="titulo1">Gestão</p>
                                <p className="titulo2">Escola</p>

                            </div>

                            <div className="header-menu">

                                <Link to="/sobre" className="header-item">SOBRE</Link>
                                <Link to="/ediS" className="header-item">SALAS</Link>
                                <Link to="/ediE" className="header-item">EQUIPAMENTOS</Link>
                                <button className="botao-sair" onClick={() => this.deslogar()}>SAIR</button>

                            </div>

                        </div>

                    </div>

                </header>


                <main>

                    <div className="flex-equips">
                        <p className="title-equips">EQUIPAMENTOS</p>
                    </div>


                    <div className="cards-flex">
                        {
                            this.state.listaEquipamento.map(evento => {

                                return (

                                    <div className="editar-equipamento" key={evento.idEquipamento}>

                                        <img className="img-pc" src={pc} alt="ícone de um computador" />
                                        <td className="nome-equipamento-titulo">{evento.nomeSala}</td>

                                        <button className="opcoes-editar" onClick={() => this.verModal(evento)}>Ver</button>
                                        <button className="opcoes-editar" onClick={() => this.buscarEquipamentoPorId(evento)}>Editar</button>
                                        <button className="opcoes-editar" onClick={() => this.excluirEquipamento(evento)}>Excluir</button>


                                    </div>

                                )
                            })
                        }
                    </div>


                    {/* POP UP "VER" */}

                    <div id="modal" className="pop-up">

                        <button className="modal-header" onClick={this.fecharPopUp}>&times;</button>

                        <div className="ver-info">
                            <p className="editar-equipamento-titulo">Marca do Equipamento: {this.state.marcaEquipamento}</p>
                            <p className="editar-equipamento-titulo">Tipo de Equipamento: {this.state.tipoEquipamento}</p>
                            <p className="editar-equipamento-titulo">Número de Série: {this.state.numeroSerie}</p>
                            <p className="editar-equipamento-titulo">Número de Patrimônio: {this.state.numeroPatrimonio}</p>
                            <p className="editar-equipamento-titulo">Situação: {this.state.statusEquipamento}</p>
                            <p className="editar-equipamento-titulo">Descrição: {this.state.descricaoEquipamento}</p>
                        </div>

                    </div>

                    {/* FIM POP UP "VER" */}



                    {/* POP UP "EDITAR" */}

                    <div id="pop-up" className="pop-up-editar">

                        <button className="modal-header" onClick={this.fecharPopUp}>&times;</button>
                        {
                            <form onSubmit={this.editarSala}>

                                <div className="editar-flex">

                                    <p className="label-editar">Nova Nome:</p>
                                    <input
                                        className="nome-titulo"
                                        id="nome-titulo"
                                        type="text"
                                        name="nomeSala"
                                        value={this.state.nomeSala}
                                        onChange={this.atualizaState}
                                        placeholder="Nome da sala"
                                    />

                                    <p className="label-editar">Novo Andar:</p>
                                    <input
                                        className="andar-titulo"
                                        id="andar-titulo"
                                        type="number"
                                        min="1"
                                        max="99"
                                        name="andarSala"
                                        value={this.state.andarSala}
                                        onChange={this.atualizaState}
                                        placeholder="Andar da Sala"
                                    />

                                    <p className="label-editar">Nova Metragem (m²):</p>
                                    <input
                                        className="metragem-titulo"
                                        id="metragem-titulo"
                                        type="number"
                                        min="1"
                                        name="metragemSala"
                                        value={this.state.metragemSala}
                                        onChange={this.atualizaState}
                                        placeholder="Metragem da sala"
                                    />

                                    <button className="botao-alterar"
                                        type="submit"
                                        onClick={this.fecharPopUp}>
                                        Alterar
                                    </button>

                                </div>

                            </form>
                        }
                    </div>

                    {/* FIM POP UP "EDITAR" */}


                    {/* POP UP MENSAGEM DE SUCESSO */}
                    <div id="pop-msg-sucesso" className="pop-up">

                        <button className="modal-header" onClick={this.fecharPopUpSucesso}>&times;</button>

                        <div className="msg-sucesso-flex">
                            <p className="msg-sucesso">{this.state.mensagemSucesso}</p>
                        </div>

                    </div>
                    {/* FIM POP UP MENSAGEM DE SUCESSO */}


                    <div className="active" id="overlay"></div>

                </main>



                <footer>

                    <div className="footer-box">

                        <div className="footer-content">

                            <p className="footer-reservado">@2021 - Gestão Escola. Todos os direitos reservados.</p>
                            <Link to="/contato" className="footer-item">CONTATO</Link>
                            <Link to="/localizacao" className="footer-item">LOCALIZAÇÃO</Link>
                            <Link to="/privacidade" className="footer-item">PRIVACIDADE</Link>

                        </div>

                    </div>

                </footer>

            </div>

        )

    }

}

export default Editar_Equip;
