import request from 'supertest';
import supertest from 'supertest';
import { test, expect } from '@jest/globals';
import { v2 as cloudinary } from 'cloudinary';
import app from '../app.js';
import { pool } from '../db/index';

afterAll(() => {
  pool.end();
});

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

// GET BY ID
describe('GET recipe by id', () => {
  test('returns recipe with selected id', async () => {
    const res = await request(app).get('/recipes/1');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({ success: true, payload: expect.any(Object) });
  });
});

// GET ALL
describe('GET all recipes', () => {
  test('returns all recipes', async () => {
    const res = await request(app).get('/recipes/');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({
      success: true,
      payload: expect.any(Array),
      average: expect.any(Array),
    });
  });
});

// POST

describe('POST recipe', () => {
  test('Checks if a recipe is posted', async function () {
    // const response = await supertest(app)
    //   .post('/recipes/create')
    // const projects = await request(app).get('/recipes');
    const response = await request(app)
      .post('/recipes/create')
      .expect(200)
      .send({
        author: 'Yoshi Natsu',
        cloudinary_id: 'gbi9iu6o6xk1zzog1jrc',
        cost: '£16-25',
        description: 'RUDE',
        image: 'hi',
        imagestring:
          'data:image/png;base64,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',
        ingredients: 'RUDE,RUDE',
        nutrition: 'Vegan',
        rating: 0,
        rating_entries: 0,
        serves: '1',
        time: '21-30 mins',
        title: 'RUDE',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/);
    const actual = response.body;
    const expected = {
      success: true,
      data: [
        {
          recipe_id: expect.any(Number),
          author: 'Yoshi Natsu',
          cloudinary_id: expect.any(String),
          cost: '£16-25',
          description: 'RUDE',
          image: 'hi',
          ingredients: 'RUDE,RUDE',
          nutrition: 'Vegan',
          rating: 0,
          rating_entries: 0,
          serves: '1',
          time: '21-30 mins',
          title: 'RUDE',
          image_url: expect.any(String),
        },
      ],
    };
    expect(actual).toEqual(expected);
  });
});

// PATCH
// For PUT, PATCH and DELETE - update route (id) depending on table status
// describe('GET all tickets', () => {
// test('returns all tickets', async () => {
//     const res = await request(app).get('/tickets');
//     expect(res.statusCode).toEqual(200);
//     expect(res.body).toEqual({ success: true, payload: expect.any(Object) });
// });
// });

// describe('POST ticket', () => {
// test('Checks if a ticket is posted', async function () {
//     const response = await supertest(app).post('/tickets').expect(200).send({
//     name: 'Joe Bloggs',
//     roomnumber: '1',
//     message: 'Help me writing a test',
//     keywords: 'jest, supertest',
//     status: 'waiting',
//     });
//     const actual = response.body;
//     const expected = {
//     success: true,
//     payload: [
//         {
//         name: 'Joe Bloggs',
//         roomnumber: '1',
//         message: 'Help me writing a test',
//         keywords: 'jest, supertest',
//         status: 'waiting',
//         ticket_id: expect.any(Number),
//         },
//     ],
//     };
//     expect(actual).toEqual(expected);
// });
// });

// describe('PUT tickets/X', () => {
// test('Checks if the ticket is updated', async function () {
//     const response = await supertest(app).put('/tickets/59').expect(200).send({
//     name: 'Joe Bloggs',
//     roomnumber: '1',
//     message: 'Help me writing a test',
//     keywords: 'jest, supertest',
//     status: 'waiting',
//     });
//     const actual = response.body;
//     const expected = {
//     success: true,
//     payload: [
//         {
//         name: 'Joe Bloggs',
//         roomnumber: '1',
//         message: 'Help me writing a test',
//         keywords: 'jest, supertest',
//         status: 'waiting',
//         ticket_id: expect.any(Number),
//         },
//     ],
//     };
//     expect(actual).toEqual(expected);
// });
// });

// describe('PATCH tickets/X', () => {
// test('Checks if the status value is updated', async function () {
//     const response = await supertest(app)
//     .patch('/tickets/59')
//     .expect(200)
//     .send({
//         status: 'in progress',
//     });
//     const actual = response.body;
//     const expected = {
//     success: true,
//     payload: [
//         {
//         name: 'Joe Bloggs',
//         roomnumber: '1',
//         message: 'Help me writing a test',
//         keywords: 'jest, supertest',
//         status: 'in progress',
//         ticket_id: expect.any(Number),
//         },
//     ],
//     };
//     expect(actual).toEqual(expected);
// });
// });

// describe('DELETE tickets/X', () => {
// test('Checks if the ticket is deleted', async function () {
//     const response = await supertest(app).delete('/tickets/59').expect(200);
//     const actual = response.body;
//     const expected = {
//     success: true,
//     payload: [
//         {
//         name: 'Joe Bloggs',
//         roomnumber: '1',
//         message: 'Help me writing a test',
//         keywords: 'jest, supertest',
//         status: 'in progress',
//         ticket_id: expect.any(Number),
//         },
//     ],
//     };
//     expect(actual).toEqual(expected);
// });
// });
