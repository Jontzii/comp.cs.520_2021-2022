import { rest } from 'msw';
import { players } from './players';

export const handlers = [
  rest.post('/api/users', (req, res, ctx) => {
    if (!req.headers.has('Accept') || !req.headers.get('Accept').includes('json')) {
      return res(
        ctx.status(406)
      );
    }

    if (!req.body?.username) {
      return res(
        ctx.status(400),
        ctx.json({ error: { username: 'username is required' } })
      );
    }

    if (!req.body?.password) {
      return res(
        ctx.status(400),
        ctx.json({ error: { password: 'password is required' } })
      );
    }

    return res(
      ctx.status(201),
      ctx.json({
        username: req.body.username
      })
    );
  }),

  rest.get('/api/players', (req, res, ctx) => {
    if (!req.headers.has('Authorization')) {
      return res(
        ctx.status(401)
      );
    }

    if (!req.headers.has('Accept') || !req.headers.get('Accept').includes('json')) {
      return res(
        ctx.status(406)
      );
    }

    return res(
      ctx.json(players.map(player => ({ id: player.id, name: player.name })))
    );
  }),

  rest.get('/api/players/:playerId', (req, res, ctx) => {
    if (!req.headers.has('Authorization')) {
      return res(
        ctx.status(401)
      );
    }

    if (!req.headers.has('Accept') || !req.headers.get('Accept').includes('json')) {
      return res(
        ctx.status(406)
      );
    }

    const { playerId } = req.params;
    if (/\D/.test(playerId)) {
      return res(
        ctx.status(404)
      );
    }

    const player = players.find(pl => pl.id === Number.parseInt(playerId));
    if (!player) {
      return res(
        ctx.status(404)
      );
    }

    return res(
      ctx.json({ ...player })
    );
  }),

  rest.delete('/api/players/:playerId', (req, res, ctx) => {
    if (!req.headers.has('Authorization')) {
      return res(
        ctx.status(401)
      );
    }

    if (!req.headers.has('Accept') || !req.headers.get('Accept').includes('json')) {
      return res(
        ctx.status(406)
      );
    }

    const { playerId } = req.params;
    if (/\D/.test(playerId)) {
      return res(
        ctx.status(404)
      );
    }

    const player = players.find(pl => pl.id === Number.parseInt(playerId));
    if (!player) {
      return res(
        ctx.status(404)
      );
    }

    return res(
      ctx.json({ ...player })
    );
  }),

  rest.post('/api/players', (req, res, ctx) => {
    if (!req.headers.has('Authorization')) {
      return res(
        ctx.status(401)
      );
    }

    if (!req.headers.has('Accept') || !req.headers.get('Accept').includes('json')) {
      return res(
        ctx.status(406)
      );
    }

    return res(
      ctx.status(201),
      ctx.json({
        id: players.length + 1,
        name: 'New Player',
        isActive: false
      })
    );
  })
];
