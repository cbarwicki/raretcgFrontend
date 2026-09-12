"use client"
import { useEffect, useState } from "react"
// import { jwtDecode } from "jwt-decode"
import axios from "axios"
import { useAuth } from '@/app/context/AuthContext'

// type Card = {
//     id: string;
//     name: string;
//     price: number;
//     images: {
//         small: string;
//         large: string;
//     };
// }


type CartItem = {
    id: number;
    name: string;
    card_id: string;
    price: number;
    images_small: string;
    quantity: number;
}

// type UserInfo = {
//     userId: string;
//     email?: string;
// }

export default function CartView () {

    const { user } = useAuth();
    const { isLoggedIn } = useAuth();

    const [cart, setCart] = useState<CartItem[]>([])
    // const [userInfo, setUserInfo] = useState<UserInfo | null>(null)

    // this state is used to call the useEffect function
    const [trigger, setTrigger] = useState(false);
    
    const [error, setError] = useState("");

    useEffect(() => {
        // const token = localStorage.getItem("token")
        // if (!token) return;
        
        // const decodedUser = jwtDecode<UserInfo>(token)
        // setUserInfo(decodedUser)
        const fetchCart = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/cart/${user?.userId}`)
                const cartData = response.data.message
                console.log("Response:", cartData)
                setCart(cartData)
                console.log(cart)
            }
            catch (err) {
                console.log(err)
            }
        }
        fetchCart()
    }, [trigger])

    const handleDelete = async (cardId: number) => {
        if (!isLoggedIn || !user?.userId) return;
        const response = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/cart/${user.userId}/${cardId}`)
        console.log("Response:", response.data.message)
        console.log(`${cardId} removed from cart`)
        setTrigger(prev => !prev);
    }

    const handleCheckout = async () => {
        try {
        // setLoading(true);
        setError("");

        const response = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/api/checkout/create-checkout-session`,
            { cart, userId: user?.userId },
            // {
            // headers: {
            //     Authorization: `Bearer ${localStorage.getItem("token")}`,
            // },
            // }
        );

        window.location.href = response.data.checkoutUrl;
        } catch (error) {
        console.error(error);
        setError("Checkout could not be started.");
        // setLoading(false);
        }
    };

    // Calculate total price
    const totalPrice = cart.reduce((sum, cartItem) => {
        return sum + (cartItem.price * cartItem.quantity)
    }, 0)

    return (
        <div className="min-h-screen py-8 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-xl mb-8 p-6 md:p-8">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">Your Cart</h1>
                    <p className="text-blue-100 text-lg">
                        {cart.length === 0 
                            ? "Your cart is empty" 
                            : `${cart.length} ${cart.length === 1 ? 'item' : 'items'} in your cart`
                        }
                    </p>
                </div>

                {cart.length === 0 ? (
                    <div className="bg-white rounded-2xl shadow-lg p-12 text-center border border-gray-200">
                        <div className="max-w-md mx-auto">
                            <svg className="mx-auto h-24 w-24 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                            </svg>
                            <h2 className="text-2xl font-bold text-gray-700 mb-2">Your cart is empty</h2>
                            <p className="text-gray-500 mb-6">Start adding some trading cards to your cart!</p>
                            <a 
                                href="/all-cards" 
                                className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold px-6 py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all shadow-md hover:shadow-lg"
                            >
                                Browse Cards
                            </a>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Cart Items */}
                        <div className="lg:col-span-2 space-y-4">
                            {cart.map((cartItem) => (
                                <div 
                                    key={cartItem.card_id}
                                    className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow duration-300"
                                >
                                    <div className="p-6">
                                        <div className="flex flex-col sm:flex-row gap-6">
                                            {/* Card Image */}
                                            <div className="flex-shrink-0">
                                                <div className="relative w-full sm:w-48 h-64 sm:h-64 rounded-lg overflow-hidden">
                                                    <img 
                                                        src={cartItem.images_small} 
                                                        alt={cartItem.name}
                                                        className="w-full h-full object-contain p-2"
                                                    />
                                                </div>
                                            </div>

                                            {/* Card Details */}
                                            <div className="flex-1 flex flex-col justify-between">
                                                <div>
                                                    <h3 className="text-2xl font-bold text-gray-800 mb-2">
                                                        {cartItem.name}
                                                    </h3>
                                                    <p className="text-sm text-gray-500 mb-4 font-mono">
                                                        ID: {cartItem.card_id}
                                                    </p>
                                                    
                                                    <div className="flex flex-wrap gap-4 mb-4">
                                                        <div className="bg-blue-50 px-4 py-2 rounded-lg border border-blue-200">
                                                            <span className="text-sm text-gray-600 font-medium">Price:</span>
                                                            <span className="text-lg font-bold text-blue-600 ml-2">
                                                                ${cartItem.price || '0.00'}
                                                            </span>
                                                        </div>
                                                        <div className="bg-purple-50 px-4 py-2 rounded-lg border border-purple-200">
                                                            <span className="text-sm text-gray-600 font-medium">Quantity:</span>
                                                            <span className="text-lg font-bold text-purple-600 ml-2">
                                                                {cartItem.quantity}
                                                            </span>
                                                        </div>
                                                        
                                                    </div>
                                                </div>

                                                {/* Delete Button */}
                                                <button 
                                                    onClick={() => handleDelete(cartItem.id)}
                                                    className="self-start mt-4 px-6 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition-colors duration-200 shadow-md hover:shadow-lg flex items-center gap-2"
                                                >
                                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                    </svg>
                                                    Remove from Cart
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Order Summary */}
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 sticky top-8">
                                <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-4 border-b border-gray-200">
                                    Order Summary
                                </h2>
                                
                                <div className="space-y-4 mb-6">
                                    <div className="flex justify-between text-gray-600">
                                        <span>Subtotal ({cart.length} {cart.length === 1 ? 'item' : 'items'})</span>
                                        <span className="font-semibold">${totalPrice.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-gray-600">
                                        <span>Shipping</span>
                                        <span className="font-semibold">Free</span>
                                    </div>
                                    <div className="pt-4 border-t border-gray-200">
                                        <div className="flex justify-between items-center">
                                            <span className="text-xl font-bold text-gray-800">Total</span>
                                            <span className="text-2xl font-bold text-blue-600">
                                                ${totalPrice.toFixed(2)}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <button onClick={handleCheckout} className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-4 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl text-lg">
                                    Proceed to Checkout
                                </button>

                                <a 
                                    href="/all-cards"
                                    className="block text-center mt-4 text-blue-600 hover:text-blue-700 font-medium transition-colors"
                                >
                                    Continue Shopping
                                </a>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}