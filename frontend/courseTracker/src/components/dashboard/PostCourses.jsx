import React from "react";
import { Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { createCourses } from "@/utils/apis";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const PostCourses = () => {
  

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");
  const [progress, setProgress] = useState(""); 
  const [description, setDescription] = useState("");

  const categories = ["Tech", "Business", "Operations", "General"];
  const statuses = ["Not Started", "In Progress", "Completed"];

  const handleAddCourse = async () => {

  if (!title || !category || !status || progress === "" || !description) {
    toast.error("Please fill in all fields.");
    return;
  }

  const newCourse = {
    title,
    category,
    status,
    progress: Number(progress),
    description
  };

  try {
    await createCourses(newCourse);

    setTitle("");
    setCategory("");
    setStatus("");
    setProgress("");
    setDescription("");

    toast.success("Course Added ✅", {
      description: `${title} added successfully.`,
    });

  } catch (err) {
    console.log(err);
    toast.error("Failed to add course ❌");
  }
};


  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button className="flex flex-row text-[14px] py-3 px-6 font-medium items-center justify-center gap-2 hover:brightness-110 hover:shadow-lg hover:shadow-[#25a163]/30 bg-linear-to-br from-[#0F5132] from-55% to-[#25a163] rounded-full text-white">
          <Plus className="hidden xs:flex" />
          <span className="font-medium">Add Course</span>
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Add New Course</AlertDialogTitle>
           <AlertDialogDescription>
        This action cannot be undone. This will permanently delete your account
        from our servers.
      </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="courseForm font-raleway flex flex-col gap-3">
          <input className="form-input" type="text" placeholder="Enter Course Title" value={title} onChange={(e) => setTitle(e.target.value)}/>
          <select className="form-input" value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">Select Category</option>
            {categories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          <select className="form-input " value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="">Select Status</option>
            {statuses.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>

          <input className="form-input" type="number" placeholder="Progress" value={progress} onChange={(e) => setProgress(e.target.value)}/>

          <textarea className="form-input" type="text" rows={5} placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)}/>
        </div>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleAddCourse}> Add </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default PostCourses;