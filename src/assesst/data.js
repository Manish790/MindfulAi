import { FaUser, FaSearch } from "react-icons/fa";
import { ImUsers } from "react-icons/im";
import { PiUsersThreeFill } from "react-icons/pi";
import { GrLogout } from "react-icons/gr";
import { GiHeartInside } from "react-icons/gi";
import { FaHeartbeat } from "react-icons/fa";
export const navData=[
{
  title:'My Profile',
    icon:<FaUser />,
    path:'/dashboard'
},
,{
  title:"Confess Anonymously",
  icon:<FaHeartbeat />,
    path:'/dashboard/confess-anonymously'
}
,{
    title:"Connect with Users",
    icon:<PiUsersThreeFill />,
    path:'http://localhost:5173/'
},
{
   title:'All Users',
    icon:<ImUsers />,
    path:'/dashboard/allusers'
},

];

export const personalityQuestions = [
    {
      id: 'adventurous',
      question: 'how adventurous are you?'
    },
    {
      id: 'senseOfHumor',
      question: 'How would you rate your sense of humor?'
    },
    {
      id: 'communicationImportance',
      question: 'How important is communication in a relationship to you?'
    },
    {
      id: 'introvertedVsExtroverted',
      question: 'Are you introverted or extroverted?'
    },
    {
      id: 'spontaneity',
      question: 'How spontaneous are you when making plans?'
    },
    {
      id: 'foodAdventurousness',
      question: 'How much do you enjoy trying new foods and cuisines?'
    },
    {
      id: 'neatness',
      question: 'How neat and organized are you?'
    },
    {
      id: 'aloneTimeVsTimeWithOthers',
      question: 'How much do you value alone time versus time spent with others?'
    },
    {
      id: 'opennessToNewActivities',
      question: 'How open are you to trying new activities or hobbies?'
    },
    {
      id: 'honestyImportance',
      question: 'How important is honesty and transparency in a relationship to you?'
    }
  ];
  
  
  