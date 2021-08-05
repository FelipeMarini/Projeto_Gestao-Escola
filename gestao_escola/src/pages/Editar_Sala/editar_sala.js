import { React, Component } from 'react'

import '../../assets/css/editar_sala.css'

import school from '../../assets/img/school.png'
import sala from '../../assets/img/classroom.png'


class Editar_Sala extends Component {

    render() {

        return (

            <div>

                <header>

                    <div className="header-box">

                        <div className="logo-container">

                            <img className="school" src={school} alt="ícone de uma escola" />

                            <div className="titulo-container">

                                <p className="titulo1">GESTÃO</p>
                                <p className="titulo2">ESCOLA</p>

                            </div>

                            <div className="header-menu">

                                <p className="header-item">SOBRE</p>
                                <p className="header-item">SALAS</p>
                                <p className="header-item">EQUIPAMENTOS</p>
                                <p className="header-item">CADASTRE-SE</p>
                                <p className="header-item">SAIR</p>

                            </div>

                        </div>

                    </div>

                </header>


                <main>

                    <div className="flex-salas">
                        <p className="title-salas">SALAS</p>
                    </div>

                    <div className="cards-flex">

                        <div className="editar-sala">

                            <img className="img-sala" src={sala} alt="ícone de uma sala" />
                            <p className="editar-sala-titulo">SALA X</p>

                            <p className="opcoes-editar">VER</p>
                            <p className="opcoes-editar">EDITAR</p>

                        </div>

                        <div className="editar-sala">

                            <img className="img-sala" src={sala} alt="ícone de uma sala" />
                            <p className="editar-sala-titulo">SALA X</p>

                            <p className="opcoes-editar">VER</p>
                            <p className="opcoes-editar">EDITAR</p>

                        </div>

                        <div className="editar-sala">

                            <img className="img-sala" src={sala} alt="ícone de uma sala" />
                            <p className="editar-sala-titulo">SALA X</p>

                            <p className="opcoes-editar">VER</p>
                            <p className="opcoes-editar">EDITAR</p>

                        </div>


                    </div>

                    <p className="ver-mais">VER MAIS</p>

                </main>


                <footer>

                    <div className="footer-box">

                        <div className="footer-content">

                            <p className="footer-itemX">@2021 - Gestão Escola. Todos os direitos reservados.</p>
                            <p className="footer-item">CONTATO</p>
                            <p className="footer-item">LOCALIZAÇÃO</p>
                            <p className="footer-item">PRIVACIDADE</p>

                        </div>

                    </div>

                </footer>

            </div>

        )

    }

}

export default Editar_Sala;
