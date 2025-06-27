"use client";

import {useForm} from "react-hook-form";

export default function AdminRegisterPage(){
  const {register, handleSubmit} = useForm();

  const onSubmit = async (data: any) => {  // veritabanına bağlantı
  const res = await fetch("/api/auth/register", {
    method: "POST",
    body: JSON.stringify(data),
  });
  const result = await res.json();
  console.log(result);
}; 

  return(
    <div className="min-h-screen flex items-center justify-center bg-blue-900">
      <form onSubmit={handleSubmit(onSubmit)} 
        className="bg-black p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Admin Kaydı</h2>
        <input type="email" placeholder="Email" {...register("email")}
          className="w-full mb-4 p-2 border border-black-300 rounded"
          required/>  

        <input  
          type="password"
          placeholder="Şifre"
          {...register("password")}
          className="w-full mb-6 p-2 border border-gray-300 rounded"    
          required
        />  
        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition">
          Kaydol
        </button>
      </form>

    </div>
  );

}