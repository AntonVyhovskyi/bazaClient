import { useEffect, useState, type FunctionComponent } from "react";
import api from "../../api/api";
import type { IParamsValues } from "../Params/Params";

interface StatusProps {
pass: string
}

const Status: FunctionComponent<StatusProps> = ({pass}) => {

    const [status, setstatus] = useState<boolean>(false);
    const [params, setparams] = useState<IParamsValues | null>(null);
    const [position, setposition] = useState<{ amt: number } | null>(null);

    useEffect(() => {
        api.get<{ status: boolean, position: { amt: number }, params: IParamsValues }>('rsi/status').then((res) => {
            setstatus(res.data.status);
            setparams(res.data.params);
            setposition(res.data.position);

        })
    }, [status])


    return (
        <div className=" mx-auto p-6 bg-white shadow-lg rounded-xl space-y-6 flex-grow">
            {/* Статус бота */}
            <div className="text-center">
                {status ? (
                    <div className="text-green-500 font-semibold text-lg">
                        ✅ Бот працює
                    </div>
                ) : (
                    <div className="text-red-500 font-semibold text-lg">
                        ❌ Бот не працює
                    </div>
                )}
            </div>

            {/* Параметри */}
            {params && (
                <div className="p-4 bg-gray-50 rounded-lg border">
                    <h2 className="text-gray-700 font-bold mb-2">Параметри</h2>
                    <div className="space-y-1 text-sm text-gray-600">
                        <div><span className="font-medium">symbol:</span> {params.symbol}</div>
                        <div><span className="font-medium">timeframe:</span> {params.timeframe}</div>
                        <div><span className="font-medium">sl:</span> {params.sl}</div>
                        <div><span className="font-medium">tp:</span> {params.tp}</div>
                        <div><span className="font-medium">rsiPeriod:</span> {params.rsiPeriod}</div>
                        <div><span className="font-medium">minRsi:</span> {params.minRsi}</div>
                        <div><span className="font-medium">maxRsi:</span> {params.maxRsi}</div>
                        <div><span className="font-medium">lavarage:</span> {params.lavarage}</div>
                    </div>
                </div>
            )}

            {/* Позиція */}
            {position && position.amt !== 0 && (
                <div className="p-4 bg-blue-50 rounded-lg border">
                    <h2 className="text-blue-600 font-bold mb-2">Відкрита позиція</h2>
                    <div className="text-blue-800">
                        {position.amt > 0 ? "🟢 Buy" : "🔴 Sell"}: {position.amt}
                    </div>
                </div>
            )}

            {/* Кнопки керування */}
            <div className="text-center">
                {status ? (
                    <button
                        className="mt-4 px-6 py-2 bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg shadow transition"
                        onClick={() => {
                            api.post("rsi/stop", {}, {
                                headers: {
                                    'x-password': pass
                                }
                            }).then(() => {
                                setstatus(false);
                            });
                        }}
                    >
                        🛑 Stop Bot
                    </button>
                ) : (
                    <button
                        className="mt-4 px-6 py-2 bg-green-500 hover:bg-green-600 text-white font-medium rounded-lg shadow transition"
                        onClick={() => {
                            api.post("rsi/start",{}, {
                                headers: {
                                    'x-password': pass
                                }
                            }).then(() => {
                                setstatus(true);
                            });
                        }}
                    >
                        ▶️ Start Bot
                    </button>
                )}
            </div>
        </div>

    );
}

export default Status;