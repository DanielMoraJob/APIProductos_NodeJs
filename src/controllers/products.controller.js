import { getConnection, sql } from "../database/connection";
export const getProducts = async (req, res) => {

    try {
        const pool = await getConnection();
        const resultQuery = await pool.request().query("SELECT * FROM [dbo].[Products]");
        res.json(
            {
                status: 200,
                data: resultQuery.recordset,
                message: "Productos obtenidos correctamente"
            }
        )
    }catch (error) {
        console.error('Error al realizar la petición', error);
        res.status(500).json({
            status: 500,
            message: 'Internal server error'
        });
    } 
        
}

export const updateProduct = async (req, res) => {

    const { id, name, description, price, stock } = req.body

    try {
        const pool = await getConnection();

        const product = await pool.request()
            .input('id', sql.Int, id)
            .query('SELECT * FROM [dbo].[Products] WHERE id = @id');

        if (product.recordset.length === 0) {
            return res.status(400).json({
                status: 400,
                data: req.body,
                message: 'El producto no existe en el sistema.'
            });
        }

        await pool.request()
            .input('id', sql.Int, id)
            .input('name', sql.VarChar, name)
            .input('description', sql.VarChar, description)
            .input('price', sql.Decimal, price)
            .input('stock', sql.Int, stock)   

            .query('UPDATE [dbo].[Products] SET name = @name, description = @description, price = @price, stock = @stock WHERE id = @id');

        res.json({
            status: 200,
            message: 'Producto actualizado correctamente'
        }); 

    } catch (error) {
        console.error('Error actualizando el producto', error);
        res.status(500).json({
            status: 500,
            message: 'Internal server error. ' + error
        });
    } 
}

export const deleteProduct = async (req, res) => {

    const { id } = req.params

    try {
        const pool = await getConnection();

        const product = await pool.request()
            .input('id', sql.Int, id)
            .query('SELECT * FROM [dbo].[Products] WHERE id = @id');

        if (product.recordset.length === 0) {
            return res.status(400).json({
                status: 400,
                data: req.body,
                message: 'El producto no existe en el sistema.'
            });
        }

        await pool.request()
        .input('id', sql.Int, id)
        .query('DELETE FROM [dbo].[Products] WHERE id = @id');
  
        res.status(204).json({ 
            message: 'Producto eliminado correctamente'
        });

    } catch (error) {
        console.error('Error actualizando el producto', error);
        res.status(500).json({
            status: 500,
            message: 'Internal server error. ' + error
        });
    } 
}