

const mongoose = require('mongoose');
const validator = require('validator');

const ContactSchema = new mongoose.Schema(
    {

    }
)


const ContactModel = mongoose.model('Contact', ContactSchema);

function Contact(body) {
    this.body = body;
    this.errors = [];
    this.contact = null;
}


Contact.prototype.register = function() {
    this.validate()
}

Contact.prototype.register.validate = function() {
    this.cleanUp();
    // validate Email
    if (!validator.isEmail(this.body.email)) this.errors.push('Invalid Email');

    if (this.body.password.length < 3 || this.body.password.length > 50) {
      this.errors.push('Password length need be bigest than 3 chars')
    }

  }

  Contact.prototype.cleanUp = function() {
    for (const key in this.body) {
      if (typeof this.body[key] !== 'string') {
        this.body[key] = '';
      }
    }

    this.body = {
      email: this.body.email,
      password: this.body.password
    }
  }



module.exports = Contact;