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
    <div className=" bg-sky-900 h-[88vh] mt-[5rem] rounded-md p-[2rem]">
      <div className=" flex gap-6 ">
        <img
          src={user?.avatar?.url}
          alt="profile"
          className="w-64 h-64 object-cover mb-4 rounded-md"
        />
        <div className="text-[1.5rem]">
          <p className="text-slate-300 font-semibold">Name: {user?.name}</p>
          <p className="text-slate-300">Username: {user?.username}</p>
          <p className="text-slate-300">Email: {user?.email}</p>
          <p className="text-slate-300">Bio: {user?.bio}</p>
          <p className="text-slate-300">Gender: {user?.gender}</p>
          <p className="text-slate-300">
            Education Qualification: {user?.educationQualification}
          </p>
        </div>
      </div>
      <div>
        {user?.personality &&
          personalityQuestions.map((question, index) => (
            <div
              key={index}
              className='"sm:bg-sky-900 rounded-md sm:text-white sm:p-[0.5rem] font-thin sm:text-[1.4rem]  flex gap-3'
            >
              <label htmlFor={question.id}>{question.question}</label>
              <input
                type="range"
                id={question.id}
                min="1"
                max="10"
                value={user.personality[question.id]}
              />
            </div>
          ))}
      </div>
    </div>
  );
}

export default SingleUser
