import Footer from '@/components/sharedComponents/Footer';
import Navbar from '@/components/sharedComponents/navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { setSingleCompany } from '@/redux/companySlice';
import { COMPANY_API_END_POINT } from '@/utils/constant';
import axios from 'axios';
import { Check, RefreshCcw, X } from 'lucide-react';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const CreateCompany = () => {

  const navigate = useNavigate();

  const [companyName , setCompanyName] = useState()
  const [loading, setloading] = useState(false);

  const dispatch = useDispatch()

  const registerCompany=async()=>{
    try {
      setloading(true);
      const res= await axios.post(`${COMPANY_API_END_POINT}/register`,{companyName},{
        headers:{
          "Content-Type":'application/json'
        },
        withCredentials:true
      });

      if(res.data.success){
        dispatch(setSingleCompany(res.data.company))
        toast.success(res.data.message)
        const companyId = res.data.company._id
        navigate(`/admin/companies/create/${companyId}`);
      }
      
    } catch (error) {
      console.log(error)
      toast(error.response.data.message)
    }
    finally{
      setloading(false)
    }
  }

  return (
    <div>

      <Navbar />

    
      <div className=" max-w-4xl mx-auto my-10 p-16 border  rounded-xl shadow-sm">
      
        <div className="mb-10 ">
          <h1 className="text-3xl font-bold text-gray-800">Your Company Name</h1>
          <p className="mt-2 ml-1 text-sm text-gray-600">
            What would you like to name your company? You can change this later.
          </p>
        </div>

   
        <div >
          
          <div>
            <Label className="block text-sm font-medium text-gray-700 mb-2">Company Name</Label>
            <Input
              type="text"
              placeholder="Enter your Company Name"
              className="focus:border-2 focus:border-gray-700 focus-visible:ring-offset-0 focus-visible:ring-0 tracking-wide"

              onChange={(e)=>setCompanyName(e.target.value)}
            />
          </div>

    
          <div className="flex items-center justify-between gap-4 mt-12">
            <Button onClick={()=>navigate("/admin/companies")}  className="px-6 py-3  border-gray-300">
              <X/>
              <span>Cancel</span>
            </Button>
            <Button  onClick={registerCompany}   className={`bg-[#f83002] text-white font-semibold py-3 px-6 rounded-lg hover:bg-[#d22d01] transition duration-300 ${loading ? 'opacity-50 cursor-not-allowed' : ''
                                }`}
                            disabled={loading}>
                                {loading ?
                                <>
                                    <RefreshCcw className=' animate-spin' />
                                    <span>Please wait</span>
                                </>
                                :
                                <>
                                
                                <Check/>
                                <span>Continue</span>
                                </>
                                }
            </Button>
          </div>
        </div>
      </div>

   
      {/* <Footer /> */}
    </div>
  );
};

export default CreateCompany;
