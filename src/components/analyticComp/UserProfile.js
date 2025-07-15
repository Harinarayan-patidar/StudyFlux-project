import React from "react";
import { useSelector } from "react-redux";
import { useEffect } from "react";

import {Card, CardHeader, CardBody, Image} from "@heroui/react";

function UserProfile() {
  const profile = useSelector((state) => state.profile.user);

  useEffect(() => {
    console.log("Fetched profile data:", profile);
  }, [profile]);
  


  if (!profile) return <p>No profile data found</p>;

  return (
    <div className="p-4 items-center justify-center mx-auto ">
       <Card className="py-6 h-96 w-auto overflow-auto">
             <CardHeader className="pb-0 pt-2 px-4 py-3 flex-col items-start">
               <h2 className=" uppercase text-sm py-2 "> <lable  className="font-bold"> Name:- </lable>{profile.data.firstName }  {profile.data.lastName}</h2>
               <h2 className=" uppercase font-medium text-sm py-2"> <lable  className="font-bold"> Email:- </lable>{profile.data.email }  </h2>

               <small className="text-default-500"> <lable>Hello!, </lable>{profile.data.accountType}</small>
               <h4 className="font-bold text-large">Frontend Radio</h4>
             </CardHeader>
             <CardBody className="overflow-visible py-2">
              <div>
              <img 
                alt="User Profile"
                className="rounded-xl relative z-10 border border-red-500"
                src={profile.data.image}
                width={170}
                height={170} 
              />
              
              </div>
             </CardBody>
           </Card>
    </div>
  );
}

export default UserProfile;
