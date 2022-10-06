const express=require('express')
const router=express.Router()
const Animal=require('../models/animals')
const swaggerJsDocs=require('swagger-jsdoc')
const swaggerUI=require('swagger-ui-express')

/**
 * @swagger
 * definitions:
 *  Animal:
 *    type: object
 *    properties:
 *      name:
 *        type: string
 *        description: name of the animal
 *        example: 'Oreo'
 *      breed:
 *        type: string
 *        description: breed of animal
 *        example: 'Dog'
 *      feedingHabit:
 *        type: string
 *        description: type of feeding habit
 *        example: 'Herbivorous'
 * 
 */


/**
 * @swagger
 * /animal:
 *   post:
 *     summary: create animal
 *     description: enter new animal
 *     requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/definitions/Animal'    
 *     responses:
 *        201:
 *            description: created
 *        400:
 *            description: error
 */
 router.post('/animal',async(req,res)=>{
    const animal=new Animal(req.body)
    try{
        await animal.save()
        res.status(201).send(animal)
    }
    catch(e){
        res.status(400).send()
    }
})


/**
 * @swagger
 * /animal/{id}:
 *   patch:
 *     summary: update animal
 *     description: update animal
 *     consumes:
 *      - application/json
 *     produces:
 *      - application/json
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: id of animal
 *        example: "633e77c7025685a92b0cf4d2"
 *      - in: body
 *        name: body
 *        required: true
 *        description: body object
 *        schema:
 *          $ref: '#/definitions/Animal' 
 *     requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/definitions/Animal'    
 *     responses:
 *        201:
 *            description: created
 *            content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/definitions/Animal'   
 *        400:
 *            description: error
 */
router.patch('/animal/:id',async(req,res)=>{
    const animal=await Animal.findById(req.params.id)
    const updates=Object.keys(req.body)
    const allowedUpdates=['name','breed','feedingHabit']
    const isValidUpdates=updates.every((update)=>{
        return allowedUpdates.includes(update)
    })
    if(!isValidUpdates){
        return res.status(400).send({error:'invalid updates'})
    }

    try{
        updates.forEach((update)=>{
            animal[update]=req.body[update]
        })
        await animal.save()
        res.status(201).send(animal)
    }
    catch(e){
        res.status(500).send(e)
    }
})

/**
 * @swagger
 * /animals:
 *   get:
 *     summary: get all animals
 *     description: List of animals
 *     responses:
 *        "200":
 *           description: success
 *        "500":
 *           description: failure
 */
router.get('/animals',async(req,res)=>{
    try{
        const animals=await Animal.find({})
        //res.send(animals)
        res.status(200).send(animals)
    }
    catch{
        res.status(500).send('Server not responding')
    }
})


/**
 * @swagger
 * /animal/{id}:
 *   get:
 *     summary: get all animals
 *     description: List of animals
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *         type: string
 *        required: true
 *        description: id of animal
 *        example: "633e77c7025685a92b0cf4d2"
 *     responses:
 *        "200":
 *           description: success
 *        "500":
 *           description: failure
 */
router.get('/animal/:id',async(req,res)=>{
    try{
        const animal=await Animal.findById(req.params.id)
        res.status(200).send(animal)
    }
    catch(e){
        res.status(500).send(e)
    }
})

/**
 * @swagger
 * /animal/{id}:
 *   delete:
 *     summary: delete animal
 *     description: delete animal
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *         type: string
 *        required: true
 *        description: id of animal
 *        example: "633e77c7025685a92b0cf4d2"
 *     responses:
 *        "200":
 *           description: success
 *        "500":
 *           description: failure
 */
router.delete('/animal/:id',async(req,res)=>{
    try{
        const animal=await Animal.findByIdAndDelete(req.params.id)
        res.status(200).send('Deleted successfully')
    }
    catch(e){
        res.status(500).send(e)
    }
})


module.exports=router