const bcrypt = require('bcrypt');
const { getAllUsers, getUserById, createUser, updateUser, deleteUser, getUserByEmail, SaveCode, verifyCode, updateAndClear,getCodeByEmail} = require("../repositories/usuario.repository");
const { generateToken } = require('../utils/generateToken');
const transporter = require('../utils/mailer')

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
    try {
        console.log(req.body);
        const {password, ...user} = req.body;
        user.password = bcrypt.hashSync(password, 10);
        await createUser(user);
        res.status(201).json({msg: 'usuario creado exitosamente.'});
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};

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
        if(!user && !bcrypt.compareSync(password, user.password)) return res.status(401).json({msg: 'Datos invalidos'})
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
            from: 'camiloyarce11@gmail.com',
            to: email,
            subject: 'Código de recuperación',
            text: `Usted ha solicitado un código para recuperar su contraseña, use el siguiente código para seguir con el proceso de recuperación: ${code}`
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

