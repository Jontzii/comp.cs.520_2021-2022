import App from '@/App'


describe('App', () => {
    it('has components with methods', () => {
        const components = App.components
        const cmpStrings = ["Players", "Remove"]
        const cmpMethods = cmpStrings.map(cmp => components[cmp].methods)
        const counts = cmpMethods.map(methods => Object.keys(methods).length)
        counts.map(count => expect(count).toBeGreaterThan(1))
    })
})

function isMappedAction(element, index, array) {
    return element == "mappedAction"
}

describe('Players', () => {
    let players, methods

    beforeAll(() => {
        players = App.components["Players"]
        methods = players.methods
    });

    it('has required methods', () => {
        expect(["add", "remove"]).toEqual(Object.keys(methods).sort());
    })
    it('has methods as mapped actions', () => {
        const names = Object.keys(methods).map(key => methods[key].name)
        expect(names.some(isMappedAction)).toBe(true)
        expect(names.length).toBeGreaterThan(0)
    })

})

describe('Remove', () => {
    let methods, remove
    beforeAll(() => {
        remove = App.components["Remove"]
        methods = remove.methods
    });

    it('has required methods', () => {
        expect(["rmDelay", "rmLast"]).toEqual(Object.keys(methods).sort());
    })
    it('has some methods as mapped actions', () => {
        const names = Object.keys(methods).map(key => methods[key].name)
        expect(names.some(isMappedAction)).toBe(true)
        expect(names.length).toBeGreaterThan(0)
    })
})

// describe('Status', () => {
//     let methods, status
//     beforeAll(() => {
//         status = App.components["Status"]
//         methods = status.methods
//     });

//     it('has no methods', () => {
//         expect(methods).toBe(undefined)
//     })
// })

