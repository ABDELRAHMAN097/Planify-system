import ImageHero from '../assets/image 1.png'
import { BsStars } from "react-icons/bs";

const Hero = () => {
    return (
        <>

            <div className="grid grid-cols-2 gap-2 mt-32">

                <div className="justify-self-center mt-4">
                    <a href=""
                        className="color-white-warm  text-color-primary py-2 px-6 text-center   rounded-3xl border-purple-600 text-sm	font-medium	w-35 hover:color-primary hover:text-white hover:shadow-lg "><span className='absolute pl-0  pt-1 mr-5'><BsStars size={16} /> </span><span className='ml-5'> v3.1 released. Learn More</span></a>
                    <h1 className="font-bold text-5xl not-italic mt-4">Your data with <br /> real-time  analytics</h1>
                    <p className="py-5 opacity-50 ">Harness the potential of Big Data Analytics & Cloud Services <br /> and become a data-driven organization with Needle tail</p>

                    <div>
                        <a href=""
                            className="mr-4 color-primary text-white py-2 px-6 text-center border border-solid rounded-3xl border-purple-600 text-sm	font-medium	w-35 hover:bg-white hover:text-purple-600 hover:shadow-lg ">Start free trial</a>
                        <a href=""
                            className="bg-white text-purple-600 py-2 px-6 text-center   rounded-3xl border-purple-600 text-sm	font-medium	w-35 hover:color-primary hover:text-white hover:shadow-lg ">Learn more</a>
                    </div>
                </div>


                <div className='ml-10 '>
                    <img src={ImageHero} alt="Image Hero" />
                </div>

            </div>


        </>
    )
}

export default Hero