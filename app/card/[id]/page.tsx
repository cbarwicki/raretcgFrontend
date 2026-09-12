import axios from "axios";
import DeleteButton from "./deleteButton";
import EditButton from "./editButton";
import AddToCart from "./addToCart";

// TODO: Cache Components adoption. Refactor this route so this opt-out can be removed.
// See: https://nextjs.org/docs/app/guides/migrating-to-cache-components
// export const instant = false;

type Card = {
  id: string;
  name: string;
  supertype: string;
  rarity: string;
  images_small: string;
  images_large: string;
  price: number;
  set_name: string;
};

export default async function CardView(props: {params: Promise<{ id: string }> }) {

    const params = await props.params;

    let card: Card | null = null;

    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/cards/${params.id}`)
        card = response.data.message
        console.log("Fetch successful")
    } catch (err) {
        console.log(err)
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4">
                <div className="max-w-6xl mx-auto">
                    <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-200 text-center">
                        <h1 className="text-2xl font-bold text-red-600 mb-4">Error Loading Card</h1>
                        <p className="text-gray-600">Unable to fetch card details. Please try again later.</p>
                    </div>
                </div>
            </div>
        );
    }

    if (!card) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4">
                <div className="max-w-6xl mx-auto">
                    <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-200 text-center">
                        <h1 className="text-2xl font-bold text-gray-600 mb-4">Card Not Found</h1>
                        <p className="text-gray-600">The requested card could not be found.</p>
                    </div>
                </div>
            </div>
        );
    }

    // console.log(params.id)
    console.log(card)

    return (
        <div className="min-h-screen py-8 px-4">
            <div className="max-w-6xl mx-auto">
                <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200">
                    {/* Header Section */}
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6">
                        <h1 className="text-4xl font-bold text-white mb-2">{card.name}</h1>
                        <div className="h-1 w-24 bg-white/30 rounded"></div>
                    </div>

                    {/* Main Content - Two Column Layout */}
                    <div className="p-8">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {/* Left Column - Card Image */}
                            <div className="flex items-center justify-center">
                                <div className="relative w-full max-w-md">
                                    <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-500 rounded-2xl blur-xl opacity-20"></div>
                                    <img 
                                        src={card.images_large} 
                                        alt={card.name}
                                        className="w-full h-auto rounded-lg object-contain"
                                    />
                                </div>
                            </div>

                            {/* Right Column - Card Details */}
                            <div className="flex flex-col justify-center">
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between p-5 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border border-gray-200 hover:shadow-md transition-shadow">
                                        <span className="text-lg font-semibold text-gray-700">Type:</span>
                                        <span className="text-lg font-bold text-blue-600 bg-blue-50 px-4 py-2 rounded-lg">{card.supertype}</span>
                                    </div>
                                    
                                    <div className="flex items-center justify-between p-5 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border border-gray-200 hover:shadow-md transition-shadow">
                                        <span className="text-lg font-semibold text-gray-700">Rarity:</span>
                                        <span className={`text-lg font-bold px-4 py-2 rounded-lg ${
                                            card.rarity === 'Common' ? 'text-gray-700 bg-gray-100' :
                                            card.rarity === 'Uncommon' ? 'text-green-700 bg-green-50' :
                                            card.rarity === 'Rare' ? 'text-blue-700 bg-blue-50' :
                                            card.rarity === 'Epic' ? 'text-purple-700 bg-purple-50' :
                                            'text-yellow-700 bg-yellow-50'
                                        }`}>
                                            {card.rarity}
                                        </span>
                                    </div>

                                    {card.set_name && (
                                        <div className="flex items-center justify-between p-5 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border border-gray-200 hover:shadow-md transition-shadow">
                                            <span className="text-lg font-semibold text-gray-700">Set Name:</span>
                                            <span className="text-lg font-bold text-blue-600 bg-blue-50 px-4 py-2 rounded-lg">{card.set_name}</span>
                                        </div>
                                    )}

                                    <div className="flex items-center justify-between p-5 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border-2 border-blue-200 hover:shadow-md transition-shadow">
                                        <span className="text-lg font-semibold text-gray-700">Price:</span>
                                        <span className="text-2xl font-bold text-blue-600 bg-white px-4 py-2 rounded-lg shadow-sm">
                                            ${card.price || '0.00'}
                                        </span>
                                    </div>
                                </div>
                                
                                <div>
                                    <AddToCart cardID={params.id}/>
                                </div>
                                
                                <div className="flex gap-4 mt-8">
                                    <EditButton cardID={params.id} />
                                    <DeleteButton cardID={params.id}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}