import CardComponent from "../../components/card";
import TriangleGenerator from "../../components/TriangleGenerator";
import WaterCalculator from "../../components/watercal";

export default function Home() {
  return (
    <>
      <div className="bg-gray-50 py-10 min-h-screen">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-bold text-red-500 mb-1 tracking-wider">
            RECOMMENDED
          </h2>
          <h3 className="text-3xl font-extrabold text-gray-800 mb-8">
            Recipes
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <CardComponent
              imageUrl="/Food-Bifold-Menu-09.jpg"
              imageAlt="Delicious Recipe"
              title="THAI SPICY SALAD"
              description="A very fresh and spicy Thai salad that combines a delightful blend of herbs and spices."
              footerText="15 mins | 2 servings"
              tag="HOT"
            />
            <CardComponent
              imageUrl="/Food-Bifold-Menu-09.jpg"
              imageAlt="Another Dish"
              title="MANGO STICKY RICE"
              description="Classic Thai dessert with sweet mango and creamy coconut sticky rice, perfect for any time."
              footerText="30 mins | 4 servings"
              tag="BEST"
            />
            <CardComponent
              imageUrl="/Food-Bifold-Menu-09.jpg"
              imageAlt="Third Dish"
              title="FRIED NOODLES"
              description="Popular Thai stir-fried noodles with your choice of protein and fresh vegetables."
              footerText="20 mins | 3 servings"
              tag="NEW"
            />
            <CardComponent
              imageUrl="/Food-Bifold-Menu-09.jpg"
              imageAlt="Fourth Dish"
              title="GREEN CURRY"
              description="A rich and aromatic Thai green curry with coconut milk and tender chicken."
              footerText="35 mins | 3 servings"
              tag="HOT"
            />
          </div>
        </div>
      </div>
      <TriangleGenerator />
      <WaterCalculator />
    </>
  );
}
