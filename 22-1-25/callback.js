function f1(callback){
    console.log("f1")
    callback();
}
function f2(){
    console.log("f2")
}
f1(f2)
f1(f2())