const {users, messages} = require ('../../models')

const socketIo = (io) => {
    io.on('connection', (socket) => {
      console.log('Client ID: ', socket.id);

      socket.on('load user aktif', async () =>{
        try {
          const userMessage = await users.findAll({
          //   include : [
          //     {
          //       model : messages,
          //       as : "sender",
          //       attributes : {
          //         exclude : ["createdAT", "updatedAt", "idUserSend", "idUserReceiver"]
          //       }
          //     }, 
          //     {
          //       model : messages,
          //       as : "receiver",
          //       attributes : {
          //         exclude : ["createdAT", "updatedAt", "idUserSend", "idUserReceiver"]
          //       }
          //     }
          //   ]          
           })

          socket.emit("user aktif", userMessage)
        } catch (error) {
          console.log(error)  
        }
      })


      socket.on('disconnect', () =>{
        console.log("client Disconnect")
      })
    })
   }
   
   module.exports = socketIo