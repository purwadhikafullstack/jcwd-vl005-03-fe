import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  InputGroup,
  InputRightElement,
  FormHelperText,
  Heading,
  Input,
  Stack,
  useColorModeValue,
  useToast
} from '@chakra-ui/react';
import React from 'react'
import Axios from "axios"
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'

const API_URL = process.env.REACT_APP_API_URL

export default function ResetPassword() {
  const pathname = window.location.pathname;
  const email = pathname.split('/reset-password/')[1]
  const navigate = useNavigate()
  const toast = useToast()

  const [showPassword, setShowPassword] = useState(false)
  const [showRePassword, setShowRePassword] = useState(false)
  const [values, setValues] = React.useState({
    password: '',
    re_password: '',
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const onButtonResetPassword = async () => {
    const bodyOnResetPassword = {
      email: email,
      password: values.password,
      re_password: values.re_password
    }
    console.log(`body:`, bodyOnResetPassword)
    console.log(`api url:`, API_URL);

    await Axios.patch(API_URL + `/resetPassword/${email}`, bodyOnResetPassword)
      .then((resp) => {
        console.log(resp)
        toast({
          title: "Reset Password Success",
          description: "your password has been reset",
          status: 'success',
          duration: 3000,
          isClosable: true,
        })
        navigate('/')
      })
      .catch((err) => {
        console.log(`error:`, err);
        if (err) {
          return toast({
            title: `Error`,
            description: err.response.data,
            status: 'error',
            duration: 5000,
            isClosable: true,
          })
        }
      })
  }

  return (
    <>
      <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}>
        <Stack
          spacing={4}
          w={'full'}
          maxW={'md'}
          bg={useColorModeValue('white', 'gray.700')}
          rounded={'xl'}
          boxShadow={'lg'}
          p={6}
          my={12}>
          <Heading lineHeight={1.1} fontSize={{ base: '2xl', md: '3xl' }}>
            Enter new password
          </Heading>
          <FormControl id="email">
            <FormLabel>Email address</FormLabel>
            <Input
              placeholder={`${email}`}
              _placeholder={{ color: 'gray.500' }}
              type="email"
              disabled
            />
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
                <FormHelperText>Password must include more than 8 Characters, At least one capital letter, At least one number, At least one special character</FormHelperText>
              </FormControl>
              <FormControl id="re_password" isRequired>
                <FormLabel>Repeat Password</FormLabel>
                <InputGroup>
                  <Input type={showRePassword ? 'text' : 'password'} onChange={handleChange('re_password')} />
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
          <Stack spacing={6}>
            <Button
              onClick={onButtonResetPassword}
              bg={'blue.400'}
              color={'white'}
              _hover={{
                bg: 'blue.500',
              }}>
              Reset Password
            </Button>
          </Stack>
        </Stack>
      </Flex>
    </>
  );
}