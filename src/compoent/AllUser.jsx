import React, { useEffect } from 'react'
import { useState } from 'react'
import {server} from '../constrants/config'
import axios from 'axios';
import AllCard from './AllCard';


const AllUser = ({path="allUser"}) => {

    const [allUser, setAllUser] = useState([]);
    useEffect(() => {
        const fectch=async()=>{
            const allUser= await axios.get(`${server}/api/v1/other/${path}`, {withCredentials: true});
            console.log(allUser);
            setAllUser(allUser.data.data);
        }
        fectch(); 
      }, []);


  return (
    <div className=' flex gap-3'>
        {
            allUser.map((user, index) => {
            return <AllCard key={index} user={user}/>
            })
        }
    </div>
  )
}

export default AllUser
