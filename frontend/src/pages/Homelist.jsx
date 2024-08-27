
import React from 'react'

const Homelist = () => {
    let data = {
       title:"to do list",
    }
  return (
   <>
  <section className='flex flex-col items-center justify-center bg-green200'>

  <div className='flex flex-row'>
  <input
  type="text"
  placeholder="Search"
  className="w-full max-w-xs input input-bordered input-info m-4" />
<button className="btn btn-primary lg:btn-md ssm:btn-sm m-4">Add</button>


   </div>
   <div className='flex flex-col items-center  w-11/12 p-3  h-screen'>
    <h1 className='font-extrabold from-neutral-950 text-3xl m-4 p4'>To-Do Lists</h1>
    <div className='flex '>
      <input
  type="text"
  value={data.title}
  className="input input-bordered input-info w-full max-w-xs m-4" />
      <button className="btn btn-success btn-md btn-xs my-4">Edit</button>
      <button className="btn btn-error btn-md btn-xs my-4">Delete</button>
    </div>
    <div className='flex '>
      <input
  type="text"
  value={data.title}
  className="input input-bordered input-info w-full max-w-xs m-4" />
      <button className="btn btn-success btn-md btn-xs my-4">Edit</button>
      <button className="btn btn-error btn-md btn-xs my-4">Delete</button>
    </div>
   </div>
  </section>
   </>
  )
}

export default Homelist
