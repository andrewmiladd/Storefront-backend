import supertest from 'supertest';
import {User , userStore} from '../../../Models/users.model'
import {Product , productStore} from '../../../Models/products.model'
import {app} from '../../../server';
import test from '../../../database';
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const productModel = new productStore()
const userModel = new userStore();
const request = supertest(app);
let token:string = '';
describe('Products endpoints', () => {
    beforeAll(async () => {
        const user = {
            email :"abc@ef.com",
            first_name:"abc",
            last_name:"def",
            password:"1234"
        } as User;
        await userModel.createOne(user);
        token = jwt.sign(user, process.env.TOKEN_SECRET as string);
        
});
afterAll(async () =>{
    const conn= await test.connect();
    const sql =`DELETE FROM users;\nALTER SEQUENCE users_id_seq RESTART WITH 1;\nDELETE FROM products;\nALTER SEQUENCE products_id_seq RESTART WITH 1`;
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
         email :"abc@ef.com",
          password: '1234'
        });
      expect(resp.status).toBe(200);
      const { id, email, token: Token } = resp.body.data;
      expect(id).toBe(1);
      expect(email).toBe('abc@ef.com');
      token = Token;
    });
  });
  describe('methods of api', () => {
    it('should return a new product', async () => {
      const product:Product ={
        product_name: 'product test',
        price: 20,
     } as Product;
     await productModel.Create(product)
      const resp = await request
        .post('/store/products/')
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send(product)
        
       expect(resp.status).toBe(200);
       
       const { product_name, price} = resp.body;
       expect(product_name).toBe('product test');
       expect(price).toBe(20);
       
})
it('should get one product', async () => {
    const resp = await request
      .get('/store/products/2')
      .set('Content-type', 'application/json')
      .set('Authorization', `Bearer ${token}`);
      expect(resp.status).toBe(200);
      expect(resp.body.id).toBe(2);
      expect(resp.body.product_name).toBe('product test')
      expect(resp.body.price).toBe(20)
  });

it('get list of all products', async () => {
    const resp = await request
      .get('/store/products/')
      .set('Content-type', 'application/json')
      .set('Authorization', `Bearer ${token}`);
      expect(resp.status).toBe(200);
      console.log(resp.body)
      expect(resp.body.length).toBe(2)
  });

})
}) 