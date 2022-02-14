const { feed, users, comments,followers, followfeed } = require("../../models")

exports.addFeed = async (req, res) => {
    try {
        const data = req.body
        let newFeed = await feed.create({
            ...data,
            filename : req.file.filename,
            idUser: req.users.id,
        },{
            attributes :{
                exclude: ["createdAt", "updatedAt", "idUser"]
            },
            include : {
                model: users,
                as : "users"
            }
        })
        // const path = "http://localhost:5000/uploads"
        // newFeed = JSON.parse(JSON.stringify(newFeed))

        // newFeed = newFeed.map((item)=>{
        //     return{
        //         ...item,
        //         filename : path + item.filename
        //     }
        // })

        res.status(200).send({
            status:"success",
            feed : newFeed,
            user: {
                id : req.users.id,
                fullname: req.users.fullname,
                username : req.users.username,
                image : req.users.image
            }
        })
        
    } catch (error) {
        console.log(error);
        res.send({
        status: 'failed',
        message: 'Server Error',
    })
        
    }
}
exports.getFollowingFeed = async (req, res) =>{
    const { id } = req.params
    try {
        const getfollowing = await followers.findAll({
            where : {
                idUserFollower : id
            },
            attributes :{
                exclude :["idUser", "idUserFollower", "createdAt","updatedAt" ]
                  },
            include:[{
                model : users,
                as : "follow",
                attributes :{
                    exclude :["email", "password", "bio", "createdAt", "updatedAt"]
                }
            },
            {
                model : feed,
                as : "followfeed",
                through:{
                    model: followfeed,
                    as : 'bridge'
                },
                attributes :{
                    exclude :["createdAt", "updatedAt"]
                }
            }
        ]
        })


        res.status(200).send({
            status:"success",
            data :getfollowing
        })
        
    } catch (error) {
        console.log(error)
        
    }
}

exports.getFeeds = async (req, res) =>{

    try {
        let feeds = await feed.findAll({
            attributes :{
                exclude: ["createdAt", "updatedAt", "idUser"]
            },
            include:{
                model : users,
                as : "users",
                attributes:{
                    exclude : ["email", "password", "bio", "createdAt", "updatedAt"]
                }
            }
        })
        const path = "http://localhost:5000/uploads/"
        feeds = JSON.parse(JSON.stringify(feeds))

        feeds = feeds.map((item)=>{
            return{
                ...item,
                filename : path + item.filename
            }
        })

        res.status(200).send({
            status:"success",
            feed : feeds,
            user: users
        })
        
    } catch (error) {
        console.log(error);
        res.send({
        status: 'failed',
        message: 'Server Error',
    })
        
    }
}

exports.getComment = async (req, res) => {
    try {
        const { id } = req.params
        const comment = await comments.findAll({
            where : {
                idFeed:id
            },
            attributes : {
                exclude :["idFeed", "createdAt","updatedAt","idUser" ]
            },
            include :{
                model : users,
                as : "user",
                attributes :{
                    exclude :["email", "password", "bio", "createdAt", "updatedAt"]
                }
            }
        })
        res.status(200).send({
            status : "Success",
            data : comment
        })
        
    } catch (error) {
        console.log(error);
        res.send({
        status: 'failed',
        message: 'Server Error',
    });

    }
}

exports.addComment = async (req, res) => {
    try {
        const data = req.body
        let newComment = await comments.create({...data,idUser: req.users.id},{
            include :{
                model : users,
                as : "user",
                attributes :{
                    exclude :["email", "password", "bio", "createdAt", "updatedAt"]
                }
            }
        })

        res.status(200).send({
            status:"success",
            comments : newComment
        })
        
    } catch (error) {
        console.log(error);
        res.send({
        status: 'failed',
        message: 'Server Error',
    })
        
    }
}