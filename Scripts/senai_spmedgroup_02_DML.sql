--DML

USE SPMedical_group;
GO

INSERT INTO tiposUsuarios(tituloTipoUsuario)    
VALUES			('Administrador'),
				('Médico'),
				('Paciente')
GO

INSERT INTO clinica(CNPJ,endereco,nomeFantasia,razaoSocial)
VALUES			('49327506000107','Alameda Zouz, 02 - 68557-782', 'Clinica Medicals', 'SP Medical Group');
GO

INSERT INTO especialidade (nomeEspecialidade)
VALUES			('Acupuntura'),
				('Anestesiologia'),
				('Angiologia'),
				('Cardiologia'),
				('Cirurgia Cardiovascular'),
				('Cirurgia da Mão'),
				('Cirurgia do Aparelho Digestivo'),
				('Cirurgia Geral'),
				('Cirurgia Pediátrica'),
				('Cirurgia Plástica'),
				('Cirurgia Torácica'),
				('Cirurgia Vascular'),
				('Dermatologia'),
				('Radioterapia'),
				('Urologia'),
				('Pediatria'),
				('Psiquiatria')
GO

INSERT INTO situacao(situacao)
VALUES		('Realizada'),
			('Agendada'),
			('Cancelada')
GO

INSERT INTO usuario(idTipoUsuario,email,senha)
VALUES		(2,'Ricardo@gmail.com','123Ricardo'),
			(2,'sandman@email.com','dream0012'),
			(2,'keanus@email.com','yesbaby5252'),
			(3,'roberto@email.com','supermedico019'),
			(3,'liviaandrade@email.com','andrade123'),
			(3,'monique@email.com','aloalo3345'),
			(3,'soraka@email.com','lollimao90'),
			(1,'adm@adm.com','adm123')
GO

INSERT INTO paciente(idUsuario,dataNascimento,nomePaciente,RG,CPF,telefone,endereco)
VALUES		(4,'01-02-1985','Roberto B. Santos','35197965','19139923061','4022-8399','rua. Aquela lá 000'),
			(5,'02/05/2000','Andrade Livia','123456789','12345678912','4011-8966','Avenida das avenidas 052'),
			(6,'25/10/1990','Monique Lima','123456789','12345678912','4022-8811','Viela dos tops'),
			(7,'05/04/2018','Soraka','123456789','12345678912','4802-9022','Rua dos tops 4022');
GO


INSERT INTO medico(idUsuario,idEspecialidade,idClinica,nome,CRM)
VAlUES		(1,15,1,'Ricardo Milos','545251-Sp'),
			(2,17,1,'SandMan','545252-Sp'),
			(3,16,1,'Keanus Silva','545253-Sp')
GO

INSERT INTO consulta(idMedico,idPaciente,idSituacao,dataEvento,descricao)
VALUES		(1,1,3,'18/08/2021','exame de rotina'),
			(3,5,1,'16/08/2021','Criança com bronquite'),
			(2,3,3,'19/09/2021','Consulta de acolhimento'),
			(1,4,2,'01/05/2021','Exame rotina')
GO


