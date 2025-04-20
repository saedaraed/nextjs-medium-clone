import { Suspense } from "react";
import ConfirmStoryClient from "./ConfirmStory";


const ConfirmStory: React.FC = () => {
 
  

  return (
    <Suspense fallback={<div>Loading...</div>}>

   <ConfirmStoryClient/>
   </Suspense>

  );
};

export default ConfirmStory;
