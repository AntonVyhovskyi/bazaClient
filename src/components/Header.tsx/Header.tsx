import { useEffect, useState, type FunctionComponent } from "react";
import api from "../../api/api";

interface HeaderProps {
    pass: string,
    setPass: (newPass: string) => void
}

const Header: FunctionComponent<HeaderProps> = ({ pass, setPass }) => {
    const [statusCheck, setstatusCheck] = useState<null| false| true>();


    const checkPass = () => {
        api.get('/checkPassword', {
            headers: {
                'x-password': pass
            }
        }).then(() => {
            setstatusCheck(true);
        }).catch(() => {
            setstatusCheck(false);
        })
    }

useEffect(() => {
    checkPass();
}, [pass])

    return (
        <div className="w-full h-16 bg-gray-800 text-white flex items-center justify-between px-4">
            <div>
                <div>baza</div>

            </div>
            <div className="flex items-center gap-2">
                {statusCheck === true && <div className="text-green-400">✅</div>}
                {statusCheck === false && <div className="text-red-400">❌</div>}
                <label htmlFor="pass">password</label>
                <input name="pass" className="bg-amber-50 text-black" type="text" value={pass} onChange={e => {
                    setPass(e.target.value)
                   
                }} />
            </div>
        </div>
    );
}

export default Header;