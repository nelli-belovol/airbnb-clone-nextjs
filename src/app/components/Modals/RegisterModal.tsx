'use client';

import useLoginModal from '@/app/hooks/useLoginModal';
import useRegisterModal from '@/app/hooks/useRegisterModal';
import axios from 'axios';
import { signIn } from 'next-auth/react';
import { useCallback, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import Button from '../Button';
import Heading from '../Heading';
import Input from '../Inputs/Input';
import Modal from './Modal';

const RegisterModal = () => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    axios
      .post('/api/register', data)
      .then(() => {
        loginModal.onOpen();
        registerModal.onClose();
        toast.success('Signed in!');
      })
      .catch(() => toast.error('Something went wrong!'))
      .finally(() => setIsLoading(false));
  };

  const toggle = useCallback(() => {
    registerModal.onClose();
    loginModal.onOpen();
  }, [loginModal, registerModal]);

  const bodyContent = (
    <div className='flex flex-col gap-4'>
      <Heading title='Welcome to Airbnb'
        subtitle='Create an account!' />
      <Input
        errors={errors}
        id='email'
        label='Email'
        register={register}
        disabled={isLoading}
        required
      />
      <Input
        errors={errors}
        id='name'
        label='Name'
        register={register}
        disabled={isLoading}
        required
      />
      <Input
        errors={errors}
        id='password'
        label='Password'
        type='password'
        register={register}
        disabled={isLoading}
        required
      />
    </div>
  );

  const footerContent = (
    <div className='mt-3 flex flex-col gap-4'>
      <hr />
      <Button
        outline
        label='Continue with Google'
        icon={FcGoogle}
        onClick={() => signIn('google')}
      />
      <Button
        outline
        label='Continue with Github'
        icon={AiFillGithub}
        onClick={() => signIn('github')}
      />
      <div className='mt-4 text-center font-light text-neutral-500'>
        <div className='flex flex-row items-center justify-center gap-2'>
          <div>Already have an account?</div>
          <div
            className='cursor-pointer text-neutral-800 hover:underline'
            onClick={toggle}
          >
            Log in
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      title='Register'
      actionLabel='Continue'
      onClose={registerModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default RegisterModal;
