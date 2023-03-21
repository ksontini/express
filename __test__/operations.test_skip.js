const supertest = require('supertest')
const express = require('express')
const app = express()
beforeAll(async () => {
  const mountRoutes = require('../routes')
  mountRoutes(app)
  // populating the numberlist
  await supertest(app).post('/Numbers')
    .set('Content-Type', 'application/json')
    .send([10, 20, 30])
})

describe('[2] Operations', () => {
  test('Unrecognized operation', async () => {
    const res = await supertest(app).patch('/Numbers/toto').query({ value: 2 })
    expect(res.statusCode).toEqual(500)
    expect(res.body).toEqual({ err: 'Unrecognized operation toto' })
  })

  test('Operations with string', async () => {
    const res = await supertest(app).patch('/Numbers/divide').query({ value: 'abcd' })
    expect(res.statusCode).toEqual(501)
    expect(res.body).toEqual({ err: 'Value should be a number' })
  })
  test('Divide', async () => {
    const res = await supertest(app).patch('/Numbers/divide').query({ value: 2 })
    expect(res.statusCode).toEqual(200)
    expect(res.body).toEqual(expect.arrayContaining([5, 10, 15]))
  })
  test('Divide by 0', async () => {
    const res = await supertest(app).patch('/Numbers/divide').query({ value: 0 })
    expect(res.statusCode).toEqual(501)
    expect(res.body).toEqual({ err: `Cannot divide by 0 ` })
  })
  test('Add value', async () => {
    const res = await supertest(app).patch('/Numbers/add').query({ value: 2 })
    expect(res.statusCode).toEqual(200)
    expect(res.body).toEqual(expect.arrayContaining([7, 12, 17]))
  })
  test('Substract value', async () => {
    const res = await supertest(app).patch('/Numbers/substract').query({ value: 7 })
    expect(res.statusCode).toEqual(200)
    expect(res.body).toEqual(expect.arrayContaining([0, 5, 10]))
  })
  test('Multiply value', async () => {
    const res = await supertest(app).patch('/Numbers/multiply').query({ value: 10 })
    expect(res.statusCode).toEqual(200)
    expect(res.body).toEqual(expect.arrayContaining([0, 50, 100]))
  })
})
