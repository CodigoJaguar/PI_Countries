const { Country, conn, Activities } = require('../../src/db.js');
const { expect } = require('chai');

describe('Country model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => Country.sync({ force: true }));

    describe('name', () => {
      it('should throw an error if name is null', (done) => {
        Country.create({})
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });

      it('should work when its a valid name', () => {
        Country.create({ name: 'Argentina' });
      });
    });

    describe('activity', ()=>{
      it('should create activity with an id by default',  ()=> {
        Activities.create({
          Nombre : "Paracaidismo",
          Dificultad: 5,
          Duracion: "3.5 minutos",
          Temporada: "Fall",
          ID_Nazione: ["ALB"]
        })
        .then((response)=>{
          expect(response.dataValues.hasOwnProperty('ID')).toBe(true);
        })

      });

    });

  });

  


});
