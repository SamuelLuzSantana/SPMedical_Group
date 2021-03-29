
--DDL

--Criando base de dado
CREATE DATABASE SPMedical_group;
GO

--Define o banco de dados que será utilizado
USE SPMedical_group;
GO

--Criando tabela Tipo de Usuario
CREATE TABLE tiposUsuarios(
	idTipoUsuario			INT PRIMARY KEY IDENTITY,
	tituloTipoUsuario		VARCHAR(200) UNIQUE NOT NULL
);
GO

--Criando tabela Clinica
CREATE TABLE clinica(
	idClinica			INT PRIMARY KEY IDENTITY,
	CNPJ				VARCHAR(15) NOT NULL,
	endereco			VARCHAR(200) NOT NULL,
	nomeFantasia		VARCHAR(200) NOT NULL,
	razaoSocial			VARCHAR(200) NOT NULL,
	CRM					VARCHAR(110) NOT NULL,
);
GO

--Criando tabela especialidade
CREATE TABLE especialidade(
	idEspecialidade		INT PRIMARY KEY IDENTITY,
	nomeEspecialidade	VARCHAR(100) NOT NULL
);
GO

--Criando tabela situacao
CREATE TABLE situacao(
	idsituacao			INT PRIMARY KEY IDENTITY,
	situacao			VARCHAR(100) NOT NULL
);
GO

--Criando tabela Usuario
CREATE TABLE usuario(
	idUsuario			INT PRIMARY KEY IDENTITY,
	idTipoUsuario		INT FOREIGN KEY REFERENCES tiposUsuarios(idTipoUsuario),
	nomeUsuario			VARCHAR(200) NOT NULL,
	email				VARCHAR(200) UNIQUE NOT NULL,
	senha				VARCHAR(200) NOT NULL
);
GO

--Criando tabela paciente
CREATE TABLE paciente(
	idPaciente			INT PRIMARY KEY IDENTITY,
	idUsuario			INT FOREIGN KEY REFERENCES usuario(idUsuario),
	dataNascimento  	DATE NOT NULL,
	nomePaciente		VARCHAR(200) NOT NULL,
	RG					VARCHAR(8) NOT NULL,
	CPF					VARCHAR(11) NOT NULL,
	telefone			VARCHAR (15) NOT NULL
);
GO

--Criando tabela medico
CREATE TABLE medico(
	idMedico		INT PRIMARY KEY IDENTITY,
	idUsuario		INT FOREIGN KEY REFERENCES usuario(idUsuario),
	idEspecialidade 	INT FOREIGN KEY REFERENCES especialidade(idEspecialidade),
	idClinica		INT FOREIGN KEY REFERENCES clinica(idClinica),
	CRM			VARCHAR(110) NOT NULL
);
GO

--Criando tabela consulta
CREATE TABLE consulta(
	idConsulta		INT PRIMARY KEY IDENTITY,
	idMedico		INT FOREIGN KEY REFERENCES medico(idMedico),
	idPaciente		INT FOREIGN KEY REFERENCES paciente(idPaciente),
	idSituacao		INT FOREIGN KEY REFERENCES situacao(idSituacao),
	dataEvento		DATE NOT NULL,
	descricao		VARCHAR(255)
);
GO
