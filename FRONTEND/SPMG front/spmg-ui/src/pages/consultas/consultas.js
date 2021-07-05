import { Component } from 'react';
import './consulta.css'


class Consultas extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //nomeEstado : ValorInicial
            
            Consulta : [],

                                        // pacientes : [],
                                        // medico : [],
                                        // situacao : [],

                                        // descricao : '',
            
            //Consultas lista
            listaConsultas : []
        }
    }

    buscarConsulta = () =>{
        console.log(" ")

        fetch('http://localhost:5000/api/Consultas')

        .then(resposta => resposta.json())

        .then (data => this.setState ({ Consulta : data}) )

        .catch( (erro) => console.log(erro) )
    }

    componentDidMount(){
        //codigo
        this.buscarConsulta(); 


    }

        

        atualizaStateCampo = (campo) => {this.setState({ [campo.target.name] : campo.target.value })};

        render() {
        return (

            
            <div className="main">

               
                {/* Cadastrar consulta */}
                <section className = "cadastrar_consulta">
                    
                    {/* pacientes */}
                    <select name="paciente" id="paciente">
                        <option value="ligia">Ligia</option>
                        <option value="alexandre">Alexandre</option>
                        <option value="fernando">Fernando</option>
                        <option value="henrique">Henrique</option>
                        <option value="joao">João</option>
                        <option value="bruno">Bruno</option>
                        <option value="maria">Maria</option>
                    </select>

                    {/* medicos */}
                    <select name="medicos" id="medicos"> 
                        <option value="Ricardo Lemos">Ricardo Lemos</option>
                        <option value="Roberto Possarle">Roberto Possarle</option>
                        <option value="Helena Strada">Helena Strada</option>
                    </select>

                    {/* situação */}
                    <select name="medicos" id="medicos"> 
                        <option value="1">Realizada</option>    
                        <option value="2">Cancelada</option>
                        <option value="3">Agendada</option>
                    </select>


                    <input 
                        type="text" 
                        name="titulo"
                        value="this.state.titulo"
                        onChange={this.atualizaStateCampo}
                        placeholder="Título do evento"
                    ></input>

                    <input type="datetime-local" id="data" name=""></input>

                    <input type="submit" value="Submit"></input>


                </section>

                <hr/>

                <div className="listar_consultas">

                        {
                            //ARRAY
                            this.state.Consulta.map( (Consulta) => {
                                return(


                                    <table>
                                        <tbody>
                                            <tr key={Consulta.idConsulta}>
                                                <td>{Consulta.nomeMedico}</td>
                                                <td>{Consulta.data}</td>
                                                <td>{Consulta.nomepaciente}</td>
                                                <td>{Consulta.situacao}</td>
                                                
                                            </tr>
                                        </tbody>
                                    </table>

                                )


                            })
                        }
                </div>

            </div>
            
        );
    


}

}

export default Consultas;