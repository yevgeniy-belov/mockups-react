export default function Layout() {
  return <div className='absolute inset-0'>
    <div className="text-3xl absolute left-10 top-10">top left</div>
    <div className="text-3xl absolute top-10 right-10">top right</div>
    <div className="text-3xl absolute right-10 bottom-10">bottom right</div>
    <div className="text-3xl absolute bottom-10 left-10">bottom left</div>
  </div>
}
