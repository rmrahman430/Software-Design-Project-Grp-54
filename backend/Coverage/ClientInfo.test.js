const mongoose = require('mongoose');
const ClientInfo = require('../models/ClientInfo');  

// Setup connection to the database
const dbURI = 'mongodb+srv://willysonhuang:UciroAheAMVqWqGU@singhproject.dfoslf8.mongodb.net/singhproject?retryWrites=true&w=majority'

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });

describe('ClientInfo Model Test', () => {
    beforeAll(async () => {
        await mongoose.connection.dropDatabase();
    });

    //  close the database connection
    afterAll(async () => {
        await mongoose.connection.close();
    });

    it('create & save client info successfully', async () => {
        const validClient = new ClientInfo({
            user: new mongoose.Types.ObjectId(),  
            fullname: 'John Doe',
            address1: '123 Main St',
            city: 'Anytown',
            state: 'CA',
            zipcode: '12345'
        });

        const savedClient = await validClient.save();
        expect(savedClient._id).toBeDefined();
        expect(savedClient.fullname).toBe(validClient.fullname);
        expect(savedClient.address1).toBe(validClient.address1);
        expect(savedClient.city).toBe(validClient.city);
        expect(savedClient.state).toBe(validClient.state);
        expect(savedClient.zipcode).toBe(validClient.zipcode);
    });

    it('insert client info successfully, but the field does not defined in schema should be undefined', async () => {
        const clientWithInvalidField = new ClientInfo({
            user: new mongoose.Types.ObjectId(),
            fullname: 'John Doe',
            address1: '123 Main St',
            city: 'Anytown',
            state: 'CA',
            zipcode: '12345',
            age: 35
        });
        const savedClientWithInvalidField = await clientWithInvalidField.save();
        expect(savedClientWithInvalidField._id).toBeDefined();
        expect(savedClientWithInvalidField.age).toBeUndefined();
    });

    it('create client info without required field should failed', async () => {
        const clientWithoutRequiredField = new ClientInfo({ fullname: 'John Doe' });
        let err;
        try {
            await clientWithoutRequiredField.save();
        } catch (error) {
            err = error;
        }
        expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
        expect(err.errors.user).toBeDefined();
        expect(err.errors.address1).toBeDefined();
        expect(err.errors.city).toBeDefined();
        expect(err.errors.state).toBeDefined();
        expect(err.errors.zipcode).toBeDefined();
    });

    it('should fail to create client info with invalid data', async () => {
        const invalidClient = new ClientInfo({
            user: new mongoose.Types.ObjectId(),
            fullname: 'John Doe',
            address1: '123 Main St',
            city: 'Anytown',
            state: 'XX',  
            zipcode: '1234'  
        });
        let err;
        try {
            await invalidClient.save();
        } catch (error) {
            err = error;
        }
        expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
        expect(err.errors.state).toBeDefined();
        expect(err.errors.zipcode).toBeDefined();
    });
});
