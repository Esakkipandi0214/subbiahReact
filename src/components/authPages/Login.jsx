// import React from 'react'

import { useState } from "react"

const Login = () => {
    const [name,setName] = useState("")
    const [Email,setEmail] = useState("")
    const [Pass,setPass] = useState("")
    const [header,setheader] = useState("Login")
    

    const handleLoginSubmit =async ()=>{
        
        if(!name && !Email && !Pass) {
            alert("Enter All Data to Sumbit Login !")
            return;
        }
        try{

            if(header === "Login"){
                const res =  await fetch("http://localhost:3000/api/userActions/login", {
                    method: 'POST',
                    body: JSON.stringify({
                        email: Email,
                        password: Pass,
                    }),
                    headers: {
                      'Content-type': 'application/json; charset=UTF-8',
                    },
                  })
                  console.log(res.json)
            }else{
                const res =  await fetch("http://localhost:3000/api/userActions", {
                    method: 'POST',
                    body: JSON.stringify({
                        name: name,
                        email: Email,
                        password: Pass,
                    }),
                    headers: {
                      'Content-type': 'application/json; charset=UTF-8',
                    },
                  })
                  console.log(res.json)
               
            }
          
        }catch(e){
            alert(e)
        }
    }
    console.log("Name:", name)
  return (
    <div className=" text-black bg-violet-300 h-[100vh] flex justify-center items-center">
        <div className="p-0.5 h-[50%] rounded-xl grid justify-center  w-[50%]  bg-white ">
            <h1 className=" flex justify-center items-center">{header}</h1>
            <div className=" grid justify-center items-center space-y-0">
             {header !== "Login" && <span className=" "><p>Name</p> <input type="text" value={name} onChange={(e)=>setName(e.target.value)} className=" rounded-lg p-0.5 bg-slate-400/70 text-white" /></span>}
             <span className=" "><p>Email</p> <input type="text" value={Email} onChange={(e)=>setEmail(e.target.value)} className=" rounded-lg p-0.5 bg-slate-400/70 text-white" /></span>
             <span className="  "><p>Password</p> <input value={Pass} onChange={(e)=>setPass(e.target.value)} type="text" className=" rounded-lg p-0.5 bg-slate-400/70 text-white" /></span>
             </div>
             <div className=" flex justify-center items-center">
                <button onClick={()=>handleLoginSubmit()} className=" text-white bg-red-500 p-2 rounded-lg w-[100px]">Submit</button>
             </div>
             
             <p onClick={()=>setheader(header === "Login" ? "Register": "Login")}  className=" text-blue-500 underline"> { header === "Login" ?"Signin":"signup"}</p>
             
        </div>
    </div>
  )
}

export default Login