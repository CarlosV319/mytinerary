const axios = require('axios')
const Swal = require('sweetalert2');

const authActions = {

    signUp: (User) =>{
        return async(dispatch, getState)=>{
            try {
               
                const user = await axios.post('http://localhost:4000/api/auth/signUp',{...User})
                if(user.data.success && !user.data.error){
                    localStorage.setItem("token", user.data.response.token);
                    dispatch({type:'USER', payload:user.data.response})
                    Swal.fire({
                        position: 'top-rigth',
                        icon: 'success',
                        title: 'You successfully registered!',
                        timer: 2000,
                      })
                }else{
                    const error =user.data.error
                    if(user.data.error){
                    
                    Swal.fire({
                        position: 'top-end',
                        icon: 'error',
                        title:error,
                        showConfirmButton: true,
                        timer: 1500
                      })
                    }else{
                    return { errores: user.data.errores };}
                }
            }catch(error){
                
            }
        }
    },
    signIn: (userLogin) => {
        return async(dispatch, getState)=>{
            try {
              
                const user = await axios.post('http://localhost:4000/api/auth/signIn',{...userLogin})
                if(user.data.success && !user.data.error){
                    localStorage.setItem("token", user.data.response.token);
                    dispatch({type:'USER', payload:user.data.response})
                }else{
                    const error = user.data.error
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: error,
            text: 'Something went wrong!',
            timer: 3000,
          })
                }
            }catch(error){}
        }
    },
    logInLS: (token) => {
        return async (dispatch, getState) => {
            try {
                let response = await axios.get("http://localhost:4000/api/tokenVerification", {
                headers: {
                    Authorization: "Bearer "+ token
                },
                 })
                dispatch({type: "USER", payload: {token, name: response.data.name, urlImage: response.data.urlImage, _id: response.data._id}})
         } catch (error) {
           
            } 
        }
    },
    logOut: () => {
        return async (dispatch, getState) => {
            Swal.fire({
                position: 'top-rigth',
                icon: 'success',
                title: 'You have successfully unlogged!',
                text: 'See you soon!',
                showConfirmButton: false,
                timer: 3000
            })
            dispatch({type: "LOG_OUT"})
            localStorage.removeItem("token", "userLogged")

        }
    },
}

module.exports = authActions