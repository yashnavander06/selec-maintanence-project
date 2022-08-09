//  TODO complete helper logic of admin

const getLength = (olddata,newdata) =>{
    try {
        let datalength = 0
        let list = []
        let obj1 
    
        // filtering old asset_list name into a new list
        if(olddata.length >= 2){
            for(let i=0; i<olddata.length; i++){
                list[i] = olddata[i].asset_name
            }
            obj1 = Object.values(list)
            
        }else{
            const data = olddata[0].asset_name
            list.push(data)
            obj1 = Object.values(list)
        }
        
        // comparing and assigning the largest list length to lenght variable
        if (newdata.length >= olddata.length){
            datalength = newdata.length
        }else{
            datalength = olddata.length
        } 
        return {
            length: datalength,
            obj: obj1
        }
    } catch (error) {
        return new Error(error)
    }
}

const checkReduncancy = (length, obj1, newdata) =>{
    try {
        // checking redendancy in the data
        let nonsimilardata = []
        for (let i=0; i<length;i++){
            if(obj1.includes(newdata[i]) == false){
                nonsimilardata.push(newdata[i])
            }
        }
        return nonsimilardata
    } catch (error) {
        return new Error(error)
    }
}

module.exports = {getLength, checkReduncancy}