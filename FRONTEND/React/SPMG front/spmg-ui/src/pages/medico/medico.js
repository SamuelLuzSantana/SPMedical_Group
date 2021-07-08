import { Component } from 'react';


class medico extends Component {

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
            data: '',
            idConsultaAlterada: ''
        }
    }

    buscarConsulta = () => {
        console.log("Chamada para API___________")

        fetch('http://localhost:5000/api/Consultas')

            //define que a requisição sera retornada em JSON
            .then(resposta => resposta.json())

            // .then(resposta => resposta.json())

            //atualiza o state Consultas com os dados obtidos
            .then(data => this.setState({ Consulta: data }))

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
            idPaciente: this.state.idPaciente,
            idMedico: this.state.idMedico,
            idSituacao: this.state.idSituacao,
            descricao: this.state.descricao,
            dataConsulta: new Date(this.state.dataConsulta)
        };

        //faz a chamada da api para o metodo
        fetch('http://localhost:5000/api/Consultas', {
            //define o tipo de requisição
            method: 'POST',

            body: JSON.stringify(consulta),

            headers: {
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

    buscarConsultaPorId = (Consulta) => {
        this.setState({
            idConsultaAlterada: Consulta.idConsulta,
            descricao: Consulta.descricao
        }, () => {
            console.log(
                //exibe no console uma reposta da execução?
                'A Consulta' + Consulta.idConsulta + 'foi selelecionada',
                'agora o valor do state idConsultaAlterada é:  ' + this.state.idConsultaAlterada,
                ' e o valor do state é: ' + this.state.descricao


            );
        });
    };


    render() {
        return (


            <div className="main">


                <div className="listar_consultas">
                    <table>
                        <thead className="thead">
                            <tr>
                                <th>ID Paciente</th>
                                <th>ID Medico</th>
                                <th>Situação</th>
                                <th>Descrição</th>
                                <th>DATA</th>
                                <th>Editar</th>
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
                                            <td><button onClick={() => this.buscarConsultaPorId(Consulta)}>Editar</button></td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>

                        <input
                            type="text"
                            id="descricao"
                            value={this.state.descricao}
                            onChange={this.atualizaStateCampo}
                            placeholder="Nova Descrição"
                        />

                        <button onClick={() =>
                            this.buscarConsultaPorId()}>Atualizar</button>



                    </table>
                </div>



            </div>

        )



    }

}






export default medico