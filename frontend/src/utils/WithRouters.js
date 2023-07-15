import { useParams } from "react-router-dom";

export function withRouter(Child){
    return(props) => {
      
        return <Child { ...props } params= { params }  />
       
    }
}
