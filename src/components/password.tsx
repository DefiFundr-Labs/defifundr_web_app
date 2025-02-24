import { useState, useEffect } from 'react';
import { Eye, EyeClosed } from 'lucide-react';

interface PasswordRequirement {
    id: string;
    label: string;
    regex: RegExp;
    met: boolean;
}

interface PasswordProps {
    onPasswordChange: (password: string, isValid: boolean) => void;
}

export default function Password({ onPasswordChange }: PasswordProps) {
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [requirements, setRequirements] = useState<PasswordRequirement[]>([
        {
            id: 'length',
            label: 'Minimum of 8 characters',
            regex: /.{8,}/,
            met: false
        },
        {
            id: 'uppercase',
            label: 'At least one uppercase letter (A-Z)',
            regex: /[A-Z]/,
            met: false
        },
        {
            id: 'number',
            label: 'At least one number (0-9)',
            regex: /[0-9]/,
            met: false
        },
        {
            id: 'special',
            label: 'At least one special character (!@#$%^&*)',
            regex: /[!@#$%^&*]/,
            met: false
        }
    ]);

    const validatePassword = (value: string) => {
        const updatedRequirements = requirements.map(req => ({
            ...req,
            met: req.regex.test(value)
        }));
        setRequirements([...updatedRequirements]);
        const isValid = updatedRequirements.every(req => req.met);
        onPasswordChange(value, isValid);
    };

    useEffect(() => {
        validatePassword(password);
    }, [password]);

    return (
        <div>
            <div className="relative mb-6">
                <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-3 border rounded-lg pr-12"
                    placeholder="Enter password"
                    aria-label="Password input"
                />
                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                    {showPassword ? <EyeClosed size={20} /> : <Eye size={20} />}
                </button>
            </div>

            <div className="space-y-3">
                {requirements.map((req) => (
                    <div
                        key={req.id}
                        className="flex items-center gap-2"
                        aria-live="polite"
                    >
                        <div
                            className={`w-4 h-4 rounded-full border ${req.met ? 'bg-green-500 border-green-500' : 'border-purple-500 bg-purple-50'
                                }`}
                        />
                        <span className={req.met ? 'text-green-500' : 'text-gray-600'}>
                            {req.label}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

