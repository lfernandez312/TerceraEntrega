const { Router } = require('express');
const Users = require('../models/users.model');
const passport = require('passport');
const usersService = require('../services/users.services');
const NewUserDto = require('../DTO/new-users.dto');
const router = Router();

router.post('/', passport.authenticate('register', { failureRedirect: '/users/fail-register' }), async (req, res) => {
  try {

    const newUserInfo = new NewUserDto(req.body);
    const newUser = await usersService.create(newUserInfo)

    res.status(201).json({ status: 'success', message: 'User has been registered'});
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error', message: 'Internal Server Error' , payload:error});
  }
});

router.get('/api', async (req, res) => {
  if (req.user.role === 'admin') {
    try {
      const users = await Users.find();

      res.json({
        status: 'success',
        payload: users,
      });
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
      res.status(500).json({ error: 'Error del servidor al obtener usuarios' });
    }
  } else {
    res.status(400).json({ error: 'NO ESTÁS AUTORIZADO' });
  }
});

router.get('/fail-register', (req, res) => {
  console.log('falló registro');
  res.status(400).json({ status: 'error', error: 'Bad Request' });
});

module.exports = router;