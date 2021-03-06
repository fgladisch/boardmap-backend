import { create, update, destroy, findOne, findAll } from './locations'
import * as httpMocks from 'node-mocks-http';
import { expect } from 'chai'
import { spy, SinonSpy } from 'sinon'

import { Location, sequelize } from '../models'

const resetDatabase = () => sequelize.sync({ force: true })

const next: SinonSpy = spy()

describe('locations controller', () => {

  let response
  let testLocation

  beforeEach(resetDatabase)
  afterEach(resetDatabase)

  beforeEach(() => {

    response = httpMocks.createResponse()

    testLocation = {
      name: 'TEST',
      latitude: '12.34',
      longitude: '12.34'
    }

  })

  it('should create a location', async () => {

    const request = httpMocks.createRequest({ body: testLocation })

    await create(request, response, next)

    const location = response._getData()

    expect(location.id).to.be.a('number')
    expect(location.name).to.equal(testLocation.name)
    expect(location.latitude).to.equal(testLocation.latitude)
    expect(location.longitude).to.equal(testLocation.longitude)
  })

  it('should update a location', async () => {

    const updatedName = 'TEST2'
    const existingLocation = await Location.create(testLocation)

    const request = httpMocks.createRequest({
      body: { ...testLocation, name: updatedName },
      params: { id: existingLocation.id }
    })

    await update(request, response, next)

    const location = response._getData()

    expect(location.name).to.equal(updatedName)
  })

  it('should destroy a location', async () => {

    const existingLocation = await Location.create(testLocation)

    const request = httpMocks.createRequest({ params: { id: existingLocation.id } })

    await destroy(request, response, next)

    const removedLocation = await Location.findById(existingLocation.id)

    expect(removedLocation).to.equal(null)
  })

  it('should find one location', async () => {

    const existingLocation = await Location.create(testLocation)

    const request = httpMocks.createRequest({ params: { id: existingLocation.id } })

    await findOne(request, response, next)

    const location = response._getData()

    expect(location.id).to.equal(existingLocation.id)
  })

  it('should find all locations', async () => {

    const existingLocation = await Location.create(testLocation)

    const request = httpMocks.createRequest()

    await findAll(request, response, next)

    const locations = response._getData()

    expect(locations).to.have.lengthOf(1)
  })

})
