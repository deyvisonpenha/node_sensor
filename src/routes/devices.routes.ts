import { Router } from 'express';
import {getRepository} from 'typeorm';
import {Device} from '../entity/Device';

import io from '../server'
const deviceRouter = Router();

deviceRouter.get('/', async (request, response) => {
  const deviceRepository = getRepository(Device);

  const devices = await deviceRepository.find();

  return response.json(devices);
});

deviceRouter.post('/', async (request, response) => {
  
  const {
    name,
    status
  } = request.body;

  const deviceRepository = getRepository(Device);

  const device = deviceRepository.create({
    name,
    status
  });

  try {
    await deviceRepository.save(device)
    return response.json(device)

  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

deviceRouter.delete('/:device_id', async (request, response) => {
  const {device_id} = request.params;
  const deviceRepository = getRepository(Device);

  try {
    await deviceRepository.delete({id: Number(device_id)})
    return response.status(201).send("Dispositivo deletado com sucesso")

  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

deviceRouter.patch('/:device_id', async (request, response) => {
  const {device_id} = request.params;
  const {status} = request.body;
  const deviceRepository = getRepository(Device);

  try {
    await deviceRepository.update(
      { id: Number(device_id) },
      {  status }
    );
    const updateDevice = await deviceRepository.findOne({id: Number(device_id)})
    
    return response.status(201).json(updateDevice);

  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

deviceRouter.put('/:device_id', async (request, response) => {
  const {device_id} = request.params;
  const {status} = request.body;
  const deviceRepository = getRepository(Device);

  try {
    await deviceRepository.update(
      { id: Number(device_id) },
      {  status }
    );
    const updateDevice = await deviceRepository.findOne({id: Number(device_id)})
    
    io.emit('device', updateDevice)
    
    return response.status(201).json(updateDevice);

  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default deviceRouter;