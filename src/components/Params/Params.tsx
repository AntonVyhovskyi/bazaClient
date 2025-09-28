import { useEffect, useState, type FunctionComponent } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import api from "../../api/api";

interface ParamsProps {
    pass: string
}

export interface IParamsValues {
    symbol: string;
    timeframe: string;
    sl: number;
    tp: number;
    rsiPeriod: number;
    minRsi: number;
    maxRsi: number;
    lavarage: number;
}

const validationSchema = Yup.object({
    symbol: Yup.string().required("Required"),
    timeframe: Yup.string().required("Required"),
    sl: Yup.number().positive().required("Required"),
    tp: Yup.number().positive().required("Required"),
    rsiPeriod: Yup.number().min(1).required("Required"),
    minRsi: Yup.number().min(0).max(50).min(1).required("Required"),
    maxRsi: Yup.number().max(100).min(51).required("Required"),
    lavarage: Yup.number().min(1).required("Required"),
});
const Params: FunctionComponent<ParamsProps> = ({ pass }) => {
    const [succesfullUpdate, setsuccesfullUpdate] = useState<null | false | true>(null);
    const [initialValues, setinitialValues] = useState({
        symbol: "ETHUSDT",
        timeframe: "1m",
        sl: 1,
        tp: 1,
        rsiPeriod: 12,
        minRsi: 50,
        maxRsi: 51,
        lavarage: 10,
    });

    useEffect(() => {
        api.get('/rsi/params').then(response => {
            console.log(response.data);

            setinitialValues(response.data);
        })
    }, [])

    return (
        <div className="flex-grow">
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                enableReinitialize
                onSubmit={(values: IParamsValues) => {
                    api.put('/rsi/params', values, {
                        headers: {
                            'x-password': pass
                        }
                    }).then(response => {
                        setsuccesfullUpdate(true);
                        console.log(response.data);
                    }).catch((error: any) => {
                        setsuccesfullUpdate(false);
                        console.error("There was an error!", error);
                    })

                }}

            >
                {() => (
                    <Form className="flex flex-col gap-3 p-4 max-w-md mx-auto bg-gray-100 rounded-xl shadow ">
                        {succesfullUpdate === true && <div className="p-2 bg-green-200 text-green-800 rounded">Params updated successfully!</div>}
                        {succesfullUpdate === false && <div className="p-2 bg-red-200 text-red-800 rounded">Error updating params. Please try again.</div>}
                        <label>
                            Symbol:
                            <Field as="select" name="symbol" className="border p-2 rounded w-full">
                                <option value="ETHUSDT">ETHUSDT</option>
                                <option value="BTCUSDT">BTCUSDT</option>
                            </Field>
                            <ErrorMessage name="symbol" component="div" className="text-red-500 text-sm" />
                        </label>

                        <label>
                            Timeframe:
                            <Field as="select" name="timeframe" className="border p-2 rounded w-full">
                                <option value="1m">1m</option>
                                <option value="3m">3m</option>
                                <option value="5m">5m</option>
                                <option value="15m">15m</option>
                                <option value="1h">1h</option>
                            </Field>
                        </label>

                        <label>
                            SL:
                            <Field type="number" name="sl" className="border p-2 rounded w-full" step="0.1" />
                            <ErrorMessage name="sl" component="div" className="text-red-500 text-sm" />
                        </label>

                        <label>
                            TP:
                            <Field type="number" name="tp" className="border p-2 rounded w-full" step="0.1" />
                            <ErrorMessage name="tp" component="div" className="text-red-500 text-sm" />
                        </label>

                        <label>
                            RSI Period:
                            <Field type="number" name="rsiPeriod" className="border p-2 rounded w-full" />
                            <ErrorMessage name="rsiPeriod" component="div" className="text-red-500 text-sm" />
                        </label>

                        <label>
                            Min RSI:
                            <Field type="number" name="minRsi" className="border p-2 rounded w-full" />
                            <ErrorMessage name="minRsi" component="div" className="text-red-500 text-sm" />
                        </label>

                        <label>
                            Max RSI:
                            <Field type="number" name="maxRsi" className="border p-2 rounded w-full" />
                            <ErrorMessage name="maxRsi" component="div" className="text-red-500 text-sm" />
                        </label>

                        <label>
                            Lavarage:
                            <Field type="number" name="lavarage" className="border p-2 rounded w-full" />
                            <ErrorMessage name="lavarage" component="div" className="text-red-500 text-sm" />
                        </label>

                        <button type="submit" className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
                            Submit
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
}

export default Params;