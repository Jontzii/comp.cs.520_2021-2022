import { rest } from 'msw';
import { players } from './players';

const getAllPlayers = (req, res, ctx) => {
  if (!req.headers.has('Accept') || !req.headers.get('Accept').includes('json')) {
    return res(ctx.status(406));
  }

  return res(ctx.json(players.map(player => ({ id: player.id, name: player.name }))));
};

const getOnePlayer = (req, res, ctx) => {
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

export const handlers = [
  rest.get(/\/api\/players$/, getAllPlayers),

  rest.get('/api/players/:playerId', getOnePlayer),
  rest.get('http://localhost:3001/api/players/:playerId', getOnePlayer),

  rest.delete('/api/players/:playerId', deleteOnePlayer),
  rest.delete('http://localhost:3001/api/players/:playerId', deleteOnePlayer),

  rest.post(/\/api\/players$/, addNewPlayer)
];
