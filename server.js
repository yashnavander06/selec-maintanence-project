const app = require('./app')
const port = 3000;

console.log(app.get('env'))
console.log(process.env)
app.listen(port , ()=>{    
    console.log(`App is running on port ${port}`)
});


