import {
  Card,
  Typography,
  List,
  ListItem,
  Button,
} from "@material-tailwind/react";
import { NavLink } from "react-router-dom";
import useAdmin from "../../../Hooks/useAdmin";
import useAuth from "../../../Hooks/useAuth";
import Swal from "sweetalert2";
import useAxios from "../../../Hooks/useAxios";
import useGuide from "../../../Hooks/useGuide";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

const Sidebar = () => {
  const { isAdmin } = useAdmin();
  const { isGuide } = useGuide();
  const user = useAuth();
  const { axiosSecure } = useAxios();

  const handleRequest = () => {
    Swal.fire({
      title: "Are you sure?",
      text: `You want to send Request to be a Guide?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, send it!",
    }).then(result => {
      if (result.isConfirmed) {
        axiosSecure
          .patch(`/user/request/guide?email=${user.email}`)
          .then(res => {
            Swal.fire({
              icon: "success",
              title: "Success!!",
              text: `Request sent`,
            });
            refetch()
          })
          .catch(err => {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: err.message,
            });
          });
      }
    });
  };

  const { data: isRequest ,refetch } = useQuery({
    queryKey: ["isRequest"],
    queryFn: async () => {
      const res = await axiosSecure.get(`user/role/${user?.email}`);
      return res.data;
    },
  });
    useEffect(()=>{  refetch()})
  console.log(isAdmin);
  return (
    <div>
      <Card className="md:fixed h-full md:h-[calc(100vh-2rem)] w-full md:max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5 ">
        <div className="mb-2 p-4">
          <Typography variant="h5" color="blue-gray">
            Dshboard
          </Typography>
        </div>
        <List className="">
          <Typography
            as={NavLink}
            to="/dashboard/my-profile"
            variant="small"
            // color="blue-gray"
            className="font-medium"
          >
            <ListItem className="flex items-center gap-2 py-2 pr-4">
              My Profile
            </ListItem>
          </Typography>

          {isGuide && (
            <>
              <Typography
                as={NavLink}
                to="/dashboard/assigned-tour"
                variant="small"
                // color="blue-gray"
                className="font-medium"
              >
                <ListItem className="flex items-center gap-2 py-2 pr-4">
                  My Assigned Tours
                </ListItem>
              </Typography>
            </>
          )}
          {(!isAdmin && !isGuide) &&(
            <>
                      <Typography
            as={NavLink}
            to="/dashboard/my-bookings"
            variant="small"
            // color="blue-gray"
            className="font-medium"
          >
            <ListItem className="flex items-center gap-2 py-2 pr-4">
              My Bookings
            </ListItem>
          </Typography>
              <Typography
                as={NavLink}
                to="/dashboard/my-wishlist"
                variant="small"
                // color="blue-gray"
                className="font-medium"
              >
                <ListItem className="flex items-center gap-2 py-2 pr-4">
                  My WishList
                </ListItem>
              </Typography>
              <Typography variant="small" className="font-medium">
                <ListItem className="flex items-center gap-2 py-2 pr-4 text-center">
                  <Button
                    onClick={handleRequest}
                    variant="gradient"
                    size="small"
                    color="pink"
                    fullWidth
                    disabled={isRequest}
                  >
                    {isRequest ? "Requested" : "Request To Admin"}
                  </Button>
                </ListItem>
              </Typography>
              
            </>
          )}

          {isAdmin && (
            <>
              <Typography
                as={NavLink}
                to="/dashboard/manage-user"
                variant="small"
                // color="blue-gray"
                className="font-medium"
              >
                <ListItem className="flex items-center gap-2 py-2 pr-4">
                  Manage User
                </ListItem>
              </Typography>
              <Typography
                as={NavLink}
                to="/dashboard/add-package"
                variant="small"
                // color="blue-gray"
                className="font-medium"
              >
                <ListItem className="flex items-center gap-2 py-2 pr-4">
                  Add Package
                </ListItem>
              </Typography>
            </>
          )}
        </List>
      </Card>
    </div>
  );
};

export default Sidebar;
