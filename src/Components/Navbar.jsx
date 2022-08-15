import React from 'react';
import Axios from 'axios';
import { API_URL } from '../helper';
import { logoutAction } from '../actions/userAction';
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Text, Avatar, AvatarBadge, Spinner } from '@chakra-ui/react';
import {
    Badge,
    Button,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuItemOption,
    MenuGroup,
    MenuOptionGroup,
    MenuDivider,
} from '@chakra-ui/react'
import { FaSignOutAlt } from "react-icons/fa";

const NavbarComponent = (props) => {
    const [loading, setLoading] = React.useState(false)
    const dispatch = useDispatch();
    const { pathname } = window.location;
    const navigate = useNavigate();

    const { username, status, role, cart } = useSelector(state => {
        return {
            username: state.userReducer.username,
            status: state.userReducer.status,
            role: state.userReducer.role,
            cart: state.userReducer.cart,
        }
    })

    const handleLogout = () => {
        let eshopLog = localStorage.getItem('eshopLog');
        if (eshopLog) {
            localStorage.setItem('eshopLog', 0)
            dispatch(logoutAction());
        }
    }

    React.useEffect(() => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
        }, 500)
    }, [])

    return (
        <div className='navbar navbar-expand-lg navbar-dark bg-transparent' >
            <div className=' container '>
                <span className='navbar-brand btn text-white' onClick={() => navigate('/')}>
                    <span className='fw-bold'>E-SHOP</span>
                    <span className='ms-1'>| Furniture</span>
                </span>
                <button type="button" className='navbar-toggler' data-bs-toggle='collapse' data-bs-target='#eshopNavbar' aria-controls='eshopNavbar' aria-expanded="false">
                    <span className='navbar-toggler-icon'></span>
                </button>
                <div className='collapse navbar-collapse' id='eshopNavbar'>
                    <ul className='navbar-nav me-auto mb-lg-2'>
                        <li>
                            <span className='nav-link btn fw-bold' onClick={() => navigate('/product')}>
                                Product
                            </span>
                        </li>
                    </ul>
                    <div className='d-flex'>
                        {
                            loading ?
                                <Spinner _loading={loading} />
                                :
                                <div>
                                    {
                                        username && status == 'Verified' ?
                                            <div className='d-flex align-items-center'>
                                                <Text className='text-white me-3' fontStyle='italic'>{status}</Text>
                                                <Menu>
                                                    <MenuButton>
                                                        <Avatar name={username}>
                                                            <AvatarBadge boxSize='1em' bg='green.500' />
                                                        </Avatar>
                                                    </MenuButton>
                                                    <MenuList>
                                                        {
                                                            role == 'admin' ?
                                                                <MenuGroup>
                                                                    <MenuItem onClick={() => navigate('/product/admin')}>Product Management</MenuItem>
                                                                    <MenuItem>Transaction Management </MenuItem>
                                                                </MenuGroup> :
                                                                <MenuGroup>
                                                                    <MenuItem onClick={() => navigate('/cart')}>Cart<Badge colorScheme='green'>{cart.length}</Badge></MenuItem>
                                                                    <MenuItem>Profile </MenuItem>
                                                                    <MenuItem onClick={() => navigate('/transaction')}>Transaction </MenuItem>
                                                                </MenuGroup>
                                                        }
                                                        <MenuDivider />
                                                        <MenuGroup>
                                                            <MenuItem onClick={() => {
                                                                handleLogout();
                                                                navigate('/')
                                                            }
                                                            }>SignOut <FaSignOutAlt className='ms-3 text-center' /></MenuItem>
                                                        </MenuGroup>
                                                    </MenuList>
                                                </Menu>
                                            </div>
                                            :
                                            <div className='btn-group'>
                                                <button type='button' className='btn btn-outline-primary border text-white' onClick={() => navigate('/login')}>Sign In</button>
                                                <button type='button' className='btn btn-primary' onClick={() => navigate('/register')}>Sign Up</button>
                                            </div>
                                    }
                                </div>}
                    </div>
                </div>
            </div>
        </div >
    )
}

export default NavbarComponent;