import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import HomeLayout from '../../Layouts/HomeLayout';
import { deleteCourseLecture, getCourseLectures } from '../../Redux/Slices/LectureSlice';

const DisplayLectures = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { state } = useLocation();
    const { lectures } = useSelector((state) => state.lecture);
    const { role } = useSelector((state) => state.auth);

    const [currentVideo, setCurrentVideo] = useState(0);

    async function onLectureDelete(courseId, lectureNumber) {
        await dispatch(deleteCourseLecture({ courseId: courseId, lectureNumber }));
    }

    useEffect(() => {
        if (!state) navigate("/courses");
        dispatch(getCourseLectures(state._id));
    }, []);

    return (
        <HomeLayout>
            <div className="flex flex-col gap-10 items-center justify-center h-full py-10 text-wihte mx-[5%]">
                <div className="text-center text-2xl font-semibold text-yellow-500">
                    Course Name: {state?.title}
                </div>

                {(lectures && lectures.length > 0) ? (
                    <div className="flex justify-center gap-10 w-full">
                        <div className="space-y-5 w-[28rem] p-2 rounded-lg shadow-[0_0_10px_black]">
                            <video
                                src={lectures && lectures[currentVideo]?.lecture?.secure_url}
                                className="object-fill rounded-tl-lg rounded-tr-lg w-full"
                                controls
                                disablePictureInPicture
                                muted
                                controlsList="nodownload"
                            >
                            </video>
                            <div>
                                <h1>
                                    <span className="text-yellow-500"> Title: {" "}
                                    </span>
                                    {lectures && lectures[currentVideo]?.title}
                                </h1>
                                <p>
                                    <span className="text-yellow-500 line-clamp-4">
                                        Description: {" "}
                                    </span>
                                    {lectures && lectures[currentVideo]?.description}
                                </p>
                            </div>
                        </div>

                        {/* right section for displaying list of lectres */}
                        <ul className="w-[28rem] p-2 rounded-lg shadow-[0_0_10px_black] flex flex-col gap-[15px]">
                            <li className="font-semibold text-xl text-yellow-500 flex items-center justify-between">
                                <p>Lectures list</p>
                                {role === "ADMIN" && (
                                    <button onClick={() => navigate("/course/addlecture", { state: { ...state } })} className="bg-yellow-600 text-black px-4 py-1 rounded-md font-semibold text-sm">
                                        Add new lecture
                                    </button>
                                )}
                            </li>
                            {lectures &&
                                lectures.map((lecture, idx) => {
                                    return (
                                        <li key={lecture._id}>
                                            <div className='lecture-list flex gap-[10px] justify-start items-start cursor-pointer' onClick={() => setCurrentVideo(idx)}>
                                                <img className='lecture-thumbnail' src={lecture?.thumbnail?.secure_url} alt="" />
                                                <p>
                                                    <span>Lecture {idx + 1} : {" "}</span>
                                                    {lecture?.title}
                                                </p>
                                            </div>
                                            {role === "ADMIN" && (
                                                <div className='flex gap-[5px]'>
                                                    <button onClick={() => navigate("/course/editlecture", { state: { ...state, lectures, activeLectureNumber: idx+1 } })} className="bg-green-700 text-gray-300 px-4 py-1 rounded-md font-semibold text-sm">
                                                        Edit
                                                    </button>
                                                    <button onClick={() => onLectureDelete(state?._id, (idx + 1))} className="bg-red-700 text-gray-300 px-4 py-1 rounded-md font-semibold text-sm">
                                                        Delete
                                                    </button>
                                                </div>
                                            )}
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                ) : (
                    role === "ADMIN" && (
                        <button className="bg-yellow-600 text-black px-4 py-3 rounded-md font-semibold text-sm"
                            onClick={() => navigate("/course/addlecture", { state: { ...state } })}
                        >
                            Add New Lecture
                        </button>
                    )
                )}
            </div>
        </HomeLayout>
    );
}

export default DisplayLectures