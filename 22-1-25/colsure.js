function outer(name){
    var msg="welcome";
    function inner(){
        console.log(`${msg} to ${name}`)
    }
    return inner;
}
inner=outer("cvr");
inner();
console.log(inner)