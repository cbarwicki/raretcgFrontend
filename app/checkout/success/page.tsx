"use client";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function CheckoutSuccessContent() {

    const searchParams = useSearchParams();
    const orderId = searchParams.get("order_id");

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
                <h1 className="text-3xl font-bold mb-4">Thank you for your purchase!</h1>
                <p className="text-lg mb-6">Your order has been successfully processed.</p>
                <p className="text-md text-gray-600 mb-4">Order ID: {orderId}</p>
                <a href="/" className="text-blue-500 hover:underline">Return to Home</a>
            </div>
        </div>
    );
}

export default function CheckoutSuccessPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <CheckoutSuccessContent />
        </Suspense>
    );
}