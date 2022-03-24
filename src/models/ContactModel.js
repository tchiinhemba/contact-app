

const mongoose = require('mongoose');
const validator = require('validator');

const ContactSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        surname: { type: String, required: true, default: '' },
        email: { type: String, required: true, default: '' },
        phone: { type: String, required: true, default: '' },
        createAt: { type: Date, default: Date.now }
    }
)


const ContactModel = mongoose.model('Contact', ContactSchema);

function Contact(body) {
    this.body = body;
    this.errors = [];
    this.contact = null;
}



Contact.prototype.register = async function () {
    this.validate()
    if (this.errors.length > 0) return;
    this.contact = await ContactModel.create(this.body)

}

Contact.prototype.validate = function () {
    this.cleanUp();
    // validate Email
    if (this.body.email && !validator.isEmail(this.body.email)) this.errors.push('Invalid Email');
    if (!this.body.name) this.errors.push('Name is Required!');
    if (!this.body.email && !this.body.phone) this.errors.push('Pelo menos um contacto deve ser enviado');

}

Contact.prototype.cleanUp = function () {
    for (const key in this.body) {
        if (typeof this.body[key] !== 'string') {
            this.body[key] = '';
        }
    }

    this.body = {
        name: this.body.name,
        surname: this.body.surname,
        email: this.body.email,
        phone: this.body.phone,
    }
}



Contact.prototype.edit = async function (id) {
    if (typeof id !== 'string') return;
    this.validate();
    if (this.errors.length > 0) return;
    this.contact = await ContactModel.findByIdAndUpdate(id, this.body, { new: true });
}




// Static Methods

Contact.searchForId = async function (id) {

    if (typeof id !== 'string') return;
    const contact = await ContactModel.findById(id);
    return contact;
}

Contact.searchContacts = async function () {
    const contacts = await ContactModel.find()
        .sort({ createAt: -1 });
    return contacts;
}

module.exports = Contact; 