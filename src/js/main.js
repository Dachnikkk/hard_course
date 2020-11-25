let arr = [];

arr[0] = '223';
arr[1] = '343';
arr[2] = '654';
arr[3] = '423';
arr[4] = '64564';
arr[5] = '4234';
arr[6] = '2343';

for(let i = 0; i < 7; i++) {
    if(arr[i][0] === '2' || arr[i][0] === '4'){
        console.log(arr[i]);
    }
}

for(let i = 1; i < 101; i++) {
    let item = 0;
    for(let j = 1; j < 101; j++){
        if(i % j == 0){
            item += 1;
        }
    }
    if(item <= 2) {
        console.log(`${i} Делитель этого числа: 1 и ${i}`);
        item = 0;
    } 
}
