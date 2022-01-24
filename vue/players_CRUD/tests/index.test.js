"use strict";

// Mocha
mocha.setup("bdd");

// Chai
const assert = chai.assert;
const expect = chai.expect;
const should = chai.should();

// Vue Test Utils
const mount = vueTestUtils.mount;
const shallow = vueTestUtils.shallow;

describe("Vue Test Utils", () => {
  it("mount()", () => {
    (typeof mount).should.equal("function");
  });
  it("shallow()", () => {
    (typeof shallow).should.equal("function");
  });
});

describe("App tests", async () => {
  let wrapper = null;
  beforeEach(function () {
    wrapper = mount(App);
  });

  it("renders an ordered list", () => {
    const ol = wrapper.find("ol");
    expect(ol.exists()).to.equal(true);
  });
});

describe("App tests", async () => {
  let wrapper = null;
  beforeEach(function () {
    wrapper = mount(RequestStatusComponent,{
      propsData:{
        requestStatus: "Hi"
      }
    });
  });

  it("renders the prop data", () => {
    expect(wrapper.text()).to.equal("Hi");
  });
});





const delay = (delay, cb = null) => {
  return new Promise(resolve =>
    setTimeout(() => {
      if (typeof cb === 'function') return resolve(cb());
      resolve();
    }, delay)
  );
};
const apiUrl = "http://localhost:3000/api/players"
const playersData = [
  {
    id: 1,
    name: 'Player One',
    isActive: false
  },
  {
    id: 2,
    name: 'Player Two',
    isActive: true
  },
  {
    id: 3,
    name: 'Player Three',
    isActive: false
  }
];


describe("Vue components and their emits", () => {
  let fetchStub;
  const components = [AddPlayerComponent, ListPlayersComponent, ShowPlayerComponent, RequestStatusComponent];
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
  
  it("must contain the defined components", async () => { 
    components.map(comp=>wrapper.getComponent(comp));
  });
 
  it('emit demo', async () => {
    const addFormComponent = wrapper.getComponent(components[0]);

    const emitData = "heippa"

    // Assert that nothing has been emitted
    expect(addFormComponent.emitted()).to.not.have.property('add-player');
    
    // Using get is preferred over find because find doesn't throw an error if element is not found
    const input = addFormComponent.get('input#input-player') 

    await input.setValue(emitData)

    // await addFormComponent.get('#add-btn').trigger('click'); // does not work because form is not mounted in a real dom
  
    const form = addFormComponent.get('form');

    // Using this approach allow Vue to handle the submit
    await form.trigger('submit.prevent');

    // assert event has been emitted
    expect(addFormComponent.emitted()).to.have.property('add-player');

    // assert the emitted data is correct
    expect(addFormComponent.emitted()['add-player'][0]).to.deep.equal([emitData])
    
  });
  
});
