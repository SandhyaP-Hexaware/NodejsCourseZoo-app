const mongoose=require('mongoose')

const animalSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    breed:{
        type:String,
        required:true,
        trim:true
    },
    feedingHabit:{
        type:String,
        required:true,
        trim:true
    }
    // avatar:{
    //     type:Buffer
    // }
})

const Animal=mongoose.model('Animal',animalSchema)

module.exports=Animal