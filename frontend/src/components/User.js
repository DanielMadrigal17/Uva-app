import { useState } from "react";
import Signup from "./Signup";
import Login from './Login'

const User = ({currUser, setCurrUser}) => {
    const [show, setShow] = useState(true)

    
        // return (
        //     <div>
        //         <PrincipalPage></PrincipalPage>
        //         <SideBar></SideBar>
        //         <Footer></Footer>
        //         <Logout setCurrUser={setCurrUser}/>
        //     </div>
        // )
    return (
        <div>
            { show?
                <Login setCurrUser={setCurrUser} setShow={setShow}/>  
                :
                <Signup setCurrUser={setCurrUser}  setShow={setShow} />
            }
        </div>
    )
}
export default User



