const mongoose = require('mongoose');
const validator = require('validator');

const LoginSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true }
});

const LoginModel = mongoose.model('Login', LoginSchema);

class Login {
  constructor(body) {
    this.body = body;
    this.error = [];
    this.user = null;
  }

  register() {
    this.validate();
  }

  validate() {
    this.cleanUp();
    // validate Email
    if(!validator.isEmail(this.body.email)) this.error.push('Invalid Email');

    if(this.body.password.length < 3 || this.body.password)

  }

  cleanUp() {
    for(const key in this.body) {
      if( typeof this.body[key] !== 'string') {
        this.body[key] = '';
      }
    }

    this.body = {
      email: this.body.email,
      password: this.body.password
    }
  }
}

module.exports = Login;