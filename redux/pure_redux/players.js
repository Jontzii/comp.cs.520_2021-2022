import { addPlayer, removePlayer, togglePlayerStatus } from './actionCreators.js';
import playersReducer from './reducer.js';

const { createStore } = Redux;
const store = createStore(playersReducer);

// Find elements from the DOM
const addPlayerForm = document.querySelector('form');
const playersList = document.querySelector('#players-list');
const playerInfoTemplate = document.querySelector('#player-info-template');

const handleSubmit = e => {
  e.preventDefault();
  const formData = new FormData(addPlayerForm);
  const name = formData.get('name');
  const isActive = formData.has('active');

  store.dispatch(addPlayer(name, isActive));
  addPlayerForm.reset();
};

const clickHandler = e => {
  if (e.target.classList.contains('toggle-btn')) {
    store.dispatch(togglePlayerStatus(Number.parseInt(e.target.dataset.id)));
  } else if (e.target.classList.contains('delete-btn')) {
    store.dispatch(removePlayer(Number.parseInt(e.target.dataset.id)));
  }
};

const updatePlayersList = () => {
  // remove old event listeners
  playersList
    .querySelectorAll('button')
    .forEach(button => button.removeEventListener('click', clickHandler));

  playersList.innerHTML = '';

  store.getState().forEach(player => {
    // clone and fill list item template with player data
    const listItem = playerInfoTemplate.content.cloneNode(true);
    const idDiv = listItem.querySelector('.player-id');
    const nameDiv = listItem.querySelector('.player-name');
    const statusDiv = listItem.querySelector('.player-status');
    const toggleButton = listItem.querySelector('.toggle-btn');
    const deleteButton = listItem.querySelector('.delete-btn');

    listItem.id = `player-${player.id}`;
    idDiv.textContent = `ID: ${player.id}`;
    nameDiv.textContent = player.name;
    statusDiv.textContent = player.isActive ? 'active' : 'not active';
    // use data attribute to save player id to the buttons
    deleteButton.dataset.id = player.id;
    toggleButton.dataset.id = player.id;
    playersList.append(listItem);
  });

  // Add event listeners to all buttons
  playersList
    .querySelectorAll('button')
    .forEach(button => button.addEventListener('click', clickHandler));
};

// Add submit handler to form and subscribe to store changes
addPlayerForm.addEventListener('submit', handleSubmit);
store.subscribe(updatePlayersList);
