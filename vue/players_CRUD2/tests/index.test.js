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
    console.log(wrapper)
  });

  it("is vue component", () => {
    expect(wrapper.isVueInstance()).to.equal(true);
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

  it("is vue component", () => {
    expect(wrapper.isVueInstance()).to.equal(true);
  });
  it("renders the prop data", () => {
    expect(wrapper.text()).to.equal("Hi");
  });
});
