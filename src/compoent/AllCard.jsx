import { Link } from 'react-router-dom';

const AllCard = ({ user }) => {
  return (
    <div className="flex-col w-72  border border-white rounded overflow-hidden">
      <div className="flex flex-col justify-between flex-1 p-4">
        <img src={user.avatar.url} alt="profile" className="w-full h-[300px] rounded-full object-cover mb-4" />
        <div>
          <p className="text-sm font-semibold">Name: {user.name}</p>
          <p className="text-sm">Username: {user.username}</p>
          <p className="text-sm">Email: {user.email}</p>
          <p className="text-sm">Bio: {user.bio}</p>
          <p className="text-sm">Gender: {user.gender}</p>
          <p className="text-sm">Education Qualification: {user.educationQualification}</p>
        </div>
      </div>
      <div className="flex items-end justify-between p-4 ">
        <Link to={`/dashboard/confess/${user._id}`} className="text-blue-500 hover:text-blue-700 bg-green-200 p-[5px] rounded-lg">
          Confess
        </Link>
        <Link to={`/dashboard/details/${user._id}`} className="text-blue-500 hover:text-blue-700 bg-red-300 p-[5px] rounded-lg">
          Details
        </Link>
      </div>
    </div>
  );
}

export default AllCard;
