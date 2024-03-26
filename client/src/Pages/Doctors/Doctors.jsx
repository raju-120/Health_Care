import { useEffect, useState } from "react"
import DoctorsCard from "./DoctorsCard";
import {useQuery} from 'react-query';

export default function Doctors() {

  /* const [allData, setAllData] = useState(); */

  const {data: allData = []} = useQuery({
    queryKey: ['allData'],
    queryFn: async () => {
      const res = await fetch('/api/doctor/doctorlists');
      const data = await res.json();
      return data;
    }
  })

  console.log(allData);

  /* useEffect(() =>{
    fetch('/api/doctor/doctorlists')
    .then(res => res.json())
    .then(data => setAllData(data))
  },[]) */

  return (
    <div className='grid lg:grid-cols-2 sm:grid-cols-1 gap-6 lg:ml-24 lg:mr-24'>
        {allData?.map((data) => 
        <DoctorsCard
          key={data._id}
          data= {data}
        ></DoctorsCard>)}
    </div>
  )
}
