import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
  useToast,
} from '@chakra-ui/react';
import Axios from 'axios';
import * as React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router'
import { useDispatch } from 'react-redux'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import { LOADING_START, LOADING_END } from '../../redux/actions/types'

const API_URL = process.env.REACT_API_URL

export default function Register() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const toast = useToast()

  const [showPassword, setShowPassword] = useState(false)
  const [showRePassword, setShowRePassword] = useState(false)
  const [values, setValues] = React.useState({
    username: '',
    fullname: '',
    email: '',
    password: '',
    re_password: ''
  })

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const onBtnRegister = async () => {
    const bodyOnRegister = {
      username: values.username,
      fullname: values.fullname,
      email: values.email,
      password: values.password
    };
    console.log(`body:`, bodyOnRegister)
    console.log(`api url:`, API_URL)

    dispatch({ type: LOADING_START })
    await Axios.post('http://localhost:5000/api/users/register', bodyOnRegister)
      .then((resp) => {
        console.log(resp)
        const arr = resp.data.token.split(" ")
        const token = arr[1]
        localStorage.setItem("token", token)

        dispatch({ type: LOADING_END })
        toast({
          title: "Register Success",
          description: "Register Success",
          status: 'success',
          duration: 3000,
          isClosable: true,
        })
        navigate(`/verification`)
      })
  }

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'} textAlign={'center'}>
            Register
          </Heading>
          <Text fontSize={'lg'} align={'center'}>
            Already have an account? <Link href="/login" color={'blue.400'}>Login</Link>
          </Text>
        </Stack>
        <Box
          p={10}
          w={450}
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}>
          <Stack spacing={4}>
            <FormControl id="username" isRequired>
              <FormLabel>Username</FormLabel>
              <Input type="text" onChange={handleChange('username')} />
            </FormControl>
            <FormControl id="fullname" isRequired>
              <FormLabel>Fullname</FormLabel>
              <Input type="text" onChange={handleChange('fullname')} />
            </FormControl>
            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input type="email" onChange={handleChange('email')} />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input type={showPassword ? 'text' : 'password'} onChange={handleChange('password')} />
                <InputRightElement h={'full'}>
                  <Button
                    variant={'ghost'}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }>
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <FormControl id="re_password" isRequired>
              <FormLabel>Repeat Password</FormLabel>
              <InputGroup>
                <Input type={showRePassword ? 'text' : 're_password'} onChange={handleChange('re_password')} />
                <InputRightElement h={'full'}>
                  <Button
                    variant={'ghost'}
                    onClick={() =>
                      setShowRePassword((showRePassword) => !showRePassword)
                    }>
                    {showRePassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Stack spacing={10} pt={2}>
              <Button
                onClick={onBtnRegister}
                loadingText="Submitting"
                size="lg"
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}>
                Register
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}