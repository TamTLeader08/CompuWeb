import './sidebar.scss'
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import LaptopIcon from '@mui/icons-material/Laptop';
import CategoryIcon from '@mui/icons-material/Category';
import PaymentIcon from '@mui/icons-material/Payment';
import LoyaltyIcon from '@mui/icons-material/Loyalty';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import BusinessIcon from '@mui/icons-material/Business';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { DarkModeContext } from '../../context/darkModeContext';



const Sidebar = () => {
    const { dispatch } = useContext(DarkModeContext)

    return (
        <div className='sidebar'>
            <div className="top">
                <Link to='/' style={{ textDecoration: 'none' }}>
                    <span className="logo">
                        Hitech Shop
                    </span>
                </Link>

            </div>
            <hr></hr>
            <div className="center">
                <ul>
                    <p className="title">Main</p>
                    <li>
                        <DashboardIcon className='icon' />
                        <span>Dashboard</span>
                    </li>
                    <p className="title">Lists</p>
                    <Link to='/customers' style={{ textDecoration: 'none' }}>
                        <li>
                            <PeopleIcon className='icon' />
                            <span>Customers</span>
                        </li>
                    </Link>
                    <Link to='/products' style={{ textDecoration: 'none' }}>
                        <li>
                            <LaptopIcon className='icon' />
                            <span>Products</span>
                        </li>
                    </Link>
                    <Link to='/categories' style={{ textDecoration: 'none' }}>
                        <li>
                            <CategoryIcon className='icon' />
                            <span>Categories</span>
                        </li>
                    </Link>
                    <Link to='/brands' style={{ textDecoration: 'none' }}>
                        <li>
                            <BusinessIcon className='icon' />
                            <span>Brands</span>
                        </li>
                    </Link>
                    <Link to='/orders' style={{ textDecoration: 'none' }}>
                        <li>
                            <PaymentIcon className='icon' />
                            <span>Orders</span>
                        </li>
                    </Link>
                    <Link to='/promotions' style={{ textDecoration: 'none' }}>
                        <li>
                            <LoyaltyIcon className='icon' />
                            <span>Promotions</span>
                        </li>
                    </Link>
                    <p className="title">User</p>
                    <li>
                        <PersonOutlineIcon className='icon' />
                        <span>Profile</span>
                    </li>
                    <li>
                        <LogoutIcon className='icon' />
                        <span>Log out</span>
                    </li>

                </ul>
            </div>

            <div className="bottom">
                <div className="colorOption" onClick={() => dispatch({ type: "LIGHT" })}></div>
                <div className="colorOption" onClick={() => dispatch({ type: "DARK" })}></div>
            </div>
        </div>
    )
}

export default Sidebar