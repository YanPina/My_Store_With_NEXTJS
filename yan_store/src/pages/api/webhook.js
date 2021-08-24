import { buffer } from "micro"; // Executar 'yarn add micro'
import * as admin from "firebase-admin"; // Executar no terminal 'yarn add firebase-admin' 

const serviceAccount = require("../../../permissions.json");

const app = !admin.apps.length
    ? admin.initializeApp({
          credential: admin.credential.cert(serviceAccount),
      })
    : admin.app();

// Estabelece conexão com Stripe
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const endpointSecret = process.env.STRIPE_SIGNING_SECRET;

const fulfillOrder = async (session) => {
    console.log("Fulfilling order", session);

    const images = JSON.parse(session.metadata.images).map((image) =>
        JSON.stringify(image)
    );

    return app
        .firestore()
        .collection("users")
        .doc(session.metadata.email)
        .collection("orders")
        .doc(session.id)
        .set({
            amount: session.amount_total / 100,
            amount_shipping: session.total_details.amount_shipping / 100,
            images: images,
            timestamp: admin.firestore.FieldValue.serverTimestamp(),
        })
        .then(() => {
            console.log(
                `SUCCESS: Order ${session.id} had been added to the DB`
            );
        })
        .catch((err) => console.log("Erreur a l'insertion !", err.message));
};

export default async (req, res) => {
    if (req.method === "POST") {
        const requestBuffer = await buffer(req);
        const payload = requestBuffer.toString();
        const sig = req.headers["stripe-signature"];

        let event;

        // verifique se o evento postado veio do Stripe
        try {
            event = stripe.webhooks.constructEvent(
                payload,
                sig,
                endpointSecret
            );
        } catch (err) {
            console.log("ERROR", err.message);
            return res.status(400).send(`Webhook error: ${err.message}`);
        }

        // Recebe o evento checkout.session.completed
        if (event.type === "checkout.session.completed") {
            const session = event.data.object;

            // Cumpri o pedido ...
            return fulfillOrder(session)
                .then(() => res.status(200))
                .catch((err) =>
                    res.status(400).send(`Webhook Error: ${err.message}`)
                );
        }
    }
};

export const config = {
    api: {
        bodyParser: false,
        externalResolver: true,
    },
};