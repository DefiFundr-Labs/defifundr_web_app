import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Password from '../../components/password';

export default function CreatePassword() {
    const navigate = useNavigate();
    const [isValid, setIsValid] = useState(false);
    const [password, setPassword] = useState('');

    const handlePasswordChange = (newPassword: string, valid: boolean) => {
        setPassword(newPassword);
        setIsValid(valid);
    };

    const handleSubmit = async () => {
        if (isValid) {
            console.log('password: ', password);
            //!TODO: perform password creation logics
        }
    };

    return (
        <>
            <div className="mb-8">
                <h1 className="text-2xl font-bold mb-2">Create your account</h1>
                <p className="text-gray-600">Add security to your account.</p>
            </div>

            <Password onPasswordChange={handlePasswordChange} />

            <button
                onClick={handleSubmit}
                disabled={!isValid}
                className={`w-full py-3 px-4 rounded-full text-white font-medium mt-8 ${isValid
                    ? 'bg-gray-800 hover:bg-gray-950'
                    : 'bg-gray-300 cursor-not-allowed'
                    }`}
            >
                Continue
            </button>
        </>
    );
};

