import React, { useState, useEffect, useCallback } from "react";
import { fetchCourses } from "@/utils/apis";
import { MdFavoriteBorder } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import PostCourses from "../src/components/dashboard/PostCourses";
import { useAuth } from "react-oidc-context";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const auth = useAuth();

  const navigate = useNavigate();

  const loadCourses = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      const data = await fetchCourses();
      setCourses(data);
    } catch {
      setError("Failed to load courses. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (auth.isAuthenticated) {
      loadCourses();
    }
  }, [auth.isAuthenticated, loadCourses]);

  const SkeletonCard = () => (
    <div className="preview rounded-lg w-full flex flex-col animate-pulse">
      <div className="relative">
        <div className="rounded-xl w-full h-44 bg-gray-200" />
        <div className="absolute top-4 right-4 bg-white rounded-full p-2">
          <div className="w-5 h-5 bg-gray-200 rounded-full" />
        </div>
      </div>
      <div className="flex flex-col py-4 gap-2">
        <div className="h-5 w-24 bg-gray-200 rounded" />
        <div className="h-16 w-full bg-gray-200 rounded" />
      </div>
    </div>
  );

  return (
    <section className="col-span-12 lg:col-span-9 font-raleway">
      <main className="px-4">
        <div className="pb-6 flex flex-col gap-4 lg:flex-row justify-between items-start lg:items-center">
          <div className="flex flex-col items-start gap-1">
            <h2 className="text-[26px] font-semibold">All Courses</h2>
            <p className="text-[16px] font-medium text-gray-500">
              Keep track of your learning journey — monitor progress, update
              status, and stay organized.
            </p>
          </div>
          <div className="flex flex-row gap-2">
            <PostCourses />
          </div>
        </div>

        {!loading && error && (
          <div className="py-6">
            <p className="text-red-600 text-sm">{error}</p>
            <button
              onClick={loadCourses}
              className="mt-3 px-4 py-2 rounded-md bg-emerald-600 text-white text-sm"
            >
              Retry
            </button>
          </div>
        )}

        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 3xl:grid-cols-6 gap-4 w-full">
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </div>
        )}

        {!loading && !error && courses.length === 0 && (
          <p className="text-gray-500 text-sm py-6">No courses yet.</p>
        )}

        {!loading && !error && courses.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 3xl:grid-cols-6 gap-4">
            {courses.map((course) => (
              <div
                key={course.courseId}
                onClick={() => navigate(`/courses/${course.courseId}`)}
                className="preview rounded-lg flex flex-col cursor-pointer"
              >
                <div className="relative z-0">
                  <img
                    className="rounded-xl w-full h-44 object-cover"
                    src={course.imageUrl}
                    alt={course.category}
                  />
                  <div className="absolute top-4 right-4 z-40 bg-[#ffffff] rounded-full p-2">
                    <MdFavoriteBorder />
                  </div>
                </div>
                <div className="flex flex-col py-4 gap-2">
                  <div className="flex flex-row gap-2">
                    <h2 className="bg-softGreen pt-0.5 uppercase w-fit font-semibold text-[12px] px-3 rounded-[3px]">
                      {course.category}
                    </h2>
                    <h2 className="bg-softGreen pt-0.5 uppercase w-fit font-semibold text-[12px] px-3 rounded-[3px]">
                      {course.status}
                    </h2>
                  </div>
                  <h1 className="text-[19px] font-semibold">{course.title}</h1>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </section>
  );
};

export default Courses;


