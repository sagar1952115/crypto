"use client"
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { fetchData, selectData, setSymbol, selectSymbol } from '../store/dataSlice';
import { Provider } from 'react-redux';
import store, { AppDispatch, RootState } from '../store';
import dynamic from 'next/dynamic';
import { selectData,setSymbol,selectSymbol, fetchData } from '@/store/dataSlice';

const DataTable = dynamic(() => import('../components/DataTable'), { ssr: false });

const Home = () => {
  const dispatch: AppDispatch = useDispatch();
  const data = useSelector((state: RootState) => selectData(state));
  const symbol = useSelector((state: RootState) => selectSymbol(state));


    useEffect(() => {
        dispatch(fetchData(symbol));
        const interval = setInterval(() => {
            dispatch(fetchData(symbol));
        }, 5000);

        return () => clearInterval(interval);
    }, [symbol, dispatch]);

    const handleChangeSymbol = (newSymbol: string) => {
        dispatch(setSymbol(newSymbol));
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
            <div className="mb-6 flex space-x-2 overflow-x-auto">
                    <button
                        onClick={() => handleChangeSymbol('BTC')}
                        className={`font-bold py-2 px-4  ${symbol === 'BTC' ? 'text-black border-b-2 border-black' : 'text-gray-500'}`}
                    >
                        Bitcoin
                    </button>
                    <button
                        onClick={() => handleChangeSymbol('ETH')}
                        className={`font-bold py-2 px-4  ${symbol === 'ETH' ? 'text-black border-b-2 border-black' : 'text-gray-500'}`}
                    >
                        Ethereum
                    </button>
                    <button
                        onClick={() => handleChangeSymbol('ENA')}
                        className={`font-bold py-2 px-4  ${symbol === 'ENA' ? 'text-black border-b-2 border-black' : 'text-gray-500'}`}
                    >
                        Ethena
                    </button>
                    <button
                        onClick={() => handleChangeSymbol('BNB')}
                        className={`font-bold py-2 px-4  ${symbol === 'BNB' ? 'text-black border-b-2 border-black' : 'text-gray-500'}`}
                    >
                        Binance
                    </button>
                    <button
                        onClick={() => handleChangeSymbol('DOGE')}
                        className={`font-bold text-nowrap py-2 px-4  ${symbol === 'DOGE' ? 'text-black border-b-2 border-black' : 'text-gray-500'}`}
                    >
                        Doge Coin
                    </button>
                </div>
                <DataTable name={symbol} data={data} />
            </div>
        </div>
    );
};

const App = () => (
    <Provider store={store}>
        <Home />
    </Provider>
);

export default App;
