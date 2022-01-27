/** @format */

'use strict';

// Mocha
mocha.setup('bdd');

// Chai
const assert = chai.assert;
const expect = chai.expect;
const should = chai.should();

// Vue Test Utils
const mount = vueTestUtils.mount;
const shallow = vueTestUtils.shallow;
const components = [AuthUserComponent, ListPlayerComponent];

describe('Vue Test Utils', () => {
  it('mount()', () => {
    (typeof mount).should.equal('function');
  });
  it('shallow()', () => {
    (typeof shallow).should.equal('function');
  });
});

const testData = {
  users: ['Helen', 'Philip', 'Saul', 'Peter', 'Jane', 'Anna', 'Micheal'],
  passwords: ['ahtagdah', 'ghdeigfoiu', 'i7oqwebgh', 'HIO98&98', '{}uihdh8237'],
  players: [
    {
      id: 1,
      name: 'Player One',
      isActive: false,
    },
    {
      id: 2,
      name: 'Player Two',
      isActive: true,
    },
    {
      id: 3,
      name: 'Player Three',
      isActive: false,
    },
    {
      id: 4,
      name: 'Player Four',
      isActive: true,
    },
    {
      id: 5,
      name: 'Player Five',
      isActive: false,
    },
  ],
  authUrl: 'http://localhost:3001/api/users',
  playersUrl: 'http://localhost:3001/api/players',
};

const delay = (delay, cb = null) => {
  return new Promise((resolve) =>
    setTimeout(() => {
      if (typeof cb === 'function') return resolve(cb());
      resolve();
    }, delay)
  );
};

describe('AuthUserComponent tests', async () => {
  describe('login', () => {
    let wrapper = null;
    beforeEach(function () {
      wrapper = mount(AuthUserComponent, {
        propsData: {
          isLoggedIn: false,
        },
      });
    });

    it('should renders <form>', () => {
      const form = wrapper.get('form');
      expect(form.element.id).to.equal(
        'auth-form',
        '<auth-user> form has incorrect id'
      );
    });

    it('should renders login submit <button> with correct text', () => {
      const btn = wrapper.get('form button[type="submit"]');
      expect(btn.element.id).to.equal(
        'auth-btn',
        '<auth-user> submit button has incorrect id'
      );
      expect(btn.text()).to.equal(
        'login',
        'submit button has incorrect text content'
      );
    });

    it('should renders <a> element with correct text', () => {
      const a = wrapper.get('a');
      expect(a.element.id).to.equal('switch-link');
      expect(a.text()).to.equal('Go to register');
    });

    it('should renders username <input/>', () => {
      const userInput = wrapper.get('form input[type="text"][required]');
      expect(userInput.element.id).to.equal('auth-username');
    });

    it('should renders password <input/>', () => {
      const userInput = wrapper.get('form input[type="password"][required]');
      expect(userInput.element.id).to.equal('auth-password');
    });

    it('should emit correct event and data on login', async () => {
      // assert event has not been emitted
      expect(wrapper.emitted()).to.not.have.property('login');

      const user =
        testData.users[Math.floor(Math.random() * testData.users.length)];
      const pass =
        testData.passwords[
          Math.floor(Math.random() * testData.passwords.length)
        ];

      const userInput = wrapper.get('#auth-username');
      const passInput = wrapper.get('#auth-password');
      const submitForm = wrapper.get('#auth-form');

      await userInput.setValue(user);
      await passInput.setValue(pass);

      await submitForm.trigger('submit.prevent');

      const emitted = wrapper.emitted();

      // assert event has not been emitted
      expect(
        emitted,
        'login event was not emitted on form submit'
      ).to.have.property('login');

      expect(emitted.login.length).to.equal(
        1,
        'login event was emitted incorrect number of times'
      );

      expect(emitted.login[0][0]).to.deep.equal(
        {
          username: user,
          password: pass,
        },
        'emitted login event with incorrect payload'
      );
    });
  });

  describe('register', () => {
    let wrapper = null;
    beforeEach(async function () {
      wrapper = mount(AuthUserComponent, {
        propsData: {
          isLoggedIn: false,
        },
      });
      const a = wrapper.get('#switch-link');
      await a.trigger('click.prevent');
    });

    it('should renders register submit <button> with correct text', () => {
      const btn = wrapper.get('#auth-btn');
      expect(btn.text()).to.equal(
        'register',
        'submit button has incorrect text content'
      );
    });

    it('should renders <a> element with correct text', () => {
      const a = wrapper.get('#switch-link');
      expect(a.text()).to.equal(
        'Go to login',
        '<a> has incorrect text content'
      );
    });

    it('should emit correct event and data on register', async () => {
      // assert event has not been emitted
      expect(wrapper.emitted()).to.not.have.property('register');

      const user =
        testData.users[Math.floor(Math.random() * testData.users.length)];
      const pass =
        testData.passwords[
          Math.floor(Math.random() * testData.passwords.length)
        ];

      const userInput = wrapper.get('#auth-username');
      const passInput = wrapper.get('#auth-password');
      const submitForm = wrapper.get('#auth-form');

      await userInput.setValue(user);
      await passInput.setValue(pass);

      await submitForm.trigger('submit.prevent');

      const emitted = wrapper.emitted();

      // assert event has not been emitted
      expect(
        emitted,
        'register event was not emitted on form submit'
      ).to.have.property('register');

      expect(emitted.register.length).to.equal(
        1,
        'register event was emitted incorrect number of times'
      );

      expect(emitted.register[0][0]).to.deep.equal(
        {
          username: user,
          password: pass,
        },
        'emitted register event with incorrect payload'
      );
    });
  });

  describe('logout', () => {
    let wrapper = null;
    beforeEach(function () {
      wrapper = mount(AuthUserComponent, {
        propsData: {
          isLoggedIn: true,
        },
      });
    });

    it('should renders <a> element with correct text', () => {
      const a = wrapper.get('#switch-link');
      expect(a.text()).to.equal('Logout', '<a> has incorrect text content');
    });

    it('should remove <form> from DOM', () => {
      const submitForm = wrapper.find('#auth-form');
      expect(submitForm.exists()).to.equal(false);
    });

    it('should emit correct event on logout', async () => {
      const a = wrapper.get('#switch-link');

      // Assert event has not been emitted
      expect(wrapper.emitted()).to.not.have.property('logout');

      await a.trigger('click.prevent');
      const emitted = wrapper.emitted();

      // Assert logout event is emitted
      expect(
        emitted,
        'register event was not emitted on form submit'
      ).to.have.property('logout');

      // Assert event is emitted once
      expect(emitted.logout.length).to.equal(
        1,
        'logout event was emitted incorrect number of times'
      );
    });
  });
});

describe('AddPlayerComponent tests', async () => {
  let wrapper = null;
  beforeEach(function () {
    wrapper = mount(AddPlayerComponent);
  });

  it(`Must contain a form with id "submit-player"`, () => {
    wrapper.get(`form#submit-player`);
  });
  it(`Form Must contain an input-field with id "input-player"`, () => {
    wrapper.get(`form#submit-player input#input-player`);
  });
  it(`Input-field must be required"`, () => {
    wrapper.get(`form#submit-player input#input-player`);
  });
  it(`Form Must contain a button with id "add-btn"`, () => {
    wrapper.get(`form#submit-player button#add-btn`);
  });
  it('should emit add-player event with the name of the player to be added', async () => {
    const user =
      testData.users[Math.floor(Math.random() * testData.users.length)];
    const userInput = wrapper.get(`form#submit-player input#input-player`);
    const submitForm = wrapper.get(`form#submit-player`);
    await userInput.setValue(user);

    await submitForm.trigger('submit.prevent');

    const emitted = wrapper.emitted();

    // assert event has not been emitted
    expect(
      emitted,
      'add-player event was not emitted on form submit'
    ).to.have.property('add-player');

    expect(emitted['add-player'].length).to.equal(
      1,
      'add-player event was emitted incorrect number of times'
    );

    expect(emitted['add-player'][0][0]).to.equal(
      user,
      'emitted register event with incorrect payload'
    );
  });
});

describe('ShowPlayerComponent tests', async () => {
  let wrapper = null;
  let currentPlayer = null;
  beforeEach(function () {
    currentPlayer =
      testData.players[Math.floor(Math.random() * testData.players.length)];
    wrapper = mount(ShowPlayerComponent, {
      propsData: {
        player: currentPlayer,
      },
    });
  });

  it(`Must contain a Parent div with id "selected-player"`, () => {
    wrapper.get(`div#selected-player`);
  });
  it(`Parent div Must contain a div with classname "player-id"`, () => {
    wrapper.get(`div#selected-player div.player-id`);
  });
  it(`Parent div Must contain a div with classname "player-name"`, () => {
    wrapper.get(`div#selected-player div.player-name`);
  });
  it(`Parent div Must contain a div with classname "player-status"`, () => {
    wrapper.get(`div#selected-player div.player-status`);
  });
  it(`Parent div Must contain a button with classname "delete-btn"`, () => {
    const delBtn = wrapper.get(`div#selected-player button.delete-btn`);
    expect(delBtn.text()).to.equal('Delete');
  });
  it('must display user id', () => {
    const playerId = wrapper.get('div#selected-player div.player-id');
    expect(playerId.text()).to.include(currentPlayer.id.toString());
  });
  it('must display user name', () => {
    const playerId = wrapper.get('div#selected-player div.player-name');
    expect(playerId.text()).to.include(currentPlayer.name);
  });
  it('must display user status', () => {
    const playerId = wrapper.get('div#selected-player div.player-status');
    expect(playerId.text()).to.equal(
      currentPlayer.isActive ? 'active' : 'not active'
    );
  });
  it('must emit delete event when delete button is pressed', async () => {
    expect(wrapper.emitted()).to.not.have.property('delete-player');
    const delBtn = wrapper.get(`div#selected-player button.delete-btn`);
    await delBtn.trigger('click');
    const emitted = wrapper.emitted();
    expect(emitted, 'delete-player event was not emitted').to.have.property(
      'delete-player'
    );
    expect(emitted['delete-player'].length).to.equal(
      1,
      'delete-player event was emitted incorrect number of times'
    );
    expect(emitted['delete-player'][0][0]).to.equal(
      currentPlayer.id,
      'delete-player event was emitted with incorrect payload'
    );
  });
});

describe('<list-players-component> tests', () => {
  let wrapper = null;
  beforeEach(function () {
    wrapper = mount(ListPlayersComponent, {
      propsData: {
        players: testData.players,
      },
    });
  });
  it('renders an ordered list', () => {
    // Check that component renders ol
    const ol = wrapper.get('ol#players-list');
  });
  it('renders correct number list items', () => {
    const ol = wrapper.find('ol#players-list');
    // Check that correct number of items were rendered
    expect(ol.element.children.length).to.equal(testData.players.length);
    // Check that items are all li element
    Array.from(ol.element.children).map((el) =>
      expect(el.tagName.toLowerCase()).to.equal('li')
    );
  });

  it('emits correct message', async () => {
    const randPlayer =
      testData.players[Math.floor(Math.random() * testData.players.length)];
    const playerLi = wrapper.getComponent(ListPlayerComponent);
    playerLi.vm.$emit('player-clicked', randPlayer.id);

    const emitted = wrapper.emitted();
    expect(emitted, 'player-clicked event was not emitted').to.have.property(
      'player-clicked'
    );
    expect(emitted['player-clicked'].length).to.equal(
      1,
      'player-clicked event was emitted incorrect number of times'
    );
    expect(emitted['player-clicked'][0][0]).to.equal(
      randPlayer.id,
      'player-clicked event was emitted with incorrect payload'
    );
  });
});

describe('<list-player> tests', () => {
  let currentPlayer = null;
  let wrapper = null;
  beforeEach(function () {
    currentPlayer =
      testData.players[Math.floor(Math.random() * testData.players.length)];
    wrapper = mount(ListPlayerComponent, {
      propsData: {
        player: currentPlayer,
      },
    });
  });

  it('should render <li> with id player-<id>', () => {
    wrapper.get(`li#player-${currentPlayer.id}`);
  });

  it('should render <a> in <li> with id player-<id>', () => {
    wrapper.get(`li#player-${currentPlayer.id} a`);
  });
  it('emits correct message', async () => {
    const a = wrapper.get(`li#player-${currentPlayer.id} a`);
    expect(wrapper.emitted()).to.not.have.property('player-clicked');

    await a.trigger('click.prevent');

    const emitted = wrapper.emitted();
    // assert event has not been emitted
    expect(emitted).to.have.property('player-clicked');

    // assert event has been emitted
    expect(
      wrapper.emitted(),
      'player-clicked event was not emitted'
    ).to.have.property('player-clicked');
    // assert event count
    expect(emitted['player-clicked'].length).to.equal(
      1,
      'player-clicked event was emitted with wrong number of times'
    );
    // assert event payload
    expect(emitted['player-clicked'][0][0]).to.equal(
      currentPlayer.id,
      'player-clicked event was emitted with wrong payload'
    );
  });
});

describe('<request-status> tests', async () => {
  let wrapper = null;
  beforeEach(function () {
    wrapper = mount(RequestStatusComponent, {
      propsData: {
        requestStatus: 'loading',
      },
    });
  });

  it('renders the prop data', () => {
    expect(wrapper.text()).to.equal('loading');
  });
  it('must contain a div with id "request-status"', () => {
    wrapper.get('div#request-status');
  });
});

describe('App test', () => {
  const basicAuthEncript = (username, password) =>
    `Basic ${btoa(`${username}:${password}`)}`;
  describe('Authentication', () => {
    let fetchStub;
    let wrapper = null;

    beforeEach(async function () {
      const response = new window.Response(JSON.stringify(testData.players), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
      fetchStub = sinon.stub(window, 'fetch').resolves(response);
      wrapper = mount(App);
      await delay(100);
    });

    afterEach(function () {
      fetchStub.restore();
    });

    after(function () {
      sinon.restore();
    });

    it('should fetch users with Basic auth on login', async () => {
      const user =
        testData.users[Math.floor(Math.random() * testData.users.length)];
      const pass =
        testData.passwords[
          Math.floor(Math.random() * testData.passwords.length)
        ];
      const authComp = wrapper.getComponent(AuthUserComponent);
      await authComp.vm.$emit('login', { username: user, password: pass });

      const expectedUrl = new URL(testData.playersUrl);

      sinon.assert.calledOnce(fetchStub);
      const args = fetchStub.lastCall.args;
      const actualUrlString = new URL(args[0]);
      chai
        .expect(actualUrlString.toString())
        .to.equal(expectedUrl.toString(), 'The URL was not as expected');
      expect(args[1]).to.have.property('headers');
      const headers = args[1].headers;
      expect(headers).to.be.an.instanceof(Object);
      const authHeader =
        headers instanceof Headers
          ? headers.get('Authorization')
          : headers.Authorization;
      expect(authHeader, 'Authorization header missing').to.not.be.null;
      expect(authHeader).to.equal(
        basicAuthEncript(user, pass),
        'Incorrect authorization header'
      );

      // Wait for players-list to update
      await delay(10);
      const playersComp = wrapper.getComponent(ListPlayersComponent);
      expect(playersComp.get('#players-list').element.children.length).to.equal(
        testData.players.length
      );
    });

    it('should register user with Basic auth and fetch players on register', async () => {
      const user =
        testData.users[Math.floor(Math.random() * testData.users.length)];
      const pass =
        testData.passwords[
          Math.floor(Math.random() * testData.passwords.length)
        ];
      const authComp = wrapper.getComponent(AuthUserComponent);

      await authComp.vm.$emit('register', { username: user, password: pass });

      sinon.assert.callCount(fetchStub, 2);

      // Test for register
      const expectedFirstCallUrl = new URL(testData.authUrl);

      const firstCallArgs = fetchStub.firstCall.args;

      const actualFirstCallUrlString = new URL(firstCallArgs[0]);

      chai
        .expect(actualFirstCallUrlString.toString())
        .to.equal(
          expectedFirstCallUrl.toString(),
          'The URL was not as expected'
        );
      expect(firstCallArgs[1]).to.have.property('method');
      expect(firstCallArgs[1].method).to.equal(
        'POST',
        'Incorrect request method'
      );
      expect(firstCallArgs[1]).to.have.property('headers');
      const firstCallHeaders = firstCallArgs[1].headers;

      expect(firstCallHeaders).to.be.an.instanceof(Object);

      const firstCallAuthHeader =
        firstCallHeaders instanceof Headers
          ? firstCallHeaders.get('Authorization')
          : firstCallHeaders.Authorization;
      expect(firstCallAuthHeader, 'Authorization header missing').to.not.be
        .null;
      expect(firstCallAuthHeader).to.equal(
        basicAuthEncript(user, pass),
        'Incorrect authorization header'
      );

      // Test for fetch users

      const expectedLastCallUrl = new URL(testData.playersUrl);

      const lastCallArgs = fetchStub.lastCall.args;

      const actualLastCallUrlString = new URL(lastCallArgs[0]);

      chai
        .expect(actualLastCallUrlString.toString())
        .to.equal(
          expectedLastCallUrl.toString(),
          'The URL was not as expected'
        );

      expect(lastCallArgs[1]).to.have.property('headers');

      const lastCallHeaders = lastCallArgs[1].headers;

      expect(lastCallHeaders).to.be.an.instanceof(Object);

      const lastCallAuthHeader =
        lastCallHeaders instanceof Headers
          ? lastCallHeaders.get('Authorization')
          : lastCallHeaders.Authorization;
      expect(lastCallAuthHeader, 'Authorization header missing').to.not.be.null;
      expect(lastCallAuthHeader).to.equal(
        basicAuthEncript(user, pass),
        'Incorrect authorization header'
      );

      // Wait for players-list to update
      await delay(10);
      const playersComp = wrapper.getComponent(ListPlayersComponent);
      expect(playersComp.get('#players-list').element.children.length).to.equal(
        testData.players.length
      );
    });

    it('should reset data on logout', async () => {
      wrapper.setData({ players: testData.players });
      expect(wrapper.vm.players).to.have.lengthOf(testData.players.length);
      const authComp = wrapper.getComponent(AuthUserComponent);
      await authComp.vm.$emit('logout');
      expect(wrapper.vm.players).to.have.lengthOf(0);
    });
  });

  describe('Players', () => {
    let fetchStub;
    let wrapper = null;

    beforeEach(async function () {
      const response = new window.Response(JSON.stringify(testData.players), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
      fetchStub = sinon.stub(window, 'fetch').resolves(response);
      wrapper = mount(App);
    });

    afterEach(function () {
      fetchStub.restore();
    });

    after(function () {
      sinon.restore();
    });

    it('should request for player data when a player"s link is clicked', async () => {
      const user =
        testData.users[Math.floor(Math.random() * testData.users.length)];
      const pass =
        testData.passwords[
          Math.floor(Math.random() * testData.passwords.length)
        ];
      const randPlayer =
        testData.players[Math.floor(Math.random() * testData.players.length)];
      const authComp = wrapper.getComponent(AuthUserComponent);
      await authComp.vm.$emit('login', { username: user, password: pass });
      await delay(10);

      const playersListComp = wrapper.getComponent(ListPlayersComponent);

      fetchStub.restore();
      const response = new window.Response(JSON.stringify(randPlayer), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
      fetchStub = sinon.stub(window, 'fetch').resolves(response);

      playersListComp.vm.$emit('player-clicked', randPlayer.id);

      const expectedUrl = new URL(`${testData.playersUrl}/${randPlayer.id}`);

      sinon.assert.called(fetchStub);
      const args = fetchStub.lastCall.args;
      const actualUrlString = new URL(args[0]);
      chai
        .expect(actualUrlString.toString())
        .to.equal(expectedUrl.toString(), 'The URL was not as expected');
      expect(args[1]).to.have.property('headers');
      const headers = args[1].headers;
      expect(headers).to.be.an.instanceof(Object);
      const authHeader =
        headers instanceof Headers
          ? headers.get('Authorization')
          : headers.Authorization;
      expect(authHeader, 'Authorization header missing').to.not.be.null;
      expect(authHeader).to.equal(
        basicAuthEncript(user, pass),
        'Incorrect authorization header'
      );

      // Wait for players-list to update
      await delay(10);
      const showPlayerComp = wrapper.getComponent(ShowPlayerComponent);

      expect(showPlayerComp.get('.player-id').text()).to.include(
        randPlayer.id.toString()
      );
      expect(showPlayerComp.get('.player-name').text()).to.include(
        randPlayer.name
      );
      expect(showPlayerComp.get('.player-status').text()).to.equal(
        randPlayer.isActive ? 'active' : 'not active'
      );
    });

    it('should delete a player', async () => {
      const user =
        testData.users[Math.floor(Math.random() * testData.users.length)];
      const pass =
        testData.passwords[
          Math.floor(Math.random() * testData.passwords.length)
        ];
      const randPlayer =
        testData.players[Math.floor(Math.random() * testData.players.length)];
      const authComp = wrapper.getComponent(AuthUserComponent);
      await authComp.vm.$emit('login', { username: user, password: pass });
      await delay(10);

      const showPlayerComp = wrapper.getComponent(ShowPlayerComponent);

      fetchStub.restore();
      const response = new window.Response(JSON.stringify(randPlayer), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
      fetchStub = sinon.stub(window, 'fetch').resolves(response);

      const playersListComp = wrapper.getComponent(ListPlayersComponent);
      expect(
        playersListComp.get('#players-list').element.children
      ).to.have.length(testData.players.length);
      expect(
        playersListComp.find(`#players-list #player-${randPlayer.id}`).exists()
      ).to.equal(true);
      showPlayerComp.vm.$emit('delete-player', randPlayer.id);

      const expectedUrl = new URL(`${testData.playersUrl}/${randPlayer.id}`);

      sinon.assert.called(fetchStub);
      const args = fetchStub.lastCall.args;
      const actualUrlString = new URL(args[0]);
      chai
        .expect(actualUrlString.toString())
        .to.equal(expectedUrl.toString(), 'The URL was not as expected');
      expect(args[1]).to.have.property('method');
      expect(args[1].method).to.equal('DELETE', 'Incorrect request method');
      expect(args[1]).to.have.property('headers');
      const headers = args[1].headers;
      expect(headers).to.be.an.instanceof(Object);
      const authHeader =
        headers instanceof Headers
          ? headers.get('Authorization')
          : headers.Authorization;
      expect(authHeader, 'Authorization header missing').to.not.be.null;
      expect(authHeader).to.equal(
        basicAuthEncript(user, pass),
        'Incorrect authorization header'
      );

      // Wait for players-list to update
      await delay(10);
      expect(
        playersListComp.get('#players-list').element.children
      ).to.have.length(testData.players.length - 1);
      expect(
        playersListComp.find(`#players-list #player-${randPlayer.id}`).exists()
      ).to.equal(false, 'Player was not removed from list');
    });

    it('should add new player', async () => {
      const user =
        testData.users[Math.floor(Math.random() * testData.users.length)];
      const pass =
        testData.passwords[
          Math.floor(Math.random() * testData.passwords.length)
        ];
      const randPlayer = {
        name: testData.users[Math.floor(Math.random() * testData.users.length)],
        isActive: false,
        id: testData.players.length + 1,
      };
      testData.players[Math.floor(Math.random() * testData.players.length)];
      const authComp = wrapper.getComponent(AuthUserComponent);
      await authComp.vm.$emit('login', { username: user, password: pass });
      await delay(10);

      const addPlayerComp = wrapper.getComponent(AddPlayerComponent);

      fetchStub.restore();
      const response = new window.Response(JSON.stringify(randPlayer), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
      fetchStub = sinon.stub(window, 'fetch').resolves(response);

      const playersListComp = wrapper.getComponent(ListPlayersComponent);
      expect(
        playersListComp.get('#players-list').element.children
      ).to.have.length(testData.players.length);

      addPlayerComp.vm.$emit('add-player', randPlayer.name);

      const expectedUrl = new URL(testData.playersUrl);

      sinon.assert.called(fetchStub);
      const args = fetchStub.lastCall.args;

      const actualUrlString = new URL(args[0]);
      chai
        .expect(actualUrlString.toString())
        .to.equal(expectedUrl.toString(), 'The URL was not as expected');
      expect(args[1]).to.have.property('method');
      expect(args[1].method).to.equal('POST', 'Incorrect request method');
      expect(args[1]).to.have.property('body');
      expect(JSON.parse(args[1].body)).to.deep.equal(
        { name: randPlayer.name, isActive: false },
        'Incorrect request body data'
      );
      expect(args[1]).to.have.property('headers');
      const headers = args[1].headers;
      expect(headers).to.be.an.instanceof(Object);
      const authHeader =
        headers instanceof Headers
          ? headers.get('Authorization')
          : headers.Authorization;
      expect(authHeader, 'Authorization header missing').to.not.be.null;
      expect(authHeader).to.equal(
        basicAuthEncript(user, pass),
        'Incorrect authorization header'
      );

      // Wait for players-list to update
      await delay(10);
      expect(
        playersListComp.get('#players-list').element.children
      ).to.have.length(testData.players.length + 1);

      expect(wrapper.vm.players).to.deep.include(randPlayer);
    });
  });
});
