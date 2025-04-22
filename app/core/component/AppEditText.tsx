import React from "react";

interface EditTextProps {
    key?: any;
    label?: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    type?: string;
    required?: boolean;
    disabled?: boolean;
    className?: string;
    icon?: React.ReactNode;
}

const EditText: React.FC<EditTextProps> = ({
                                               key,
                                               label,
                                               name,
                                               value,
                                               onChange,
                                               placeholder = "",
                                               type = "text",
                                               required = false,
                                               disabled = false,
                                               className = "",
                                               icon,
                                           }) => {
    return (
        <div className={`w-full ${className}`}>
            {label && (
                <label htmlFor={name} className="text-sm font-medium text-gray-700 mb-1 block">
                    {label}
                </label>
            )}
            <div
                className="flex items-center border border-gray-300 rounded-md p-2 bg-white focus-within:ring-2 focus-within:ring-blue-500 transition">
                {icon && <div className="text-gray-500 mr-2">{icon}</div>}
                <input
                    key={key}
                    id={name}
                    name={name}
                    type={type}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    required={required}
                    disabled={disabled}
                    className="outline-none flex-1 text-sm bg-transparent text-black"
                />
            </div>
        </div>
    );
};

export default EditText;
