const validator = require("../email-validator");
var passwordValidator = require('password-validator');
var schema = new passwordValidator();
export class User {
    ID_USER: Number;
   
    LOGIN: String;
    
   PASSWORD: String;
    
    ACTIF: Boolean;
   
    DATE_CREATION: Date;
   
   TYPE_COMPTE: String;
    

    isValidEmail() {
        return validator.validate(this.LOGIN);
      }
     isValidPassword(){
        schema
.is().min(6)                                    // Minimum length 8
.is().max(100)                                  // Maximum length 100
.has().uppercase()                              // Must have uppercase letters
.has().lowercase()                              // Must have lowercase letters
.has().digits()                                 // Must have digits                        // Should not have spaces
.is().not().oneOf(['Passw0rd', 'Password123']); // Blacklist these values 

return schema.validate(this.PASSWORD);
     }
}