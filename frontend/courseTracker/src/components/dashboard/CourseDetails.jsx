import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCourses, updateCourses, deleteCourses, fetchCourses } from "../../utils/apis";
import { Dot } from "lucide-react";
import { FaInstagram, FaTwitter, FaWhatsapp, FaYoutube } from "react-icons/fa";
import { IoMailUnreadSharp } from "react-icons/io5";
import { toast } from "sonner";

const CourseDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [course, setCourse] = useState(null);        
  const [allCourses, setAllCourses] = useState([]);  
  const [editMode, setEditMode] = useState(false);

  const categories = ["Tech", "Business", "Operations", "General"];
  const statuses = ["Not Started", "In Progress", "Completed"];

  useEffect(() => {
    const load = async () => {
      try {
        const [one, all] = await Promise.all([getCourses(id), fetchCourses()]);
        setCourse(one);

        const list = Array.isArray(all) ? all : (all?.Items || []);
        setAllCourses(list);
      } catch (e) {
        console.log(e);
      }
    };

    load();
  }, [id]);

  const toggleEditMode = () => setEditMode((p) => !p);

const handleUpdateCourses = async () => {
  try {
    await updateCourses(id, course);
    setEditMode(false);

    toast.success("Course updated successfully 🎉", {
      description: "Your changes have been saved.",
    });

  } catch (e) {
    console.log(e);

    toast.error("Update failed ❌", {
      description: "Something went wrong. Please try again.",
    });
  }
};

 const handleDeleteCourses = async () => {
  const t = toast.loading("Deleting course...");

  try {
    await deleteCourses(id);

    toast.dismiss(t);
    toast.success("Course successfully deleted ✅", {
      description: "Removed from your course list.",
    });

    setTimeout(() => navigate("/courses"), 600);

  } catch (e) {
    console.log(e);

    toast.dismiss(t);
    toast.error("Delete failed ❌", {
      description: "Something went wrong. Please try again.",
    });
  }
};

  if (!course) return <p>Loading...</p>;


const relatedCourses = allCourses
  .filter((c) => c?.courseId !== course?.courseId)
  .slice(0, 3);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 px-4 font-raleway">

      {/* LEFT */}
      <div className="col-span-12 lg:col-span-9 bg-white rounded-lg p-4 shadow-card">
        {editMode ? (
          <div className="flex flex-col gap-3">
            <input className="border p-2 rounded-md" type="text" value={course.title || ""} onChange={(e) => setCourse({ ...course, title: e.target.value })}/>

            <select className="border p-2 rounded-md"  value={course.category || ""} onChange={(e) => setCourse({ ...course, category: e.target.value })}>
               <option value="">Select Category</option>
                {categories.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
            </select>

             <select className="border p-2 rounded-md"  value={course.status || ""} onChange={(e) => setCourse({ ...course, status: e.target.value })}>
               <option value="">Select Status</option>
                {statuses.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
            </select>

            <input className="border p-2 rounded-md" type="number" value={course.progress ?? 0} onChange={(e) => setCourse({ ...course, progress: Number(e.target.value) })}/>

            <textarea className="border p-2 rounded-md" rows={5} value={course.description || ""} onChange={(e) => setCourse({ ...course, description: e.target.value })}/>
          </div>

        ) : (
          <>
            <h1 className="text-[26px] font-medium pb-1">{course.title}</h1>

            <div className="flex flex-row items-center font-medium pb-6 text-[15px] text-gray-600">
              <p>{course.category}</p>
              <Dot />
              <p>{course.status}</p>
              <Dot />
              <p>February 23, 2026</p>
            </div>

            <img
              className="w-full h-80 rounded-lg object-cover"
              src={course.imageUrl}
              alt={course.category}
            />

            <p className="pt-4 text-black text-[17px]">{course.description}</p>
          </>
        )}

    
        <div className="flex flex-row items-center justify-center pt-6 pb-4 gap-2">
          <button
            className="bg-linear-to-br from-[#0F5132] from-55% to-[#25a163] hover:brightness-110 hover:shadow-lg hover:shadow-[#25a163]/30 rounded-full text-white px-9 py-2"
            onClick={editMode ? handleUpdateCourses : toggleEditMode}  >
            {editMode ? "Save" : "Edit"}
          </button>

          <button
            className="bg-linear-to-br from-[#0F5132] from-55% to-[#25a163] rounded-full  hover:brightness-110 hover:shadow-lg hover:shadow-[#25a163]/30 text-white px-9 py-2"
            onClick={handleDeleteCourses} >
            Delete
          </button>
        </div>
      </div>

      {/* RIGHT */}
      <div className="col-span-12 lg:col-span-3 bg-white rounded-lg py-4 shadow-card">
        <div className="flex flex-col gap-3 px-4">
          <h2 className="font-semibold text-[17px]">Share to:</h2>
          <div className="flex flex-row gap-3">
            <div className="p-2 rounded-full ring-1 hover:ring-2 hover:ring-forestGreen ring-gray-300"><FaInstagram className="share-icon" /></div>
            <div className="p-2 rounded-full ring-1 hover:ring-2 hover:ring-forestGreen ring-gray-300"><FaTwitter className="share-icon" /></div>
            <div className="p-2 rounded-full ring-1 hover:ring-2 hover:ring-forestGreen ring-gray-300"><FaYoutube className="share-icon" /></div>
            <div className="p-2 rounded-full ring-1 hover:ring-2 hover:ring-forestGreen ring-gray-300"><FaWhatsapp className="share-icon" /></div>
            <div className="p-2 rounded-full ring-1 hover:ring-2 hover:ring-forestGreen ring-gray-300"><IoMailUnreadSharp className="share-icon" /></div>
          </div>
        </div>

        <div className="w-full h-px my-7 bg-gray-300" />

        <div className="px-4">
          <h2 className="font-semibold text-[17px]">Related Courses</h2>

          {relatedCourses.length === 0 ? (
            <p className="text-gray-500 text-sm mt-2">No related courses yet.</p>
          ) : (
            <div className="mt-2 flex flex-col gap-4">
              {relatedCourses.map((c) => (
                <div key={c.courseId} className="relatecCourse bg-[#f7f7f7] rounded-lg shadow-card flex flex-col gap-2">
                  <img className="w-full h-44 lg:h-20 rounded-md object-cover" src={c.imageUrl}/>
                  <div className="p-2">
                    <h3 className="text-[15px] font-medium">{c.title}</h3>
                       <p className="bg-softGreen pt-0.5 uppercase w-fit font-semibold text-[12px] px-3 rounded-[3px]">{c.category}</p>
                  </div>

                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;