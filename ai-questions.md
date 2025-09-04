# Ulimi AI Assistant - Questions and Answers Database

This document contains all the questions and answers that the AI assistant can respond to, organized by category.

## Crop Management

### Q: When is the best time to plant maize in Zambia?
**A:** The best time to plant maize in Zambia is during the rainy season, typically between November and December. Plant when soil moisture is adequate and temperatures are between 20-30°C. Early planting (November) often yields better results.

### Q: What are the signs of nitrogen deficiency in crops?
**A:** Nitrogen deficiency shows as yellowing of older leaves (chlorosis), starting from leaf tips and edges. Plants appear stunted with reduced growth. Leaves may drop prematurely. Apply nitrogen-rich fertilizer or organic matter to correct this.

### Q: What crops are drought-resistant for Zambia?
**A:** Drought-resistant crops for Zambia include sorghum, millet, cassava, sweet potatoes, and cowpeas. These crops require less water and can tolerate dry conditions better than maize or vegetables.

## Soil Management

### Q: How do I improve soil fertility naturally?
**A:** Improve soil fertility by adding organic matter like compost or well-rotted manure. Practice crop rotation with legumes like beans or groundnuts to fix nitrogen. Use cover crops during off-seasons and avoid over-tilling to maintain soil structure.

### Q: What is the ideal pH level for vegetable crops?
**A:** Most vegetables grow best in slightly acidic to neutral soil with pH 6.0-7.0. Tomatoes prefer 6.0-6.8, while brassicas (cabbage, broccoli) prefer 6.0-7.5. Test soil regularly and adjust with lime (to raise pH) or sulfur (to lower pH).

## Irrigation

### Q: How often should I water my tomato plants?
**A:** Water tomato plants deeply 2-3 times per week, providing about 2.5cm of water weekly. Water early morning to reduce disease risk. Maintain consistent moisture to prevent blossom end rot and fruit cracking.

### Q: How does rainfall affect crop planting decisions?
**A:** Plant when soil has adequate moisture but isn't waterlogged. Too much rain can delay planting and cause seed rot. Too little requires irrigation. Monitor 7-day forecasts and plant 2-3 days after good rainfall for optimal conditions.

## Pest Control

### Q: How do I control aphids on my crops?
**A:** Control aphids by spraying with neem oil or insecticidal soap. Introduce beneficial insects like ladybugs. Remove heavily infested leaves. Plant companion crops like marigolds to deter aphids naturally.

### Q: How do I identify and treat cutworms?
**A:** Cutworms are gray/brown caterpillars that cut young plants at soil level. Look for plants cut near the base and caterpillars in soil. Control with beneficial nematodes, diatomaceous earth around plants, or evening hand-picking.

## Disease Management

### Q: What causes blight in tomatoes and how to prevent it?
**A:** Tomato blight is caused by fungal infections (early or late blight). Prevent by ensuring good air circulation, avoiding overhead watering, and applying copper-based fungicides. Remove affected leaves immediately and practice crop rotation.

## Market Timing

### Q: When are vegetable prices highest in Zambian markets?
**A:** Vegetable prices are typically highest during dry season (May-October) when supply is limited. Prices peak in August-September. Plan production to harvest during these periods for better profits.

### Q: How do I calculate farming profitability?
**A:** Calculate profitability by subtracting total costs (seeds, fertilizer, labor, equipment) from total revenue (yield × market price). Track costs per hectare and yield per hectare to determine profit margins and ROI.

## Technology

### Q: How can IoT sensors help my farm?
**A:** IoT sensors monitor soil moisture, pH, temperature, and humidity in real-time. This data helps optimize irrigation, detect problems early, and make informed decisions about fertilization and pest control, leading to better yields.

### Q: What is precision agriculture?
**A:** Precision agriculture uses technology like GPS, sensors, and data analysis to optimize farming practices. It involves applying the right amount of inputs (water, fertilizer, pesticides) at the right time and place for maximum efficiency.

## Organic Farming

### Q: How do I start organic farming?
**A:** Start organic farming by eliminating synthetic chemicals, building soil health with compost and organic matter, using natural pest control methods, and obtaining organic certification. Focus on biodiversity and sustainable practices.

### Q: What are natural alternatives to chemical pesticides?
**A:** Natural pesticide alternatives include neem oil, diatomaceous earth, beneficial insects, companion planting, crop rotation, and homemade sprays using garlic, soap, or chili peppers. These methods are safer for environment and health.

## Post-Harvest

### Q: How do I properly store harvested maize?
**A:** Store maize in clean, dry containers with moisture content below 14%. Use airtight storage to prevent pest infestation. Add diatomaceous earth or ash to deter insects. Keep storage area cool and well-ventilated.

### Q: When should I harvest my vegetables for best quality?
**A:** Harvest vegetables early morning when temperatures are cool. Pick tomatoes when they start turning color, leafy greens before flowering, and root vegetables when they reach desired size. Regular harvesting encourages continued production.

## Integrated Farming

### Q: How can I integrate livestock with crop farming?
**A:** Integrate livestock through rotational grazing on crop residues, using animal manure for fertilizer, and practicing silvopasture. Animals can graze cover crops and provide additional income while improving soil fertility.

## Climate Adaptation

### Q: How do I adapt my farming to climate change?
**A:** Adapt to climate change by choosing drought-resistant varieties, implementing water conservation techniques, diversifying crops, using climate-smart agriculture practices, and adjusting planting dates based on changing weather patterns.

## Finance

### Q: How do I access agricultural loans in Zambia?
**A:** Access agricultural loans through commercial banks, microfinance institutions, and government programs like FISP. Prepare a business plan, collateral documentation, and farming records. Consider group lending schemes for better terms.

## Sustainable Farming

### Q: What is conservation agriculture?
**A:** Conservation agriculture involves minimal soil disturbance, permanent soil cover with crop residues or cover crops, and crop rotation. This practice improves soil health, reduces erosion, and increases water retention while maintaining yields.

---

## How to Add New Questions

To add new questions to the AI assistant:

1. Open `src/data/aiQuestions.ts`
2. Add a new object to the `aiQuestions` array with:
   - `id`: Unique identifier
   - `question`: The question text
   - `answer`: Detailed answer
   - `category`: Category for organization
   - `keywords`: Array of keywords for matching user input

Example:
```typescript
{
  id: 'new1',
  question: 'How do I plant beans?',
  answer: 'Plant beans after the last frost when soil temperature reaches 15°C...',
  category: 'Crop Management',
  keywords: ['beans', 'planting', 'frost', 'temperature']
}
```

The AI will automatically match user questions based on keywords and provide relevant answers.