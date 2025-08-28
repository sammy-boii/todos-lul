'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { useState } from 'react'
import Link from 'next/link'
import { toast } from 'sonner'
import { authClient } from '@/lib/auth-client'
import { useRouter } from 'next/navigation'
import OAuthLoginButton from '@/components/auth/OAuthLoginButton'
import { Loader2 } from 'lucide-react'

const loginFormSchema = z.object({
  email: z.email(),
  password: z.string().min(8, 'Password must be at least 8 characters long')
})

type TLoginForm = z.infer<typeof loginFormSchema>

const LoginPage = () => {
  const router = useRouter()

  const form = useForm<TLoginForm>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  async function onSubmit(data: TLoginForm) {
    try {
      await authClient.signIn.email(
        {
          email: data.email,
          password: data.password
        },

        {
          onSuccess: () => {
            router.replace('/')
            toast.success('Logged in successfully.')
          },
          onError: (ctx) => {
            toast.error(ctx.error.message)
          }
        }
      )
    } catch (err) {
      toast.error('An error occurred. Please try again.')
    }
  }

  const [showPassword, setShowPassword] = useState(false)

  return (
    <main>
      <Card className='max-w-md mx-auto'>
        <CardHeader>
          <CardTitle className='text-2xl font-bold'>Welcome Back!</CardTitle>
          <CardDescription>Login to your account</CardDescription>
        </CardHeader>

        <CardContent className='space-y-4'>
          <div className='flex items-center gap-4'>
            <OAuthLoginButton provider='google' />
            <OAuthLoginButton provider='github' />
          </div>
          <Form {...form}>
            <form className='space-y-4' onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder='example@email.com' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='password'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <div className='relative'>
                        <Input
                          className='pr-12'
                          type={showPassword ? 'text' : 'password'}
                          placeholder='Enter your password'
                          {...field}
                        />
                        <Button
                          type='button'
                          onClick={() => setShowPassword(!showPassword)}
                          className='absolute right-0 top-1/2 -translate-y-1/2'
                          variant='ghost'
                        >
                          {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* ml-auto only works if parent is a flex container */}

              <div className='flex justify-end'>
                <Link
                  className='text-muted-foreground text-sm'
                  href='/forgot-password'
                >
                  Forgot Password?
                </Link>
              </div>
              <Button
                disabled={form.formState.isSubmitting}
                className='w-full cursor-pointer'
                type='submit'
              >
                Login
              </Button>
            </form>

            <div className='flex items-center gap-2'>
              <div className='bg-muted h-px flex-1' />
              <div className='text-muted-foreground text-xs'>OR</div>
              <div className='bg-muted h-px flex-1' />
            </div>

            <div className='text-muted-foreground text-center text-sm'>
              Don&apos;t have an account?{' '}
              <Link className='hover:text-white hover:underline' href='signup'>
                Sign Up
              </Link>
            </div>
          </Form>
        </CardContent>
      </Card>
    </main>
  )
}
export default LoginPage
