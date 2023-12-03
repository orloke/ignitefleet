import { Container, Slogan, Title } from './styles'

import { WEB_CLIENT_ID } from '@env'
import { GoogleSignin } from '@react-native-google-signin/google-signin'
import { Realm, useApp } from '@realm/react'
import { useState } from 'react'
import { Alert } from 'react-native'
import backgroundImg from '../../assets/background.png'
import { Button } from '../../components/Button'

GoogleSignin.configure({
  scopes: ['email', 'profile'],
  webClientId: WEB_CLIENT_ID,
  offlineAccess: true
})

export function SignIn() {
  const app = useApp()

  const [isAuthenticating, setIsAuthenticaiting] = useState(false)

  const handleGoogleSignIn = async () => {
    setIsAuthenticaiting(true)
    try {
      await GoogleSignin.hasPlayServices()
      const response = await GoogleSignin.signIn()

      if (response.idToken) {
        const credentials = Realm.Credentials.jwt(response.idToken)

        console.log(response.idToken)

        app.logIn(credentials).catch((err) => {
          console.log(err)
          Alert.alert(
            'Não foi possível conectar-se a sua conta Google erro com essa bosta'
          )
        })

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
