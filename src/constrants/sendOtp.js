import {server} from "./config";
import {toast} from "react-hot-toast";
import axios from "axios";
import {setLoading} from "../reduxslice/auth";


export function sendOtp(email,navigate){
    return async(dispatch)=>{   
        const toastId=toast.loading("Sending OTP");
        dispatch(setLoading(true));
      
        try{
            const   response=await axios.post(`${server}/api/v1/user/send-otp`,{email:email},{withCredentials:true} );
            if(response.status===200){
                toast.success("OTP sent successfully");
                navigate('/verify-otp');
            }
            else{
                toast.error("failed to send otp");
            }
            dispatch(setLoading(false));
            toast.dismiss(toastId);

        }catch(error){
            console.log(error);
        }
        dispatch(setLoading(false));
        toast.dismiss(toastId);
    }
}