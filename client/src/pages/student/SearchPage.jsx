import React, { useState } from 'react'
import Filter from "./Filter";
import SearchResult from "./SearchResult";
import { Skeleton } from "@/components/ui/skeleton";
import { Link, useSearchParams } from "react-router-dom";
import { AlertCircle, Search, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGetSearchCourseQuery } from '../../features/api/courseApi';

function SearchPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [sortByPrice, setSortByPrice] = useState("");

  const { data, isLoading } = useGetSearchCourseQuery({
    searchQuery: query,
    categories: selectedCategories,
    sortByPrice
  });

  const isEmpty = !isLoading && data?.courses.length === 0;

  const handleFilterChange = (categories, price) => {
    setSelectedCategories(categories);
    setSortByPrice(price);
  }
  return (
    <div className='max-w-7xl mx-auto p-4 md:p-8'>
      <div className='my-6'>
        <div className='flex items-center gap-3 mb-2'>
          <div className='h-10 w-10 rounded-xl bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] flex items-center justify-center shadow-lg'>
            <Search size={18} className='text-white' />
          </div>
          <h1 className='font-bold text-xl md:text-2xl'>Search Results</h1>
        </div>
        <p className='text-muted-foreground'>
          Showing results for{" "}
          <span className='text-[#6366f1] font-bold'>"{query}"</span>
          {data?.courses && !isLoading && (
            <span className='text-sm ml-2'>({data.courses.length} courses found)</span>
          )}
        </p>
      </div>
      <div className='flex flex-col md:flex-row gap-10'>
        <Filter handleFilterChange={handleFilterChange} />
        <div className='flex-1'>
          {
            isLoading ? (
              <div>
                <div className='flex items-center gap-2 mb-6 text-muted-foreground'>
                  <Loader2 className='h-4 w-4 animate-spin' />
                  <span className='text-sm font-medium'>Searching courses...</span>
                </div>
                {Array.from({ length: 3 }).map((_, idx) =>
                  <CourseSkeleton key={idx} />
                )}
              </div>
            ) : isEmpty ? (<CourseNotFound query={query} />) : (
              data?.courses?.map((course) =>
                <SearchResult key={course._id} course={course} />
              )
            )
          }
        </div>
      </div>
    </div>
  )
}

export default SearchPage

const CourseNotFound = ({ query }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[300px] rounded-2xl border-2 border-dashed border-border bg-card/50 p-8">
      <div className='h-16 w-16 rounded-2xl bg-destructive/10 flex items-center justify-center mb-4'>
        <AlertCircle className="text-destructive h-8 w-8" />
      </div>
      <h1 className="font-bold text-xl text-foreground mb-2">
        No courses found
      </h1>
      <p className="text-muted-foreground text-center max-w-md mb-6">
        We couldn't find any courses matching "<span className='font-semibold'>{query}</span>". Try a different search term.
      </p>
      <Link to="/">
        <Button className="bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white border-0 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 font-semibold px-6">
          Browse All Courses
        </Button>
      </Link>
    </div>
  );
};

const CourseSkeleton = () => {
  return (
    <div className="flex-1 flex flex-col md:flex-row justify-between border-b border-border/50 py-5 animate-pulse">
      <div className="h-36 w-full md:w-64 rounded-xl overflow-hidden">
        <Skeleton className="h-full w-full" />
      </div>
      <div className="flex flex-col gap-3 flex-1 px-4 py-2">
        <Skeleton className="h-5 w-3/4 rounded-lg" />
        <Skeleton className="h-4 w-1/2 rounded-lg" />
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-1/3 rounded-lg" />
        </div>
        <Skeleton className="h-6 w-20 mt-2 rounded-lg" />
      </div>
    </div>
  );
};