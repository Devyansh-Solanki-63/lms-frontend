import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import HomeLayout from "../../Layouts/HomeLayout";
import useMediaQuery from "../../Helpers/useMediaQuery";
import { getUserData } from "../../Redux/Slices/AuthSlice";
import { cancelCourseBundle } from "../../Redux/Slices/RazorpaySlice";

const Profile = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userData = useSelector((state) => state?.auth?.data);

    const isMobile = useMediaQuery('phone');

    const handleCancelSubscription = async () => {
        await dispatch(cancelCourseBundle());
        await dispatch(getUserData());
        navigate("/");
    }

    return (
        <HomeLayout>
            <div className="min-h-[90vh] flex items-center justify-center">
                <div className="mx-3 my-10 flex flex-col gap-4 rounded-lg p-4 text-white w-96 shadow-[0_0_10px_black]">
                    {userData?.avatar?.secure_url && 
                        <img
                            src={userData?.avatar?.secure_url}
                            className="w-40 m-auto rounded-full border border-black"
                        />
                    }
                    <h3 className="text-xl font-semibold text-center capitalize">
                        {userData?.fullName}
                    </h3>
                    <div className="flex flex-col gap-3">
                        <div className="profile-info name flex gap-2">
                            <b>Name:</b>
                            <span>{userData?.name}</span>
                        </div>
                        <div className="profile-info email flex gap-2">
                            <b>Email:</b>
                            <span>{userData?.email}</span>
                        </div>
                        <div className="profile-info role flex gap-2">
                            <b>Role:</b>
                            <span>{userData?.role}</span>
                        </div>
                        <div className="profile-info subscription-status flex gap-2">
                            <b>Subscription:</b>
                            <span>{userData?.subscription?.status === "active" ? "Active" : "Inactive"}</span>
                        </div>
                    </div>
                    <div className={`flex items-center justify-between gap-2 ${isMobile ? "flex-col" : "flex-row"}`}>
                        <Link to="/user/changepassword"  className="w-full bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm font-semibold p-2 cursor-pointer text-center">
                            <button>Change password</button>
                        </Link>
                        <Link to="/user/editprofile" className="w-full bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm font-semibold p-2 cursor-pointer text-center">
                            <button>Edit profile</button>
                        </Link>
                    </div>
                    {userData?.subscription?.status === "active" && (
                        <button className="w-full bg-red-600  hover:bg-red-800 transition-all ease-in-out duration-300 rounded-sm font-semibold p-2 cursor-pointer text-center"
                            onClick={handleCancelSubscription}
                        >
                            Cancel Subscription
                        </button>
                    )}
                </div>
            </div>
        </HomeLayout>
    );

}

export default Profile;