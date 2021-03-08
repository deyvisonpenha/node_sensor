import {createConnection} from "typeorm";

createConnection().then( () => {
    console.log("Connection to Database...");
}).catch(error => console.log(error));
