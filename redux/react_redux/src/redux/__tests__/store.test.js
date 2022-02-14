import {playersReducer}  from '../reducers/playersReducer.js';
import * as CONSTANT from '../constants.js';
import { createStore } from '@reduxjs/toolkit'


const isisActive = isActive => isActive;
const addPlayers = (store, names) =>  names.forEach(name=>store.dispatch({type: CONSTANT.ADD_PLAYER, payload:{name: name, isActive:true}}))

describe('addPlayer', () => {
  it('adds properly', () => {
    const store = createStore(playersReducer);
    const names = ['mölli', 'kurri', 'raski']
    addPlayers(store, names)
    const tested_state =  store.getState()
    const players = tested_state.players;
    expect(Object.keys(players).length).toEqual(names.length)
  });
  it('adds correct players (names)', () => {
    const store = createStore(playersReducer);
    const names = ['mölli', 'kurri', 'raski']
    names.forEach(name=>store.dispatch({type: CONSTANT.ADD_PLAYER, payload:{name: name, isActive:true}}))
    const tested_state =  store.getState()
    const players = tested_state.players;
    const ids = players.map(player=>player.id)
    const added_names = ids.map(id=>players[id]["name"])
    expect(names.sort()).toEqual(added_names.sort());
  });
  it('adds correct activity values', () => {
    const store = createStore(playersReducer);
    const names = ['mölli', 'kurri', 'raski', 'asfjaskh']
    names.forEach(name=>store.dispatch({type: CONSTANT.ADD_PLAYER, payload:{name: name, isActive:true}}))
    const tested_state =  store.getState()
    const players = tested_state.players;
    const ids = players.map(player=>player.id)
    const activities = ids.map(id=>players[id]["isActive"])
    expect(activities.every(isisActive)).toBe(true)
  });

});


describe('removePlayers', () => {
  it('removes one player', () => {
    const store = createStore(playersReducer);
    const names = ['mölli', 'kurri', 'raski']
    addPlayers(store, names)
    const tested_state =  store.getState()
    const players = tested_state.players;
    expect(Object.keys(players).length).toEqual(names.length)

    const ids = players.map(player=>player.id)
    store.dispatch({type: CONSTANT.REMOVE_PLAYER, payload:ids[0]})
    const tested_state2 =  store.getState()
    const players2 = tested_state2.players;
    expect(Object.keys(players2).length).toEqual(names.length-1)
  });

  it('removes all players', () => {
    const store = createStore(playersReducer);
    const names = ['mölli', 'kurri', 'raski']
    addPlayers(store, names)
    const tested_state =  store.getState()
    const players = tested_state.players;
    expect(Object.keys(players).length).toEqual(names.length)

    const ids = players.map(player=>player.id)
    ids.forEach(id=> store.dispatch({type: CONSTANT.REMOVE_PLAYER, payload:id}))
    const tested_state2 =  store.getState()
    const players2 = tested_state2.players;
    expect(Object.keys(players2).length).toEqual(0)
  });
});