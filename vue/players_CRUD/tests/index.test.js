/** @format */

'use strict';

// Mocha
mocha.setup('bdd');

const playersData = [
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
];

// Chai
const assert = chai.assert;
const expect = chai.expect;
const should = chai.should();

// Vue Test Utils
const mount = vueTestUtils.mount;
const shallow = vueTestUtils.shallow;

describe('Vue Test Utils', () => {
	it('mount()', () => {
		(typeof mount).should.equal('function');
	});
	it('shallow()', () => {
		(typeof shallow).should.equal('function');
	});
});

describe('<list-players> tests', async () => {
	let wrapper = null;
	beforeEach(function () {
		wrapper = mount(ListPlayersComponent, { props: { playersData } });
	});

	it('must contain an ordered list', () => {
		const ol = wrapper.find('ol');
		expect(ol.exists()).to.equal(true);
	});
	it('must contain an ordered list with id "players-list"', () => {
		const ol = wrapper.find('ol#players-list');
		expect(ol.exists()).to.equal(true);
	});
});

describe('<list-player> tests', async () => {
	let wrapper = null;
	beforeEach(function () {
		wrapper = mount(ListPlayerComponent, {
			propsData: {
				player: playersData[0],
			},
		});
	});

	it(`Must contain an li with id "player-<player id>"`, () => {
		const li = wrapper.get(`li#player-${playersData[0].id}`);
		expect(li.exists()).to.equal(true);
	});
});

describe('<add-player> tests', async () => {
	let wrapper = null;
	beforeEach(function () {
		wrapper = mount(AddPlayerComponent);
	});

	it(`Must contain a form with id "submit-player"`, () => {
		const form = wrapper.get(`form#submit-player`);
		expect(form.exists()).to.equal(true);
	});
	it(`Form Must contain an input-field with id "input-player"`, () => {
		const input = wrapper.get(`form#submit-player input#input-player`);
		expect(input.exists()).to.equal(true);
	});
	it(`Input-field must be required"`, () => {
		const input = wrapper.get(`form#submit-player input#input-player`);
		expect(input.attributes('required')).to.equal('required');
	});
	it(`Form Must contain a button with id "add-btn"`, () => {
		const button = wrapper.get(`form#submit-player button#add-btn`);
		expect(button.exists()).to.equal(true);
	});
});

describe('<show-player> tests', async () => {
	let wrapper = null;
	beforeEach(function () {
		wrapper = mount(ShowPlayerComponent, {
			propsData: {
				player: playersData[0],
			},
		});
	});

	it(`Must contain a Parent div with id "selected-player"`, () => {
		const div = wrapper.get(`div#selected-player`);
		expect(div.exists()).to.equal(true);
	});
	it(`Parent div Must contain a div with classname "player-id"`, () => {
		const div = wrapper.get(`div#selected-player div.player-id`);
		expect(div.exists()).to.equal(true);
	});
	it(`Parent div Must contain a div with classname "player-name"`, () => {
		const div = wrapper.get(`div#selected-player div.player-name`);
		expect(div.exists()).to.equal(true);
	});
	it(`Parent div Must contain a div with classname "player-status"`, () => {
		const div = wrapper.get(`div#selected-player div.player-status`);
		expect(div.exists()).to.equal(true);
	});
	it(`Parent div Must contain a button with classname "delete-btn"`, () => {
		const button = wrapper.get(`div#selected-player button.delete-btn`);
		expect(button.exists()).to.equal(true);
	});
});

describe('<request-status> tests', async () => {
	let wrapper = null;
	beforeEach(function () {
		wrapper = mount(RequestStatusComponent, {
			propsData: {
				requestStatus: 'Hi',
			},
		});
	});

	it('renders the prop data', () => {
		expect(wrapper.text()).to.equal('Hi');
	});
	it('must contain a div with id "request-status"', () => {
		const div = wrapper.find('div#request-status');
		expect(div.exists()).to.equal(true);
	});
});

describe('Vue App tests', () => {
	let wrapper = null;
	beforeEach(async function () {
		wrapper = mount(App);
		await delay(1000);
	});

	it('must have a wrapper - which also implies that App is defined in index.js', () => {
		expect(wrapper.exists()).to.equal(true);
	});

	it('is vue component', () => {
		expect(wrapper.isVueInstance()).to.equal(true);
	});
	it('must contain a form', () => {
		const form = wrapper.find('form');
		expect(form.exists()).to.equal(true);
	});
	it("must contain a form with an id 'submit-player'", () => {
		const form = wrapper.find('form#submit-player');
		expect(form.exists()).to.equal(true);
	});
	it("must contain an input with an id 'player-name'", () => {
		const input = wrapper.find('input#input-player');
		expect(input.exists()).to.equal(true);
	});
	it("must contain an input with a name 'player-name'", () => {
		const input = wrapper.find("input[name='player-name']");
		expect(input.exists()).to.equal(true);
	});
	it("must contain a button with an id 'add-btn'", () => {
		const button = wrapper.find('button#add-btn');
		expect(button.exists()).to.equal(true);
	});
	it('must contain an ordered list', () => {
		const ol = wrapper.find('ol');
		expect(ol.exists()).to.equal(true);
	});
	it("must contain an ordered list with an id 'players-list'", () => {
		const ol = wrapper.find('ol#players-list');
		expect(ol.exists()).to.equal(true);
	});
});

const delay = (delay, cb = null) => {
	return new Promise((resolve) =>
		setTimeout(() => {
			if (typeof cb === 'function') return resolve(cb());
			resolve();
		}, delay)
	);
};
const apiUrl = 'http://localhost:3001/api/players';

describe('Vue with mocking', () => {
	let fetchStub;

	let wrapper = null;

	beforeEach(async function () {
		const response = new window.Response(JSON.stringify(playersData), {
			status: 200,
			headers: { 'Content-Type': 'application/json' },
		});
		fetchStub = sinon.stub(window, 'fetch').resolves(response);
		wrapper = mount(App);
		await delay(1000);
	});

	afterEach(function () {
		fetchStub.restore();
	});

	after(function () {
		sinon.restore();
	});

	it(`must use the specified URL ${apiUrl}`, async function () {
		const expectedUrl = new URL(apiUrl);
		// console.log("before fetchStub")

		sinon.assert.called(fetchStub);
		const args = fetchStub.lastCall.args;
		const actualUrlString =
			args[0] instanceof URL ? args[0].toString() : `${args[0]}`;
		console.log(actualUrlString);
		chai
			.expect(actualUrlString)
			.to.equal(expectedUrl.toString(), 'The URL was not as expected');
	});

	it('must contain an ordered list with one or more items', () => {
		const ol = wrapper.find('ol#players-list');
		const items = ol.findAll('li');
		expect(items.exists()).to.equal(true);
	});

	it('must contain list items with links', async () => {
		const items = wrapper.findAll('li>a');
		const length = items.length;
		chai.expect(length).to.equal(playersData.length);
	});
	for (const playerData of playersData) {
		it(`must contain a list item with an id 'player-${playerData.id}'`, () => {
			const li = wrapper.find(`li#player-${playerData.id}`);
			expect(li.exists()).to.equal(true);
		});
	}
	it('must contain list items with links that contain player names', async () => {
		const items = wrapper.findAll('li>a');
		const length = items.length;
		const names = Array.from(Array(length).keys()).map((ind) =>
			items.at(ind).text()
		);
		const names2 = playersData.map((item) => item.name);

		chai.expect(names).to.eql(names2);
	});
});

describe('Vue components and their emits', () => {
	let fetchStub;
	const components = [
		AddPlayerComponent,
		ListPlayersComponent,
		ShowPlayerComponent,
		RequestStatusComponent,
	];
	let wrapper = null;

	beforeEach(async function () {
		const response = new window.Response(JSON.stringify(playersData), {
			status: 200,
			headers: { 'Content-Type': 'application/json' },
		});
		fetchStub = sinon.stub(window, 'fetch').resolves(response);
		wrapper = mount(App);
		await delay(1000);
	});

	afterEach(function () {
		fetchStub.restore();
	});

	after(function () {
		sinon.restore();
	});

	it('<add-player> emits add-player message when submit on form is invoked', async () => {
		const addFormComponent = wrapper.getComponent(components[0]);

		const emitData = 'heippa';

		// Assert that nothing has been emitted
		expect(addFormComponent.emitted()).to.not.have.property('add-player');

		// Using get is preferred over find because find doesn't throw an error if element is not found
		const input = addFormComponent.get('input#input-player');

		await input.setValue(emitData);

		// await addFormComponent.get('#add-btn').trigger('click'); // does not work because form is not mounted in a real dom

		const form = addFormComponent.get('form');

		// Using this approach allow Vue to handle the submit
		await form.trigger('submit.prevent');

		// assert event has been emitted
		expect(addFormComponent.emitted()).to.have.property('add-player');

		// assert the emitted data is correct
		expect(addFormComponent.emitted()['add-player'][0]).to.deep.equal([
			emitData,
		]);
	});
	it('<show-player> emits delete-player message when button is clicked', async () => {
		const shownPlayer = playersData[0];
		const ShowPlayerWrapper = mount(ShowPlayerComponent, {
			propsData: {
				player: shownPlayer,
			},
		});

		// Assert that it has not been emitted yet
		expect(ShowPlayerWrapper.emitted()).to.not.have.property('delete-player');

		const button = ShowPlayerWrapper.get(`button`);

		await button.trigger('click');

		// assert event has been emitted
		expect(ShowPlayerWrapper.emitted()).to.have.property('delete-player');

		// assert the emitted data is correct
		expect(ShowPlayerWrapper.emitted()['delete-player'][0]).to.deep.equal([
			shownPlayer.id,
		]);
	});
	it('<list-player> emits player-clicked message when link is clicked', async () => {
		const listPlayerComponent = wrapper.getComponent(components[1]);
		const clickedPlayer = playersData[0];

		// Assert that it has not been emitted yet
		expect(listPlayerComponent.emitted()).to.not.have.property(
			'player-clicked'
		);

		// Using get is preferred over find because find doesn't throw an error if element is not found
		const a = listPlayerComponent.get(`li#player-${clickedPlayer.id}>a`);

		// Using this approach allow Vue to click the submit
		await a.trigger('click.stop.prevent');

		// assert event has been emitted
		expect(listPlayerComponent.emitted()).to.have.property('player-clicked');

		// assert the emitted data is correct
		expect(listPlayerComponent.emitted()['player-clicked'][0]).to.deep.equal([
			clickedPlayer.id,
		]);
	});
	it('<list-players> emits player-clicked message when link is clicked', async () => {
		const ListPlayersWrapper = mount(ListPlayersComponent, {
			propsData: {
				players: playersData,
			},
		});
		// assert event has not been emitted
		expect(ListPlayersWrapper.emitted()).to.not.have.property('player-clicked');
		// Get random id
		const randId =
			playersData[Math.floor(Math.random() * playersData.length)].id;
		// Get random a link
		const randLi = ListPlayersWrapper.get(`#player-${randId} a`);
		// click link
		await randLi.trigger('click.stop.prevent');
		// assert event has been emitted
		expect(ListPlayersWrapper.emitted()).to.have.property('player-clicked');
		// assert event count
		expect(ListPlayersWrapper.emitted()['player-clicked'].length).to.equal(
			1,
			'player-clicked event was emitted with wrong number of times'
		);
		// assert event payload
		expect(ListPlayersWrapper.emitted()['player-clicked'][0]).to.deep.equal(
			[randId],
			'player-clicked event was emitted with wrong payload'
		);
	});
});
