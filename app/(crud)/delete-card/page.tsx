"use client"
import axios from "axios";
import { useState } from "react";

export default function DeleteCardView() {

    const [cardID, setCardID] = useState(0);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setCardID(Number(value))
    };

    const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/cards/${cardID}`);
            console.log('Card deleted successfully');
            console.log("Response:", response.data.message);
        } catch(error) {
            console.error("Error submitting form:", error);
        } 
    };

    return (
        <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-lg shadow-xl p-8 border border-gray-200">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Delete A Card</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="id" className="block text-sm font-semibold text-gray-700 mb-2">
                            Card ID
                        </label>
                        <input 
                            type="number"
                            id="id"
                            name="id"
                            value={cardID}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                            placeholder="Enter card ID to delete"
                            required
                            min="1"
                        />
                    </div>
                    
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                        <p className="text-sm text-red-800">
                            ⚠️ Warning: This action cannot be undone. The card will be permanently deleted.
                        </p>
                    </div>
                    
                    <div className="pt-4">
                        <button 
                            type="submit"
                            className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
                        >
                            Delete Card
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );

}