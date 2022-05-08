import { productStore , Product} from "../products.model";
import test from "../../database";

const productModel = new productStore();

describe('product model',()=>{
describe('if methods exist' , ()=>{
    it('the getALL method exists',()=>{
       expect(productModel.getAll).toBeDefined() 
    })
    it('the getOne method exists',()=>{
        expect(productModel.getOne).toBeDefined() 
     })
     it('the Create method exists',()=>{
        expect(productModel.Create).toBeDefined() 
     })
})
})
describe('logic', ()=>{
    const product = {
        product_name:"product1",
        price: 10
    } as Product
afterAll(async()=>{
    const conn = await test.connect();
    const sql = `DELETE FROM products; \n ALTER SEQUENCE products_id_seq RESTART WITH 1;\n`
    await conn.query(sql);
    conn.release()
})
it('the create method should return a created product',async () => {
    const createdProduct = await productModel.Create(product)
    expect(createdProduct.id).toEqual(1 as unknown as string);
 
    expect(createdProduct.price).toEqual(10);
})
it('the get one should get the selected product',async()=>{
    const selectedProduct = await productModel.getOne(1 as unknown as string)
    expect(selectedProduct.id).toEqual(1 as unknown as string);
    expect(selectedProduct.price).toEqual(10)
})
it('the show method should get all products',async()=>{
    const allProducts = await productModel.getAll()
    expect(allProducts.length).toBe(1)
})
})
