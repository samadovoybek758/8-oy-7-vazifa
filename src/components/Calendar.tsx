// src/components/Calendar.tsx
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight, faX } from '@fortawesome/free-solid-svg-icons';
import React, { useEffect, useRef, useState } from "react";



const Calendar: React.FC = () => {
  const [year, setYear] = useState(new Date());

  const titleRef = useRef<HTMLInputElement>(null)
  const dateRef = useRef<HTMLInputElement>(null)
  const [titleData, setTitledata] = useState<Type[]>([])

  const months: string[] = [
    "Yanvar", "Fevral", "Mart", "Aprel", "May", "Iyun",
    "Iyul", "Avgust", "Sentabr", "Oktyabr", "Noyabr", "Dekabr"
  ];
  
  const Weeks: string[] = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const getDaysInMonth = (month: number, year: number): number[] => {
    const date = new Date(year, month, 0);
    const monthDay = date.getDate();
    let days: number[] = [];

    for (let day = 1; day <= monthDay; day++) {
      days.push(day);
    }

    return days;
  };

  const changeMonth = (delta: number) => {
    const newDate = new Date(year);
    newDate.setMonth(year.getMonth() + delta);
    setYear(newDate);
  };

  const daysInMonth = getDaysInMonth(year.getMonth() + 1, year.getFullYear());
  const firstDayOfMonth = new Date(year.getFullYear(), year.getMonth(), 1).getDay();

  
  const openModal = () => setIsModalOpen(true);

  interface Type  {
    title: string,
    day: string
  }

  function save() {

    const data:Type ={
        title: titleRef.current?.value || '',
        day: dateRef.current?.value || ''
    }

    let copy =[...titleData, data]
   
    setTitledata(copy)

    localStorage.setItem('data',JSON.stringify(copy))

  }

  useEffect(() => {
    let locdata = localStorage.getItem('data')
    if (locdata) {
        setTitledata(JSON.parse(locdata))
    }
  },[])


  const [isModalOpen, setIsModalOpen] = useState(false);

  

  const closeModal = () => setIsModalOpen(false);

  return (
    <>
        <div className="p-4 bg-white rounded-lg shadow-lg  mx-auto max-w-[900px]">
      <div className="flex justify-between items-center mb-4">
        <FontAwesomeIcon icon={faArrowLeft}  onClick={() => changeMonth(-1)} />
        <h2 className="text-xl font-semibold text-gray-400">
          {months[year.getMonth()]} {year.getFullYear()}
        </h2>
        <FontAwesomeIcon icon={faArrowRight}  onClick={() => changeMonth(1)} />
      </div>

      <div className="grid grid-cols-7 gap-2 text-center">
        {Weeks.map((week, index) => (
          <div key={index} className="font-semibold text-blue-500">{week}</div>
        ))}

        {Array(firstDayOfMonth).fill(null).map((_, index) => (
          <div key={index}></div>
        ))}

        {daysInMonth.map((day) => (
          <div key={day}  onClick={openModal} className="p-2 border border-gray-200 rounded-lg cursor-pointer">
            {day}
          </div>
          
        ))}
        
      </div>
      <button onClick={openModal} className='bg-black text-white rounded-md px-5 mt-3 py-1'>Add Event</button>
    </div>

    <div className='max-w-[600px] mt-4  text-white flex flex-col p-4 rounded-md mx-auto gap-2'>
        {
            titleData.length > 0 && titleData.map(function (value) {
                return(
                    <div className='border border-solid px-2 py-1 border-blue-400 rounded-md '>
                        <h1>{value.title}</h1>
                        <span>{value.day.slice(0,10)}</span>
                        <span className='ml-2'>{value.day.slice(11,20)}</span>
                    </div>
                )
            })
        }
    </div>


<div className="relative">
      {isModalOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50"
          onClick={closeModal}
        >
          <div
            className="bg-white p-6 rounded-lg shadow-lg w-[300px]"
            onClick={(e) => e.stopPropagation()} 
          >
            <div className='flex justify-between'>
            <h2 className="text-xs font-semibold">Add New Event</h2>
            <FontAwesomeIcon onClick={closeModal} width={5} height={5} icon={faX} />
            </div>
            <div className='flex gap-2 mt-2'>
                <label htmlFor="title">Title</label>
                <input ref={titleRef} className='rounded-lg px-3 border-2 border-blue-300 border-solid' type="text" name="" id="title" />
            </div> 
            <div className='flex gap-2 mt-2'>
                <label htmlFor="data">Data</label>
                <input ref={dateRef} className='rounded-lg px-3 border-2 border-blue-300 border-solid' type="datetime-local" name="" id="data" />
            </div>
           <button onClick={save} className='bg-blue-400 text-white rounded-md mt-2 w-20'>Save</button>
          </div>
        </div>
      )}
    </div>
    </>
  );
};

export default Calendar;
