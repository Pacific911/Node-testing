//reading files
// const fs = require('fs');

// fs.readFile('./Docs/blog1.txt', (err, data) =>{
//     if (err){
//         console.log(err);
//     }
//     console.log(data.toString());
// });

//writing files

const fs = require('fs');

fs.writeFile('./Docs/blog1.txt', 'Hello Software Engineers', ()=>{
    console.log('It is rewritten');
});
