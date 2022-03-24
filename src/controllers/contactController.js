
const Contact = require('../models/ContactModel');

exports.index = (req, res) => {
    res.render('contact')
}

exports.register = async (req, res) => {
    try {
        const contact = new Contact(req.body);
        await contact.register();


        if (contact.errors.length > 0) {
            req.flash('errors', contact.errors);
            req.session.save(() => { res.redirect('back') })
            return
        }


        req.flash('success', 'Contact are successfully created!');
        req.session.save(() => res.redirect(`/contact/index/${contact.contact._id}`))
        return;
    } catch (error) {
        console.log(error);
        return res.render('404')
    }
}


exports.editIndex = async (req, res) => {
    if(!req.params.id) return res.render('404');

    const contact = await Contact.searchForId(req.params.id);
    if(!contact) return res.render('404')
    res.render('contact', { contact });
}