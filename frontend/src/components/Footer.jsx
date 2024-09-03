import { FaRegCalendarCheck } from "react-icons/fa";
import { GrSchedule } from "react-icons/gr";
import { BsBell } from "react-icons/bs";

const footer = () => {
    return (
        <>

        <footer className="bg-black text-gray-200 py-8 px-4">
      <div className="container mx-auto flex flex-wrap">
        <div className="w-full lg:w-1/4 ssm:w-1/2">
          <h4 className="font-semibold mb-4 text-5xl">Lets Grow together</h4>
          
        
        </div>
        <div className="w-full lg:w-1/4 ssm:w-1/2">
          <h4 className="text-lg font-semibold mb-2">Schedule<FaRegCalendarCheck size={20}/></h4>
        </div>
        <div className="w-full lg:w-1/4 ssm:w-1/2">
          <h4 className="text-lg font-semibold mb-2">Calendar<GrSchedule size={20}/></h4>
          
        </div>
        <div className="w-full lg:w-1/4 ssm:w-1/2">
          <h4 className="text-lg font-semibold mb-2">Reminders <BsBell size={20}/></h4>
          
        </div>
      </div>
      <p className="text-center mt-8">Code By Thandeka Portia P Mazibuko  TDList &copy; 2024</p>
    </footer>

        </>
    )

}

export default footer;