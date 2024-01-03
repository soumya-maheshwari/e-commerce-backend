const stripe = require("stripe")(process.env.STRIPE_SECRET);

const paymentMethod = async (req, res, next) => {
    const { products, customer } = req.body; // Assuming customer details are sent along with products

    const lineItems = products.map((product)=>({
        price_data:{
            currency:"usd",
            product_data:{
                name:product.product.name,
            },
            unit_amount:Math.round(product.product.price * 100),
        },
        quantity:product.quantity
    }));

    console.log("line items ", lineItems);

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: lineItems,
        mode: "payment",
        success_url: "http://localhost:5173/success",
        cancel_url: "http://localhost:5173/failure",
    });

    console.log("session ", session);

    res.json({id:session.id})
}

module.exports = {
    paymentMethod
};