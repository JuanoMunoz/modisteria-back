const bcrypt = require('bcrypt');
const { getAllUsers, getUserById, createUser, updateUser, deleteUser, getUserByEmail, SaveCode, verifyCode, updateAndClear,getCodeByEmail} = require("../repositories/usuario.repository.js");
const {createVerify, getCodigoByEmail} = require('../repositories/verificacion.repository.js')
const { generateToken } = require('../utils/generateToken');
const transporter = require('../utils/mailer');
const { Verificacion } = require('../models/verificacion.model.js');

exports.getAllUsers = async (req, res) => {
  try {
    console.log(req.email);
    const users = await getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

exports.getUserById = async (req, res) => {
    const { id} = req.params;
    try {
        console.log(id);
        const user = await getUserById(id);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json(error);
    }
};

exports.createUser = async (req, res) => {
    const { email } = req.body;
    console.log(email);
    const user = await getUserByEmail(email);
        if (user) {
            return res.status(400).json({ msg: "El correo ingresado ya se encuentra registrado, intente de nuevo" });
        }

    function codigoRandom() {
        return Math.floor(100000 + Math.random() * 900000).toString();
    }

    try {
        const code = codigoRandom();
        const expiracion = new Date();
        expiracion.setMinutes(expiracion.getMinutes() + 10);

        const nuevaVerificacion = {
            email: email,
            codigo: code,
            expiracion: expiracion
        };
        await createVerify(nuevaVerificacion);
        const mailOptions = {
            from: "modistadonaluz@gmail.com",
            to: email,
            subject: 'Código de verificación',
            html: `
                <!DOCTYPE html>
                <html lang="es">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Correo Electrónico</title>
                    <style>
                        .all {
                            background-color: #252525;
                            text-align: center;
                            justify-content: center;
                            margin: 0 auto;
                            min-width: 400px;
                            max-width: 500px;
                            min-height: 500px;
                            padding: 10px;
                            border-radius: 8px;
                        }
                        .container {
                            background-image: url('https://i.pinimg.com/564x/55/ac/eb/55aceb377ec84ed5487aa685a527d187.jpg');
                            margin: 0 auto;
                            min-width: 400px;
                            max-width: 500px;
                            min-height: 500px;
                            border-radius: 8px;
                            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                            text-align: center;
                        }
                        .header {
                            background-color: rgb(39, 38, 38);
                            color: black;
                            padding: 20px;
                            border-radius: 8px 8px 0 0;
                        }
                        .header h1 {
                            margin: 0;
                            font-size: 30px;
                        }
                        .content {
                            padding: 20px;
                        }
                        .content p {
                            font-size: 18px;
                            color: black;
                            line-height: 1.5;
                            margin: 20px 0;
                        }
                        .verification-code {
                            font-size: 32px;
                            font-weight: bold;
                            letter-spacing: 2px;
                            color: black;
                            background-color: white;
                            padding: 10px 20px;
                            border-bottom: solid 5px black;
                            display: inline-block;
                            margin: 20px 0;
                        }
                        .btn {
                            display: inline-block;
                            padding: 12px 25px;
                            font-size: 16px;
                            color: white;
                            background-color: #4CAF50;
                            text-decoration: none;
                            border-radius: 5px;
                            margin-top: 20px;
                        }
                        .footer {
                            margin-top: 20px;
                            font-size: 12px;
                            color: #777;
                        }
                    </style>
                </head>
                <body>
                    <div class="all">
                        <div class="container">
                            <div class="content">
                                <h1>Modisteria D.L</h1>
                                <hr>
                                <p>Este es tu código de verificación para seguir en el proceso de registro:</p>
                                <div class="verification-code">${code}</div>
                                <p>Ingresa este código para continuar con tu registro.</p>
                            </div>
                            <div class="footer">
                                <p>Si no has sido tú, ignora este correo.</p>
                                <p>&copy; 2024 Modisteria D.L. Todos los derechos reservados.</p>
                            </div>
                        </div>
                    </div>
                </body>
                </html>`
        };

        // Enviar correo
        await transporter.sendMail(mailOptions);

        // Responder éxito
        res.status(200).json({ msg: 'Código de verificación enviado' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error de servidor al obtener código" });
    }
};


exports.getCodeVerification = async (req, res) =>{
    const {email} = req.body
    try {
        const code = await getCodigoByEmail(email)
        if (code != null) {
            res.status(200).json({msg: `${code}`})
            return true
        }else{
            res.status(200).json({ msg: `El correo ${email} no tiene ningún código de recuperación asociado.` })
            return false
        }
    } catch (error) {
        console.error(error)
        res.status(500).json({msg:"Error de servidor al obtener código"})
    }
}

exports.verifyUser = async(req, res) =>{
    const {email, codigo, nombre, telefono, password, roleId} = req.body
    try {
        savedCode = getCodigoByEmail(email)
        if (savedCode =! codigo) {
            return res.status(400).json({msg:"El código de verificiación ingresado no coincide, intente de nuevo"})
        }
        const encriptada = bcrypt.hashSync(password, 10)
        const newUser = {
            email:email,
            telefono: telefono,
            password: encriptada,
            nombre: nombre,
            roleId:roleId

        }
        createUser(newUser)
        res.status(200).json({msg:"Usuario creado con éxito"})
    } catch (error) {
        console.error(error);
        res.status(500).send({ msg:'Error al crear usuario'});
    }
    
}


exports.updateUser = async (req, res) => {
    const { id } = req.params;
    try {
        const user = req.body;
        await updateUser(id, user);
        res.status(201).json({msg: 'usuario actualizado exitosamente'});
    } catch (error) {
        res.status(500).json(error);
    }
};

exports.statusUser = async (req, res) => {
    const { id } = req.params;
    try {
        await statusUser(id);
        res.status(201).json({msg: 'usuario inactivo'});
    } catch (error) {
        res.status(500).json(error);
    }
}
exports.deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        await deleteUser(id);
        res.status(201).json({msg: 'usuario eliminado'});
    } catch (error) {
        res.status(500).json(error);
    }
}

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await getUserByEmail(email);
        if(!user || !bcrypt.compareSync(password, user.password)) return res.status(401).json({msg: 'Datos invalidos'})
        const token = generateToken(user)
        res.status(200).json({token});

    } catch (error) {
        res.status(500).json(error);
    }
}

exports.forgotPassword = async (req, res) => {
    const { email } = req.body;
    console.log("Email recibido:", email);
    function codigoRandom() {
        return Math.floor(100000 + Math.random() * 900000).toString();
    }
    try {
        const user = await getUserByEmail(email);
        console.log("Usuario encontrado:", user);

        if (!user) {
            return res.status(400).send('Correo no encontrado');
        }
        const code = codigoRandom()
        
        const expiracion = new Date();
        expiracion.setMinutes(expiracion.getMinutes() + 10)
        SaveCode(email, code, expiracion)
        const emailOpts = {
            from: 'modistadonaluz@gmail.com',
            to: email,
            subject: 'Código de recuperación',
            html:`<!DOCTYPE html>
                <html lang="es">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Correo Electrónico</title>
                    <style>
                        .all {
                            background-color: #252525;
                            text-align: center;
                            justify-content: center;
                            margin: 0 auto;
                            min-width: 400px;
                            max-width: 500px;
                            min-height: 500px;
                            padding: 10px;
                            border-radius: 8px;
                        }
                        .container {
                            background-image: url('https://i.pinimg.com/564x/55/ac/eb/55aceb377ec84ed5487aa685a527d187.jpg');
                            margin: 0 auto;
                            min-width: 400px;
                            max-width: 500px;
                            min-height: 500px;
                            border-radius: 8px;
                            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                            text-align: center;

                        }
                        .header {
                            background-color: rgb(39, 38, 38);
                            color: black;
                            padding: 20px;
                            border-radius: 8px 8px 0 0;
                        }
                        .header h1 {
                            margin: 0;
                            font-size: 30px;
                        }
                        .content {
                            padding: 20px;
                        }
                        .content p {
                            font-size: 18px;
                            color: black;
                            line-height: 1.5;
                            margin: 20px 0;
                        }
                        .verification-code {
                            font-size: 32px;
                            font-weight: bold;
                            letter-spacing: 2px;
                            color: black;
                            background-color: white;
                            padding: 10px 20px;
                            border-bottom: solid 5px black;
                            display: inline-block;
                            margin: 20px 0;
                        }
                        .verification-code-ag {
                            font-size: 32px;
                            font-weight: bold;
                            letter-spacing: 2px;
                            color: #ffffff;
                            padding: 10px 6px;
                            border-radius: 5px;
                            display: inline-block;
                            margin: 20px 0;
                            justify-self: end;
                        }
                        .btn {
                            display: inline-block;
                            padding: 12px 25px;
                            font-size: 16px;
                            color: white;
                            background-color: #4CAF50;
                            text-decoration: none;
                            border-radius: 5px;
                            margin-top: 20px;
                        }
                        .footer {
                            margin-top: 20px;
                            font-size: 12px;
                            color: #777;
                        }
                    </style>
                </head>
                <body>
                    <div class="all">
                        <div class="container">
                        
                        <div class="content">
                            <h1>Modisteria D.L</h1>
                            <hr>
                            <p>Fue solicitado un código de verificación para recuperar tu contraseña</p>
                            <p>Tu código de verificación es:</p>
                            <div class="verification-code">${code}</div>
                            <p>Ingresa este código para recuperar tu contraseña</p>
                        </div>
                        <div class="footer">
                            <p>Si no solicitaste este correo, por favor ignóralo.</p>
                            <p>&copy; 2024 Modisteria D.L. Todos los derechos reservados.</p>
                        </div>
                    </div>
                    </div>
                </body>
                </html>`
        };

        await transporter.sendMail(emailOpts);
        res.status(200).send('Código de recuperación enviado');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error de servidor');
    }
};
exports.getCodePassword = async (req, res)=>{
    const {email} = req.body
    try {
        const code = await getCodeByEmail(email)
        if (code != null) {
            res.status(200).json({msg: `${code}`})
        }else{
            res.status(200).json({ msg: `El correo ${email} no tiene ningún código de recuperación asociado.` })
        }
    } catch (error) {
        console.error(error)
        res.status(500).json({msg:"Error de servidor al obtener código"})
    }
}
exports.resetPassword = async (req, res) =>{
    const {email, codigo, newPassword} = req.body
    try {
        const user = await verifyCode(email, codigo)
        if (!user) {
            return res.status(400).json({msg:'Código incorrecto, intente de nuevo'});
        }
        const encriptada = bcrypt.hashSync(newPassword, 10)
        updateAndClear(email, encriptada)
        res.status(200).json({msg:"Contraseña actualizada con éxito."})
    } catch (error) {
        console.error(error);
        res.status(500).send({ msg:'Error al restablecer la contraseña'});
    }
}

