module.exports = {
    lowercasedata:(body)=>{
        let stringdata = JSON.stringify(body).toLowerCase()
        return JSON.parse(stringdata)
    }
}