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

const delay = (delay, cb = null) => {
  return new Promise((resolve) =>
    setTimeout(() => {
      if (typeof cb === 'function') return resolve(cb());
      resolve();
    }, delay)
  );
};
const apiUrl = 'http://localhost:3001/api/players';
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


describe("Vue Test Utils", () => {
  it("mount()", () => {
    (typeof mount).should.equal("function");
  });
  it("shallow()", () => {
    (typeof shallow).should.equal("function");
  });
});



/**
 * When the page is opened, all players are retrieved through the JSON REST API using HTTP GET request.
After the fetch, a list of players’ names is shown on the page in a HTML ol list with the id players-list.
Display the player names in an HTML li 

Each name is a clickable link i.e HTML a element, which links to the API endpoint for the player’s data. Handle the click events for the links. You can use Vue event modifiers like v-on:event.prevent or set href="#" to prevent the page from reloading.
create a Vue instance and use its state to store the list of players
you can fetch the initial player list in the created() lifecycle method of the Vue instance
when a link (player’s name) in the list is clicked,&nbsp; the JSON listing their data is downloaded from the JSON REST API using Fetch
    then under the list of links the name and active status of the player is displayed
 */

describe("Vue App tests", () => {

  let wrapper = null;
  beforeEach(async function () {
    wrapper = mount(App);
    await delay(1000);

  });
  it("is vue component", () => {
    expect(wrapper.isVueInstance()).to.equal(true)
  });
  it("renders an ordered list", () => {
    const ol = wrapper.find("ol")
    expect(ol.exists()).to.equal(true)
  });

  it("must contain a list with an id of 'players-list' ", () => {
    const ol = wrapper.find("#players-list")
    expect(ol.exists()).to.equal(true);
  });


});

describe("Vue with mocking", () => {
  let fetchStub;


  let wrapper = null;


  beforeEach(async function () {
    const response = new window.Response(JSON.stringify(playersData), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
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


  it("must use the specified URL", async function () {
    const expectedUrl = new URL(apiUrl);
    // console.log("before fetchStub")

    sinon.assert.called(fetchStub);
    const args = fetchStub.lastCall.args;
    const actualUrlString = args[0] instanceof URL ? args[0].toString() : `${args[0]}`;
    // console.log(actualUrlString);
    chai
      .expect(actualUrlString)
      .to.equal(
        expectedUrl.toString(),
        'The URL was not as expected'
      );
  });

  it("must contain list items with links", async () => {
    const items = wrapper.findAll("li>a");
    const length = items.length;
    chai
      .expect(length).to.equal(playersData.length)
  });


  it("must contain list items with links that contain player names", async () => {
    const items = wrapper.findAll("li>a");
    const length = items.length;
    const names = Array.from(Array(length).keys()).map(ind=>items.at(ind).text())
    const names2 = playersData.map(item=>item.name)

    chai
      .expect(names).to.eql(names2)
  });

  it('renders correct number list items', () => {
    
    const items = wrapper.findAll("li>a");
    // Check that correct number of items were rendered
    expect(items.length).to.equal(3);
    
  });

  it('shows a "Loading status", if a link is clicked', async () => {
    
    // Get random id
    const randId = playersData[Math.floor(Math.random() * playersData.length)].id;
    // Get random a link
    const link = wrapper.get(`#player-${randId} a`);
    
    // click link
    await link.trigger('click.prevent');
    delay(50)

    const status = wrapper.get(`#request-status`);
    const statusText = status.text()
    chai
      .expect(statusText).to.eql("Loading...")

  });


})



