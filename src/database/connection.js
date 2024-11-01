import sql from "mssql";

const dbSttings = {
    user: "fast",
    password: "2024Daniel*.-",
    server: "localhost",
    database: "ApiProductos",
    options: {
        enableArithAbort: true,
        trustServerCertificate: true
    }
}

export async function getConnection() {
    try{
        return await sql.connect(dbSttings);
    }catch(error){
        console.log(error)
    }
}

export {sql}