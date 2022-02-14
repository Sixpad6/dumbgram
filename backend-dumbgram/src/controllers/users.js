const { users, followers, following, messages } = require ("../../models")

exports.getUser = async (req, res) =>{
    try {
        let user = await users.findAll({
            attributes :{
                exclude: ["password", "createdAt", "updatedAt"]
            }
        })
       const path = "http://localhost:5000/uploads/"
        user = JSON.parse(JSON.stringify(user))

        user = user.map((item) => {
            return {
                ...item,
                image : path  + item.image
            }

        })
        res.status(200).send({
            status:"success",
            data :{
                users : user
            }
        })
        
    } catch (error) {
        console.log(error);
        res.send({
        status: 'failed',
        message: 'Server Error',
    });
        
    }
}

exports.getUserId = async (req,res) =>{
    try {
        const { id } = req.params
        let user = await users.findOne({
            where :{
                id
            },
            exclude :{
                attributes : ["password", "createdAt", "updatedAt"]
            }
           })
           const PATH = "http://localhost:5000/uploads/"
           user = JSON.parse(JSON.stringify(user))
           const cetak = [user].map((item) => {
                return{
                    ...item,
                    image : PATH + item.image
                }           
           })

        res.status(200).send({
            status:"success",
            data : cetak
        })
        
    } catch (error) {
        console.log(error);
        res.send({
        status: 'failed',
        message: 'Server Error',
    });
        
    }
}

exports.updateUser = async (req, res) =>{
    const newData = req.body
    const { id } = req.params
    try {
        const user = await users.update({
            ...newData,
            image:req.file.filename
        },
        {
            where : {
                id
            },
            attributes :{
                exclude: ["password", "createdAt", "updatedAt"]
            }
        })
        res.status(200).send({
            status:"success",
            data :{
                id : user.id,
                fullname : user.fullname,
                email : user.email,
                username :user.username,
                image : user.image,
                newData
                }
        })
        
    } catch (error) {
        console.log(error);
        res.send({
        status: 'failed',
        message: 'Server Error',
    });
        
    }
}

exports.deleteUser = async (req, res) =>{
    const { id } = req.params
    try {
        const user = await users.destroy({
            where : {
                id
            }
        })
        res.status(200).send({
            status:"success",
            data :{
                id
            }
        })
        
    } catch (error) {
        console.log(error);
        res.send({
        status: 'failed',
        message: 'Server Error',
    });
        
    }
}

exports.getFollowers = async (req, res) =>{
    const { id } = req.params
    try {
        const follower = await followers.findAll({
            where : {
                idUser : id
            },
            attributes :{
                exclude :["idUser", "idUserFollower", "createdAt","updatedAt" ]
                  },
            include:{
                model : users,
                as : "follow",
                attributes :{
                    exclude :["email", "password", "bio", "createdAt", "updatedAt"]
                }
            }
        })


        res.status(200).send({
            status:"success",
            data :follower
        })
        
    } catch (error) {
        console.log(error);
        res.send({
        status: 'failed',
        message: 'Server Error',
    });
        
    }
}

exports.getFollowing = async (req, res) =>{
    const { id } = req.params
    try {
        const getfollowing = await followers.findAll({
            where : {
                idUserFollower : id
            },
            attributes :{
                exclude :["idUser", "idUserFollower", "createdAt","updatedAt" ]
                  },
            include:{
                model : users,
                as : "follow",
                attributes :{
                    exclude :["email", "password", "bio", "createdAt", "updatedAt"]
                }
            }
        })


        res.status(200).send({
            status:"success",
            data :getfollowing
        })
        
    } catch (error) {
        console.log(error);
        res.send({
        status: 'failed',
        message: 'Server Error',
    });
        
    }
}

exports.addMessage = async (req, res) =>{
    const { id } = req.params
    try {
        const datapesan = req.body
        console.log (datapesan)
        const newMessage = await messages.create({
            idUserSend : req.users.id,
            ...datapesan,
            idUserReceiver : id}, 
            {
            attributes :{
                exclude : ["createdAt", "updatedAt", "idUserSend","idUserReceiver"]
            },
            include : {
                model : users,
                as:"receiver",
                attributes:{
                    exclude : ["email", "password", "bio", "createdAt", "updatedAt"]
                     }
            }
        })
        res.status(200).send({
            status:"success",
            data :newMessage
        })
        
    } catch (error) {
        console.log(error);
        res.send({
        status: 'failed',
        message: 'Server Error',
    });
        
    }
}

exports.getMessage = async (req, res) =>{
    const { id } = req.params
    try {
        const newMessage = await messages.findAll({
            where :{
                idUserSend : req.users.id,
                idUserReceiver : id
            },
            attributes : {
                exclude : ["createdAt", "updatedAt", "idUserSend", "idUserReceiver"]
            },
            include : {
                model : users,
                as : "receiver",
                attributes :{
                    exclude : ["email", "password", "bio", "createdAt", "updatedAt"]
                }
            }
        })
        res.status(200).send({
            status:"success",
            data :newMessage
        })
        
    } catch (error) {
        console.log(error);
        res.send({
        status: 'failed',
        message: 'Server Error',
    });
        
    }
}