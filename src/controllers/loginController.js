

const Login = require('../models/LoginModel')


exports.index = (req, res) => {
    res.render('login')
}


exports.register = async function (req, res) {


    try {
        const login = new Login(req.body);
        await login.register();

        if (login.errors.length > 0) {
            req.flash('Errors', login.errors);
            req.session.save(function () {
                return res.redirect('back')
            })
            return
        }
        return res.send(login.errors)

    } catch (error) {
        console.log(error)
        res.render('404');

    }

}