import React, { use, useEffect } from 'react'

function Instructor() {

    const [loading, setLoading] = useState(true);
    const [instructorData, setInstructorData] = useState(null);
    const [courses, setCourses] = useState([]);
    const token = useSelector((state) => state.auth.token);
    const dispatch = useDispatch();
    const navigate = useNavigate();


   useEffect(() => {
   const getCourseDataWithStats = async () => {
      setLoading(true);
      const InstructorAPIData = await getInstructorData(token);
   }        

   },[])

  return (
    <div>
      
    </div>
  )
}

export default Instructor
