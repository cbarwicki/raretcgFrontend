// TODO: Cache Components adoption. Refactor this route so this opt-out can be removed.
// See: https://nextjs.org/docs/app/guides/migrating-to-cache-components
// export const instant = false;

export default function SingleCardView() {
  return (
    <div className="text-center py-12">
      <div className="bg-white rounded-lg shadow-md p-8 max-w-md mx-auto">
        <p className="text-gray-600 text-lg">Please select a card to view its details.</p>
        <a 
          href="/all-cards" 
          className="inline-block mt-4 text-blue-600 hover:text-blue-800 font-semibold"
        >
          View All Cards →
        </a>
      </div>
    </div>
  );
}