import { rest } from 'msw';
import { players } from './players';

const getAllPlayers = (req, res, ctx) => {
  if (!req.headers.has('Authorization')) {
    return res(ctx.status(401));
  }

  if (!req.headers.has('Accept') || !req.headers.get('Accept').includes('json')) {
    return res(ctx.status(406));
  }

  return res(ctx.json(players.map(player => ({ id: player.id, name: player.name }))));
};

const getOnePlayer = (req, res, ctx) => {
  if (!req.headers.has('Authorization')) {
    return res(ctx.status(401));
  }

  if (!req.headers.has('Accept') || !req.headers.get('Accept').includes('json')) {
    return res(ctx.status(406));
  }

  const { playerId } = req.params;
  if (/\D/.test(playerId)) {
    return res(ctx.status(404));
  }

  const player = players.find(pl => pl.id === Number.parseInt(playerId));
  if (!player) {
    return res(ctx.status(404));
  }

  return res(ctx.json({ ...player }));
};

const deleteOnePlayer = (req, res, ctx) => {
  if (!req.headers.has('Authorization')) {
    return res(ctx.status(401));
  }

  if (!req.headers.has('Accept') || !req.headers.get('Accept').includes('json')) {
    return res(ctx.status(406));
  }

  const { playerId } = req.params;
  if (/\D/.test(playerId)) {
    return res(ctx.status(404));
  }

  const player = players.find(pl => pl.id === Number.parseInt(playerId));
  if (!player) {
    return res(ctx.status(404));
  }

  return res(ctx.json({ ...player }));
};

const addNewPlayer = (req, res, ctx) => {
  if (!req.headers.has('Authorization')) {
    return res(ctx.status(401));
  }

  if (!req.headers.has('Accept') || !req.headers.get('Accept').includes('json')) {
    return res(ctx.status(406));
  }

  return res(
    ctx.status(201),
    ctx.json({
      id: players.length + 1,
      name: 'New Player',
      isActive: false
    })
  );
};

const registerUser = (req, res, ctx) => {
  if (!req.headers.has('Accept') || !req.headers.get('Accept').includes('json')) {
    return res(ctx.status(406));
  }

  if (!req.body?.username) {
    return res(ctx.status(400), ctx.json({ error: { username: 'username is required' } }));
  }

  if (!req.body?.password) {
    return res(ctx.status(400), ctx.json({ error: { password: 'password is required' } }));
  }

  return res(
    ctx.status(201),
    ctx.json({
      username: req.body.username
    })
  );
};

export const handlers = [
  rest.post(/\/api\/users$/, registerUser),

  rest.get(/\/api\/players$/, getAllPlayers),

  rest.get('/api/players/:playerId', getOnePlayer),
  rest.get('http://localhost:3001/api/players/:playerId', getOnePlayer),

  rest.delete('/api/players/:playerId', deleteOnePlayer),
  rest.delete('http://localhost:3001/api/players/:playerId', deleteOnePlayer),

  rest.post(/\/api\/players$/, addNewPlayer)
];
