import { useEffect } from "react";

export default function RightSide() {
    useEffect(()=>{},[])
  return (
    <div className="mt-16 bg-gray-200 border-4 border-gray-400 rounded-xl" style={{width: '26em'}}>
        <div className=" rounded-lg ">
            <div className="carousel" style={{width: '25em', height: '20em'}}>
                <div id="slide1" className="carousel-item relative w-full">
                    <img src="https://img.daisyui.com/images/stock/photo-1625726411847-8cbb60cc71e6.jpg" className="w-full m-2 rounded-2xl" />
                    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                    <a href="#slide4" className="btn btn-circle">❮</a> 
                    <a href="#slide2" className="btn btn-circle">❯</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
