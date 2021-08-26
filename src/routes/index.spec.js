const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../index.js'); // Importo el archivo de entrada del server de express.

const agent = session(app);

describe('Test de APIS', () => {
  describe('GET /pokemons', () => {
    it('responds with 200', () => agent.get('/').expect(200));
    // it('responds with and object with message `hola`', () =>
    //     agent.get('/').then((res) => {
    //       expect(res.body.message).to.be.equal('hola');
    //     }));
  });
});