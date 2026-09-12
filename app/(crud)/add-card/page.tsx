"use client"
import axios from "axios";
import { useState } from "react";
import { useRouter } from 'next/navigation';
import { toast } from "react-toastify";

export default function AddCardView() {

    const [formData, setFormData] = useState({
        name: '',
        id: '',
        type: '',
        rarity: '',
        setName: '',
        price: '',
        imgSmall: '',
        imgLarge: '',
    });

    const router = useRouter()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
        ...prevData,
        [name]: value
        }));
    };

    const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/api/cards`,
                formData
            );
            toast('Card Added Successfully!')
            console.log('Form submitted successfully');
            console.log("Response:", response.data);
            router.push('/all-cards')
        } catch(error) {
            console.error("Error submitting form:", error);
        } 
    };

    return (
        <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-lg shadow-xl p-8 border border-gray-200">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Add A Card</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                            Name
                        </label>
                        <input 
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            placeholder="Enter card name"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="id" className="block text-sm font-semibold text-gray-700 mb-2">
                            ID
                        </label>
                        <input 
                            type="text"
                            id="id"
                            name="id"
                            value={formData.id}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            placeholder="Enter card ID"
                            required
                        />
                    </div>
                    
                    <div>
                        <label htmlFor="type" className="block text-sm font-semibold text-gray-700 mb-2">
                            Type
                        </label>
                        <select
                            id="type"
                            name="type"
                            value={formData.type}
                            onChange={handleChange}
                            className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${formData.type === '' ? 'text-gray-400' : 'text-gray-900'}`}
                        >
                            <option value={""} className="text-gray-400">Select card type</option>
                            <option value={"Pokémon"} className="text-gray-700">Pokémon</option>
                            <option value={"Trainer"} className="text-gray-700">Trainer</option>  
                        </select>
                    </div>
                    
                    <div>
                        <label htmlFor="rarity" className="block text-sm font-semibold text-gray-700 mb-2">
                            Rarity
                        </label>
                        <select
                            id="rarity"
                            name="rarity"
                            value={formData.rarity}
                            onChange={handleChange}
                            className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${formData.rarity === '' ? 'text-gray-400' : 'text-gray-900'}`}
                        >
                            <option value={""} className="text-gray-400">Select rarity</option>
                            <option value={"Common"} className="text-gray-700">Common</option>
                            <option value={"Uncommon"} className="text-gray-700">Uncommon</option>  
                            <option value={"Rare"} className="text-gray-700">Rare</option>
                            <option value={"Double Rare"} className="text-gray-700">Double Rare</option>   
                            <option value={"Ultra Rare"} className="text-gray-700">Ultra Rare</option>
                            <option value={"Hyper Rare"} className="text-gray-700">Hyper Rare</option>  
                            <option value={"ACE SPEC Rare"} className="text-gray-700">ACE SPEC Rare</option>
                            <option value={"Illustration Rare"} className="text-gray-700">Illustration Rare</option>  
                            <option value={"Special Illustration Rare"} className="text-gray-700">Special Illustration Rare</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="setName" className="block text-sm font-semibold text-gray-700 mb-2">
                            Set Name
                        </label>
                        <select
                            id="setName"
                            name="setName"
                            value={formData.setName}
                            onChange={handleChange}
                            className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${formData.setName === '' ? 'text-gray-400' : 'text-gray-900'}`}
                        >
                            <option value={""} className="text-gray-400">Select Set Name</option>
                            <option value={"Twilight Masquerade"} className="text-gray-700">Twilight Masquerade</option>
                        </select>
                    </div>
                    
                    <div>
                        <label htmlFor="price" className="block text-sm font-semibold text-gray-700 mb-2">
                            Price
                        </label>
                        <input 
                            type="number"
                            id="price"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            placeholder="Enter Price"
                            required
                            min="0"
                        />
                    </div>

                    <div>
                        <label htmlFor="imgSmall" className="block text-sm font-semibold text-gray-700 mb-2">
                            Image URL (small)
                        </label>
                        <input 
                            type="string"
                            id="imgSmall"
                            name="imgSmall"
                            value={formData.imgSmall}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            placeholder="Enter URL"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="imgLarge" className="block text-sm font-semibold text-gray-700 mb-2">
                            Image URL (large)
                        </label>
                        <input 
                            type="string"
                            id="imgLarge"
                            name="imgLarge"
                            value={formData.imgLarge}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            placeholder="Enter URL"
                            required
                        />
                    </div>
                    
                    <div className="pt-4">
                        <button 
                            type="submit"
                            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
                        >
                            Add Card
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );

}