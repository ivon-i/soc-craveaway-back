import request from 'supertest';
import supertest from 'supertest';
import { test, expect } from '@jest/globals';
import { v2 as cloudinary } from 'cloudinary';
import app from '../app.js';

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
    expect(res.body).toEqual({ success: true, payload: expect.any(Array), average: expect.any(Array) });
  });
});

// POST 


describe('POST recipe', () => {
    test('Checks if a recipe is posted', async function () {
        // const response = await supertest(app)
        //   .post('/recipes/create')
        const projects = await request(app).get('/recipes/create');
        const response = await request(app)
          .post('/recipes/create')
          .expect(200)
          .send({
            title: 'Test',
            author: 'Test',
            description: 'Test',
            time: 'Test',
            cost: 'Test',
            nutrition: 'Test',
            ingredients: 'Test',
            image: 'Test',
            serves: 'Test',
            rating: 0,
            rating_entries: 0,
            cloudinary_id: 'Test',
            image_url: 'Test',
          })
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/);
        const actual = response.body;
        const expected = {
          success: true,
          data: [
            {
              recipe_id: expect.any(Number),
              title: 'Test',
              author: 'Test',
              description: 'Test',
              time: 'Test',
              cost: 'Test',
              nutrition: 'Test',
              ingredients: 'Test',
              image: 'Test',
              serves: 'Test',
              rating: 0,
              rating_entries: 0,
              cloudinary_id: 'Test',
              image_url: 'Test',
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
