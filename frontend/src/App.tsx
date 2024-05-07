import CertificateForm from "./components/form";
import { Toaster } from "@/components/ui/toaster"

function App() {
  
  return (
    <>  
      <div className="w-full h-full flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-10">Certificate Generator</h1>
        <CertificateForm/>
      </div>
      <Toaster />      
    </>
  );
}

export default App;
