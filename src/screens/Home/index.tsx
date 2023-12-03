import { View } from 'react-native';
import { Container } from './styles';
import { Button } from '../../components/Button';
import { useApp } from '@realm/react';

type Props = {
  /* props go here */
}

export function Home() {

  const app = useApp()

  return (
    <Container>
      <Button title='sair' onPress={()=>{
        app.currentUser?.logOut()
      }} />
    </Container>
  );
};
