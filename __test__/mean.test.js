const supertest = require('supertest')
const express = require('express')
const app = express()
beforeEach(async () => {
  const mountRoutes = require('../routes')
  mountRoutes(app)
})

describe('[3] Test mean value of the list', () => {
  test('Empty list has no mean value', async () => {
    const res = await supertest(app).get('/getNumbersMeanValue')
    expect(res.statusCode).toEqual(501)
    expect(res.body).toEqual({ err: 'we cannot calculate the mean of an empty list' })
  })
  test('Mean value', async () => {
    await supertest(app).post('/Numbers')
      .set('Content-Type', 'application/json')
      .send([10, 20, 30])
    const res = await supertest(app).get('/getNumbersMeanValue')
    expect(res.statusCode).toEqual(200)
    expect(res.body).toEqual({res: 20})
    //escaping status pb
  })
  /*
      await supertest(app).post('/Numbers')
      .set('Content-Type', 'application/json')
      .send([1, 2, 3]) */
})
