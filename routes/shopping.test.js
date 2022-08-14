import request from 'supertest';
import supertest from 'supertest';
import { test, expect } from '@jest/globals';
import app from '../app.js';

// GET ALL
// describe('GET all shopping list items', () => {
//   test('returns all shopping list items', async () => {
//     const res = await request(app).get('/shop/').send({
//         username: 'Test'
//     });
//     expect(res.statusCode).toEqual(200);
//     expect(res.body).toEqual({
//       success: true,
//       payload: expect.any(Object),
//       //   average: expect.any(Array),
//     });
//   });
// });

// POST
describe('POST item for shopping list', () => {
  test('Checks if a recipe is posted', async function () {
    const response = await request(app)
      .post('/shop/list')
      .expect(200)
      .send({
        username: 'Text',
        item: 'Text',
      });
    const actual = response.body;
    const expected = {
      success: true,
      payload: [
        {
          username: 'Text',
          item: 'Text',
          item_id: expect.any(Number),
        },
      ],
    };
    expect(actual).toEqual(expected);
  });
});

// DELETE - MUST UPDATE ITEM ID EACH TEST
describe('DELETE tickets/X', () => {
    test('Checks if the item is deleted', async function () {
        const response = await supertest(app).delete('/shop/205').expect(200);
        const actual = response.body;
        const expected = {
          success: true,
          payload: [
            {
              username: expect.any(String),
              item: expect.any(String),
              item_id: expect.any(Number),
            },
          ],
        };
        expect(actual).toEqual(expected);
    });
    });
