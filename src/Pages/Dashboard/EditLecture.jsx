import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import HomeLayout from '../../Layouts/HomeLayout';
import { addCourseLecture, editCourseLecture } from '../../Redux/Slices/LectureSlice';
import NotFound from '../NotFound';

const EditLecture = () => {
    const courseDetails = useLocation().state;
    const {lectures, activeLectureNumber} = courseDetails;

    const dispatch = useDispatch();
    const navigate = useNavigate();

    if(lectures?.length <= 0){
        return <NotFound />
    }

    const [userInput, setUserInput] = useState({
        id: courseDetails?._id,
        lecture: undefined,
        videoSrc: "",
        title: lectures[activeLectureNumber - 1]?.title || "",
        description: lectures[activeLectureNumber - 1]?.description || "",
    });

    function handleInputChange(e) {
        const { name, value } = e.target;
        setUserInput({
            ...userInput,
            [name]: value
        })
    }

    function handleVideo(e) {
        const video = e.target.files[0];
        const source = window.URL.createObjectURL(video);
        setUserInput({
            ...userInput,
            lecture: video,
            videoSrc: source
        })
    }

    async function onFormSubmit(e) {
        e.preventDefault();
        if (!userInput.title) {
            toast.error("Title is required")
            return;
        }
        if(!userInput.description){
            toast.error("Description is required")
            return;
        }
        const response = await dispatch(editCourseLecture({...userInput, activeLectureNumber}));
        if (response?.payload?.success) {
            navigate(-1);
            setUserInput({
                id: courseDetails?._id,
                lecture: undefined,
                title: "",
                description: "",
                videoSrc: ""
            })
        }
    }

    useEffect(() => {
        if (!courseDetails) navigate("/courses");
    }, [])

    return (
        <HomeLayout>
            <div className="flex-1 text-white flex flex-col items-center justify-center gap-10 mx-16">
                <div className="flex flex-col gap-5 p-2 shadow-[0_0_10px_black] w-96 rounded-lg">
                    <header className="flex items-center justify-center relative">
                        <button
                            className="absolute left-2 text-xl text-green-500"
                            onClick={() => navigate(-1)}
                        >
                            <AiOutlineArrowLeft />
                        </button>
                        <h1 className="text-xl text-yellow-500 font-semibold">Update Lecture</h1>
                    </header>
                    <form onSubmit={onFormSubmit} className="flex flex-col gap-3">
                        <input
                            type="text"
                            name="title"
                            placeholder="enter the title of the lecture"
                            onChange={handleInputChange}
                            className="bg-transparent px-3 py-1 border"
                            value={userInput.title}
                        />
                        <textarea
                            type="text"
                            name="description"
                            placeholder="enter the description of the lecture"
                            onChange={handleInputChange}
                            className="bg-transparent px-3 py-1 border resize-none overflow-y-scroll h-36"
                            value={userInput.description}
                        />
                        {userInput.videoSrc ? (
                            <video
                                muted
                                src={userInput.videoSrc}
                                controls
                                controlsList="nodownload nofullscreen"
                                disablePictureInPicture
                                className="object-fill rounded-tl-lg rounded-tr-lg w-full"
                            >

                            </video>
                        ) : (
                            <div className="h-48 border flex items-center justify-center cursor-pointer">
                                <label className="font-semibold text-cl cursor-pointer" htmlFor="lecture">Choose your video</label>
                                <input type="file" className="hidden" id="lecture" name="lecture" onChange={handleVideo} accept="video/mp4 video/x-mp4 video/*" />
                            </div>
                        )}
                        <button type="submit" className="btn btn-primary py-1 font-semibold text-lg">
                            Update Lecture
                        </button>
                    </form>
                </div>
            </div>
        </HomeLayout>
    )
}

export default EditLecture