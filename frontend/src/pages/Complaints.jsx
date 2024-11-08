import { useEffect, useState } from "react";
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogFooter, AlertDialogTitle, AlertDialogDescription, AlertDialogCancel, AlertDialogAction } from '../components/ui/alert-dialog';
import { toast } from "react-toastify";

const Complaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [complaintToDelete, setComplaintToDelete] = useState(null);

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/complaint/get-complaints", {
          method: 'GET',
        });

        const data = await res.json();
        if (res.status === 200) {
          setComplaints(data);
        } else {
          setError(data.message);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchComplaints();
  }, []);

  const confirmDelete = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/complaint/delete-complaint/${complaintToDelete}`, {
        method: 'DELETE',
      });

      const data = await res.json();
      if (res.status === 200) {
        setComplaints(complaints.filter((complaint) => complaint._id !== complaintToDelete));
        setError(null);
        toast.success('Complaint deleted Successfully');
      } else {
        setError(data.message);
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Failed to delete complaint", error);
      setError(error.message);
      toast.error(err.message);
    } finally {
      setComplaintToDelete(null);
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4">
      <h2 className="text-2xl font-semibold mb-6">My Complaints</h2>

      {complaints.length === 0 ? (
        <div>No complaints found.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-4xl">
          {complaints.map((complaint) => (
            <Card key={complaint._id} className="p-4 shadow-lg bg-white">
              <h3 className="text-lg font-bold mb-2">Complaint ID: {complaint._id}</h3>
              <p><strong>Description:</strong> {complaint.description}</p>
              <p><strong>Location:</strong> {complaint.location}</p>
              <p><strong>Status:</strong> {complaint.status}</p>
              <p><strong>Anonymous:</strong> {complaint.isAnonymous ? "Yes" : "No"}</p>

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    onClick={() => setComplaintToDelete(complaint._id)}
                    className="mt-4 bg-red-500 text-white w-full hover:bg-red-600 transition"
                  >
                    Delete Complaint
                  </Button>
                </AlertDialogTrigger>

                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure you want to delete this complaint?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>

                  <AlertDialogFooter>
                    <AlertDialogCancel onClick={() => setComplaintToDelete(null)}>
                      Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction onClick={confirmDelete} className="bg-red-500 text-white hover:bg-red-600">
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Complaints;
