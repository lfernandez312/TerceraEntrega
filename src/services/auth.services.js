const { email_out } = require('../config/services.config');
const transport = require('../utils/nodemailer.util');

const users = []

const createAuth = async authUserInfo => {
    users.push(authUserInfo)

    await transport.sendMail({
        from: email_out.identifier,
        to: authUserInfo.email,
        subject:'Ingresaste al sistema de Coder',
        html: `
        <div>
          <h1>Hola ${authUserInfo.first_name}!!</h1>
          <h2>Ingresaste al sistema, si es un error, te pedimos que cambies la password. Gracias!</h2>
          <img src="cid:logo" alt="Un logo"/>
        </div>
        `,
        attachments:[{
          filename:'logo.png',
          path:'src/public/images/logo.png',
          cid:'logo',
        }]
    })

    return users
}

module.exports = {
    createAuth,
}