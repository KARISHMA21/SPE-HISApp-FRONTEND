import React from "react";
import "./topbar.css";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Tooltip from '@mui/material/Tooltip';
import Logout from '@mui/icons-material/Logout';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import doctor_logout from "../../services/Logout";

export default function Topbar(props) {
  const nav=useNavigate();
  
  const name=props.name;
  const did=props.did;
  
  let activetoken=localStorage.getItem(did)
  let loggedInRole=localStorage.getItem(did+"-"+activetoken)
  let roleAdmin=did+"-ADMIN"
  let roleDoctor=did+"-DOCTOR"

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };


  const handleLogout=()=>{
    let token =localStorage.getItem(did);
    doctor_logout.logout(token)
        .then((response) => {
          if (response.status === 200) {
            toast.success("Successfully logged out!!", {
              position: "bottom-right",
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            })
            localStorage.removeItem(did);
            localStorage.removeItem(did+"-"+token);

            nav(`/`);


          }

        })
        .catch((error) => {
          toast.error("Error Logging out!!", {
            position: "bottom-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          })

        });



  }
  return (
      <>
        <div className="topbar">
          <div className="topbarWrapper">
            <div className="topLeft">
            {loggedInRole === roleDoctor ? (
              <span className="logo">Hey, Dr. {props.name} !</span>
            ):(
              <span className="logo">Hey, {props.name} !</span>
  )}
            </div>
            <div className="topRight">
              {/* <div className="topbarIconContainer">
            <NotificationsNone />
            <span className="topIconBadge">2</span>
          </div> */}
              <Tooltip title="Account settings">
                <img src={`https://ui-avatars.com/api/?background=fff&name=${name}&length=1`} alt="" className="topAvatar"  onClick={handleClick}
                     aria-controls={open ? 'account-menu' : undefined}
                     aria-haspopup="true"
                     aria-expanded={open ? 'true' : undefined} />
              </Tooltip>
            </div>


          </div>
        </div>


        <React.Fragment>

          <Menu
              anchorEl={anchorEl}
              id="account-menu"
              open={open}
              onClose={handleClose}
              onClick={handleClose}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: 'visible',
                  filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                  mt: 1.5,
                  '& .MuiAvatar-root': {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  '&:before': {
                    content: '""',
                    display: 'block',
                    position: 'absolute',
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: 'background.paper',
                    transform: 'translateY(-50%) rotate(45deg)',
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >



            <MenuItem onClick={handleLogout}>
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        </React.Fragment>
        <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
        />
      </>
  );
}
