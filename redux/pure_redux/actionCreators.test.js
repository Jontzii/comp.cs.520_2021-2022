import * as actions from './actionTypes';
import { addPlayer, removePlayer, togglePlayerStatus } from './actionCreators';
import { players } from './helpers/players';

describe('addPlayer', () => {
  it('should return object with correct type and payload', () => {
    const { name, isActive } = players[0];
    const action = addPlayer(name, isActive);
    expect(action).toMatchObject({
      type: actions.ADD_PLAYER,
      payload: {
        name,
        isActive
      }
    });
  });

  it('should set isActive to false if it is not given', () => {
    const { name } = players[0];
    const action = addPlayer(name);
    expect(action).toMatchObject({
      type: actions.ADD_PLAYER,
      payload: {
        name,
        isActive: false
      }
    });
  });
});

describe('removePlayer', () => {
  it('should return object with correct type and payload', () => {
    const { id } = players[0];
    const action = removePlayer(id);
    expect(action).toMatchObject({
      type: actions.REMOVE_PLAYER,
      payload: {
        id
      }
    });
  });
});

describe('togglePlayerStatus', () => {
  it('should return object with correct type and payload', () => {
    const { id } = players[0];
    const action = togglePlayerStatus(id);
    expect(action).toMatchObject({
      type: actions.TOGGLE_PLAYER_STATUS,
      payload: {
        id
      }
    });
  });
});
