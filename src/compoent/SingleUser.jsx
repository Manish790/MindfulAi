import React from 'react'
import {personalityQuestions} from '../assesst/data';
import { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {server} from '../constrants/config';

const SingleUser = () => {

    const {id} = useParams();
    const [user, setUser] = useState({});
    
    useEffect(() => {   
        const fectch=async()=>{
            const response= await axios.get(`${server}/api/v1/other/singleUser/${id}`, {withCredentials: true});
           
            setUser(response.data.data);
          
        }
        fectch(); 

      }, []);

   
  return (
    <div  className=' '>
        <div className=' flex'>
        <img src={user?.avatar?.url} alt="profile" className="w-64 h-64 object-cover mb-4" />
        <div>
          <p className="text-sm font-semibold">Name: {user?.name}</p>
          <p className="text-sm">Username: {user?.username}</p>
          <p className="text-sm">Email: {user?.email}</p>
          <p className="text-sm">Bio: {user?.bio}</p>
          <p className="text-sm">Gender: {user?.gender}</p>
          <p className="text-sm">Education Qualification: {user?.educationQualification}</p>
        </div>
        </div>
        <div>
          {
           user?.personality && personalityQuestions.map((question, index) => (
              <div key={index}>
                <label htmlFor={question.id}>{question.question}</label>
                <input
                  type="range"
                  id={question.id}
                  min="1"
                  max="10"
                  value={user.personality[question.id]}
                />
              </div>
            ))
          }

            </div>

    </div>
  )
}

export default SingleUser
