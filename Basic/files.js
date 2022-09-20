const fs = require('fs');

//1. reading files

//fs.readFile(relative path as string , asynchronus callback function)

fs.readFile('./docs/ninja.txt', (err,data)=>{
    if(err){
        console.log(err);
    }
    else{
        console.log(data.toString());
    }

    console.log('lastline');
});

// 2. writing files

// fs.readFile(relative path as string ,content, asynchronus callback function)

fs.writeFile('./docs/ninja.txt','Hello kids , Daddys home' ,()=>{
    console.log('file was overwritten');
})

fs.writeFile('./docs/doesNotExist.txt','File created' ,()=>{
    console.log('file was created and written');
})

//3. making and deleting directory

//synchronus fn - existsSync

if(!fs.existsSync('./assets')){
    fs.mkdir('./assets', (err)=>{
        if(err)console.log(err);
        console.log('folder created');
    })
}else{
    fs.rmdir('./assets',(err)=>{
        if(err) console.log(err);
        console.log('folder deleted')
    })
}

//4. Deleting files
if(fs.existsSync('./docs/ninja.txt')){
    fs.unlink('./docs/ninja.txt',(err)=>{
        if(err) console.log(err);
        console.log('File deleted !');
    })
}

//005