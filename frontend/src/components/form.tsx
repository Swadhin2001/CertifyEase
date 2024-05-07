"use client";
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
import { modifyPdf } from "@/utils/generatePdf";
import { useState } from "react";
import pdfFile from "@/assets/TDC.pdf";

const formSchema = z.object({
  name: z.string().min(2).max(50),
  CourseName: z.string().min(2).max(50),
  email: z.string().email({message: "Please enter a valid email"}),
  date: z.string()
});

const CertificateForm = () => {
    const [modifiedPdfSrc, setModifiedPdfSrc] = useState<string | null>(null);

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
    setModifiedPdfSrc(await modifyPdf (values.name, values.date, values.CourseName))
  }


  return (
    <>
        <div>
        {modifiedPdfSrc ? (
          <embed src={modifiedPdfSrc} type="application/pdf" width="100%" height="800px" />
        ) : (
          <iframe src={pdfFile} width="100%" height="800px" />
        )}
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
        </form>
      </Form>
    </>
  );
};

export default CertificateForm;
