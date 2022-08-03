import React from "react";
import { BsCart } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import logo from '../../../assets/images/clooth-logo.png'
import { Stack, Button, Text, Center } from '@chakra-ui/react'

function Header() {
  const navigate = useNavigate
  const { count } = useSelector(state => state.cart)
  console.log(count)

  const onButtonLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('email')
    localStorage.removeItem('keepLogin')
    navigate(`/login`)
  }

  const user = useSelector((state) => state.user)

  return (
    <header className="header-area header-sticky ">
      <div className="container mt-2">
        <div className="row">
          <div className="col-12">
            <nav className="main-nav">
              {/* <!-- ***** Logo Start ***** --> */}
              <a href="/" className="logo mt-4 d-flex">
                <img src={logo} alt="logo" width={30} height={30} />
                <h5 className="ml-2">CLOOTH</h5>
              </a>
              {/* <!-- ***** Logo End ***** --> */}
              {/* <!-- ***** Menu Start ***** --> */}
              <ul className="nav">
                <li className="scroll-to-section">
                  <Link to={"/"}>Home</Link>
                </li>
                <li className="scroll-to-section">
                  <Link to={"/products"}>Products</Link>
                </li>

                <li className="scroll-to-section">
                  <Link to={"/about"}>
                    About Us
                  </Link>
                </li>

                <li className="scroll-to-section">
                  <Link to={"/carts"}><BsCart size={20} className="d-inline mb-2" /><span className="badge badge-danger">{count}</span></Link>
                </li>

                <Stack pl={4} direction='row' spacing={4}>
                  <Link to={"/register"}>
                    <Button colorScheme='gray' variant='outline'>Register</Button>
                  </Link>
                  <Link to={"/login"}>
                    <Button colorScheme='gray'>Login</Button>
                  </Link>
                  <Center>
                    <Text fontSize='xl' fontWeight='medium'>Welcome, AtlanticNova</Text>
                  </Center>
                  <Link to={'/'} onClick={onButtonLogout}>
                    <Button colorScheme='gray'>Logout</Button>
                  </Link>
                </Stack>
              </ul>
              <a className='menu-trigger'>
                <span>Menu</span>
              </a>
              {/* <!-- ***** Menu End ***** --> */}
            </nav>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header