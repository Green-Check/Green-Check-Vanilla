// START OF UPDATED data.js

// data.js
// Contains the PRODUCTS and ALTERNATIVE RECOMMENDATIONS data.

export const PRODUCTS = [
    // --- Existing Products --- (IDs 1-14 remain the same as in your original file)
    {
        id: "1", barcode: "9780201379624", name: "Dark Chocolate Bar", description: "70% cocoa dark chocolate bar with hints of vanilla.", healthScore: 65, category: "Chocolate", image: "https://images.unsplash.com/photo-1511381939415-e340152efb59?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZGFyayUyMGNob2NvbGF0ZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60", brand: "Choco Delights", lastUpdated: "Today", calories: 180, servingSize: "per 30g (3 squares)", nutrients: { carbs: 13, protein: 2, fat: 12 }, ingredients: ["Cocoa Mass", "Cocoa Butter", "Sugar", "Vanilla Extract", "Soy Lecithin"], allergens: "May contain traces of milk, nuts, and wheat", healthStatus: "moderate",
        price: 150, pricePerServing: 50, valueRating: 7, incomeSuitability: ["medium_low", "medium_high", "high"]
    },
    {
        id: "2", barcode: "5012345678900", name: "Milk Chocolate Biscuits", description: "Crispy biscuits coated with milk chocolate.", healthScore: 35, category: "Biscuits", image: "https://images.unsplash.com/photo-1604151808439-8649cc74441a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y2hvY29sYXRlJTIwYmlzY3VpdHN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60", brand: "Sweet Treats", lastUpdated: "Yesterday", calories: 240, servingSize: "per 50g (5 biscuits)", nutrients: { carbs: 28, protein: 3, fat: 14 }, ingredients: ["Wheat Flour", "Sugar", "Vegetable Oil", "Milk Chocolate (30%)", "Salt", "Raising Agents"], allergens: "Contains wheat, milk, and soy. May contain traces of nuts.", healthStatus: "unhealthy",
        price: 80, pricePerServing: 16, valueRating: 5, incomeSuitability: ["low", "medium_low", "medium_high", "high"]
    },
    {
        id: "3", barcode: "8901234567890", name: "Organic Fruit & Nut Bar", description: "Natural energy bar made with organic dried fruits and nuts.", healthScore: 85, category: "Snack Bars", image: "https://images.unsplash.com/photo-1621939514649-280e2ee25f60?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZnJ1aXQlMjBudXQlMjBiYXJ8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60", brand: "Nature's Best", lastUpdated: "2 days ago", calories: 150, servingSize: "per 35g bar", nutrients: { carbs: 22, protein: 5, fat: 7 }, ingredients: ["Dates", "Almonds", "Cashews", "Raisins", "Sunflower Seeds"], allergens: "Contains tree nuts. Manufactured in a facility that processes peanuts.", healthStatus: "healthy",
        price: 180, pricePerServing: 180, valueRating: 8, incomeSuitability: ["medium_high", "high"]
    },
    {
        id: "4", barcode: "6809011904814", name: "Potato Chips Original", description: "Classic salted potato chips.", healthScore: 25, category: "Chips", image: "https://images.unsplash.com/photo-1599490659213-4cee7ff52b59?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cG90YXRvJTIwY2hpcHN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60", brand: "Crispy Crunch", lastUpdated: "3 days ago", calories: 220, servingSize: "per 40g (1 handful)", nutrients: { carbs: 22, protein: 2, fat: 15 }, ingredients: ["Potatoes", "Vegetable Oil", "Salt"], allergens: "May contain traces of wheat.", healthStatus: "unhealthy",
        price: 30, pricePerServing: 30, valueRating: 4, incomeSuitability: ["low", "medium_low", "medium_high", "high"]
    },
    {
        id: "5", barcode: "8904117900739", name: "Organic Quinoa", description: "High-protein, gluten-free organic quinoa grains. Versatile and nutritious base for meals.", healthScore: 90, category: "Grains", image: "https://organicindia.com/cdn/shop/products/Quinoa_ing.jpg?v=1672736693", brand: "HealthyGrains", lastUpdated: "Recently Added", calories: 184, servingSize: "per 50g serving", nutrients: { carbs: 32.1, protein: 7.1, fat: 3.1 }, ingredients: ["Organic Quinoa"], allergens: "None known. Processed in a facility that may handle nuts.", healthStatus: "healthy",
        price: 350, pricePerServing: 35, valueRating: 7, incomeSuitability: ["medium_low", "medium_high", "high"]
    },
    {
        id: "6", barcode: "6164000276125", name: "Brown Rice", description: "Whole grain brown rice, a good source of fiber and complex carbohydrates.", healthScore: 84, category: "Grains", image: "https://images.unsplash.com/photo-1595514524374-a4410aabcb03?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YnJvd24lMjByaWNlfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60", brand: "NatureChoice", lastUpdated: "Recently Added", calories: 180, servingSize: "per 50g dry serving", nutrients: { carbs: 38.1, protein: 4.0, fat: 1.4 }, ingredients: ["Brown Rice"], allergens: "None known.", healthStatus: "healthy",
        price: 120, pricePerServing: 6, valueRating: 9, incomeSuitability: ["low", "medium_low", "medium_high", "high"]
    },
    {
        id: "7", barcode: "5000108022152", name: "Oats (Rolled)", description: "Heart-healthy rolled oats, excellent source of soluble fiber.", healthScore: 94, category: "Oats", image: "https://images.unsplash.com/photo-1587613864870-9545c8f0f6c7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cm9sbGVkJTIwb2F0c3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60", brand: "HeartHarvest", lastUpdated: "Recently Added", calories: 153, servingSize: "per 40g serving", nutrients: { carbs: 26.5, protein: 5.4, fat: 2.8 }, ingredients: ["Rolled Oats"], allergens: "May contain traces of wheat (processed in same facility).", healthStatus: "healthy",
        price: 150, pricePerServing: 6, valueRating: 9, incomeSuitability: ["low", "medium_low", "medium_high", "high"]
    },
    {
        id: "8", barcode: "8906055441657", name: "Buckwheat Flour", description: "Nutritious gluten-free flour made from buckwheat groats (Kuttu ka Atta).", healthScore: 86, category: "Flour", image: "https://images.unsplash.com/photo-1597040790454-916214ea94a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YnVja3doZWF0JTIwZmxvdXJ8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60", brand: "EarthyEats", lastUpdated: "Recently Added", calories: 185, servingSize: "per 50g serving", nutrients: { carbs: 35.8, protein: 6.7, fat: 1.7 }, ingredients: ["Buckwheat Flour"], allergens: "None known.", healthStatus: "healthy",
        price: 180, pricePerServing: 18, valueRating: 8, incomeSuitability: ["low", "medium_low", "medium_high", "high"]
    },
    {
        id: "9", barcode: "4556977991262", name: "Chia Seeds", description: "Tiny seeds packed with omega-3 fatty acids, fiber, and protein.", healthScore: 96, category: "Seeds", image: "https://images.unsplash.com/photo-1541713361671-96c6d5b5f4d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2hpYSUyMHNlZWRzfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60", brand: "NutriSeed", lastUpdated: "Recently Added", calories: 153, servingSize: "per 30g serving", nutrients: { carbs: 12.6, protein: 5.0, fat: 9.2 }, ingredients: ["Chia Seeds"], allergens: "None known.", healthStatus: "healthy",
        price: 250, pricePerServing: 30, valueRating: 7, incomeSuitability: ["medium_low", "medium_high", "high"]
    },
    {
        id: "10", barcode: "8901725000899", name: "Millet Mix", description: "A blend of various nutritious millet grains (like Ragi, Bajra, Jowar), naturally gluten-free.", healthScore: 82, category: "Grains", image: "https://images.unsplash.com/photo-1621588433159-42a6d700c6d2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWlsbGV0fGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60", brand: "GrainBlend", lastUpdated: "Recently Added", calories: 176, servingSize: "per 50g dry serving", nutrients: { carbs: 33.5, protein: 5.5, fat: 2.3 }, ingredients: ["Mixed Millets (e.g., Foxtail, Finger, Pearl)"], allergens: "None known.", healthStatus: "healthy",
        price: 160, pricePerServing: 8, valueRating: 9, incomeSuitability: ["low", "medium_low", "medium_high", "high"]
    },
    {
        id: "11", barcode: "6164000025303", name: "Lentils (Red Masoor)", description: "Quick-cooking red lentils (Masoor Dal), high in protein and fiber.", healthScore: 92, category: "Pulses", image: "https://images.unsplash.com/photo-1613430096641-a1f7f16e8d90?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmVkJTIwbGVudGlsc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60", brand: "PulsePerfect", lastUpdated: "Recently Added", calories: 176, servingSize: "per 50g dry serving", nutrients: { carbs: 30.1, protein: 12.9, fat: 0.5 }, ingredients: ["Red Lentils (Masoor Dal)"], allergens: "None known.", healthStatus: "healthy",
        price: 90, pricePerServing: 5, valueRating: 10, incomeSuitability: ["low", "medium_low", "medium_high", "high"]
    },
    {
        id: "12", barcode: "8902901232806", name: "Flax Seeds", description: "Rich source of omega-3 fatty acids (ALA), lignans, and fiber (Alsi).", healthScore: 88, category: "Seeds", image: "https://images.unsplash.com/photo-1591189863413-11998a4ccff9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZmxheCUyMHNlZWRzfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60", brand: "OmegaPower", lastUpdated: "Recently Added", calories: 171, servingSize: "per 30g serving", nutrients: { carbs: 8.7, protein: 5.5, fat: 12.7 }, ingredients: ["Flax Seeds"], allergens: "None known.", healthStatus: "healthy",
        price: 200, pricePerServing: 24, valueRating: 7, incomeSuitability: ["medium_low", "medium_high", "high"]
    },
    {
        id: "13", barcode: "841079009896", name: "Whole Wheat Pasta", description: "Pasta made from whole wheat flour, providing more fiber than regular pasta.", healthScore: 78, category: "Pasta", image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d2hvbGUlMjB3aGVhdCUyMHBhc3RhfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60", brand: "FitFuel", lastUpdated: "Recently Added", calories: 300, servingSize: "per 80g dry serving", nutrients: { carbs: 60.0, protein: 10.4, fat: 2.0 }, ingredients: ["Whole Wheat Durum Semolina"], allergens: "Contains Wheat.", healthStatus: "healthy",
        price: 130, pricePerServing: 21, valueRating: 7, incomeSuitability: ["low", "medium_low", "medium_high", "high"]
    },
    {
        id: "14", barcode: "8906156483495", name: "Sprouted Moong", description: "Sprouted moong beans (green gram), highly digestible and rich in nutrients.", healthScore: 98, category: "Pulses", image: "https://images.unsplash.com/photo-1600778225398-651988d13498?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c3Byb3V0ZWQlMjBtb29uZyUyMGJlYW5zfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60", brand: "GreenPulse", lastUpdated: "Recently Added", calories: 165, servingSize: "per 50g serving", nutrients: { carbs: 28.0, protein: 12.0, fat: 0.6 }, ingredients: ["Sprouted Moong Beans"], allergens: "None known.", healthStatus: "healthy",
        price: 100, pricePerServing: 20, valueRating: 9, incomeSuitability: ["low", "medium_low", "medium_high", "high"]
    },

    {
        id: "15", barcode: "8901491361026", name: "Kurkure Masala Munch", description: "Spicy, crunchy corn-based snack.", healthScore: 20, category: "Chips/Snacks", image: "https://www.bigbasket.com/media/uploads/p/xxl/102761_18-kurkure-namkeen-masala-munch.jpg", brand: "Kurkure", lastUpdated: "Recently Added", calories: 214, servingSize: "per 40g pack", nutrients: { carbs: 22, protein: 3, fat: 13 }, ingredients: ["Rice Meal", "Edible Vegetable Oil", "Corn Meal", "Gram Meal", "Spices & Condiments", "Salt", "Sugar", "Citric Acid", "Tartaric Acid"], allergens: "May contain traces of wheat, soy.", healthStatus: "unhealthy",
        price: 20, pricePerServing: 20, valueRating: 6, incomeSuitability: ["low", "medium_low", "medium_high", "high"]
    },
    {
        id: "16", barcode: "6001065225906", name: "Dairy Milk Chocolate", description: "Classic milk chocolate bar.", healthScore: 30, category: "Chocolate", image: "https://neelamfoodlandmumbai.com/cdn/shop/files/3301_1_1024x1024.jpg?v=1736099335", brand: "Cadbury", lastUpdated: "Recently Added", calories: 209, servingSize: "per 40g bar", nutrients: { carbs: 22, protein: 3, fat: 12 }, ingredients: ["Milk Solids", "Sugar", "Cocoa Butter", "Cocoa Mass", "Emulsifiers (442, 476)", "Flavours (Natural, Nature Identical and Artificial (Vanilla))"], allergens: "Contains Milk. Manufactured on equipment that also processes products containing tree nuts and wheat.", healthStatus: "unhealthy",
        price: 45, pricePerServing: 45, valueRating: 5, incomeSuitability: ["low", "medium_low", "medium_high", "high"]
    },
    {
        id: "17",
        barcode: "8901764012808",
        name: "Coca-Cola",
        description: "Classic carbonated soft drink with a unique cola flavor.",
        healthScore: 20,
        category: "Soft Drink",
        image: "https://cdn.uengage.io/uploads/18085/image-381513-1685703917.jpeg",
        brand: "Coca-Cola",
        lastUpdated: "Recently Added",
        calories: 210,
        servingSize: "per 500ml bottle",
        nutrients: {
            carbs: 53,
            protein: 0,
            fat: 0
        },
        ingredients: [
            "Carbonated Water",
            "Sugar",
            "Caramel Colour (E150d)",
            "Phosphoric Acid",
            "Natural Flavourings including Caffeine"
        ],
        allergens: "None declared. Contains caffeine.",
        healthStatus: "unhealthy",
        price: 40,
        pricePerServing: 40,
        valueRating: 4,
        incomeSuitability: ["low", "medium_low", "medium_high", "high"]
    }
];

export const ALTERNATIVES = {
    // --- Existing Alternatives (IDs 1-14 remain the same as in your original file) ---
    "1": [
        { id: "alt1-1", name: "Banana + Peanut Butter", description: "Naturally sweet banana with protein-rich peanut butter. A satisfying, healthier treat.", healthScore: 85, image: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fnourishedbynutrition.com%2Fchocolate-peanut-butter-banana-bites%2F&psig=AOvVaw0aes2htAW8ltPFKnRMrXDo&ust=1746506444693000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCMjK7M_Bi40DFQAAAAAdAAAAABAE", healthStatus: "healthy", price: 40, pricePerServing: 40, valueRating: 9, incomeSuitability: ["low", "medium_low", "medium_high", "high"] },
        { id: "alt1-2", name: "Greek Yogurt + Cocoa + Berries", description: "High-protein yogurt with unsweetened cocoa and antioxidant-rich berries.", healthScore: 90, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcJClPavZa_5VDYU80MQ1LUkBNfyQglQgnOw&s", healthStatus: "healthy", price: 80, pricePerServing: 80, valueRating: 8, incomeSuitability: ["medium_low", "medium_high", "high"] },
        { id: "alt1-3", name: "Amul 90% Dark Chocolate", description: "Very dark chocolate with lower sugar content. Intense cocoa flavour.", healthScore: 75, image: "	https://m.media-amazon.com/images/I/81At1L42PdL.jpg", healthStatus: "moderate", price: 130, pricePerServing: 43, valueRating: 8, incomeSuitability: ["medium_low", "medium_high", "high"] }
    ],
    "2": [
        { id: "alt2-1", name: "Whole Wheat Digestive Biscuits", description: "Biscuits made with whole wheat flour, higher in fiber.", healthScore: 60, image: "	https://images-cdn.ubuy.co.in/67e2729ea7c39e0b006b07a4-britannia-digestive-original-biscuits.jpg", healthStatus: "moderate", price: 50, pricePerServing: 10, valueRating: 7, incomeSuitability: ["low", "medium_low", "medium_high", "high"] },
        { id: "alt2-2", name: "Oat Cookies (e.g., Britannia NutriChoice)", description: "Cookies with oats as a primary ingredient, often with less refined sugar.", healthScore: 65, image: "	https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIHRNB2W10mqe0SiscwSWZTmXL29a461-tGw&s", healthStatus: "moderate", price: 60, pricePerServing: 12, valueRating: 7, incomeSuitability: ["low", "medium_low", "medium_high", "high"] },
        { id: "alt2-3", name: "Ragi Crackers + Fruit Spread", description: "Crunchy millet crackers with natural fruit jam (low sugar).", healthScore: 75, image: "https://m.media-amazon.com/images/I/611lMITqxNL._AC_UF1000,1000_QL80_.jpg", healthStatus: "healthy", price: 70, pricePerServing: 70, valueRating: 8, incomeSuitability: ["medium_low", "medium_high", "high"] }
    ],
    "3": [
        { id: "alt3-1", name: "Homemade Trail Mix (Nuts, Seeds, Raisins)", description: "Control ingredients and sugar by mixing your own nuts, seeds (like pumpkin/sunflower), and dried fruit.", healthScore: 90, image: "	https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRkx2vCFNYSRD5cyUBJd4CounWIuNxxOZI8Q&s", healthStatus: "healthy", price: 150, pricePerServing: 30, valueRating: 9, incomeSuitability: ["medium_low", "medium_high", "high"] },
        { id: "alt3-2", name: "Apple Slices + Peanut Butter", description: "Simple, whole food snack providing fiber, vitamins, and healthy fats.", healthScore: 88, image: "https://cdn-uploads.mealime.com/uploads/recipe/thumbnail/2529/presentation_33a8fcf0-a2f8-4847-9580-5d12d5880290.jpeg", healthStatus: "healthy", price: 45, pricePerServing: 45, valueRating: 9, incomeSuitability: ["low", "medium_low", "medium_high", "high"] },
        { id: "alt3-3", name: "Roasted Chana (Chickpeas)", description: "Crunchy, savory, and protein-packed roasted chickpeas. Widely available.", healthScore: 82, image: "https://urbanfarmie.com/wp-content/uploads/Roasted-Chana-Hero-Shot-1x1-Featured-Image.jpg", healthStatus: "healthy", price: 80, pricePerServing: 14, valueRating: 9, incomeSuitability: ["low", "medium_low", "medium_high", "high"] },
        { id: "alt3-4", name: "Peanut Chikki / Gud Patti", description: "Traditional Indian sweet made with peanuts and jaggery. Provides energy, better than refined sugar bars.", healthScore: 70, image: "https://m.media-amazon.com/images/I/71CAMgQAkwL.jpg", healthStatus: "moderate", price: 50, pricePerServing: 18, valueRating: 8, incomeSuitability: ["low", "medium_low", "medium_high", "high"] }
    ],
    "4": [
        { id: "alt4-1", name: "Baked Ragi Chips / Nachos", description: "Crunchy baked snacks made from Ragi (finger millet) flour. Healthier than fried potato chips.", healthScore: 70, image: "	https://godesi.in/cdn/shop/files/ragi-chips-listing-02_288x.jpg?v=1706772411", healthStatus: "moderate", price: 60, pricePerServing: 40, valueRating: 7, incomeSuitability: ["medium_low", "medium_high", "high"] },
        { id: "alt4-2", name: "Air-popped Popcorn (Lightly Salted)", description: "Whole grain, high-fiber snack when air-popped and lightly seasoned.", healthScore: 85, image: "https://amyshealthybaking.com/wp-content/uploads/2018/03/stovetop-air-popped-popcorn-1652.jpg", healthStatus: "healthy", price: 50, pricePerServing: 5, valueRating: 10, incomeSuitability: ["low", "medium_low", "medium_high", "high"] },
        { id: "alt4-3", name: "Spiced Puffed Rice (Murmura Bhel - No Sev)", description: "Light puffed rice mixed with onions, tomatoes, and spices (skip fried sev for health).", healthScore: 75, image: "	https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTeMLZEJk96MUl5MuAlFQFp-GmTxTH4X3gBeA&s", healthStatus: "healthy", price: 70, pricePerServing: 15, valueRating: 9, incomeSuitability: ["low", "medium_low", "medium_high", "high"] },
        { id: "alt4-4", name: "Roasted Chana (Chickpeas)", description: "Crunchy, savory, and protein-packed roasted chickpeas.", healthScore: 82, image: "	https://urbanfarmie.com/wp-content/uploads/Roasted-Chana-Hero-Shot-1x1-Featured-Image.jpg", healthStatus: "healthy", price: 80, pricePerServing: 16, valueRating: 9, incomeSuitability: ["low", "medium_low", "medium_high", "high"] },
    ],
    "5": [
        { id: "alt5-1", name: "Millets (Ragi, Bajra, Jowar, Foxtail)", description: "Nutrient-dense Indian staple grains, naturally gluten-free, cheaper than quinoa.", healthScore: 85, image: "https://m.media-amazon.com/images/I/71VLnIV-q2L.jpg", healthStatus: "healthy", price: 160, pricePerServing: 8, valueRating: 9, incomeSuitability: ["low", "medium_low", "medium_high", "high"] },
        { id: "alt5-2", name: "Dalia (Broken Wheat)", description: "Cracked wheat, good source of fiber and commonly used for porridge or upma.", healthScore: 80, image: "https://www.tarladalal.com/media/glossary/mainphoto/2025/03/07/broken_wheat.webp", healthStatus: "healthy", price: 80, pricePerServing: 4, valueRating: 10, incomeSuitability: ["low", "medium_low", "medium_high", "high"] },
        { id: "alt5-3", name: "Brown Rice", description: "Whole grain brown rice, good fiber source, more affordable than quinoa.", healthScore: 84, image: "	https://5.imimg.com/data5/FI/DM/MY-24816166/brown-rice-500x500.jpg", healthStatus: "healthy", price: 120, pricePerServing: 6, valueRating: 9, incomeSuitability: ["low", "medium_low", "medium_high", "high"] }
    ],
    "6": [
        { id: "alt6-1", name: "Millets (Ragi, Bajra, Jowar, Foxtail)", description: "Nutrient-dense Indian staple grains, comparable health benefits, often cheaper.", healthScore: 85, image: "https://m.media-amazon.com/images/I/71VLnIV-q2L.jpg", healthStatus: "healthy", price: 160, pricePerServing: 8, valueRating: 9, incomeSuitability: ["low", "medium_low", "medium_high", "high"] },
        { id: "alt6-2", name: "Dalia (Broken Wheat)", description: "Cracked wheat, good source of fiber, very affordable.", healthScore: 80, image: "https://www.tarladalal.com/media/glossary/mainphoto/2025/03/07/broken_wheat.webp", healthStatus: "healthy", price: 80, pricePerServing: 4, valueRating: 10, incomeSuitability: ["low", "medium_low", "medium_high", "high"] },
        { id: "alt6-3", name: "Organic Quinoa", description: "Higher protein alternative, though generally more expensive.", healthScore: 90, image: "https://organicindia.com/cdn/shop/products/Quinoa_ing.jpg?v=1672736693", healthStatus: "healthy", price: 350, pricePerServing: 35, valueRating: 7, incomeSuitability: ["medium_low", "medium_high", "high"] }
    ],
    "7": [
        { id: "alt7-1", name: "Ragi Porridge Mix", description: "Finger millet porridge mix, high in calcium and fiber. Traditional healthy breakfast.", healthScore: 88, image: "	https://www.ruchikrandhap.com/wp-content/uploads/2019/11/Ragi-Porridge_2-1.jpg", healthStatus: "healthy", price: 100, pricePerServing: 8, valueRating: 9, incomeSuitability: ["low", "medium_low", "medium_high", "high"] },
        { id: "alt7-2", name: "Dalia (Broken Wheat)", description: "Can be made into a savory or sweet porridge, very filling and affordable.", healthScore: 80, image: "https://www.tarladalal.com/media/glossary/mainphoto/2025/03/07/broken_wheat.webp", healthStatus: "healthy", price: 80, pricePerServing: 3, valueRating: 10, incomeSuitability: ["low", "medium_low", "medium_high", "high"] },
        { id: "alt7-3", name: "Millet Flakes (Mixed)", description: "Flaked millets offer similar texture to oats for porridge or upma.", healthScore: 82, image: "https://true-elements.com/cdn/shop/products/m2_3cb…6b1-4c13-4ae6-9800-0ba9b5e525bb.webp?v=1742560627", healthStatus: "healthy", price: 180, pricePerServing: 14, valueRating: 8, incomeSuitability: ["low", "medium_low", "medium_high", "high"] }
    ],
    "8": [
        { id: "alt8-1", name: "Ragi Flour (Finger Millet)", description: "Nutritious gluten-free flour, rich in calcium.", healthScore: 87, image: "https://gonefarmers.com/cdn/shop/products/image_5c…bbcb-0d6c-48e9-8d86-4928a3c7548a.jpg?v=1585135149", healthStatus: "healthy", price: 90, pricePerServing: 9, valueRating: 9, incomeSuitability: ["low", "medium_low", "medium_high", "high"] },
        { id: "alt8-2", name: "Jowar Flour (Sorghum)", description: "Another healthy gluten-free millet flour.", healthScore: 85, image: "https://organicsphere.in/wp-content/uploads/2020/09/products-Jowar-Flour.jpg", healthStatus: "healthy", price: 100, pricePerServing: 10, valueRating: 9, incomeSuitability: ["low", "medium_low", "medium_high", "high"] },
        { id: "alt8-3", name: "Besan (Gram Flour)", description: "Made from chickpeas, high protein, widely used in Indian cooking.", healthScore: 84, image: "https://m.media-amazon.com/images/I/61NYwvT+YJL._AC_UF1000,1000_QL80_.jpg", healthStatus: "healthy", price: 120, pricePerServing: 12, valueRating: 9, incomeSuitability: ["low", "medium_low", "medium_high", "high"] }
    ],
    "9": [
        { id: "alt9-1", name: "Basil Seeds (Sabja)", description: "Similar gelling properties to chia, used in Indian drinks like Falooda. Cooling effect.", healthScore: 85, image: "	https://rukminid2.flixcart.com/image/850/1000/l3lx…gm-original-imagezpnzfptfa7h.jpeg?q=90&crop=false", healthStatus: "healthy", price: 150, pricePerServing: 11, valueRating: 9, incomeSuitability: ["low", "medium_low", "medium_high", "high"] },
        { id: "alt9-2", name: "Flax Seeds (Alsi)", description: "Excellent source of omega-3s and fiber, cheaper than chia. Best ground before use.", healthScore: 88, image: "https://m.media-amazon.com/images/I/516UHztxzmL._AC_UF1000,1000_QL80_.jpg", healthStatus: "healthy", price: 200, pricePerServing: 12, valueRating: 8, incomeSuitability: ["medium_low", "medium_high", "high"] },
        { id: "alt9-3", name: "Pumpkin Seeds (Pepitas)", description: "Good source of magnesium, zinc, and healthy fats. Nutty flavor.", healthScore: 87, image: "	https://cdn.apartmenttherapy.info/image/upload/f_j…to,w_1500,ar_1:1/stock%2FPepitas-vertical-diptych", healthStatus: "healthy", price: 220, pricePerServing: 26, valueRating: 8, incomeSuitability: ["medium_low", "medium_high", "high"] },
    ],
    "10": [
        { id: "alt10-1", name: "Barley (Jau)", description: "Heart-healthy grain with good fiber content.", healthScore: 83, image: "https://rukminim2.flixcart.com/image/850/1000/xif0…nd-original-imahyy9favyfghzs.jpeg?q=90&crop=false", healthStatus: "healthy", price: 100, pricePerServing: 5, valueRating: 9, incomeSuitability: ["low", "medium_low", "medium_high", "high"] },
        { id: "alt10-2", name: "Dalia (Broken Wheat)", description: "Affordable and versatile cracked wheat.", healthScore: 80, image: "	https://www.tarladalal.com/media/glossary/mainphoto/2025/03/07/broken_wheat.webp", healthStatus: "healthy", price: 80, pricePerServing: 4, valueRating: 10, incomeSuitability: ["low", "medium_low", "medium_high", "high"] },
        { id: "alt10-3", name: "Brown Rice", description: "Common whole grain alternative.", healthScore: 84, image: "https://5.imimg.com/data5/FI/DM/MY-24816166/brown-rice-500x500.jpg", healthStatus: "healthy", price: 120, pricePerServing: 6, valueRating: 9, incomeSuitability: ["low", "medium_low", "medium_high", "high"] }
    ],
    "11": [
        { id: "alt11-1", name: "Toor Dal (Arhar Dal)", description: "Very common Indian lentil, staple food.", healthScore: 90, image: "https://satopradhan.com/cdn/shop/products/arhar-da…ves-satopradhan-1-20165489721494.jpg?v=1696574793", healthStatus: "healthy", price: 140, pricePerServing: 7, valueRating: 9, incomeSuitability: ["low", "medium_low", "medium_high", "high"] },
        { id: "alt11-2", name: "Moong Dal (Split Green Gram)", description: "Easily digestible lentil, often used for khichdi.", healthScore: 91, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtHkkuUYXzpW2MGuLnHdV2rivE-32sC9NY-g&s", healthStatus: "healthy", price: 150, pricePerServing: 8, valueRating: 9, incomeSuitability: ["low", "medium_low", "medium_high", "high"] },
        { id: "alt11-3", name: "Chana Dal (Split Chickpeas)", description: "Nutty flavor, high in protein and fiber.", healthScore: 89, image: "https://www.healthyorganic.in/cdn/shop/products/HealthyOrganic_Chana_Dal.jpg?v=1612525790", healthStatus: "healthy", price: 130, pricePerServing: 7, valueRating: 9, incomeSuitability: ["low", "medium_low", "medium_high", "high"] }
    ],
    "12": [
        { id: "alt12-1", name: "Basil Seeds (Sabja)", description: "Similar gelling properties, cooling effect.", healthScore: 85, image: "	https://rukminid2.flixcart.com/image/850/1000/l3lx…gm-original-imagezpnzfptfa7h.jpeg?q=90&crop=false", healthStatus: "healthy", price: 150, pricePerServing: 11, valueRating: 9, incomeSuitability: ["low", "medium_low", "medium_high", "high"] },
        { id: "alt12-2", name: "Sunflower Seeds", description: "Good source of Vitamin E and healthy fats.", healthScore: 86, image: "https://m.media-amazon.com/images/I/61EuHk70+oL._AC_UF894,1000_QL80_.jpg", healthStatus: "healthy", price: 180, pricePerServing: 18, valueRating: 8, incomeSuitability: ["low", "medium_low", "medium_high", "high"] },
        { id: "alt12-3", name: "Chia Seeds", description: "Nutrient-dense but often pricier alternative.", healthScore: 96, image: "https://5.imimg.com/data5/SELLER/Default/2020/9/TR/OO/AK/84813594/chia-seeds.jpg", healthStatus: "healthy", price: 250, pricePerServing: 30, valueRating: 7, incomeSuitability: ["medium_low", "medium_high", "high"] }
    ],
    "13": [
        { id: "alt13-1", name: "Chickpea Pasta", description: "Gluten-free pasta made from chickpea flour, high protein.", healthScore: 90, image: "https://www.lastingredient.com/wp-content/uploads/2022/03/pasta-with-chickpeas1.jpg", healthStatus: "healthy", price: 280, pricePerServing: 45, valueRating: 7, incomeSuitability: ["medium_high", "high"] },
        { id: "alt13-2", name: "Zucchini Noodles ('Zoodles')", description: "Spiralized zucchini as a very low-carb pasta substitute.", healthScore: 95, image: "https://www.inspiredtaste.net/wp-content/uploads/2016/08/Zucchini-Pasta-Recipe.jpg", healthStatus: "healthy", price: 60, pricePerServing: 60, valueRating: 8, incomeSuitability: ["medium_low", "medium_high", "high"] },
        { id: "alt13-3", name: "Millet Noodles", description: "Noodles made from various millet flours, healthier than refined flour.", healthScore: 80, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQoirZXo549juaqhfeH7FInxKpQP-slQBykg&s", healthStatus: "healthy", price: 150, pricePerServing: 30, valueRating: 8, incomeSuitability: ["medium_low", "medium_high", "high"] }
    ],
    "14": [
        { id: "alt14-1", name: "Sprouted Moth Beans (Matki)", description: "Another commonly sprouted legume in India.", healthScore: 96, image: "https://vanitascorner.com/wp-content/uploads/2019/04/Sprouted-Matki.jpg", healthStatus: "healthy", price: 110, pricePerServing: 22, valueRating: 9, incomeSuitability: ["low", "medium_low", "medium_high", "high"] },
        { id: "alt14-2", name: "Cooked Black Chana Salad", description: "Boiled black chickpeas mixed with salad veggies.", healthScore: 92, image: "https://shwetainthekitchen.com/wp-content/uploads/2023/10/black-chickpea-salad.jpg", healthStatus: "healthy", price: 90, pricePerServing: 9, valueRating: 9, incomeSuitability: ["low", "medium_low", "medium_high", "high"] },
        { id: "alt14-3", name: "Edamame (Steamed/Boiled)", description: "Young soybeans, good source of protein.", healthScore: 89, image: "https://www.bhg.com/thmb/UjbEcHMkG_2Ab1EwiFCz5roJm…k-edamame-04-67af81d469994e7091e6135de04149ab.jpg", healthStatus: "healthy", price: 150, pricePerServing: 30, valueRating: 8, incomeSuitability: ["medium_low", "medium_high", "high"] }
    ],

    // Alternatives for Kurkure Masala Munch (ID: 15) - reusing alternatives from Potato Chips (ID: 4)
    "15": [
        { id: "alt4-1", name: "Baked Ragi Chips / Nachos", description: "Crunchy baked snacks made from Ragi (finger millet) flour. Healthier than fried potato chips.", healthScore: 70, image: "	https://godesi.in/cdn/shop/files/ragi-chips-listing-02_288x.jpg?v=1706772411", healthStatus: "moderate", price: 60, pricePerServing: 40, valueRating: 7, incomeSuitability: ["medium_low", "medium_high", "high"] },
        { id: "alt4-2", name: "Air-popped Popcorn (Lightly Salted)", description: "Whole grain, high-fiber snack when air-popped and lightly seasoned.", healthScore: 85, image: "	https://syracusesaltco.com/cdn/shop/articles/Buttered_Popcorn.jpg?v=1727981813", healthStatus: "healthy", price: 50, pricePerServing: 5, valueRating: 10, incomeSuitability: ["low", "medium_low", "medium_high", "high"] },
        { id: "alt4-3", name: "Spiced Puffed Rice (Murmura Bhel - No Sev)", description: "Light puffed rice mixed with onions, tomatoes, and spices (skip fried sev for health).", healthScore: 75, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTeMLZEJk96MUl5MuAlFQFp-GmTxTH4X3gBeA&s", healthStatus: "healthy", price: 70, pricePerServing: 15, valueRating: 9, incomeSuitability: ["low", "medium_low", "medium_high", "high"] },
        { id: "alt4-4", name: "Roasted Chana (Chickpeas)", description: "Crunchy, savory, and protein-packed roasted chickpeas.", healthScore: 82, image: "https://www.cookclickndevour.com/wp-content/upload…oasted-chickpeas-roasted-chana-recipe-500x375.jpg", healthStatus: "healthy", price: 80, pricePerServing: 16, valueRating: 9, incomeSuitability: ["low", "medium_low", "medium_high", "high"] },
    ],
    // Alternatives for Dairy Milk Chocolate (ID: 16) - reusing alternatives from Dark Chocolate Bar (ID: 1)
    "16": [
        { id: "alt1-1", name: "Banana + Peanut Butter", description: "Naturally sweet banana with protein-rich peanut butter. A satisfying, healthier treat.", healthScore: 85, image: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fnourishedbynutrition.com%2Fchocolate-peanut-butter-banana-bites%2F&psig=AOvVaw0aes2htAW8ltPFKnRMrXDo&ust=1746506444693000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCMjK7M_Bi40DFQAAAAAdAAAAABAE", healthStatus: "healthy", price: 40, pricePerServing: 40, valueRating: 9, incomeSuitability: ["low", "medium_low", "medium_high", "high"] },
        { id: "alt1-2", name: "Greek Yogurt + Cocoa + Berries", description: "High-protein yogurt with unsweetened cocoa and antioxidant-rich berries.", healthScore: 90, image: "https://flavanaturals.com/wp-content/uploads/2017/08/yogurt1-2.jpg", healthStatus: "healthy", price: 80, pricePerServing: 80, valueRating: 8, incomeSuitability: ["medium_low", "medium_high", "high"] },
        { id: "alt1-3", name: "Amul 90% Dark Chocolate", description: "Very dark chocolate with lower sugar content. Intense cocoa flavour.", healthScore: 75, image: "	https://m.media-amazon.com/images/I/61MQbJ7NnpL.jpg", healthStatus: "moderate", price: 130, pricePerServing: 43, valueRating: 8, incomeSuitability: ["medium_low", "medium_high", "high"] }
    ],
    "17": [
        { id: "alt17-2", name: "Coconut Water (Natural/Packaged)", description: "Natural electrolyte drink, hydrating with some natural sugars. Widely available fresh or packaged.", healthScore: 85, image: "https://digitalcontent.api.tesco.com/v2/media/ghs/7ab6b55c-8853-4d26-a391-b795f040c3d7/03a3b488-8573-4423-b37e-a172d25fecb1_724143496.jpeg?h=960&w=960", healthStatus: "healthy", price: 35, pricePerServing: 35, valueRating: 9, incomeSuitability: ["low", "medium_low", "medium_high", "high"] },
        { id: "alt17-3", name: "Fresh Lime Soda (Low Sugar)", description: "Refreshing drink made with lime juice, soda water, and minimal sugar/salt. Control sweetness.", healthScore: 75, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsjAA9OG_59dHTtzv7ZYe-NLqkvoYB85LASA&s", healthStatus: "moderate", price: 30, pricePerServing: 30, valueRating: 8, incomeSuitability: ["low", "medium_low", "medium_high", "high"] },
        { id: "alt17-4", name: "Diet Coke / Coke Zero", description: "Zero-calorie cola alternative using artificial sweeteners. Similar taste profile to original.", healthScore: 25, image: "https://static01.nyt.com/images/2021/07/14/oakImage-1626274362503/oakImage-1626274362503-superJumbo.jpg", healthStatus: "moderate", price: 40, pricePerServing: 40, valueRating: 4, incomeSuitability: ["low", "medium_low", "medium_high", "high"] }
    ]
};

// END OF UPDATED data.js