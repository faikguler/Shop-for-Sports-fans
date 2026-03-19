const { Newsletter } = require('../models');

const newsletterController = {
     subscribe: async (req, res) => {

        if(!req.body.email) {
            return res.status(400).json({message: 'Please provide us with an email address.'})
        } 
        // checks if email was sent


    try {
        const existingEmail = await Newsletter.findOne({
            where: {email: req.body.email}
        });
        // this looks for the email in the database

        if(existingEmail) {
            existingEmail.isActive = true;
            await existingEmail.save();
            return res.status(200).json({message: 'Welcome back!!'});
        }
        // if this exists reactivate the email

        await Newsletter.create({
            email: req.body.email,
            isActive: true
        });
        // if its new, create one

        res.status(201).json({message: 'Subscriber successfully!!'});
        
     } catch (err) {
            res.status(500).json({message: 'Database error', error: err});
        }
    }

};

module.exports = newsletterController;