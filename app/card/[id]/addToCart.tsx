"use client"
import { useState, useEffect } from "react"
// import { jwtDecode } from "jwt-decode"
import { toast } from "react-toastify"
import axios from "axios"
import { useAuth } from "@/app/context/AuthContext"
import Link from "next/link"

interface AddToCartProps {
    cardID: string
}

// interface DecodedToken {
//     userId: string
//     [key: string]: any
// }

export default function AddToCart({ cardID }: AddToCartProps) {

    const { user, isLoggedIn } = useAuth();

    const [quantity, setQuantity] = useState(1)
    // const [decoded, setDecoded] = useState<DecodedToken | null>(null)

    // useEffect(() => {
    //     const token = localStorage.getItem("token")
    //     if (token){
    //         setDecoded(jwtDecode<DecodedToken>(token))
    //     } else {
    //         setDecoded(null)
    //     }
    
    // }, []);

    // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     const value = Number(e.target.value)
    //     if (value >= 1) {
    //         setQuantity(value)
    //     }
    // }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!isLoggedIn) {
            console.error("User not authenticated")
            return
        }

        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/users/add-to-cart`, {
                userId: user?.userId,
                cardId: cardID,
                quantity: quantity
            })
            console.log(`card: ${cardID}`)
            console.log(`quanity: ${quantity}`)
            console.log("added to cart")
            console.log("Response:", response.data)
            toast("Added to Cart!")
        } catch(error) {
            console.error("error adding to cart", error)
        }
    }

    const handleDecrease = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1)
        }
    }

    const handleIncrease = () => {
        setQuantity(quantity + 1)
    }

    return (
        <div className="mt-6">
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Quantity Selector */}
                <div className="flex items-center gap-4">
                    <label htmlFor="quantity" className="text-lg font-semibold text-gray-700">
                        Quantity:
                    </label>
                    <div className="flex items-center border-2 border-gray-300 rounded-lg overflow-hidden bg-white shadow-sm">
                        <button
                            type="button"
                            onClick={handleDecrease}
                            disabled={quantity <= 1}
                            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 active:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-bold text-gray-700"
                            aria-label="Decrease quantity"
                        >
                            −
                        </button>
                        <input 
                            type="number"
                            id="quantity"
                            name="quantity"
                            value={quantity}
                            // onChange={handleChange}
                            disabled={true}
                            min={1}
                            className="w-20 px-4 py-2 text-center text-lg font-semibold border-x-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <button
                            type="button"
                            onClick={handleIncrease}
                            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 active:bg-gray-300 transition-colors font-bold text-gray-700"
                            aria-label="Increase quantity"
                        >
                            +
                        </button>
                    </div>
                </div>

                {/* Add to Cart Button */}
                {isLoggedIn ? (
                    <button 
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-4 px-6 rounded-lg shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-purple-700 active:scale-[0.98] transition-all duration-200 text-lg flex items-center justify-center gap-2"
                    >
                        <svg 
                            className="w-5 h-5" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                        >
                            <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                strokeWidth={2} 
                                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" 
                            />
                        </svg>
                        Add to Cart
                    </button>
                ):
                    <Link href="/login" className="block">
                        <button
                            type="button"
                            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-4 px-6 rounded-lg shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-purple-700 active:scale-[0.98] transition-all duration-200 text-lg flex items-center justify-center gap-2"
                        >
                            <svg 
                                className="w-5 h-5" 
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24"
                            >
                                <path 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round" 
                                    strokeWidth={2} 
                                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" 
                                />
                            </svg>
                            <span>Log In To Add Items To Your Cart</span>
                        </button>
                    </Link>
                }
                
            </form>
        </div>
    )
}