let p=new Promise((resolve,reject)=>{
    let b=true;
    if(b){
        resolve("success")
    }
    else{
        reject("failure")
    }
})
p.then((result)=>{console.log(result)})
p.catch((error)=>{console.log(error)})