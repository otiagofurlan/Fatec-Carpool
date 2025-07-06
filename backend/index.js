/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from '../frontend/App';
import { name as appName } from '../app.json';

AppRegistry.registerComponent(appName, () => App);

const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const authRoutes = require('./routes/auth');
app.use('/api', authRoutes);

app.listen(3000, () => {
  console.log('Servidor backend rodando na porta 3000');
});
