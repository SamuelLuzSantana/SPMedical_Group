import { Component } from 'react';
import './consulta.css'




class Consultas extends Component {
    constructor(props) {
        super(props);

        this.state = {
            //nomeEstado : ValorInicial

            Consulta: [],
            idPaciente: '',
            idMedico: '',
            idSituacao: '',
            descricao: '',
            nomePaciente: '',
            data: ''


            // pacientes : [],
            // medico : [],
            // situacao : [],

        }
    }

    buscarConsulta = () => {
        console.log("Chamada para API___________")

        fetch('http://localhost:5000/api/Consultas')
            //.then(resposta => console.log(resposta)) 
            .then(resposta => resposta.json())
            //.then(data => this.setState({ Consulta: data }))

            //define que a requisição sera retornada em JSON
            // .then(resposta => resposta.json())
            .then(data => this.setState({ Consulta: data }))

            //atualiza o state Consultas com os dados obtidos

            //caso aconteça algum erro mostra no console do navegador.
            .catch((erro) => console.log(erro))
    }


    atualizaStateCampo = async (campo) => {
        await this.setState({ [campo.target.name]: campo.target.value })
        console.log('id do paciente ' + this.state.idPaciente)
        console.log('id do medico ' + this.state.idMedico)
        console.log('id da situacao ' + this.state.idSituacao)
        console.log('descricao ' + this.state.descricao)
        console.log('data ' + this.state.dataConsulta)
    };

    cadastrarConsulta = (event) => {

        // Ignora o comportamento padrão do navegador
        event.preventDefault();

        let consulta = {
            idPaciente : this.state.idPaciente,
            idMedico :   this.state.idMedico,
            idSituacao : this.state.idSituacao ,
            descricao :  this.state.descricao,
            dataConsulta:    new Date( this.state.dataConsulta)  
        };

        //faz a chamada da api para o metodo
        fetch('http://localhost:5000/api/Consultas',{
            //define o tipo de requisição
            method: 'POST',

            body:JSON.stringify(consulta),

            headers : {
                "Content-Type": "application/json"
            }

        })

        .then(console.log("Consulta  cadastrado"))
        .catch((error) => console.log(error))

        .then(this.buscarConsulta)
        
    }

    //chama a função buscarConsulta assim que o componente é renderizado
    componentDidMount() {
        //codigo
        this.buscarConsulta();
    }


    render() {
        return (


            <div className="main">

                <header>
                    administrador
                </header>


                {/* Cadastrar consulta */}
                <section className="cadastrar_consulta">

                    <h2>Cadastrar:</h2>
                    {/* pacientes */}
                    <form className="formulario" onSubmit={this.cadastrarConsulta}>

                        <select
                            name="idPaciente"
                            id="paciente"
                            value={this.state.idPaciente}
                            onChange={this.atualizaStateCampo}
                        >

                            <option value="1">Ligia</option>
                            <option value="2">Alexandre</option>
                            <option value="3">Fernando</option>
                            <option value="4">Henrique</option>
                            <option value="5">João</option>
                            <option value="6">Bruno</option>
                            <option value="7">Maria</option>

                        </select>


                        {/* medicos */}
                        <select
                            name="idMedico"
                            id="medicos"
                            value={this.state.idMedico}
                            onChange={this.atualizaStateCampo}
                        >
                            <option value="1">Ricardo Lemos</option>
                            <option value="2">Roberto Possarle</option>
                            <option value="3">Helena Strada</option>
                        </select>

                        {/* situação */}
                        <select
                            name="idSituacao"
                            value={this.state.idSituacao}
                            id="Situacao"
                            onChange={this.atualizaStateCampo}
                        >

                            <option value="1">Realizada</option>
                            <option value="2">Cancelada</option>
                            <option value="3">Agendada</option>

                        </select>

                        {/* Descrição */}
                        <input
                            type="text"
                            name="descricao"
                            value={this.state.descricao}
                            onChange={this.atualizaStateCampo}
                            placeholder="Descrição da consulta"
                        ></input>

                        <input
                            type="date"
                            name="data"
                            id="dataEvento"
                            value={this.state.dataConsulta}
                            onChange={this.atualizaStateCampo}
                        >

                        </input>

                        <button type="submit">
                            cadastrar
                        </button>

                    </form>
                </section>

                {/* Aqui a linha é bala */}
                <hr />

                <div className="listar_consultas">
                    <table>
                        <thead className="thead">
                            <tr>
                                <th>ID Paciente</th> 
                                <th>ID Medico</th>
                                <th>Situação</th>
                                <th>Descrição</th>
                                <th>DATA</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                //ARRAY
                                this.state.Consulta.map((Consulta) => {
                                    return (
                                        <tr key={Consulta.idConsulta}>
                                            <td>{Consulta.idPaciente}</td>
                                            <td>{Consulta.idMedico}</td>
                                            <td>{Consulta.idSituacao}</td>
                                            <td>{Consulta.descricao}</td>
                                            <td>{new Date(Consulta.dataConsulta).toLocaleDateString()}</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>


            </div>

        );



    }

}

export default Consultas;