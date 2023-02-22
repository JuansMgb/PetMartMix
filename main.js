const { createApp } = Vue;

createApp({
  data() {
    return {
      password: "",
      username: "",
      successfullLogin:false,
      data:[],
      user:null, 
      option: "adoptar",
      pets:[],
    };
    
  },
  methods: {
    login(){
      const user = this.data.find(user => user.login.username === this.username && user.login.password === this.password)
      if(!user){
        Swal.fire({
          position: "center",
          icon: "error",
          title: "usuario o contraseña invalidos",
          text: "El usuario o contraseña son incorrectos",
          timer: 800
        })
        return
      } 
        Swal.fire({
        position: "center",
        icon: "Validación Exitoso",
        title: "Ingreso Exitoso",
        showConfirmButton: false,
        timer: 1200
      })

      this.user = user
      this.successfullLogin = true
      localStorage.setItem("successfullLogin", this.successfullLogin)
      localStorage.setItem("user", JSON.stringify(user))

    }, logout(){
      
      this.successfullLogin=false
      localStorage.setItem("successfullLogin",this.successfullLogin)
      this.password=""
      this.username=""
      this.user=null
      localStorage.removeItem("user")

    },  async getUsers(){
        // solicitud de usuarios 
        const data = await fetch('https://randomuser.me/api/?results=20')
        const { results } = await data.json()

        this.data = results
        console.log("username-Admin:" + this.data[0].login.username)
        console.log("password-Admin:" + this.data[0].login.password)
        console.log("username-user: " + this.data[3].login.username)
        console.log("password-user:" + this.data[3].login.password)

        // registro del user y admin
        for(let i=0; i<this.data.length;i++){
          if(i<2){
            this.data[i].userType='admin'
          }else{
            this.data[i].userType='user'
          } 
        }
        
        localStorage.setItem("users",JSON.stringify(this.data))
    },
  },
  mounted() {},
}).mount("#root");