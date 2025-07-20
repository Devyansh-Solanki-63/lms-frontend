import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import HomeLayout from '../../Layouts/HomeLayout';
import CourseCard from '../../components/CourseCard';
import { getAllCourses } from '../../Redux/Slices/CourseSlice';

const CourseList = () => {

    const dispatch = useDispatch();
    const {courseData} = useSelector((state) => state.course)

    async function loadCourses() {
        await dispatch(getAllCourses())
    }

    useEffect(() => {
        loadCourses()
    }, [])

    return (
        <HomeLayout>
            <div className="h-full pt-20 sm:pt-12 mx-3 sm:mx-16 flex flex-col gap-10 text-white">
                <h1 className="text-center text-3xl font-semibold mb-5">
                    Explore the courses made by
                    <span className="font-bold text-yellow-500">
                        Industry experts
                    </span>
                </h1>
                <div className="mb-10 flex flex-wrap justify-center gap-14">
                    {courseData?.length > 0 ? (
                        courseData?.map((element) => {
                            return <CourseCard key={element._id} data={element} />
                        })
                    ) : (
                        "There are no any courses available."
                    )}
                </div>
            </div>
        </HomeLayout>
    )
}

export default CourseList