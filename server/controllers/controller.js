// importing database which is a json file, using require
const db = require(`../db.json`);

// id counter for future additions
let new_id = 4;

// exporting modules to be used in index.js file
module.exports = {
    // module to respond with all houses
    getHouses : (req, res) => {
        const allHouses = db; // => variable getting copy of data in database
        res.status(200).send(allHouses); // => sending copy of all database elements
    },
    
    // module to remove house from database
    deleteHouse : (req, res) => {
        const {house_id} = req.params; // => variable getting request id
        const allHouses = db; // => variable getting copy of data in database

        // // manual way to iterate through list with objects
        // for(i=0; i<db.length; i++){
        //     if(db[i].id === +house_id){
        //         db.splice(i,1);
        //     }
        // }


        // using findIndex method with callback
        let index = allHouses.findIndex( ele => ele.id === +house_id);
        if(index != -1){ // => if value is found then remove it
            db.splice(index,1);
        }
        else console.log('ID not found')

        res.status(200).send(allHouses);
    },

    // module to create house in database
    createHouse : (req, res) => {
        
        let { address, price, imageURL } = req.body
        let newHouse = {
            id: new_id,
            address, 
            price,
            imageURL
        }
        db.push(newHouse)

        res.status(200).send(db)
        new_id++

    },


    // module to update house in database
    updateHouse : (req, res) => {
        const {house_id} = req.params; // => variable getting request id
        let {type} = req.body // => capturing plus or minus

        let index = db.findIndex( ele => +ele.id === +house_id); // => obtaining index

        if (db[index].price <= 10000 && type === 'minus') {
            db[index].price = 0
        }else if(type === "plus"){
            db[index].price = db[index].price+ 10000;
        }
        else if(type === "minus"){
            db[index].price = db[index].price - 10000;
        }
         else {
        res.sendStatus(400)
    }

        res.status(200).send(db)
    }
    //add logic here
}