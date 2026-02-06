import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div className='mt-40 text-center' >
      <h2 className='text-4xl font-bold text-red-400'>Not Found</h2>
      <p className='py-2 font-semibold'>Could not find requested resource</p>
      <Link href="/">Return <span className='underline text-green-400'>Home</span></Link>
    </div>
  )
}