import * as users from '../../controllers/users';
import * as doctor from '../../controllers/doctors';
import * as Auth from '../../middleware/auth';
import express from "express";
import axios from "axios";
import {DataProvider} from "../../data";
import PetHandlers from "../../data/pets/PetHandlers";
import {randomUUID} from "crypto";

export const attachPublicRoutes = (app: express.Application): void => {

  app.post('/api/v1/auth/login', users.login)
  app.get('/api/v1/user', Auth.authorize(), users.getUser)
  // app.post('/api/v1/users', Auth.authorize(), users.addUsers)
  app.get('/api/v1/users', Auth.authorize(), users.getUsers)
  // app.get('/api/v1/member/otp', Auth.authorize(), users.sendMemberOtp)
  app.post('/api/v1/member/otp', users.sendMemberOtp)


  app.post('/api/v1/payments', express.json(), async (req, res) => {
    const apiKey = process.env.PAYSTACK_API_KEY; // Load from environment variables

    const {
      ownerEmail, ownerAddress, ownerFullName, primaryPhone, secondaryPhone,
      petName, petType, breed, color,
      dob, location, microchipNumber, sex, specialMark, specialNotes, weight
    } = req.body;

    if (!(ownerEmail && ownerAddress && ownerFullName && primaryPhone )){
      res.status(400).send("Required fields are missing!");
    }

    const petData = {
      id: randomUUID().toString(),
      pet_name: petName,
      pet_type: petType,
      breed,
      color,
      dob,
      location,
      microchip_number: microchipNumber,
      sex,
      special_mark: specialMark,
      special_notes: specialNotes,
      weight,
      owner_address: ownerAddress,
      owner_email: ownerEmail,
      owner_full_name: ownerFullName,
      primary_phone: primaryPhone,
      secondary_phone: secondaryPhone,
    }

    try {
      const petObject = await insertPetData(petData);

      const paymentData = {
        email: ownerEmail,
        amount: 2,
        reference: petObject?.id,
      };

      const response = await initializePayment(paymentData, apiKey);
      const { data } = response.data;

      res.send(data.authorization_url);
    } catch (error) {
      console.error("Error occurred:", error);
      res.status(500).send('Payment initialization failed or database operation failed.');
    }
  });

  app.get('/verify/:reference', async (req, res) => {
    const apiKey = process.env.PAYSTACK_API_KEY;

    const { reference } = req.params;

    try {
      const response = await axios.get(`https://api.paystack.co/transaction/verify/${reference}`, {
        headers: {
          'Authorization': `Bearer ${apiKey}`
        }
      });

      const { data } = response.data;

      if (data.status === 'success') {
        res.send('Payment was successful');
      } else {
        res.send('Payment was not successful');
      }
    } catch (error) {
      res.status(500).send('Verification failed');
    }
  });

  app.get('/callback-endpoint', async (req, res) => {
    //@ts-ignore
    const reference = req.query.reference;

    // Use the reference to verify the transaction with Paystack's API
    // If successful, fulfill the user's order or service request

    res.send("Transaction was successful or not, based on verification result.");
  });


  const initializePayment = async (paymentData, apiKey) => {
    return await axios.post('https://api.paystack.co/transaction/initialize', paymentData, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      }
    });
  }

  const insertPetData = async (petData) => {
    const data = await DataProvider.create();
    const petsHandler = await PetHandlers.create(data);

    return await petsHandler.insert(petData);
  }

  //Doctor routes
  app.get('/api/v1/doctors',   Auth.authorize(), doctor.getDoctors)
  app.get('/api/v1/doctors/:id',     Auth.authorize(), doctor.getDoctors)
  app.post('/api/v1/doctors',   Auth.authorize(), doctor.addDoctor)
  app.patch('/api/v1/doctors',  Auth.authorize(), doctor.updateDoctor)
  app.delete('/api/v1/doctors/',Auth.authorize(), doctor.deleteDoctor)


}