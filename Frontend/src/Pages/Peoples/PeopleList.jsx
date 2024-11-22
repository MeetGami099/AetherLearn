import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import LoadingSpinner from '../../Components/Spinner/Spinner';
import PeopleCard from './PeopleCard'; // Correct the path to PeopleCard component
import s from './PeoplesList.module.css';

const PeopleList = () => {
  const { classroomID } = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  // Mock data
  const mockData = [
    {
      _id: 'sad51as3d1as35d1',
      firstName: 'asdfdaf',
      lastName: 'fsdfsdf',
      date: '',
    },
    {
      _id: 'sad51as3d1as35d2',
      firstName: 'John',
      lastName: 'Doe',
      date: '',
    },
    {
      _id: 'sad51as3d1as35d3',
      firstName: 'Jane',
      lastName: 'Smith',
      date: '',
    },
    {
      _id: 'sad51as3d1as35d4',
      firstName: 'Alice',
      lastName: 'Johnson',
      date: '',
    },
    {
      _id: 'sad51as3d1as35d5',
      firstName: 'Bob',
      lastName: 'Brown',
      date: '',
    },
    {
      _id: 'sad51as3d1as35d6',
      firstName: 'Charlie',
      lastName: 'Davis',
      date: '',
    },
  ];

  // Simulate fetching data
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setData(mockData); // Use mock data after loading
      setLoading(false);
    }, 1000); // Simulate delay of fetching data
  }, [classroomID]);

  // Delete handler for removing a person from the list
  const handleDelete = (userId) => {
    setData((prevData) => prevData.filter((item) => item._id !== userId)); // Filter out user by ID
  };

  return (
    <div className={s.container}>
      {loading ? (
        <div className={s.loadingContainer}>
          <LoadingSpinner />
          <p>Loading...</p>
        </div>
      ) : (
        <>
          {data.length === 0 ? (
            <p>No people found</p>
          ) : (
            <div className={s.listWrapper}>
              {data.map((item) => (
                <PeopleCard
                  key={item._id} // Use unique _id as the key
                  user={item} // Pass the entire user object
                  onDelete={handleDelete} // Pass handleDelete function as a prop
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default PeopleList;
