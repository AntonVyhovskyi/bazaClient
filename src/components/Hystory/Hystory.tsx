import axios from "axios";
import { useState, type FunctionComponent } from "react";
import api from "../../api/api";

interface HystoryProps {

}

export type THistoryAction =
    | "SET_LEVERAGE"
    | "OPEN_LIMIT_ORDER"
    | "OPEN_STOP_LOSS_ORDER"
    | "OPEN_TAKE_PROFIT_ORDER"
    | "CANCEL_ALL_ORDERS"
    | "CANCEL_ALL_POSITIONS";

export interface IHistoryItem {
    time: number;
    action: THistoryAction;
    symbol: string;
    leverage?: number;
    side?: string;
    quantity?: number;
    price?: number;
    stopPrice?: number;
    takeProfitPrice?: number;
    positionAmt?: number;
    response?: any;
    error?: any;
    status: boolean;
    message?: string;
}

const returnStringForAction = (action: THistoryAction): string => {
    switch (action) {
        case "SET_LEVERAGE":
            return "Встановлення кредитного плеча";
        case "OPEN_LIMIT_ORDER":
            return "Відкриття лімітного ордера";
        case "OPEN_STOP_LOSS_ORDER":
            return "Відкриття стоп-лосс ордера";
        case "OPEN_TAKE_PROFIT_ORDER":
            return "Відкриття тейк-профіт ордера";
        case "CANCEL_ALL_ORDERS":
            return "Відміна всіх ордерів";
        case "CANCEL_ALL_POSITIONS":
            return "Відміна всіх позицій";
        default:
            return action;
    }
}
const Hystory: FunctionComponent<HystoryProps> = () => {


    const [hystory, sethystory] = useState<IHistoryItem[]>([]);
    const [error, seterror] = useState<boolean>(false);
    const [loading, setloading] = useState<boolean>(false);

    const updateHystory = () => {
        setloading(true);
        api.get<IHistoryItem[]>('rsi/apiHystory').then(res => {
            sethystory(res.data.reverse());
            seterror(false);
            setloading(false);
        }).catch(() => {
            seterror(true);
        }).finally(() => {
            setloading(false);
        })
    }


    return (
        <div>
            <div>
                <button onClick={updateHystory} className='p-1.5 m-0.5 bg-green-700 rounded-3xl text-amber-50' >Оновити історію</button>
            </div>
            <div className="space-y-2 max-h-96 overflow-y-auto">
                {loading && <p>Завантаження...</p>}
                {error && <p className="text-red-500">Помилка при завантаженні історії</p>}
                {!loading && !error && hystory.length === 0 && <p>Історія порожня</p>}
                {!loading && !error && hystory.length > 0 && (
                    hystory.map((item) => {

                        const itemDate = new Date(item.time);
                        return (
                            <div className={`flex justify-between border-2 border-gray-300 p-2 rounded ${item.status ? 'border-green-300' : 'border-red-300'}`}  key={item.time}>
                                <div>Дата: {itemDate.getDate()}/{itemDate.getMonth()}</div>
                                <div>Час: {itemDate.getHours()}:{itemDate.getMinutes()}:{itemDate.getSeconds()}</div>
                                <div>Дія: {returnStringForAction(item.action)}</div>
                                <div>status: {item.status ? 'good' : 'bad'}</div>
                                
                            </div>
                        )
                    }

                    )
                )}
            </div>
        </div>
    );
}

export default Hystory;