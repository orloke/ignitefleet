import { Container, Slogan, Title } from './styles'

import backgroundImg from '../../assets/background.png'
import { Button } from '../../components/Button'
import { ANDROID_CLIENT_ID, WEB_CLIENT_ID } from '@env'
import { useEffect, useState } from 'react'
import { GoogleSignin } from '@react-native-google-signin/google-signin'
import { Alert } from 'react-native'

GoogleSignin.configure({
  scopes: ['email', 'profile'],
  webClientId: WEB_CLIENT_ID,
})

export function SignIn() {

  const [isAuthenticating, setIsAuthenticaiting] = useState(false)

  const handleGoogleSignIn = async () => {
    setIsAuthenticaiting(true)
    try {
      await GoogleSignin.hasPlayServices()
      const response = await GoogleSignin.signIn()

      if (response.idToken) {
        console.log('ESSE É O TOKEN: => ', response)
      }
    } catch (error) {
      Alert.alert('Não foi possível conectar-se a sua conta Google')
    } finally {
      setIsAuthenticaiting(false)
    }
  }

  return (
    <Container source={backgroundImg}>
      <Title>Ignite Fleet</Title>
      <Slogan>Gestão de uso de veículos</Slogan>
      <Button
        title="Entrar com Google"
        onPress={handleGoogleSignIn}
        isLoading={isAuthenticating}
      />
    </Container>
  )
}
