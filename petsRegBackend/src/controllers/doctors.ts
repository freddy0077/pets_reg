import { catchErrors } from '../errors';
import DataProvider from "../data/DataProvider";
import DoctorHandlers from "../data/doctors/DoctorHandlers";
import {randomUUID} from "crypto";
import * as bcrypt from "bcrypt";
import UserHandlers from "../data/users/UserHandlers";

export const getDoctors = catchErrors(async (req, res) => {
    const data = await DataProvider.create()
    const doctorHandler = await DoctorHandlers.create(data)

    console.log("Body", req.query)
    const doctors = await doctorHandler.getAll({ })
    res.respond({ data: doctors });
});

export const getDoctor = catchErrors(async (req, res) => {
    const data = await DataProvider.create()
    const doctorHandler = await DoctorHandlers.create(data)

    const id = req.params.id;
    if (!id) {
        res.send("Missing doctor id").status(400)
        throw new Error('Missing doctor id');
    }

    const doctor = await doctorHandler.get({ id })

    res.respond({ doctor });
});

export const addDoctor = catchErrors(async (req, res) => {
    const doctorData = req.body;

    if (!doctorData) {
        res.status(400).send("Missing doctor data");
        throw new Error('Missing doctor data');
    }

    const data = await DataProvider.create();
    const doctorHandler = await DoctorHandlers.create(data);
    const userHandler = await UserHandlers.create(data);

    // const dataObject = {...doctorData, id: randomUUID().toString()}
    function formatDateForMySQL(date) {
        return date.toISOString().slice(0, 19).replace('T', ' ');
    }

    const hashedPassword = bcrypt.hashSync(doctorData.password, 10)
    const user_id = randomUUID().toString()

    const userDataObject = {
        id: user_id,
        full_name: doctorData?.name,
        email: doctorData?.email,
        password: hashedPassword,
        phone_number: doctorData?.phone,
        role: "doctor",
        created_at: formatDateForMySQL(new Date())
    }

     await userHandler.insert(userDataObject)

    // console.log("User", user?.id)
    if (user_id){
        const dataObject = {
            ...doctorData,
            id: randomUUID().toString(),
            user_id: user_id,
            password: hashedPassword,
            created_at: formatDateForMySQL(new Date())
        }
        await doctorHandler.insert(dataObject);
    }

    res.respond({ message: "success" });
})

export const updateDoctor = catchErrors(async (req, res) => {
    const data = await DataProvider.create()
    const doctorHandler = await DoctorHandlers.create(data)

    const id = req.params.id;
    const updateData = req.body;
    if (!id || !updateData) {
        res.send("Missing doctor id or update data").status(400)
        throw new Error('Missing doctor id or update data');
    }

    const doctor = await doctorHandler.update({ ...updateData, id })

    res.respond({ doctor });
});

export const deleteDoctor = catchErrors(async (req, res) => {
    const data = await DataProvider.create()
    const doctorHandler = await DoctorHandlers.create(data)

    const id = req.params.id;
    if (!id) {
        res.send("Missing doctor id").status(400)
        throw new Error('Missing doctor id');
    }

    await doctorHandler.deleteDoctor({ id })

    res.respond({ message: 'Doctor deleted successfully' });
});
