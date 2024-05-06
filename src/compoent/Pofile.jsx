import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { personalityQuestions } from '../assesst/data';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { server } from '../constrants/config';
import { MdOutlineMale } from "react-icons/md";
import { IoFemaleOutline } from "react-icons/io5";

const Profile = () => {
  const user = useSelector(state => state.auth.user);
  const [personality, setPersonality] = useState({}); // State to store personality values
    const personalityId=user.personality?._id;

    useEffect(()=>{
        const fetchPersonality=async()=>{
            const toastId = toast.loading("Fetching Personality...");
            try {
                const response = await axios.get(`${server}/api/v1/other/personality/${personalityId}`, {
                    withCredentials: true
                });
                console.log(response);
                toast.success("Personality Fetched Successfully", { id: toastId });
                setPersonality(response.data.data);
            } catch (error) {
                console.log(error);
                toast.error("Failed to Fetch Personality", { id: toastId });
            } finally {
                toast.dismiss(toastId);
            }
        }
        fetchPersonality();
    },[personalityId]);
   

  const onSubmit = async (e) => {
    e.preventDefault();
    const toastId = toast.loading("Updating Personality...");
    try {
      const response = await axios.post(`${server}/api/v1/other/updatePersonality`,
        personality,{
        withCredentials: true
      });
    console.log(response);
    toast.success("Personality Updated Successfully", { id: toastId });
    setPersonality(response.data.data);
    } catch (error) {
      console.log(error);
      toast.error("Failed to Update Personality", { id: toastId });
    } finally {
      toast.dismiss(toastId);
    }
  }


  const handleRangeChange = (e, id) => {
    const updatedPersonality = { ...personality, [id]: parseInt(e.target.value) };
    setPersonality(updatedPersonality);
  }

  return (
    <div className="h-full flex flex-col justify-center gap-4 mt-[5rem]">
      <div className=" bg-sky-900 flex p-[2rem] h-[35vh] rounded-md relative items-center gap-[2rem]">
        <img
          src={user?.avatar?.url}
          alt="profile"
          className="sm:w-90 sm:h-[32vh] sm:rounded-md "
        />
        <div className="flex flex-col gap-[2rem]">
          <h1 className="sm:text-[1.6rem] text-white">
            Name: {user?.name.toUpperCase()}
          </h1>
          <h1 className="sm:text-[1.6rem] text-white sm:flex sm:items-center">
            Gender:{" "}
            {user?.gender === "Male" ? (
              <>
                <MdOutlineMale /> Male
              </>
            ) : (
              <>
                <IoFemaleOutline /> Female
              </>
            )}
          </h1>

          <h1 className="sm:text-[1.6rem] text-white">Bio: {user?.bio}</h1>
          <h1 className="sm:text-[1.6rem] text-white">E-mail: {user?.email}</h1>
          <h1 className="sm:text-[1.6rem] text-white">
            Education: {user?.educationQualification}
          </h1>
        </div>

        {/* image */}
      </div>

      <div className="sm:bg-sky-900 rounded-md sm:text-white sm:p-[2rem] font-thin sm:text-[1.3rem] ">
        <form onSubmit={onSubmit} className="flex flex-col gap-2">
          {personalityQuestions.map((question, index) => (
            <div key={index}>
              <label htmlFor={question.id}>{question.question} </label>
              <input
                type="range"
                id={question.id}
                min="1"
                max="10"
                value={personality[question.id]}
                onChange={(e) => handleRangeChange(e, question.id)}
                className='ml-[2rem] text-white  outline-transparent'
              />
            </div>
          ))}
          <button
            type="submit"
            className="sm:bg-pink-700 sm:px-[10px] rounded-full w-[100px]"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Profile;
