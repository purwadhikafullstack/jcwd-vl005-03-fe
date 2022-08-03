import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
  useToast
} from '@chakra-ui/react';
import * as React from 'react';
import Axios from 'axios';
import { useState } from 'react'
import { useNavigate } from 'react-router'
import { useDispatch } from 'react-redux'
import { LOADING_END, LOADING_START, GET_USER_DATA } from '../../redux/actions/types';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'

const API_URL = process.env.REACT_APP_API_URL

export default function UserLogin() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const toast = useToast()

  const [showPassword, setShowPassword] = useState(false)
  const [values, setValues] = React.useState({
    email: '',
    password: '',
    showPassword: false
  })

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const keepLogin = document.getElementsByName("keep")

  const onButtonLogin = async () => {
    const bodyOnSignIn = {
      login: values.email,
      password: values.password
    };
    console.log(`body:`, bodyOnSignIn)
    console.log(`api url:`, API_URL)

    dispatch({ type: LOADING_START })
    await Axios.post(API_URL + '/login', bodyOnSignIn)
      .then((resp) => {
        console.log(resp.data)
        const token = resp.data.token
        localStorage.setItem("token", token)
        localStorage.setItem('email', values.email)
        if (!keepLogin[0].checked) {
          localStorage.setItem("keepLogin", 'false')
        } else {
          localStorage.setItem("keepLogin", 'true')
        }

        dispatch({ type: LOADING_END })
        toast({
          title: "Login Success",
          description: "Login Success",
          status: 'success',
          duration: 3000,
          isClosable: true,
        })
        if (resp.data.is_verified === "verified" || "unverified" ) {
          navigate(`/`)
        }
        // else {
        //   navigate(`/verification`)
        // }

      })
      .catch((err) => {
        dispatch({ type: LOADING_END })
        console.log(`error login:`, err);
        if (err) {
          return toast({
            title: `Error`,
            description: err.response.data.data,
            status: 'error',
            duration: 5000,
            isClosable: true,
          })
        }
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
          <Heading fontSize={'4xl'}>Login</Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            Don't have an account? <Link href='/register' color={'blue.400'}>SignUp</Link>
          </Text>
        </Stack>
        <Box
          p={10}
          w={450}
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}>
          <Stack spacing={4}>
            <FormControl isRequired id="email">
              <FormLabel>Username/Email address</FormLabel>
              <Input type="email" onChange={handleChange('email')} />
            </FormControl>
            <FormControl isRequired id="password">
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
            <Stack spacing={10}>
              <Stack
                direction={{ base: 'column', sm: 'row' }}
                align={'start'}
                justify={'space-between'}>
                <Checkbox type={'checkbox'} name="keep">Remember me</Checkbox>
                <Link href='/forgot-password' color={'blue.400'}>Forgot password?</Link>
              </Stack>
              <Button
                onClick={onButtonLogin}
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}>
                Login
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}