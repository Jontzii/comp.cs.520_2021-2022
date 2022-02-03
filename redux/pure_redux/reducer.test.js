import { createStore } from 'redux';
import { addPlayer, removePlayer, togglePlayerStatus } from './actionCreators';
import { players } from './helpers/players';
import playersReducer from './reducer';

describe('store', () => {
  it('should have empty array as initial state', () => {
    const store = createStore(playersReducer);
    const initialState = store.getState();
    expect(initialState).toEqual(expect.any(Array));
    expect(initialState).toHaveLength(0);
  });
});

describe('ADD_PLAYER', () => {
  it('should add one player with correct data and id', () => {
    const { name, isActive } = players[0];
    const store = createStore(playersReducer);
    store.dispatch(addPlayer(name, isActive));

    const state = store.getState();
    expect(state).toEqual(expect.any(Array));
    expect(state).toHaveLength(1);
    expect(state[0]).toMatchObject({
      name,
      isActive
    });
    expect(state[0]).toHaveProperty('id');
    expect(Number.isSafeInteger(state[0].id)).toBe(true);
    expect(state[0].id).toBeGreaterThan(0);
  });

  it('should add multiple players correctly each player with unique id', () => {
    const store = createStore(playersReducer);

    players.forEach(player => {
      const { name, isActive } = player;
      store.dispatch(addPlayer(name, isActive));
    });

    const state = store.getState();
    expect(state).toEqual(expect.any(Array));
    expect(state).toHaveLength(players.length);

    const ids = [];

    players.forEach((player, i) => {
      const { name, isActive } = player;
      expect(state[i]).toMatchObject({ name, isActive });
      expect(state[i]).toHaveProperty('id');
      expect(Number.isSafeInteger(state[i].id)).toBe(true);
      expect(state[i].id).toBeGreaterThan(0);
      expect(ids).not.toContain(state[i].id);
      ids.push(state[i].id);
    });
  });
});

describe('TOGGLE_PLAYER_STATUS', () => {
  it('should not change state when state is empty', () => {
    const store = createStore(playersReducer);
    const initialState = store.getState();

    store.dispatch(togglePlayerStatus(1));
    const state = store.getState();

    expect(initialState).toEqual(expect.any(Array));
    expect(initialState).toHaveLength(0);
    expect(state).toEqual(expect.any(Array));
    expect(state).toHaveLength(0);
  });

  it('should not change state when player with given id does not exist', () => {
    const store = createStore(playersReducer);
    const { name, isActive } = players[0];

    store.dispatch(addPlayer(name, isActive));
    const initialState = store.getState();

    expect(initialState).toEqual(expect.any(Array));
    expect(initialState).toHaveLength(1);
    expect(initialState[0]).toMatchObject({
      name,
      isActive
    });
    expect(initialState[0]).toHaveProperty('id');

    const id = initialState[0].id;
    store.dispatch(togglePlayerStatus(id + 1));
    const state = store.getState();

    expect(state).toEqual(expect.any(Array));
    expect(state).toHaveLength(1);
    expect(state[0]).toMatchObject({
      id,
      name,
      isActive
    });
  });

  it('should correctly toggle active status from false to true', () => {
    const { name } = players[0];
    const store = createStore(playersReducer);
    store.dispatch(addPlayer(name, false));

    let state = store.getState();
    expect(state).toEqual(expect.any(Array));
    expect(state).toHaveLength(1);
    expect(state[0]).toMatchObject({
      name,
      isActive: false
    });
    expect(state[0]).toHaveProperty('id');

    const id = state[0].id;
    store.dispatch(togglePlayerStatus(id));
    state = store.getState();
    expect(state).toEqual(expect.any(Array));
    expect(state).toHaveLength(1);
    expect(state[0]).toMatchObject({
      id,
      name,
      isActive: true
    });
  });

  it('should correctly toggle active status from true false', () => {
    const { name } = players[0];
    const store = createStore(playersReducer);
    store.dispatch(addPlayer(name, true));

    let state = store.getState();
    expect(state).toEqual(expect.any(Array));
    expect(state).toHaveLength(1);
    expect(state[0]).toMatchObject({
      name,
      isActive: true
    });
    expect(state[0]).toHaveProperty('id');

    const id = state[0].id;
    store.dispatch(togglePlayerStatus(id));
    state = store.getState();
    expect(state).toEqual(expect.any(Array));
    expect(state).toHaveLength(1);
    expect(state[0]).toMatchObject({
      id,
      name,
      isActive: false
    });
  });

  it('should correctly toggle active status when store contains multiple players', () => {
    const store = createStore(playersReducer);

    players.forEach(player => {
      const { name, isActive } = player;
      store.dispatch(addPlayer(name, isActive));
    });

    const state = store.getState();
    expect(state).toEqual(expect.any(Array));
    expect(state).toHaveLength(players.length);

    state.forEach((player, i) => {
      const { id, name, isActive } = player;
      store.dispatch(togglePlayerStatus(id));

      const newState = store.getState();
      expect(newState[i]).toMatchObject({
        id,
        name,
        isActive: !isActive
      });
    });
  });
});

describe('REMOVE_PLAYER', () => {
  it('should not change state when state is empty', () => {
    const store = createStore(playersReducer);
    const initialState = store.getState();

    store.dispatch(removePlayer(1));
    const state = store.getState();

    expect(initialState).toEqual(expect.any(Array));
    expect(initialState).toHaveLength(0);
    expect(state).toEqual(expect.any(Array));
    expect(state).toHaveLength(0);
  });

  it('should not change state when player with given id does not exist', () => {
    const store = createStore(playersReducer);
    const { name, isActive } = players[0];

    store.dispatch(addPlayer(name, isActive));
    const initialState = store.getState();

    expect(initialState).toEqual(expect.any(Array));
    expect(initialState).toHaveLength(1);
    expect(initialState[0]).toMatchObject({
      name,
      isActive
    });
    expect(initialState[0]).toHaveProperty('id');

    const id = initialState[0].id;
    store.dispatch(removePlayer(id + 1));
    const state = store.getState();

    expect(state).toEqual(expect.any(Array));
    expect(state).toHaveLength(1);
    expect(state[0]).toMatchObject({
      id,
      name,
      isActive
    });
  });

  it('should delete only player correctly', () => {
    const store = createStore(playersReducer);
    const { name, isActive } = players[0];

    store.dispatch(addPlayer(name, isActive));
    const initialState = store.getState();

    expect(initialState).toEqual(expect.any(Array));
    expect(initialState).toHaveLength(1);
    expect(initialState[0]).toMatchObject({
      name,
      isActive
    });
    expect(initialState[0]).toHaveProperty('id');

    const id = initialState[0].id;
    store.dispatch(removePlayer(id));
    const state = store.getState();

    expect(state).toEqual(expect.any(Array));
    expect(state).toHaveLength(0);
  });

  it('should delete player correctly when store has multiple players', () => {
    const store = createStore(playersReducer);

    players.forEach(player => {
      const { name, isActive } = player;
      store.dispatch(addPlayer(name, isActive));
    });

    const state = store.getState();
    expect(state).toEqual(expect.any(Array));
    expect(state).toHaveLength(players.length);

    let length = players.length;
    state.forEach((player, i) => {
      const { id, name, isActive } = player;
      store.dispatch(removePlayer(id));

      const newState = store.getState();
      expect(newState).toEqual(expect.any(Array));
      expect(newState).toHaveLength(--length);
      expect(newState).not.toContainEqual({
        id,
        name,
        isActive
      });
    });
  });
});
