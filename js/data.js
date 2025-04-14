// data.js
// Contains the PRODUCTS and ALTERNATIVE RECOMMENDATIONS data.

export const PRODUCTS = [
    {
        id: "1", barcode: "9780201379624", name: "Dark Chocolate Bar", description: "70% cocoa dark chocolate bar with hints of vanilla.", healthScore: 65, category: "Chocolate", image: "https://images.unsplash.com/photo-1511381939415-e340152efb59?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZGFyayUyMGNob2NvbGF0ZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60", brand: "Choco Delights", lastUpdated: "Today", calories: 180, servingSize: "per 30g (3 squares)", nutrients: { carbs: 13, protein: 2, fat: 12 }, ingredients: ["Cocoa Mass", "Cocoa Butter", "Sugar", "Vanilla Extract", "Soy Lecithin"], allergens: "May contain traces of milk, nuts, and wheat", healthStatus: "moderate",
    },
    {
        id: "2", barcode: "5012345678900", name: "Milk Chocolate Biscuits", description: "Crispy biscuits coated with milk chocolate.", healthScore: 35, category: "Biscuits", image: "https://images.unsplash.com/photo-1604151808439-8649cc74441a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y2hvY29sYXRlJTIwYmlzY3VpdHN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60", brand: "Sweet Treats", lastUpdated: "Yesterday", calories: 240, servingSize: "per 50g (5 biscuits)", nutrients: { carbs: 28, protein: 3, fat: 14 }, ingredients: ["Wheat Flour", "Sugar", "Vegetable Oil", "Milk Chocolate (30%)", "Salt", "Raising Agents"], allergens: "Contains wheat, milk, and soy. May contain traces of nuts.", healthStatus: "unhealthy",
    },
    {
        id: "3", barcode: "8901234567890", name: "Organic Fruit & Nut Bar", description: "Natural energy bar made with organic dried fruits and nuts.", healthScore: 85, category: "Snack Bars", image: "https://images.unsplash.com/photo-1621939514649-280e2ee25f60?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZnJ1aXQlMjBudXQlMjBiYXJ8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60", brand: "Nature's Best", lastUpdated: "2 days ago", calories: 150, servingSize: "per 35g bar", nutrients: { carbs: 22, protein: 5, fat: 7 }, ingredients: ["Dates", "Almonds", "Cashews", "Raisins", "Sunflower Seeds"], allergens: "Contains tree nuts. Manufactured in a facility that processes peanuts.", healthStatus: "healthy",
    },
    {
        id: "4", barcode: "6809011904814", name: "Potato Chips Original", description: "Classic salted potato chips.", healthScore: 25, category: "Chips", image: "https://images.unsplash.com/photo-1599490659213-4cee7ff52b59?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cG90YXRvJTIwY2hpcHN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60", brand: "Crispy Crunch", lastUpdated: "3 days ago", calories: 220, servingSize: "per 40g (1 handful)", nutrients: { carbs: 22, protein: 2, fat: 15 }, ingredients: ["Potatoes", "Vegetable Oil", "Salt"], allergens: "May contain traces of wheat.", healthStatus: "unhealthy",
    },
];

export const ALTERNATIVES = {
    "1": [ // Alternatives for Dark Chocolate Bar
        { id: "alt1-1", name: "Banana with Dark Chocolate Dip", description: "Natural sweetness from banana paired with a small amount of dark chocolate for a healthier treat.", healthScore: 82, image: "https://images.unsplash.com/photo-1587150739415-1d21998745f7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YmFuYW5hJTIwY2hvY29sYXRlfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60", healthStatus: "healthy" },
        { id: "alt1-2", name: "Cacao Nibs with Dried Fruits", description: "Raw cacao nibs mixed with naturally sweet dried fruits for a nutritious snack.", healthScore: 85, image: "https://images.unsplash.com/photo-1551971954-7a3f3f04d1ad?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2FjYW8lMjBuaWJzJTIwZnJ1aXR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60", healthStatus: "healthy" },
    ],
    "2": [ // Alternatives for Milk Chocolate Biscuits
        { id: "alt2-1", name: "Oat & Raisin Cookies (Homemade)", description: "Whole grain oat cookies with natural fruit sweetness and minimal added sugar.", healthScore: 78, image: "https://images.unsplash.com/photo-1596370774808-1799326a4c29?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8b2F0JTIwY29va2llc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60", healthStatus: "healthy" },
        { id: "alt2-2", name: "Rice Cakes with Almond Butter", description: "Light rice cakes topped with protein-rich almond butter for a satisfying crunch.", healthScore: 80, image: "https://images.unsplash.com/photo-1615837197152-a18cde52d153?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cmljZSUyMGNha2VzJTIwYWxtb25kJTIwYnV0dGVyfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60", healthStatus: "healthy" },
    ],
    "3": [ // Alternatives for Organic Fruit & Nut Bar
        { id: "alt3-1", name: "Homemade Trail Mix", description: "Custom mix of nuts, seeds, and a small amount of dried fruits with no added sugar.", healthScore: 90, image: "https://images.unsplash.com/photo-1599017439730-04dd138019a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dHJhaWwlMjBtaXh8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60", healthStatus: "healthy" },
        { id: "alt3-2", name: "Apple Slices with Peanut Butter", description: "Simple, whole food snack providing fiber, vitamins, and healthy fats.", healthScore: 88, image: "https://images.unsplash.com/photo-1608198093002-442a72909a55?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXBwbGUlMjBwZWFudXQlMjBidXR0ZXJ8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60", healthStatus: "healthy" },
    ],
    "4": [ // Alternatives for Potato Chips
        { id: "alt4-1", name: "Baked Kale Chips", description: "Crispy kale leaves baked with a light coating of olive oil and sea salt.", healthScore: 88, image: "https://images.unsplash.com/photo-1551201478-a637c4e3d8b1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8a2FsZSUyMGNoaXBzfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60", healthStatus: "healthy" },
        { id: "alt4-2", name: "Air-popped Popcorn", description: "Light and fluffy popcorn made without oil, lightly seasoned with herbs.", healthScore: 85, image: "https://images.unsplash.com/photo-1578849248041-36f7a84beb70?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cG9wY29ybnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60", healthStatus: "healthy" },
        { id: "alt4-3", name: "Roasted Chickpeas", description: "Crunchy and savory snack packed with protein and fiber.", healthScore: 82, image: "https://images.unsplash.com/photo-1604467707600-5c7adbce6c63?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cm9hc3RlZCUyMGNoaWNrcGVhc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60", healthStatus: "healthy" },
    ]
};