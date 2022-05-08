import { orderStore , order } from "../orders.model";
import { productStore , Product} from "../products.model";
import { userStore , User } from "../users.model";
import test from "../../database";
const userModel = new userStore();
const productModel = new productStore();
const orderModel = new orderStore();

describe('order model', ()=>{
    describe('if methods exixt', ()=>{
        it('the getAll orders method exists',()=>{
            expect(orderModel.getALL).toBeDefined();
        })
        it('the createOrder method exists',()=>{
            expect(orderModel.Create).toBeDefined();
        })
        it('the getOne order method exists',()=>{
            expect(orderModel.getOrder).toBeDefined();
        })
        it('the addProduct method exists',()=>{
            expect(orderModel.addProduct).toBeDefined();
        })
    })
describe('logic' , ()=>{
  const user = {
    email:"ahmed@mail.com",
    first_name: "ahmed",
    last_name: "youssef",
    password:"1234"
  }as User
  const product = {
    id: '',
    product_name: "test",
    price: 10
  }as Product
  const order :order = {
    id: '',
    user_id: 1 as unknown as string,
    status: "completed",
    }as order
  beforeAll(async () => {
    await userModel.createOne(user)
    await productModel.Create(product)
    const conn = await test.connect();
    let sql = 'SELECT id FROM products ORDER BY id DESC LIMIT 1;';
    let result = await conn.query(sql);
    product.id = result.rows[0].id;
    await orderModel.Create(order)
    sql = 'SELECT id FROM orders ORDER BY id DESC LIMIT 1;';
    result= await conn.query(sql);
    order.id = result.rows[0].id;
    conn.release();
  })
  afterAll(async () => {
      const conn = await test.connect();
      const sql = ` DELETE FROM order_product;\n ALTER SEQUENCE order_product_id_seq RESTART WITH 1;\n DELETE FROM products;\n ALTER SEQUENCE products_id_seq RESTART WITH 1;\n DELETE FROM orders;\n ALTER SEQUENCE orders_id_seq RESTART WITH 1 ;\n DELETE FROM users;\n ALTER SEQUENCE users_id_seq RESTART WITH 1; `;
      conn.query(sql);
      conn.release();
  })
  it('the createOrder method should return an order',async()=>{
    const createdOrder = await orderModel.Create(order);
  
    expect(createdOrder.user_id).toEqual('1')
    expect(createdOrder.status).toEqual('completed')
  })
  it('the getOne method should return order with id 1',async ()=> {
      const order1 = await orderModel.getOrder(1 as unknown as string);
      expect(order1.id).toEqual(1 as unknown as string)
  })
  it('the getALL method should return all orders', async ()=>{
   const allOrders = await orderModel.getALL();
   expect(allOrders[0].id).toEqual(1 as unknown as string)  
  })
  it('the addProduct method add a product to an existing order',async()=>{
    const addedProduct = await orderModel.addProduct( 5, parseInt(order.id as unknown as string), parseInt(product.id as unknown as string))
     expect(addedProduct.id).toEqual(1 as unknown as string)
  
})
})
})