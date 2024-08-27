import { FaRegCalendarCheck } from "react-icons/fa";
import { GrSchedule } from "react-icons/gr";
import { BsBell } from "react-icons/bs";

const footer = () => {
    return (
        <>

        <footer className="bg-black text-gray-200 py-8 px-4">
      <div className="container mx-auto flex flex-wrap">
        <div className="w-full lg:w-1/4 ssm:w-1/2">
          <h4 className="font-semibold mb-4 text-6xl">Lets Grow together</h4>
          
        
        </div>
        <div className="w-full lg:w-1/4 ssm:w-1/2">
          <h4 className="text-lg font-semibold mb-4">Schedule<FaRegCalendarCheck size={20}/></h4>
          <p className="mb-4">Calendar<GrSchedule size={20}/></p>
          <p className="mb-4">Reminders <BsBell size={20}/></p>
          
        
        
        </div>
        <div className="w-full lg:w-1/4 ssm:w-1/2">
          <h4 className="text-lg font-semibold mb-4">App Events</h4>
          <p className="mb-4">About</p>
          <p>Contact Us</p>
          
          
        </div>
        <div className="w-full lg:w-1/4 ssm:w-1/2">
          <h4 className="text-lg font-semibold mb-4">Help</h4>
          <p className="mb-4">FAQ</p>
          <p>Support</p>
          
        </div>
      </div>
      <p className="text-center mt-8">Built By TDList &copy; 2024</p>
    </footer>

        </>
    )

}

export default footer;