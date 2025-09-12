import {describe, it} from 'mocha';
import supertest from 'supertest';
import {expect} from 'chai';
import mongoose, { isValidObjectId } from 'mongoose';

const request = supertest('http://localhost:8080');

await mongoose.connect("mongodb+srv://gustavosv:hola1234@cluster0.ajhnnko.mongodb.net/adoptme");

describe('Pruebas Pets API', function() {
    this.timeout(10000);

    after(async () => {
        await mongoose.connection.collection('pets').deleteMany({specie: 'test'});
        await mongoose.connection.close();
    });

    it('GET /api/pets - Debe devolver un array de mascotas', async () => {
        const {status, body} = await request.get('/api/pets');
        expect(status).to.equal(200);
        expect(body.payload).to.be.an('array');
    });

    it('POST /api/pets - Debe crear una nueva mascota y devolver un _id válido de mongoose', async () => {
        const petMock = {
            name: 'Pez Mock',
            specie: 'test',
            birthDate: new Date(2020, 1, 1).toUTCString(),
            adopted: false
        };
        const {status, body} = await request.post('/api/pets').send(petMock);
        expect(body.payload).to.has.property('_id');
        expect(isValidObjectId(body.payload._id)).to.be.true;
    });

    it('POST /api/pets - Debe crear una nueva mascota y debe devolver un status 200 y campos con los valores pasados', async () => {
        const petMock = {
            name: 'Dog Mock',
            specie: 'test',
            birthDate: new Date(2020, 1, 1).toUTCString(),
            adopted: false
        };
        const {status, body} = await request.post('/api/pets').send(petMock);
        expect(status).to.equal(200);
        expect(body.payload).to.include({name: 'Dog Mock', specie: 'test'});
    });

    it('POST /api/pets - no se envía el nombre', async () => {
        const petMock = {
            // name: 'Dog Mock',
            specie: 'test',
            birthDate: new Date(2020, 1, 1).toUTCString(),
            adopted: false
        };
        const {status, body} = await request.post('/api/pets').send(petMock);
        expect(status).to.equal(400);
        expect(body.error).to.equal("Incomplete values");
    }); 

    it('PUT /api/pets/:pid - Debe actualizar una mascota y devolver los campos actualizados', async () => {
        const petMock = {
            name: 'Cat Mock',
            specie: 'test',
            birthDate: new Date(2020, 1, 1).toUTCString(),
            adopted: false
        };

        const {body: postBody} = await request.post('/api/pets').send(petMock);
        const petId = postBody.payload._id;
        
        const {status, body} = await request.put(`/api/pets/${petId}`).send({name: 'Cat Mock Updated'});
        expect(status).to.equal(200);
        expect(body.status).to.equal('success');
        expect(body.message).to.equal("pet updated");
    });

    it('DELETE /api/pets/:pid - Debe eliminar una mascota y devolver un mensaje de éxito', async () => {
        const petMock = {
            name: 'Bird Mock',
            specie: 'test',
            birthDate: new Date(2020, 1, 1).toUTCString(),
            adopted: false
        };

        const {body: postBody} = await request.post('/api/pets').send(petMock);
        const petId = postBody.payload._id;

        const {status, body} = await request.delete(`/api/pets/${petId}`);
        expect(status).to.equal(200);
        expect(body.status).to.equal('success');
        expect(body.message).to.equal("pet deleted");
    });
});