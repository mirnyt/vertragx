# Upstash Search Setup Instructions

This document provides step-by-step instructions for setting up Upstash Search for the V1 project.

## Prerequisites

- An Upstash account (same account used for Redis)
- Access to the V1 project codebase
- Understanding of search indexing concepts

## 1. Create Upstash Search Database

1. Go to [upstash.com](https://upstash.com) and sign in to your account
2. Navigate to the **"Search"** section in the left sidebar
3. Click **"Create Database"**
4. Configure the search database:
   - **Name**: "vertragx-search" (or your preferred name)
   - **Region**: Choose the region closest to your application
5. Click **"Create"**

## 2. Get Search Credentials

1. Click on your search database name in the console
2. In the database details page, you'll find:
   - **REST URL**: HTTP REST API endpoint
   - **REST Token**: Authentication token for REST API (use the "REST API" token)

### Example Credentials Format:
```
REST URL: https://your-search-url.upstash.io
REST Token: AXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXx
```

## 3. Configure Environment Variables

Update your environment files with Upstash Search credentials:

### apps/app/.env:
```bash
# Upstash Search Configuration (Optional - for enhanced search)
NEXT_PUBLIC_UPSTASH_SEARCH_REST_URL=https://search-12345.upstash.io
NEXT_PUBLIC_UPSTASH_SEARCH_REST_TOKEN=AXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXx
```

### apps/web/.env (if needed):
```bash
# Upstash Search Configuration
NEXT_PUBLIC_UPSTASH_SEARCH_REST_URL=https://search-12345.upstash.io
NEXT_PUBLIC_UPSTASH_SEARCH_REST_TOKEN=AXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXx
```

## 4. Understanding V1's Search Integration

The V1 project uses Upstash Search for:

### Product Search:
- **Real-time search**: Instant search results as users type
- **Fuzzy matching**: Find products even with typos
- **Category filtering**: Filter results by product categories
- **Supplier search**: Search through verified suppliers

### Search Features:
- **Debounced search**: Reduces API calls while typing
- **Fallback behavior**: Uses mock results if search is unavailable
- **Error handling**: Graceful degradation when search fails
- **Mobile responsive**: Works on all device sizes

## 5. Search Index Configuration

### Index Name:
The application uses `"default"` as the index name. You can create the index programmatically or through the Upstash console.

### Document Structure:
Documents in the search index should follow this structure:

```typescript
{
  id: string,          // Unique identifier
  content: {
    title: string,     // Product/item title
    description: string, // Detailed description
    category: string,  // Category classification
    url: string        // Link to product page
  }
}
```

### Search Parameters:
The search client uses these parameters:
```typescript
await index.search({
  query: string,      // User's search query
  limit: 10,         // Maximum results to return
  reranking: true    // Enable AI-powered result reranking
})
```

### Debounce Configuration:
- **Debounce**: 300ms delay between searches to reduce API calls

## 6. Adding Data to Search Index

### Manual Data Addition:
```typescript
import { Search } from "@upstash/search";

const search = new Search({
  url: process.env.NEXT_PUBLIC_UPSTASH_SEARCH_REST_URL!,
  token: process.env.NEXT_PUBLIC_UPSTASH_SEARCH_REST_TOKEN!,
});

const index = search.index("default");

// Example: Adding a product to the search index
await index.upsert({
  id: "product-123",
  content: {
    title: "Temperature Data Logger Pro",
    description: "High-precision temperature monitoring device",
    category: "Industrial Sensors",
    url: "/products/temp-logger-pro"
  }
});
```

### Bulk Data Import:
```typescript
// Example: Bulk import products
const products = [
  {
    id: "1",
    content: {
      title: "Product 1",
      description: "Description 1",
      category: "Category 1",
      url: "/products/1"
    }
  },
  {
    id: "2",
    content: {
      title: "Product 2",
      description: "Description 2",
      category: "Category 2",
      url: "/products/2"
    }
  },
  // ... more products
];

// Upsert multiple documents
for (const product of products) {
  await index.upsert(product);
}
```

## 7. Search Implementation Details

### Current Implementation:
The search client (`search-client.tsx`) includes:

1. **Conditional Initialization**: Only initializes if environment variables are present
2. **Fallback Behavior**: Uses mock results if search is unavailable
3. **Error Handling**: Graceful error handling with user-friendly messages
4. **Type Safety**: Full TypeScript support with generated types

### Search Flow:
1. User types in search box
2. Debounced search triggers after 300ms
3. Check if Upstash Search is configured
4. If configured: Use Upstash Search API
5. If not configured: Use mock results
6. Display results in dropdown
7. Handle user selection and navigation

## 8. Testing and Verification

### Test Search Functionality:
1. **Start the development server**: `bun dev:app`
2. **Navigate to the search page**: Go to the main dashboard
3. **Type a search query**: Try searching for "temperature data logger"
4. **Verify results**: Check that results appear in the dropdown
5. **Test navigation**: Click on a result to verify navigation

### Test Fallback Behavior:
1. **Remove environment variables**: Comment out Upstash Search env vars
2. **Restart the server**: `bun dev:app`
3. **Test search**: Verify that mock results still work
4. **Check console**: Look for "Upstash Search not configured" warning

### Test Error Handling:
1. **Use invalid credentials**: Set incorrect search token
2. **Test search**: Verify that fallback behavior works
3. **Check error logs**: Look for error messages in console

## 9. Performance Optimization

### Search Optimization:
- **Debouncing**: Reduces unnecessary API calls
- **Result limiting**: Limits results to 10 items
- **Caching**: Consider implementing result caching
- **Lazy loading**: Load more results on demand

### Index Optimization:
- **Relevance tuning**: Adjust search thresholds
- **Field boosting**: Boost important fields like title
- **Filtering**: Use category filters to narrow results
- **Analytics**: Monitor search performance and usage

## 10. Production Deployment

### Environment Variables:
Ensure these are set in your production environment:
```bash
NEXT_PUBLIC_UPSTASH_SEARCH_REST_URL=https://your-search-index.upstash.io
NEXT_PUBLIC_UPSTASH_SEARCH_REST_TOKEN=your_search_token
```

### Monitoring:
- **Search analytics**: Monitor search usage and performance
- **Error tracking**: Track search errors and failures
- **User feedback**: Collect feedback on search quality

## 11. Troubleshooting

### Common Issues:

1. **"Missing or wrong input" error**:
   - Make sure you're using the correct search API format:
   ```typescript
   await index.search({
     query: "search term",
     limit: 10,
     reranking: true
   })
   ```
   - Do NOT pass the query as a plain string

2. **"Upstash Search not configured" warning**:
   - Check that environment variables are set correctly
   - Verify that the search database exists in Upstash console
   - Ensure the REST token has proper permissions

3. **Search not working**:
   - Check browser console for errors
   - Verify network connectivity to Upstash
   - Ensure you're using Upstash Search (not Vector)

4. **No results returned**:
   - Check if the search index has data
   - Verify document structure matches expected format
   - Look at search response in console logs

5. **Slow search performance**:
   - Check network latency to Upstash
   - Consider implementing caching
   - Optimize search queries

### Debug Commands:
```bash
# Test search connectivity (replace with your actual URL and token)
curl -X POST "https://your-search-url.upstash.io/search/default" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"query": "test", "limit": 5, "reranking": true}'
```

### Response Format:
Successful search returns:
```json
{
  "results": [
    {
      "id": "doc-id",
      "score": 0.95,
      "content": {
        "title": "Product Title",
        "description": "Product description",
        "category": "Category",
        "url": "/product-url"
      }
    }
  ]
}
```

## 12. Next Steps

### Future Enhancements:
1. **Vector Search**: Implement AI-powered semantic search
2. **Search Analytics**: Add search usage tracking
3. **Advanced Filtering**: Add price, supplier, and category filters
4. **Search Suggestions**: Add autocomplete and suggestions
5. **Search History**: Track user search history
6. **Personalization**: Personalized search results based on user behavior

### Integration with Other Services:
- **Supabase**: Sync product data with search index
- **Analytics**: Track search performance metrics
- **Caching**: Implement search result caching
- **Rate Limiting**: Add search rate limiting

This setup provides a robust search foundation that can be enhanced as your application grows. 