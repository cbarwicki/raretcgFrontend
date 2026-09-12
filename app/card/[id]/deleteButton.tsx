"use client"
import axios from "axios"
import { useRouter } from 'next/navigation';
import { toast } from "react-toastify";
import { useAuth } from '@/app/context/AuthContext'

export default function DeleteButton( {cardID}: {cardID: string} ) {

    const { isLoggedIn } = useAuth();
    const { user } = useAuth();
    
    const router = useRouter();

    const handleClick = async () => {
        try {
            const response = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/cards/${cardID}`);
            toast('Card Deleted!')
            console.log('Form submitted successfully');
            console.log("Response:", response.data);
            router.push('/all-cards')
        } catch(error) {
            console.error("Error submitting form:", error);
        } 
        console.log(`card ${cardID} deleted`)
    }

    return(
        <div>
            { isLoggedIn && user?.role === 'admin' ? (
                <button 
                    onClick={handleClick}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
                >
                    Delete Card
                </button>
            ): null }
        </div>
    )

}