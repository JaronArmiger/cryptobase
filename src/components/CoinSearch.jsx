import React, {
    useEffect,
    useState,
} from 'react'
import CoinItem from './CoinItem'
import {
    db,
} from '../firebase'
import {
    doc,
    updateDoc,
} from 'firebase/firestore'
import {
    UserAuth,
} from '../context/AuthContext'


const CoinSearch = ({ coins, watchList }) => {
    const [searchText, setSearchText] = useState('')
    const { user } = UserAuth()

    const removeCoinFromWatchlist = async (coinId) => {
        const coinPath = doc(db, 'users', `${user.email}`)
        try {
          const modifiedWatchList = watchList.filter((coin) => coin.id !== coinId)
          console.log(modifiedWatchList)
          await updateDoc(coinPath, {
            watchList: modifiedWatchList,
          })
        } catch (error) {
            console.log(error.message)
        }
    }

    // useEffect(() => {
    //     onSnapshot(doc(db, 'users', `${user.email}`), (doc) => {
    //         console.log(doc.data()?.watchList)
    //     })
    // }, [user.email])


  return (
    <div className='rounded-div my-4'>
        <div className='flex flex-column md:flex-row justify-between pt-4 pb-6 text-center md:text-right'>
            <h1 className='text-2xl font-bold my-2'>Search Crypto</h1>
            <form>
                <input 
                  onChange={(e) => setSearchText(e.target.value)} 
                  className='w-full bg-primary border border-input px-4 py-2 rounded-2xl shadow-xl'
                  type="text" 
                  placeholder="Search a coin" />
            </form>
        </div>

        <table className='w-full border-collapse text-center'>
            <thead>
                <tr className='border-b'>
                    <th></th>
                    <th className='px-4'>#</th>
                    <th className='text-left'>Coin</th>
                    <th></th>
                    <th>Price</th>
                    <th>24h</th>
                    <th className='hidden md:table-cell'>24h Volume</th>
                    <th className='hidden sm:table-cell'>Mkt</th>
                    <th>Last 7 Days</th>
                </tr>
            </thead>
            <tbody>
                {coins.filter((value) => {
                    if (searchText === '') {
                        return value
                    } else if (value.name.toLowerCase().includes(searchText.toLowerCase())) {
                        return value
                    }
                }).map((coin) => (
                    <CoinItem key={coin.id} coin={coin} removeCoinFromWatchlist={removeCoinFromWatchlist} />
                ))}
            </tbody>
        </table>
    </div>
  )
}

export default CoinSearch