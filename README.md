# ⚽ Gestão de Partidas de Futebol 

## ✅ RFs – Requisitos Funcionais

 - [ ] Deve ser possível cadastrar um time;
 - [ ] Deve ser possível autenticar um time no sistema;
 - [ ] Deve ser possível cadastrar e gerenciar os jogadores de um time;
 - [ ] Deve ser possível solicitar uma partida contra outro time;
 - [ ] Deve ser possível realizar partidas internas (entre jogadores do mesmo time);
 - [ ] Deve ser possível registrar o resultado de uma partida;
 - [ ] Deve ser possível consultar o histórico de partidas de um time;
 - [ ] Deve ser possível visualizar o ranking atualizado dos times;

## 📌 RN – Regras de Negócio

 - [ ] Um time de rank inferior não pode solicitar partida contra um time de rank superior;
 - [ ] Um time não pode se cadastrar com um email duplicado;
 - [ ] Um time não pode agendar duas partidas no mesmo dia;
 - [ ] Um time de rank superior pode solicitar partida contra um time de rank inferior;
 - [ ] Um time sobe de nível quando alcançar 10 jogos consecutivos com pelo menos 6 vitórias;
 - [ ] Cada time deve ter no mínimo 5 jogadores e no máximo 11 jogadores ativos;
 - [ ] O resultado de uma partida deve ser validado por ambos os times envolvidos;

## ⚙️ RNFs – Requisitos Não Funcionais

 - [ ] A autenticação deve ser feita com JWT;
 - [ ] As senhas dos times devem ser armazenadas com hash criptográfico seguro (ex.: bcrypt);
 - [ ] O sistema deve garantir alta disponibilidade (mínimo 99,5% uptime);
 - [ ] O sistema deve registrar logs de auditoria de autenticação e partidas;
 - [ ] O sistema deve suportar até 100 partidas simultâneas sem perda de performance;
 - [ ] Todas as listas de dados precisam estar pagnadas até 20 itens;