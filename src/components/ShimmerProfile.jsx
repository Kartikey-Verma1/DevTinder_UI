const ShimmerProfile = () => {
  return (
    <div className="min-w-full max-h-fit p-10">
        <div className="card lg:card-side bg-base-100 shadow-[0_0_12px_rgba(147,197,253,0.3)] mx-auto max-w-3xl flex flex-col justify-center">
            <div className="flex gap-2 items-center px-6 pt-6">
                <div className="min-w-13 aspect-square rounded-full skeleton flex flex-wrap"></div>
                <div className="min-w-20 h-6 skeleton"></div>
            </div>
            
            <div className="card-body flex flex-col gap-3">
                <div className="card-title skeleton min-h-15"></div>
                <div className="min-h-15 skeleton"></div>
                <div className="flex gap-5">
                    <div className="flex-1/2 skeleton min-h-15"></div>
                    <div className="flex-1/2 min-h-15 skeleton"></div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ShimmerProfile