

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
        req.flash('Success', 'User has successful created!');
        req.session.save(function () {
            return res.redirect('back')
        })

    } catch (error) {
        console.log(error)
        res.render('404');

    }

}




exports.login = async (req, res) => {
    try {
        const login = new Login(req.body);
        await login.login();

        if(login.errors.length > 0) {
            req.flash('Errors', login.errors);
            req.session.save(() => {
                return res.redirect('back')
            });
            return;
        }


        req.flash('success', 'Success Loged')
        req.session.user = login.user
        req.session.save(() =>  {
            return res.redirect('back')
        })
    } catch (error) {
        console.log(error)
        return res.render('404');
    }
    
}