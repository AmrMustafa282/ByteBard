import { Button, TextInput } from 'flowbite-react'
import { useEffect } from 'react'
import {useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom'

const DashProfile = () => {

  const { currentUser } = useSelector(state => state.user)
  console.log(currentUser)
  
  return (
   <div className='mx-auto max-w-lg p-3 w-full'>
    <h1 className='my-7 text-center font-semibold text-3xl'>Profile</h1>
      <form className='flex flex-col gap-4'>
        <div className='w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full'>
        <img src={currentUser.profilePicture} alt="user" className='rounded-full h-full w-full object-cover border-4 border-[lightgray]' />
        </div>
        <TextInput type='text' id='name' placeholder='Name' defaultValue={currentUser.name}/>
        <TextInput type='text' id='email' placeholder='Email' defaultValue={currentUser.email}/>
        <TextInput type='password' id='password' placeholder='********' />
        <Button type='submit'  gradientDuoTone='purpleToBlue' outline> Update</Button>
      </form>
      <div className='text-red-500 flex justify-between mt-5 '>
        <span>Delete Account</span>
        <span>Sign Out</span>
      </div>
   </div>
  );
}

export default DashProfile