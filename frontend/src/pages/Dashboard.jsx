import Header from '../components/shared/Header';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import { HiOutlineUser, HiOutlineShieldCheck, HiOutlineMap, HiOutlineDocumentText } from "react-icons/hi"; // Add other icons as needed

const Dashboard = () => {
  const features = [
    { title: "Search Police", icon: <HiOutlineShieldCheck />, bgColor: "bg-blue-400" },
    { title: "SOS", icon: <HiOutlineMap />, bgColor: "bg-blue-400" },
    { title: "Add Guardian", icon: <HiOutlineUser />, bgColor: "bg-green-400" },
    { title: "View Guardian", icon: <HiOutlineUser />, bgColor: "bg-green-400" },
    { title: "Create Complaint", icon: <HiOutlineDocumentText />, bgColor: "bg-purple-500" },
    { title: "My Complaint", icon: <HiOutlineShieldCheck />, bgColor: "bg-purple-500" },
    { title: "My Profile", icon: <HiOutlineUser />, bgColor: "bg-teal-400", },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <Header/>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6 px-4">
        {features.map((feature, index) => (
          <Card key={index} className={`${feature.bgColor} rounded-lg shadow-md text-white p-4`}>
            <CardHeader className="flex items-center space-x-2">
              <div className="text-4xl">{feature.icon}</div>
              <CardTitle className="text-lg font-semibold">{feature.title}</CardTitle>
            </CardHeader>
            <CardContent className="mt-2 text-center">
              <button className="underline hover:no-underline">Go to {feature.title}</button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
