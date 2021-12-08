
const LocalStrategy= require('passport-local').Strategy
const bcrypt= require('bcrypt')
function initialize(passport,getUserByEmail, getUserByID){
    const authenticateUser=async(userEmail, userPassword, done)=>{
        const user=getUserByEmail(userEmail)
        if(user==null){
           return done(null,false,{message:'No user with that email'})  
        }
        try{
            if(await bcrypt.compare(userPassword, user.userPassword)){
                return done(null,user)
            } else{
                return done(null, false,{message:'password incorrect'})
            }

        }
        catch(e){
            
            return done(e)

        }
       

    }
    passport.use(new LocalStrategy({usernameField:'userEmail',passwordField: 'userPassword'},
    authenticateUser))

    passport.serializeUser((user,done)=>done(null,user.id))
    passport.deserializeUser((id,done)=>{
        return done(null, getUserByID(id))
    })
}

module.exports=initialize
