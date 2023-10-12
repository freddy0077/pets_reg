import * as users from '../../controllers/users';
import * as pets from '../../controllers/pets';
import * as doctor from '../../controllers/doctors';
import * as plan from '../../controllers/plans';
import * as Auth from '../../middleware/auth';
import express from "express";
import axios from "axios";
import {DataProvider} from "../../data";
import PetHandlers from "../../data/pets/PetHandlers";
import {randomUUID} from "crypto";
import UserHandlers from "../../data/users/UserHandlers";
import SubscriptionHandlers from "../../data/subscriptions/SubscriptionHandlers";
import {addDays, compareWithToday, formatDate} from "../../utils/dateUtil";

export const attachPublicRoutes = (app: express.Application): void => {

  app.post('/api/v1/auth/login', users.login)

  app.get('/api/v1/user', Auth.authorize(), users.getUser)

  app.get('/api/v1/users', Auth.authorize(), users.getUsers)

  app.post('/api/v1/member/otp', users.sendMemberOtp)

  app.post('/api/v1/member/otp-login', users.otpLogin)

  app.post('/api/v1/payments', express.json(), async (req, res) => {
    const apiKey = process.env.PAYSTACK_API_KEY; // Load from environment variables

    const {
        ownerEmail, ownerAddress, ownerFullName, primaryPhone, secondaryPhone,
        petName, petType, breed, color, dob, location, microchipNumber, sex,
        specialMark, specialNotes, weight, doctor_id
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
      doctor_id
    }

    try {
      const pet_id = await insertPetData(petData);

      const paymentData = {
        email: ownerEmail,
        amount: 1,
        reference: pet_id,
        callback_url: process.env.CALLBACK_ENDPOINT,
      }

      const response = await initializePayment(paymentData, apiKey);
      const { data } = response.data;


      res.send({url: data.authorization_url, reference: pet_id });
    } catch (error) {
      console.error("Error occurred:", error);
      res.status(500).send('Payment initialization failed or database operation failed.');
    }
  });

  // app.get('/api/v1/payments/verify/:reference', async (req, res) => {
  //   const apiKey = process.env.PAYSTACK_API_KEY;
  //
  //   const { reference } = req.params;
  //
  //   try {
  //     const response = await axios.get(`${process.env.TRANSACTION_STATUS_ENDPOINT}/${reference}`, {
  //       headers: {
  //         'Authorization': `Bearer ${apiKey}`
  //       }
  //     });
  //
  //     const { data } = response.data;
  //
  //     console.log("Data", data)
  //
  //     if (data.status === 'success' && data.gateway_response === "Approved") {
  //
  //       const data = await DataProvider.create()
  //       const handler = await PetHandlers.create(data)
  //       const subscriptionHandler = await SubscriptionHandlers.create(data)
  //
  //       const petObject = await handler.get({id: reference})
  //
  //       await handler.update({
  //         id: reference,
  //         active: true,
  //         subscribed: true
  //       })
  //
  //       const subscribed = (await subscriptionHandler.get({pet_id: petObject?.id}))
  //
  //       if (!subscribed){
  //         const currentDate = new Date();
  //         const formattedDate = formatDate(currentDate)
  //         const expiryDate = addDays(formattedDate, 365)
  //
  //         await subscriptionHandler.insert({
  //           id: randomUUID().toString(),
  //           user_id: petObject?.user_id,
  //           pet_id: petObject?.id,
  //           plan_id: null,
  //           start_date: formattedDate,
  //           end_date: expiryDate
  //         })
  //       }else if (subscribed){
  //         const expired = compareWithToday( subscribed.end_date )
  //         if (expired){
  //           return res.send({verified: false}).status(200);
  //         }else {
  //           return res.send({verified: true}).status(200);
  //         }
  //       }
  //
  //       res.send({verified: true}).status(200);
  //
  //     } else {
  //       res.send({verified: false}).status(200);
  //     }
  //   } catch (error) {
  //     console.log("Payment error", error)
  //     res.status(500).send('Verification failed');
  //   }
  // });

  app.get('/api/v1/payments/verify/:reference', async (req, res) => {
    const apiKey = process.env.PAYSTACK_API_KEY;

    const { reference } = req.params;

    try {
      const response = await axios.get(`${process.env.TRANSACTION_STATUS_ENDPOINT}/${reference}`, {
        headers: {
          'Authorization': `Bearer ${apiKey}`
        }
      });

      const { data } = response.data;

      console.log("Data", data)

      if (data.status === 'success' && data.gateway_response === "Approved") {

        const data = await DataProvider.create()
        const handler = await PetHandlers.create(data)
        const subscriptionHandler = await SubscriptionHandlers.create(data)

        const petObject = await handler.get({id: reference})

        await handler.update({
          id: reference,
          active: true,
          subscribed: true
        })

        const subscribed = (await subscriptionHandler.get({pet_id: petObject?.id}))

        if (!subscribed){
          const currentDate = new Date();
          const formattedDate = formatDate(currentDate)
          const expiryDate = addDays(formattedDate, 365)

          await subscriptionHandler.insert({
            id: randomUUID().toString(),
            user_id: petObject?.user_id,
            pet_id: petObject?.id,
            plan_id: null,
            start_date: formattedDate,
            end_date: expiryDate
          })
        }else if (subscribed){
          const expired = compareWithToday( subscribed.end_date )
          if (expired){
            return res.send({verified: false}).status(200);
          }else {
            return res.send({verified: true}).status(200);
          }
        }

        res.send({verified: true}).status(200);

      } else {
        res.send({verified: false}).status(200);
      }
    } catch (error) {
      console.log("Payment error", error)
      res.status(500).send('Verification failed');
    }
  });


  app.get('/callback-endpoint', async (req, res) => {
    //@ts-ignore
    const reference = req.query.reference.toString();

    const data = await DataProvider.create()
    const handler = await PetHandlers.create(data)

    await handler.update({
      id: reference,
      active: true
    })


    res.send("Transaction was successful or not, based on verification result.");
  });


  const initializePayment = async (paymentData, apiKey) => {
    return await axios.post(`${process.env.PAYSTACK_URL_ENDPOINT}`, paymentData, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      }
    });
  }

  const insertPetData = async (petData) => {
    const data = await DataProvider.create();
    const petsHandler = await PetHandlers.create(data);
    const userHandler = await UserHandlers.create(data);

    const userObject = await userHandler.get({ email: petData.owner_email });

    let userId;
    if (userObject) {
      await userHandler.update({
        id: userObject.id,
        email: petData.owner_email,
        first_name: petData.owner_full_name?.split(" ")[0],
        last_name: petData.owner_full_name?.split(" ")?.[1],
        phone_number: petData.primary_phone,
        secondary_phone_number: petData.secondary_phone_number
      });

      userId = userObject.id;
    } else {
      userId = randomUUID().toString();
      await userHandler.insert({
        id: userId,
        email: petData.owner_email,
        first_name: petData.owner_full_name?.split(" ")[0],
        last_name: petData.owner_full_name?.split(" ")?.[1],
        phone_number: petData.primary_phone,
        secondary_phone_number: petData.secondary_phone_number,
        address: petData.owner_address,
        location: petData.location,  // Corrected typo: 'lcoation' -> 'location'
        role: "member"
      });
    }

    const pet_id = randomUUID().toString()
     await petsHandler.insert({
      id: pet_id,
      pet_name: petData.pet_name,
      pet_type: petData?.pet_type,
      breed: petData?.breed,
      color: petData.color,
      dob: petData.dob,
      microchip_number: petData.microchip_number,
      sex: petData.sex,
      special_mark: petData.special_mark,
      special_notes: petData.special_notes,
      user_id: userId,
      doctor_id: petData?.doctor_id
    });

    return pet_id;
  }


  //Doctor routes
  app.get('/api/v1/doctors',   Auth.authorize(), doctor.getDoctors)
  app.get('/api/v1/doctors/:id',     Auth.authorize(), doctor.getDoctors)
  app.post('/api/v1/doctors',   Auth.authorize(), doctor.addDoctor)
  app.patch('/api/v1/doctors',  Auth.authorize(), doctor.updateDoctor)
  app.delete('/api/v1/doctors/',Auth.authorize(), doctor.deleteDoctor)


  //Pet routes
  app.get('/api/v1/pets',   Auth.authorize(), pets.getPets)
  app.get('/api/v1/pets/:id',     Auth.authorize(), doctor.getDoctors)
  app.post('/api/v1/pets',   Auth.authorize(), doctor.addDoctor)
  app.patch('/api/v1/pets',  Auth.authorize(), doctor.updateDoctor)
  app.delete('/api/v1/pets/',Auth.authorize(), doctor.deleteDoctor)

  //Plan routes
  app.get('/api/v1/plans',   Auth.authorize(), plan.getPlans)
  app.get('/api/v1/plans/:id',     Auth.authorize(), plan.getPlan)
  app.post('/api/v1/plans',   Auth.authorize(), plan.addPlan)
  app.patch('/api/v1/plans',  Auth.authorize(), plan.updatePlan)
  app.delete('/api/v1/plans/',Auth.authorize(), plan.deletePlan)

}