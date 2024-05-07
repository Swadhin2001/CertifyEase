"use client";
import axios from 'axios'
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast"
import { useState } from 'react';

const formSchema = z.object({
  name: z.string().min(2).max(50),
  CourseName: z.string().min(2).max(50),
  email: z.string().email({message: "Please enter a valid email"}),
  date: z.string()
});

const CertificateForm = () => {
  const [email, setEmail] = useState <String>("");
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      CourseName: "",
      date: "",
    },
  });
  
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await axios.post ('http://localhost:3000/userCertificate', {
        email: values.email,
        fileName: values.name,
        date: values.date,
        courseName: values.CourseName,
      })
      setEmail (values.email);
      console.log ("success");      
    } catch (error) {
        toast({
          variant: "destructive",
          title: "User already exist",
        })
        console.log (error);
    }
  }

  const { toast } = useToast()
  const  showCertificate = async()=>{
    try {
      const data = await axios.get (`http://localhost:3000/users/${email}`)
      const user = data.data;
      window.open(user.certificateLink, '_blank');
      toast({
        title: "Certificate Url",
        description: `${user.certificateLink}`,
      })
    } catch (error) {
      console.log (error);
    }
  }

  return (
    <>        
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-[30%] ">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Enter your Name</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="CourseName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Enter Course</FormLabel>
                <FormControl>
                  <Input placeholder="Tutedude python course" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Enter your email</FormLabel>
                <FormControl>
                  <Input placeholder="abc@gmail.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date</FormLabel>
                <FormControl>
                  <Input placeholder="DD-MM-YYYY" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
          <Button
          className='mx-3'
          onClick={showCertificate}>
          Show Certificate
          </Button>
        </form>
      </Form>
    </>
  );
};

export default CertificateForm;
