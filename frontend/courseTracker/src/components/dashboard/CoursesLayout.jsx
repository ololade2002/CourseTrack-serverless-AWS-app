import React, { useState, useEffect } from "react";
import { fetchCourses } from "@/utils/apis";
import { MdFavoriteBorder } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const CoursesLayout = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const loadCourses = async () => {
    setLoading(true);
    setError("");

    try {
      const data = await fetchCourses();
      const list = Array.isArray(data) ? data : (data?.Items || []);
      setCourses(list);
    } catch (err) {
      console.log(err);
      setError("Network issue. Unable to load courses.");
      setCourses([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCourses();
  }, []);

  const SkeletonCard = () => (
    <div className="preview rounded-lg flex flex-col animate-pulse">
      <div className="relative">
        <div className="rounded-xl w-full h-44 bg-gray-200" />
        <div className="absolute top-4 right-4 bg-white rounded-full p-2">
          <div className="w-5 h-5 bg-gray-200 rounded-full" />
        </div>
      </div>

      <div className="flex flex-col py-4 gap-3">
        <div className="h-5 w-24 bg-gray-200 rounded" />
        <div className="h-6 w-full bg-gray-200 rounded" />
        <div className="h-6 w-3/4 bg-gray-200 rounded" />
      </div>
    </div>
  );

  return (
    <section className="col-span-12 lg:col-span-9 bg-white px-4 rounded-xl">
      <main className="pb-4">
        <div className="flex flex-row items-center-safe justify-between pt-4 pb-3">
          <h4 className=" font-raleway text-[18px] font-semibold">My Courses</h4>
          <p onClick={() => navigate(`/courses`)} className="text-[#ffffff] px-6 py-2 text-center hover:brightness-110 hover:shadow-lg hover:shadow-[#25a163]/30 bg-forestGreen rounded-full text-[16px] cursor-pointer">
            View All
          </p>
        </div>

        {!loading && error && (
          <div className="py-6">
            <p className="text-red-600 text-sm">{error}</p>
            <button onClick={loadCourses} className="mt-3 px-4 py-2 rounded-md bg-emerald-600 text-white text-sm" > Retry  </button>
          </div>
        )}

      
        {loading && (
          <div className="grid grid-cols-1 mdd:grid-cols-3 gap-4">
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </div>
        )}

        {!loading && !error && courses.length === 0 && (
          <p className="text-gray-500 text-sm py-6">No courses yet.</p>
        )}


        {!loading && !error && courses.length > 0 && (
          <div className="grid grid-cols-1 mdd:grid-cols-3 gap-4">
            {courses.slice(0,3).map((course) => (
              <div key={course.courseId} onClick={() => navigate(`/courses/${course.courseId}`)} className="preview  rounded-lg flex flex-col cursor-pointer">
                <div className="relative z-0">
                  <img className="rounded-xl w-full h-44 object-cover" src={course.imageUrl} alt={course.category}/>
                  <div className="absolute top-4 right-4 z-40 bg-[#ffffff] rounded-full p-2">
                    <MdFavoriteBorder />
                  </div>
                </div>

                <div className="flex flex-col py-4 gap-2">
                  <div className="flex flex-row  gap-2 ">
                    <h2 className="bg-softGreen pt-0.5 uppercase w-fit font-semibold text-[12px] px-3 rounded-[3px]">{course.category}</h2>
                    <h2 className="bg-softGreen pt-0.5 uppercase w-fit font-semibold text-[12px] px-3 rounded-[3px]">{course.status}</h2>
                  </div>
                  <h1 className="text-[19px] hover:text-forestGreen font-semibold">{course.title}</h1>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </section>
  );
};

export default CoursesLayout;