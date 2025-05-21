const ProductDisplay = ({ product }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg mt-6 max-w-md mx-auto">
      <h2 className="text-xl font-semibold">{product.name}</h2>
      <p className="text-gray-700 mt-2">{product.description}</p>
      <img src={product.imageUrl} alt={product.name} className="mt-4 rounded-md" />
      <div className="mt-4 text-green-600 font-semibold">Health Score: {product.healthScore}</div>
    </div>
  );
};

export default ProductDisplay;