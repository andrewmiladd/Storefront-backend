 import supertest from 'supertest';
import {User , userStore} from '../../../Models/users.model'
import {order , orderStore} from '../../../Models/orders.model'
import {Product , productStore} from '../../../Models/products.model'
import test from '../../../database';
import {app} from '../../../server';
import jwt from 'jsonwebtoken'
const userModel = new userStore();
const orderModel = new orderStore();
const request = supertest(app);
let token:string = '';
describe('Orders endpoints', ()=>{
    beforeAll(async () => {
        const user = {
            email :"abc@ef.com",
            first_name:"abc",
            last_name:"def",
            password:"1234"
        } as User;
        await userModel.createOne(user);
        token = jwt.sign(user, process.env.TOKEN_SECRET as string);
})
afterAll(async () =>{
    const conn= await test.connect();
    const sql =`DELETE FROM orders;\nALTER SEQUENCE orders_id_seq RESTART WITH 1;\n DELETE FROM users;\nALTER SEQUENCE users_id_seq RESTART WITH 1;`;
    await conn.query(sql);
    conn.release();
})
describe('authetnication', () => {
  it('should get a token', async () => {
      const resp = await request
        .post('/store/users/authenticate')
        .set('Content-type', 'application/json')
        .set("Authorization", `Bearer ${token}`)
        .send({
          email: 'abc@ef.com',
          password: '1234'
        });
      expect(resp.status).toBe(200);
      const { id, email, token: Token } = resp.body.data;
      expect(id).toBe(1);
      expect(email).toBe('abc@ef.com');
      token = Token;
    });
  });
  describe ('methods of api' , ()=>{
    it('should create new order', async () => {
        const resp = await request
        .post('/store/orders/')
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send({
            user_id: '1',
            status: 'active'
          });
          expect(resp.status).toBe(200);
          const { id, status, user_id } = resp.body;
          expect(id).toBe(1);
          expect(status).toBe('active');
          expect(user_id).toBe('1');
    })  
    it('should get all of orders', async () => {
        const resp = await request
          .get('/store/orders/')
          .set('Content-type', 'application/json')
          .set('Authorization', `Bearer ${token}`);
        expect(resp.status).toBe(200);
        
        
        expect(resp.body[0].status).toBe('active');
        expect(resp.body[0].user_id).toBe('1');
      
      });
      it('should get one', async () => {
        const resp = await request
          .get('/store/orders/1')
          .set('Content-type', 'application/json')
          .set('Authorization', `Bearer ${token}`);
        expect(resp.status).toBe(200);
        expect(resp.body.id).toBe(1);
        expect(resp.body.status).toBe('active');
        expect(resp.body.user_id).toBe('1');
        
      });
  })
})