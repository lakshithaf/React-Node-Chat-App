"use strict";

const cipherService = require ('../utils/cipherService');
const utils = require ('../utils/utilityService');
const { UserModel }  = require ('../models/modelMapper');


module.exports = {

    login: async (dataParams) => {
        try {
          const { email, password} = dataParams;
          const user = await UserModel.findOne({email: email});
          if (user) {
            const validUser = cipherService.comparePassword(password, user.password);
            if (!validUser) {
                return ({'validUser': validUser});
            } else {
                const jwt = await cipherService.createToken(user);
                return ({'data': user, 'validUser': validUser, 'token': jwt });
            }
          } else {
            throw new Error({'message': 'Password is wrong', 'body': {}});
            
          }
        } catch (error) {
            throw new Error({'message': error, 'body': {}});
        }
    
    
      },
    
    registerUser: async (dataParams)  => {
        try{
            const { name, email, password } = dataParams;
            const checkParameter = utils.checkParams({ name, email, password });

            if(checkParameter){
                const userData = await UserModel.create(dataParams);
                return userData

            }else{
                return {isValidUser: false, userId: null,  userName: ""};
            }
            

        } catch (error) {
             throw new Error(error);
        } 
    
    },

    checkUser: async (dataParams)  => {
        try{
            const { email, password} = dataParams;
            const cryptedPassword = cipherService.hashPassword(password);
            const user = Users.find({email: email, password: cryptedPassword});
            

        } catch (error) {
             throw new Error(error);
        } 
    
    }
};
