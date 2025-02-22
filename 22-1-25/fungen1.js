function *add(a,b){
    return a+b;
}
iter=add(1,2)
console.log(iter.next())
console.log(iter.next().value)