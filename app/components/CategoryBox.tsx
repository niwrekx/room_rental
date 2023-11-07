"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { IconType } from "react-icons";
import qs from "query-string";

interface CategoryBoxProps{
  icon:IconType;
  label: string;
  selected?:boolean;

}

const CategoryBox:React.FC<CategoryBoxProps> = ({
  icon:Icon,
  label,
  selected}) => {

    const router = useRouter();
    const params = useSearchParams ();

    // for callback
    const handleClick = useCallback(()=>{
      // define empty query
      let currentQuery = {};

      // check if we have params and parse them into object and not a string
      if (params) {
        currentQuery = qs.parse(params.toString());
      }

      // spread the current query and add new category : label
      const updatedQuery: any ={
        ...currentQuery,
        category:label 
      }

      // check if current category is selected remove it from updated query and deselect it when clicking again
        if(params?.get('category') === label){
          delete updatedQuery.category;
        }
        // generate new url string using queryString in stringifyUrl an pass a pathname /  and pass 
        const url = qs.stringifyUrl({
          url:'/',
          query: updatedQuery,
        },{ skipNull: true});//filter out empty options

        router.push (url);
    },[label, params, router]);
    
  return (
    <div
      onClick = {handleClick}
      className={`
        flex
        flex-col
        items-center
        justify-center
        gap-2
        p-3
        border-b-2
        hover:text-neutral-800
        transition
        cursor-pointer
        ${selected ? 'border-b-neutral-800' : 'border-transparent'}
        ${selected ? 'text-neutral-800' : 'text-neutral-500'}
      `}
    >
      <Icon size={26} />
      <div className="font-medium text-sm">
        {label}
      </div>
    </div>
  )
}

export default CategoryBox;