from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import requests
import os
import uvicorn

app = FastAPI()

# Allow CORS for the frontend portal
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["GET"],
    allow_headers=["*"],
)

# Securely stored environment variables
GOOGLE_API_KEY = os.getenv("GOOGLE_PLACES_API_KEY", "YOUR_SECURE_API_KEY")
PLACE_ID = os.getenv("DOVE_NEST_PLACE_ID", "YOUR_GOOGLE_PLACE_ID")

@app.get("/api/reviews")
async def get_google_reviews():
    """
    Fetches the top 5 most relevant Google Reviews for Dove Nest.
    Filters out reviews without text to ensure a visually appealing frontend.
    """
    url = f"https://maps.googleapis.com/maps/api/place/details/json?place_id={PLACE_ID}&fields=reviews&key={GOOGLE_API_KEY}"
    
    try:
        response = requests.get(url)
        data = response.json()
        
        if response.status_code != 200 or "result" not in data:
            raise HTTPException(status_code=502, detail="Failed to fetch reviews from Google.")
            
        raw_reviews = data["result"].get("reviews", [])
        
        # Process and clean the data for the frontend
        cleaned_reviews = []
        for review in raw_reviews:
            if review.get("text"): # Only include reviews with actual written feedback
                cleaned_reviews.append({
                    "author_name": review.get("author_name"),
                    "rating": review.get("rating"),
                    "text": review.get("text"),
                    "time": review.get("relative_time_description"),
                    "profile_photo": review.get("profile_photo_url")
                })
                
        return {"status": "success", "data": cleaned_reviews}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    # Run the microservice on port 8000
    uvicorn.run(app, host="0.0.0.0", port=8000)
  
