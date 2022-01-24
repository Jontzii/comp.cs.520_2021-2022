import debug from 'debug';
import {
  createPlayer,
  deletePlayer,
  getAllPlayers,
  getPlayer,
  PlayerNotFoundError,
  PlayerValidationError,
  updatePlayer
} from '../model/player.mjs';

// Create logger for debugging
// (Better console.log with colours and does not show any output in production)
const log = debug('backend:player-controller');

export const addPlayer = async (req, res, next) => {
  try {
    const player = await createPlayer(req.body);
    res.status(201);
    return res.json(player);
  } catch (err) {
    log('Player creation failed');
    if (err instanceof PlayerValidationError) {
      res.status(400);
      return res.json(err.details);
    }

    res.status(500);
    res.json({ error: err.message });
  }
};

export const removePlayer = async (req, res, next) => {
  try {
    const player = await deletePlayer(req.params.id);
    return res.json(player);
  } catch (err) {
    log('Player deletion failed');
    if (err instanceof PlayerNotFoundError) {
      res.status(404);
      return res.json({ error: err.message });
    }

    res.status(500);
    res.json({ error: err.message });
  }
};

export const showAllPlayers = (req, res, next) => {
  const config = req.app.get('config');
  const players = getAllPlayers();

  if (config?.allPlayersHideIsActive) {
    // filter out player status from player list
    return res.json(
      players.reduce((results, player) => {
        results.push({
          id: player.id,
          name: player.name
        });
        return results;
      }, [])
    );
  }

  res.json(players);
};

export const modifyPlayer = async (req, res, next) => {
  try {
    const player = await updatePlayer(req.params.id, req.body);
    res.json(player);
  } catch (err) {
    log('Player update failed');
    if (err instanceof PlayerNotFoundError) {
      res.status(404);
      return res.json({ error: err.message });
    } else if (err instanceof PlayerValidationError) {
      res.status(400);
      return res.json(err.details);
    }

    res.status(500);
    res.json({ error: err.message });
  }
};

export const showPlayer = (req, res, next) => {
  try {
    const player = getPlayer(req.params.id);
    return res.json(player);
  } catch (err) {
    log('Player fetching failed');
    if (err instanceof PlayerNotFoundError) {
      res.status(404);
      return res.json({ error: err.message });
    }

    res.status(500);
    res.json({ error: err.message });
  }
};
