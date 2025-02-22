function double(n){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve(n*2)
        },1000);
    });
}
async function add(){
    let a=await double(10);
    let b=await double(20);
    let c=await double(30);
    console.log(a+b+c)
}
add()