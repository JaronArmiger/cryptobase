import React, {
  useState,
  useEffect,
} from 'react'
import CoinSearch from '../components/CoinSearch';
import Trending from '../components/Trending';
import {
  db,
} from '../firebase'
import {
  UserAuth,
} from '../context/AuthContext'
import {
  doc,
  onSnapshot,
} from 'firebase/firestore'

const Home = ({coins}) => {
  const [modCoins, setModCoins] = useState(coins)
  const [watchList, setWatchList] = useState([])
  const { user } = UserAuth()

  useEffect(() => {
    if (user) {
      onSnapshot(doc(db, 'users', `${user?.email}`), (doc) => {
        setWatchList(doc.data()?.watchList)
      })
    }
  }, [user?.email])

  useEffect(() => {
    const newCoins = coins.map((coin) => {
      return {
        ...coin,
        watched: watchList?.find((c) => c.id === coin.id) ? true : false
      }
    })
    setModCoins(newCoins)
  }, [watchList, coins])
  return (
    <div>
      <CoinSearch coins={modCoins} watchList={watchList}/>
      <Trending />
    </div>
  )
}

export default Home