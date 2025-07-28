import Sidebar from "@/components/Sidebar";

  
export default function AdminLayout({ children }) {
    return (
   <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 bg-gray-100 p-6">
        {children}
      </main>
    </div>
    )
}