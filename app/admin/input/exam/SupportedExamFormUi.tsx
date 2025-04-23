'use client'
import React, {useRef, useState} from 'react'
import AppEditText from "@/app/core/component/AppEditText";
import ActionButton from "@/app/core/component/ActionButton";
import {apiRequest} from "@/app/network/GenericApiHandler";

import { Image as ImageIcon } from "lucide-react"; // Icon for thumbnail

export default function SupportedExamsForm() {
    const [categoryName, setCategoryName] = useState('');
    const [thumbnail, setThumbnail] = useState('');
    const [subCategories, setSubCategories] = useState([{ subCategory: '', imageUrl: '' }]);

    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleSubChange = (index: number, field: string, value: string) => {
        const updated = [...subCategories];
        updated[index][field as keyof typeof updated[0]] = value;
        setSubCategories(updated);
    };

    const addSubCategory = () => {
        setSubCategories([...subCategories, { subCategory: '', imageUrl: '' }]);
    };

    const handleSubmit = () => {
        const payload = {
            categoryName,
            thumbnail,
            subCategories: subCategories.filter(sub => sub.subCategory.trim() !== '')
        };

        console.log('Request Body:', payload);
        handleSubmitToServer(payload).then(() => {});
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const updatedSubCategories = [...subCategories];
                updatedSubCategories[index].imageUrl = reader.result as string;
                setSubCategories(updatedSubCategories);
            };
            reader.readAsDataURL(file);
        }
    };

    const triggerFileInput = (event: React.MouseEvent<SVGSVGElement, MouseEvent>, index: number) => {
        // Prevent the default behavior and trigger the file input for the selected subcategory
        fileInputRef.current?.click();
    };

    return (
        <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-xl mt-10 h-[600px]">
            <div className="p-6 space-y-6 overflow-y-auto h-full">
                <h2 className="text-2xl font-bold text-center text-black">Create Category</h2>

                <AppEditText
                    name={"Category Name"}
                    type="text"
                    value={categoryName}
                    onChange={e => setCategoryName(e.target.value)}
                    placeholder="Category Name"
                    className="w-full p-2 border rounded-lg"
                />

                {/* Thumbnail with clickable icon to upload */}
                <div className="relative">
                    <AppEditText
                        name={"Thumbnail"}
                        type="text"
                        value={thumbnail}
                        onChange={e => setThumbnail(e.target.value)}
                        placeholder="Thumbnail URL or upload"
                        className="w-full p-2 border rounded-lg pr-10"
                    />
                    <ImageIcon
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 cursor-pointer"
                        onClick={(e) => triggerFileInput(e, -1)} // We now pass the event as the first parameter
                    />
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileChange(e, -1)} // Pass the index (-1 for the main thumbnail)
                        className="hidden"
                    />
                    {thumbnail && (
                        <img
                            src={thumbnail}
                            alt="Thumbnail Preview"
                            className="mt-2 h-12 w-auto rounded-lg border"
                            onError={(e) => (e.currentTarget.style.display = 'none')}
                        />
                    )}
                </div>

                {/* Subcategories */}
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-black">Sub Categories</h3>
                    {subCategories.map((sub, index) => (
                        <div key={index} className="grid sm:grid-cols-2 gap-4">
                            <AppEditText
                                name={"SubCategory..."}
                                type="text"
                                placeholder="Subcategory Name"
                                value={sub.subCategory}
                                onChange={e => handleSubChange(index, 'subCategory', e.target.value)}
                                className="p-2 border rounded-lg"
                            />
                            <div className="relative">
                                <AppEditText
                                    name={"Thumbnail"}
                                    type="text"
                                    placeholder="Image URL or upload"
                                    value={sub.imageUrl}
                                    onChange={e => handleSubChange(index, 'imageUrl', e.target.value)}
                                    className="p-2 border rounded-lg pr-10"
                                />
                                <ImageIcon
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 cursor-pointer"
                                    onClick={(e) => triggerFileInput(e, index)} // Pass the event and index for each subcategory
                                />
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleFileChange(e, index)} // Use the appropriate index
                                    className="hidden"
                                />
                                {sub.imageUrl && (
                                    <img
                                        src={sub.imageUrl}
                                        alt="Subcategory Preview"
                                        className="mt-2 h-12 w-auto rounded-lg border"
                                        onError={(e) => (e.currentTarget.style.display = 'none')}
                                    />
                                )}
                            </div>
                        </div>
                    ))}

                    <ActionButton
                        variant="secondary"
                        width={"w-300.px"}
                        text={"Add SubCategory"}
                        onClick={addSubCategory}
                    />
                </div>

                <ActionButton text={"Submit"} onClick={handleSubmit} />
            </div>
        </div>
    );
}

const handleSubmitToServer = async (payload: {
    categoryName?: string;
    thumbnail?: string;
    subCategories: {
        subCategory?: string;
        imageUrl?: string;
    }[];
}) => {
    try {
        let response = await apiRequest<any, typeof payload>({
            url: "exams/create-exam-with-subcategory",
            method:"POST",
            body: payload
        })

        if (!response.ok) {
            const error = await response.text();
            throw new Error(`Failed: ${response.status} - ${error}`);
        }
        const data = await response.json();
        console.log('Success:', data);
        alert('Exam category created successfully!');
    } catch (err) {
        console.error('Error:', err);
        alert('Something went wrong. Check console.');
    }
};
