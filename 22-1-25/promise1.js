function fetchUserData(UserId){
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            const user={id:UserId,name:'John Doe',type:'premium'};
            resolve(user)
        },1000);
    });
}

function fetchUserSettings(UserType){
    return new Promise((resolve,reject)=>{
    console.log(`Fetching the user settings: ${UserType}`)
    const setting=UserType==='premium'
    ?{theme:'dark',Notification:true,accesslevel:'high'}
    :{theme:'light',Notification:false,accesslevel:'low'};
    resolve(setting)
    });
}

fetchUserData(1)
.then(user=>fetchUserSettings(user.type))
.then(details=>{console.log(details)})
.catch(error=>{console.log(error)});
