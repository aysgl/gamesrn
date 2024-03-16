import {
  Text,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  View,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {choices} from './src/data/mockData';
import {COLORS} from './src/utils/constants';
// import Rock from './src/assets/rock.svg';
import LottieView from 'lottie-react-native';
import {useRef} from 'react';

const App = () => {
  const [user, setUser] = useState(null);
  const [computer, setComputer] = useState(null);
  const [result, setResult] = useState(null);
  const [confettiTriggered, setConfettiTriggered] = useState(false);
  const confettiRef = useRef(null);

  function triggerConfetti() {
    confettiRef.current?.play(0);
  }

  useEffect(() => {
    if (confettiTriggered) {
      triggerConfetti();
    }
  }, [confettiTriggered]);

  useEffect(() => {
    if (result === 'You Win!') {
      setConfettiTriggered(true);
    } else {
      setConfettiTriggered(false);
    }
  }, [result]);

  const handleSelect = cho => {
    setUser(cho.name);
    random(cho.name);
    winner(cho.name, computer);
  };

  const random = () => {
    const id = Math.floor(Math.random() * choices.length);
    const computers = choices[id].name;
    setComputer(computers);
  };

  const winner = (userChoice, computerChoice) => {
    if (userChoice === computerChoice) {
      setResult('Tie!');
    } else if (
      (userChoice === 'Rock' && computerChoice === 'Scissors') ||
      (userChoice === 'Paper' && computerChoice === 'Rock') ||
      (userChoice === 'Scissors' && computerChoice === 'Paper')
    ) {
      setResult('You Win!');
    } else {
      setResult('You Lose!');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={'light-content'} />
      <View>
        {confettiTriggered && (
          <LottieView
            ref={confettiRef}
            source={require('./src/data/confetti.json')}
            autoPlay={false}
            loop={false}
            style={styles.lottie}
            resizeMode="cover"
          />
        )}
        <Text style={styles.h1}>Do you want to play a game?</Text>

        <View style={styles.row}>
          {choices.map(cho => (
            <TouchableOpacity
              onPress={() => handleSelect(cho)}
              key={cho?.id}
              style={[
                styles.col,
                cho.id === 0
                  ? {backgroundColor: '#ff8a65'}
                  : cho.id === 1
                  ? {backgroundColor: '#37d67a'}
                  : cho.id === 2
                  ? {backgroundColor: '#2ccce4'}
                  : null,
              ]}>
              {/* <Text>{cho?.name}</Text> */}
              <View>{cho.img}</View>
            </TouchableOpacity>
          ))}
        </View>

        {computer && (
          <>
            <View style={styles.row}>
              <Text style={styles.h3}>You {user}</Text>
              <Text style={styles.h3}>Computer {computer}</Text>
            </View>
          </>
        )}
      </View>
      <Text style={[styles.h2, styles.winner, {color: 'gray'}]}>{result}</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.backgroundColor,
    alignItems: 'center',
    justifyContent: 'center',
    color: COLORS.color,
  },
  h1: {
    fontSize: 50,
    fontWeight: '100',
    color: COLORS.color,
    textAlign: 'center',
    margin: 40,
  },
  h2: {
    fontSize: 20,
    textAlign: 'center',
    marginVertical: 30,
    color: COLORS.color,
  },
  h3: {
    fontSize: 16,
    color: COLORS.color,
    marginTop: 40,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  col: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: COLORS.color,
    borderRadius: 5,
    margin: 5,
    width: 120,
    height: 120,
  },
  winner: {
    fontSize: 40,
    fontWeight: '100',
    textAlign: 'center',
    margin: 10,
  },
  lottie: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000,
    pointerEvents: 'none',
  },
});

export default App;
