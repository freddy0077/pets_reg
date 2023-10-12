import { catchErrors } from '../errors';
import DataProvider from "../data/DataProvider";
import SubscriptionPlanHandlers from "../data/plans/SubscriptionPlanHandlers";

export const getPlans = catchErrors(async (req, res) => {
    const data = await DataProvider.create()
    const plansHandler = await SubscriptionPlanHandlers.create(data)

    console.log("Body", req.query)
    const plans = await plansHandler.getAll({ })
    res.respond({ data: plans });
});

export const getPlan = catchErrors(async (req, res) => {
    const data = await DataProvider.create()
    const planHandler = await SubscriptionPlanHandlers.create(data)

    const id = req.params.id;
    if (!id) {
        res.send("Missing doctor id").status(400)
        throw new Error('Missing doctor id');
    }

    const plan = await planHandler.get({ id })

    res.respond({ data : plan });
});

export const addPlan = catchErrors(async (req, res) => {
    const planData = req.body;

    if (!planData) {
        res.status(400).send("Missing plan data");
        throw new Error('Missing plan data');
    }

    const data = await DataProvider.create();
    const planHandler = await SubscriptionPlanHandlers.create(data);
    await planHandler.insert(planData)

    res.respond({ message: "success" });
})

export const updatePlan = catchErrors(async (req, res) => {
    const data = await DataProvider.create()
    const planHandler = await SubscriptionPlanHandlers.create(data)

    const id = req.params.id;
    const updateData = req.body;
    if (!id || !updateData) {
        res.send("Missing plan id or update data").status(400)
        throw new Error('Missing plan id or update data');
    }

    const plan = await planHandler.update({ ...updateData, id })

    res.respond({ data: plan });
});

export const deletePlan = catchErrors(async (req, res) => {
    const data = await DataProvider.create()
    const planHandler = await SubscriptionPlanHandlers.create(data)

    const id = req.params.id;
    if (!id) {
        res.send("Missing plan id").status(400)
        throw new Error('Missing plan id');
    }

    await planHandler.deletePlan({ id })

    res.respond({ message: 'Plan deleted successfully' });
});
