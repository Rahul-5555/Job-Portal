import React, { useEffect, useRef } from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import { Button } from './ui/button';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const categories = [
  "Frontend Developer",
  "Backend Developer",
  "Full Stack Developer",
  "Product Manager",
  "Data Science",
  "Web Developer",
  "Graphics Designer"
];

const CategoryCarousel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const carouselRef = useRef(null);

  const searchJobHandler = (query) => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (carouselRef.current) {
        carouselRef.current.scrollBy({ left: 300, behavior: 'smooth' });
      }
    }, 3000); // Adjust the interval time as needed

    return () => clearInterval(interval); // Clean up the interval on component unmount
  }, []);

  return (
    <div className='my-20'>
      <Carousel className="relative w-full max-w-4xl mx-auto">
        <CarouselContent 
          ref={carouselRef} 
          className="flex gap-4 overflow-x-auto py-4 snap-x snap-mandatory scrollbar-hidden">
          {categories.map((cat, index) => (
            <CarouselItem key={index} className="flex-shrink-0 w-48 snap-center">
              <Button 
                onClick={() => searchJobHandler(cat)} 
                variant="outline" 
                className="w-full py-3 text-center rounded-full text-sm md:text-base">
                {cat}
              </Button>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute top-1/2 left-0 transform -translate-y-1/2 p-2 bg-gray-200 rounded-full shadow-lg hover:bg-gray-300 transition-colors duration-300"/>
        <CarouselNext className="absolute top-1/2 right-0 transform -translate-y-1/2 p-2 bg-gray-200 rounded-full shadow-lg hover:bg-gray-300 transition-colors duration-300"/>
      </Carousel>
    </div>
  );
};

export default CategoryCarousel;
