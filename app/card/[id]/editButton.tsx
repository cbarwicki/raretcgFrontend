"use client"
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/context/AuthContext'

export default function EditButton( {cardID}: {cardID: string} ) {

    const router = useRouter();
    const { isLoggedIn } = useAuth();
    const { user } = useAuth();

    const handleClick = async () => {
        router.push(`/edit-card/${cardID}`);
        console.log("redirected to edit page")
    }

    return(
        <div>
            { isLoggedIn && user?.role === 'admin' ? (
                <button 
                    onClick={handleClick}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
                >
                    Edit Card
                </button>
            ): null }
        </div>
    )

}