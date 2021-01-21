import express from 'express';
const router = express.Router();
import user from '../models/user_schema.js';
import crypto from 'crypto';

router.route('/create').post((req, res, next) => {
    console.log("Request header: ",req.headers);
    console.log("Request body: ",req.body);
    
    //encrypt the password from the clinet with "POST"
    const algorithm = 'aes-256-ctr';
    const encryptoPassword = (text) => {
        let cipher = crypto.createCipher(algorithm, 'd6F3Efeq');
        let encrypted = cipher.update(text,'utf-8','hex');
        encrypted += cipher.final('hex');
        return encrypted;
    }
    const encryptoData = {
        _id: req.body._id,
        name: req.body.name,
        password: encryptoPassword(req.body.password),
        email: req.body.email
    }
    
    user.create(encryptoData, (error, data) => {
        if (error) {
            return next(error)
        } else {
            
            console.log("Post /create: ",data)
            res.json(data)
        }
    })
});

router.route('/').get((req, res) => {
    
    user.find((error, data) => {
        if (error) {
            return next(error)
        } else {
            
            res.json(data)
        }
    })
    
})

router.route('/edit/:id').get((req, res) => {
    const algorithm = 'aes-256-ctr';
    //const iv = crypto.randomBytes(16);

    //decrypt the password from database and use "GET" to the client
    const decryptoPassword = (text) =>{
        let decipher = crypto.createDecipher(algorithm,'d6F3Efeq');
        let dec = decipher.update(text,'hex');
        dec += decipher.final('utf-8');
        return dec;
    }
    user.findById(req.params.id, (error, data) => {
        if (error) {
            return next(error)
        } else {
            const decryptoData = {
                _id: data._id,
                name: data.name,
                password: decryptoPassword(data.password),
                email: data.email,
            }
            console.log("GET One: ",decryptoData.password);
            res.json(decryptoData)
        }
    })
})


// Update Student
router.route('/update/:id').put((req, res, next) => {
    console.log(`PUT request id: ${req.params.id}`);
    user.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, (error, data) => {
        if (error) {
            console.log(error);
            return next(error);
        } else {
            res.json(data)
            console.log('User updated successfully !')
        }
    })
})

router.route('/delete/:id').delete((req, res, next) => {
    user.findByIdAndRemove(req.params.id, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.status(200).json({
                msg: data
            })
        }
    })
})

export default router;