const upload = require('../Middleware/imageUpload.middleware')
const { imageModel } = require('../Models/checklist.model')


const imageUpload = async(req, res) => {
    upload(req, res, (err) => {
        if (err) console.log(err)

        const newImage = new imageModel({
            name: req.body.name,
            image: {
                data: req.file.filename,
                contentType: ['image/png', 'image/jpg', 'image/jpeg']
            }
        })
        try {
            await newImage.save()

        } catch (err) {
            res.json({ message: error });
        }
    })
}

const workOrder =async (req,res)=>{
    try{
        //checking if the role is technician
        const username = req.valid.username  // data retrived from token
        const user = await findUser(username)
        console.log(user)                    
        const userid = user._id
        const roles = await Role.find({
            _id : user.role
        }) 
        console.log(roles[0]._id)
        const techniid = roles[0]._id.toString()  
        const ticketdis = await Ticket.find({
            
        })
       // console.log(ticketdis)
        let techid = []
       for(let i in ticketdis)
       {
        
        techid.push(ticketdis[i].accepted_by)
       }
       console.log(techid)   
        
        for(let i in techid)
        {
            console.log(techniid.includes(techid[i]))
            if(techniid.includes(techid[i]))
            {console.log(techid[i])
                return res.status(200).send(techid[i])
            }
            
        }
       
        // Ticket.asset_name = "62f0b8768193180579bf2ea9"  // ticket id se asset_name
        // const assetname = Ticket.asset_name
        
        // console.log(roles)
        // //skills of the technician
        // const ticket = await Ticket.find({asset_name : assetname})
        // if (ticket.length === null) return res.status(404).json({msg:"no tickets found"})
        // const ticket1 = await Ticket.find({userid : "techni1" , accepted : true })
        // console.log(ticket1)
        // //checking if the ticket assetname is there in the array of skills  
        // const skill = user.skills.toString()
        // console.log(skill.includes(ticket)) 
        // return res.status(200).json({ticket:ticket})  
//accepted by : technician      
    }
    catch(error){
return res.status(500).json({msg : error})
    }
}

//ticket display : 
//ticket accept : 1. technician id , 2. Is accepted true

const ticketDisplay = async (req,res)=>{
    try{
        const username = req.valid.username  // data retrived from token
        const user = await findUser(username)
        console.log(user)                    
        const userid = user._id
        const roles = await Role.find({
            _id : user.role
        })
        
        console.log(roles[0].name)
        const skill = user.skills.toString()
        console.log(skill)
        
        const ticketdis = await Ticket.find({
            
        })
        
        let assetid = []
       for(let i in ticketdis)
       {
        
        assetid.push(ticketdis[i].asset_name)
       }
       console.log(assetid)   
        
        for(let i in assetid)
        {
            console.log(skill.includes(assetid[i]))
            if(skill.includes(assetid[i]))
            {console.log(ticketdis[i])
                return res.status(200).send({
                    //userid : user._id,
                    subject : ticketdis[i].subject,
                    assetid : ticketdis[i].asset_name,
                    description : ticketdis[i].description,
                    status : ticketdis[i].status,
                    openat : ticketdis[i].open_at,
                    location : ticketdis[i].location,
                    id : ticketdis[i]._id
                })
           
            }
          
        }   
        
        //subject , description , status , open_at , asset_name , location , priority

    }
    catch(error){
        return res.status(500).json({msg : error})
    }
}

const ticketAccept = (req,res) =>{
    try{
        
        //1.accepted : true
        //2.accepted by : techi id
        //user
        //return ticket id fetch from ticketdisplay 

    }   
    catch{
        return res.status(500).json({msg : error})
    }   
}
module.exports = { workOrder,ticketAccept ,ticketDisplay,imageUpload}
