'use client'
import {useState} from 'react'
import AppEditText from "@/app/core/component/AppEditText";
import ActionButton from "@/app/core/component/ActionButton";
import {apiRequest} from "@/app/network/GenericApiHandler";

export default function SupportedExamsForm() {
    const [categoryName, setCategoryName] = useState('')
    const [thumbnail, setThumbnail] = useState('')
    const [subCategories, setSubCategories] = useState([{subCategory: '', imageUrl: ''}])

    const handleSubChange = (index: number, field: string, value: string) => {
        const updated = [...subCategories]
        updated[index][field as keyof typeof updated[0]] = value
        setSubCategories(updated)
    }

    const addSubCategory = () => {
        setSubCategories([...subCategories, {subCategory: '', imageUrl: ''}])
    }

    const handleSubmit = () => {
        const payload = {
            categoryName,
            thumbnail,
            subCategories: subCategories.filter(
                sub => sub.subCategory.trim() !== ''
            )
        }

        console.log('Request Body:', payload)
        handleSubmitToServer(payload).then(() => {

        })
    }

    return (
        <div className="max-w-2xl mx-auto p-6 space-y-6 bg-white shadow-xl rounded-xl mt-10">
            <h2 className="text-2xl font-bold text-center text-black">Create Category</h2>

            <AppEditText
                name={"Category Name"}
                type="text"
                value={categoryName}
                onChange={e => setCategoryName(e.target.value)}
                placeholder="Category Name"
                className="w-full p-2 border rounded-lg"
            />

            <AppEditText
                name={"Thumbnail"}
                type="text"
                value={thumbnail}
                onChange={e => setThumbnail(e.target.value)}
                placeholder="Thumbnail URL"
                className="w-full p-2 border rounded-lg"
            />

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
                        <AppEditText
                            name={"Thumbnail"}
                            type="text"
                            placeholder="Image URL"
                            value={sub.imageUrl}
                            onChange={e => handleSubChange(index, 'imageUrl', e.target.value)}
                            className="p-2 border rounded-lg"
                        />
                    </div>
                ))}

                <ActionButton
                    variant="secondary"
                    width={"w-300.px"}
                    text={"Add SubCategory"}
                    onClick={addSubCategory}/>
            </div>

            <ActionButton
                text={"Submit"}
                onClick={handleSubmit}/>
        </div>
    )
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
        let response = await apiRequest<any, any>({
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
