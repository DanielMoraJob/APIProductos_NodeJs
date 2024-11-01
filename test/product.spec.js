import request from 'supertest'
import app from '../src/app'

//Test básico para obtener productos 
describe('GET /products', () => {
    test('should return status 200', async () => {
        const res = await request(app).get('/products').send()
        expect(res.status).toBe(200)
    })
}) 

//Test basico para actualizar un producto
describe('PUT /products', () => {
   //Test basico para actualizar un producto exitosamente
   //Tener presente que debe existir el producto en la bd
    test('should update a product successfully', async () => {
      const updatedProduct = { id: 6, name: 'nuevo', description: 'nuevo', price: 150 , stock: 150 };
      const res = await request(app)
        .put('/products')
        .send(updatedProduct);
  
      expect(res.statusCode).toBe(200);
    });
  
    //Test básico para eliminar producto no exitoso
    test('should return 404 if product not found', async () => {
      const res = await request(app)
        .put('/products/999')
        .send({ name: 'Non-existent Product' });
  
      expect(res.statusCode).toBe(404);
    });
  });

 describe('DELETE /products/1', () => {
    //Test básico para eliminar producto de forma satisfactoria
    //Tener presente que debe existir el producto en la bd
    test('should return status 204 on successful delete', async () => {
      const res = await request(app).delete('/products/5').send();
      expect(res.statusCode).toBe(204);
    });

    //Test básico para eliminar producto no exitoso
    test('should return status 404 if product not found', async () => {
      const res = await request(app).delete('/products/999').send();
      expect(res.statusCode).toBe(400);
    });
}); 