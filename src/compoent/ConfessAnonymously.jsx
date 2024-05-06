import React, { useEffect } from 'react'
import ConfessCard from './ConfessCard';
import { useState } from 'react';
import {server} from '../constrants/config'
import axios from 'axios';
import {toast} from 'react-hot-toast';
import AllUser from './AllUser';


const ConfessAnonymously = () => {
      const [allConfession, setAllConfession] = useState([]);
      const [ownConfession, setOwnConfession] = useState([]);
      const [confession, setConfession] = useState('');
      
      
      useEffect(() => {
      //promise.all

       const fectch=async()=>{
         const toastId = toast.loading('Loading...');

        try{
        const allConfession= axios.get(`${server}/api/v1/other/allConfession`, {withCredentials: true});
        const ownConfession= axios.get(`${server}/api/v1/other/ownConfession`, {withCredentials: true});

        const [allConfessionData, ownConfessionData]= await Promise.all([allConfession, ownConfession]);

        console.log(allConfessionData, ownConfessionData);
        setAllConfession(allConfessionData.data.data);
        setOwnConfession(ownConfessionData.data.data);
        toast.success('Data loaded', { id: toastId });
        }catch(err){
          toast.error('Error occured', { id: toastId });
          console.log(err);
        }finally{
          toast.dismiss(toastId);
        }
       }
        fectch(); 
      }, []);

  
 

  return (
    <div className=' flex-col gap-3 '>
        {/* all confession */}
      <div className=''>
        {
          <p>All confession </p>
        }
   {
        allConfession.map((confession, index) => {
        return <ConfessCard key={index} description={confession.description}/>
        })
    
   }
      </div>

      {/* own confession */}
      <div >
        {
      <p>Your confession</p>
        }
        {
        ownConfession.map((confession, _id) => {
        return <ConfessCard key={_id} description={confession.description}/>  

        })
      }

      </div>

   {/* all user */}
   <AllUser  path="similarPersonality"/>
    </div>
  )
}

export default ConfessAnonymously
