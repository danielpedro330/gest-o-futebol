# ⚽ Gestão de Partidas de Futebol 

## ✅ RFs – Requisitos Funcionais

 - [ ] Deve ser possível cadastrar um team;
 - [ ] Deve ser possível autenticar um team no sistema;
 - [ ] Deve ser possível cadastrar e gerenciar os jogadores de um team;
 - [ ] Deve ser possível solicitar uma partida contra outro team;
 - [ ] Deve ser possível realizar partidas internas (entre jogadores do mesmo team);
 - [ ] Deve ser possível registrar o resultado de uma partida;
 - [ ] Deve ser possível consultar o histórico de partidas de um team;
 - [ ] Deve ser possível visualizar o ranking atualizado dos teams;

## 📌 RN – Regras de Negócio

 - [ ] Um team de rank inferior não pode solicitar partida contra um team de rank superior;
 - [ ] Um team não pode se cadastrar com um email duplicado;
 - [ ] Um team não pode agendar duas partidas no mesmo dia;
 - [ ] Um team de rank superior pode solicitar partida contra um team de rank inferior;
 - [ ] Um team sobe de nível quando alcançar 10 jogos consecutivos com pelo menos 6 vitórias;
 - [ ] Cada team deve ter no mínimo 5 jogadores e no máximo 11 jogadores ativos;
 - [ ] O resultado de uma partida deve ser validado por ambos os teams envolvidos;

## ⚙️ RNFs – Requisitos Não Funcionais

 - [ ] A autenticação deve ser feita com JWT;
 - [ ] As senhas dos teams devem ser armazenadas com hash criptográfico seguro (ex.: bcrypt);
 - [ ] O sistema deve garantir alta disponibilidade (mínimo 99,5% upteam);
 - [ ] O sistema deve registrar logs de auditoria de autenticação e partidas;
 - [ ] O sistema deve suportar até 100 partidas simultâneas sem perda de performance;
 - [ ] Todas as listas de dados precisam estar pagnadas até 20 itens;