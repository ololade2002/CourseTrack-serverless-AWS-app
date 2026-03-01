import { FaBookmark } from "react-icons/fa";
import { IoFlash } from "react-icons/io5";
import { BiCategory } from "react-icons/bi";
import { FiCheckCircle } from "react-icons/fi";
import { FaNoteSticky } from "react-icons/fa6";
import { MdDashboard } from "react-icons/md";
import { TrendingDown, TrendingUp } from "lucide-react";

export const featuresData = [
    {
        id: 1,
        title:'One home for all your courses',
        description:'Save courses from anywhere and stop losing track of links.',
        icon: FaBookmark
    },
    {
        id: 2,
        title:'Track your progress',
        description:'Update your progress in seconds, so you can stay motivated and see how far you’ve come.',
        icon: IoFlash
    },
    {
        id: 3,
        title:'Clear status at a glance',
        description:'Not Started • In Progress • Completed—always know where you stand.',
        icon: FiCheckCircle
    },
    {
        id: 4,
        title:'Categories that match your goals',
        description:'Organize your courses by category so you can focus on what matters most.',
        icon: BiCategory
    },
    {
        id: 5,
        title:'Notes that keep you on track',
        description:'Keep track of important details and insights for each course.',
        icon: FaNoteSticky
    },
    {
        id: 6,
        title:'Dashboard that shows your learning at a glance',
        description:'See your progress, upcoming courses, and learning trends in one place.',
        icon: MdDashboard
    }
]


export const cardsData = [
    {
        id:1,
        text:'Total Courses',
        number:'24',
        subText:'Increased from last month',
        icon: TrendingUp,
    },
    {
        id:2,
        text:'Ended Courses',
        number:'13',
        subText:'Decreased from last month',
        icon: TrendingDown
    },
    {
        id:3,
        text:'Running Courses',
        number:'16',
        subText:'Decreased from last month',
        icon: TrendingDown
    },
    {
        id:4,
        text:'Pending Courses',
        number:'5',
        subText:'Increased from last month',
        icon: TrendingUp
    },

]