const ShimmerProfile = () => {
  return (
    <div className="card lg:card-side bg-base-100 shadow-sm m-3 justify-center">
        <div className="min-w-56 h-80 skeleton flex flex-wrap"></div>
        <div className="card-body flex flex-col gap-3">
            <h2 className="card-title skeleton min-h-15"></h2>
            <div className="min-h-15 skeleton"></div>
            <div className="flex gap-5">
                <div className="flex-1/2 skeleton min-h-15"></div>
                <div className="flex-1/2 min-h-15 skeleton"></div>
            </div>
        </div>
    </div>
  )
}

export default ShimmerProfile