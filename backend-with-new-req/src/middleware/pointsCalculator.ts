import dotenv from 'dotenv';
import { ExchangeRateModel } from '../models';

const calculateTotalPoints = async (users:any)=>{
    
    const exchange: any = await ExchangeRateModel.findAll({attributes: ['exchangeRate']});
    const calcTotal =
    users.map( (user:any)=>{
       // console.log(user) 
       let totalPoints = 0
    user.points.map(
        (number: any)  => {
            //console.log(number.numberOfPoints)
            if(number.pointsType === "Add Points"){
            totalPoints += number.numberOfPoints  
            }
            else if(number.pointsType === "Remove Points"){
                totalPoints -= number.numberOfPoints
                if(totalPoints < 0){
                    totalPoints === 0
                }
            }
        }
    ) 
    let value = totalPoints * exchange[0].exchangeRate; 
    return {totalPoints, value }
    })
    return calcTotal
}


const calculateTotalPointsOneUser = async (users:any)=>{
    const exchange: any = await ExchangeRateModel.findAll({attributes: ['exchangeRate']});
    let totalPoints = 0
    
    const calcTotal =
    users.points.map(
       // console.log(user) 
       
    
        (number: any)  => {
            //console.log(number.numberOfPoints)
            if(number.pointsType === "Add Points"){
                totalPoints += number.numberOfPoints  
                }
                else if(number.pointsType === "Remove Points"){
                    totalPoints -= number.numberOfPoints
                }
        }
    ) 
    if(totalPoints < 0){
        totalPoints = 0
    }
    let value = totalPoints * exchange[0].exchangeRate; 
    return {totalPoints, value }
   
    return calcTotal
}

export {
    calculateTotalPoints,
    calculateTotalPointsOneUser
}